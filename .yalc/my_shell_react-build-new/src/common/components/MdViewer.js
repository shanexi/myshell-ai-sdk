import { jsx as _jsx } from "react/jsx-runtime";
import '@/styles/md-viewer.scss';
import clsx from 'clsx';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { sanitize } from 'isomorphic-dompurify';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';
import { markedSmartypants } from 'marked-smartypants';
import { markedXhtml } from 'marked-xhtml';
import mermaid from 'mermaid';
import { useTranslations } from 'next-intl';
import { memo, useEffect, useMemo, useRef } from 'react';
import markedKatex, { renderKatex } from '../../common/components/extension/KatexExtension.js';
import { useHljsCss } from '../../common/hooks/useHljsCss.js';
import { useNotification } from '../../common/hooks/useNotification.js';
marked.use({
    pedantic: false,
    gfm: true,
    breaks: true
});
mermaid.initialize({
    theme: 'neutral'
});
marked.use(mangle());
marked.use(markedXhtml());
marked.use(markedSmartypants());
marked.use(gfmHeadingId({
    prefix: 'shell-'
}));
marked.use(markedKatex({
    throwOnError: false
}));
DOMPurify?.addHook?.('uponSanitizeElement', (node, data) => {
    if (data.tagName === 'div') {
        const allowedClasses = [
            'mermaid',
            'w-full',
            'h-full',
            'overflow-auto',
            'marked-code-block',
            'marked-code-header',
            'bg-surface-container-pressed',
            'text-14',
            'text-subtle',
            'copy-button',
            'text-surface-primary-default'
        ];
        const currentClasses = node.className.split(' ');
        const sanitizedClasses = currentClasses.filter(item => allowedClasses.includes(item));
        node.className = sanitizedClasses.join(' ');
    }
});
const maxWaitTime = 3;
function MdViewer(props) {
    useHljsCss();
    const commonT = useTranslations('common');
    const t = useTranslations('chat');
    const { success, error: notificationError } = useNotification();
    const mdViewerRef = useRef(null);
    const startTime = useRef(0);
    const renderer = useMemo(() => {
        const renderer = new marked.Renderer();
        renderer.blockquote = quote => {
            return `<blockquote>${quote}</blockquote>`;
        };
        renderer.code = (code, language) => {
            try {
                if (language === 'mermaid') {
                    const svgId = `mermaid-svg-${Date.now()}`;
                    const svgBox = `mermaid-box-${Date.now()}`;
                    mermaid.render(svgId, code, svg => {
                        setTimeout(() => {
                            const box = document.getElementById(svgBox);
                            if (box) {
                                box.innerHTML = svg;
                            }
                            const svgDom = document.getElementById(svgId);
                            if (svgDom) {
                                svgDom.style.fontSize = '14px';
                            }
                        });
                    });
                    return `<div class="mermaid w-full h-full overflow-auto" id="${svgBox}"></div>`;
                }
            }
            catch (e) {
                console.log('e', e);
            }
            const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
            const highlightedCode = language?.toLowerCase() === 'json' && code?.length > 2000
                ? code
                : hljs.highlight(validLanguage, code).value;
            return `
      <div class="marked-code-block">
        <div class="marked-code-header bg-surface-container-pressed text-14 text-subtle">
          <span>${validLanguage === 'plaintext' ? t('plaintext') : validLanguage?.toUpperCase()}</span>
          <button class="copy-button text-surface-primary-default">${t('copy_code')}</button>
        </div>
        <pre><code class="hljs ${validLanguage}">${highlightedCode}</code></pre>
      </div>
    `;
        };
        renderer.del = text => {
            return `<span>${text}</span>`;
        };
        renderer.link = (href, title, text) => {
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        };
        renderer.image = (href, title, text) => {
            if (!title) {
                return `<img class="default-image" src="${href}" alt="${text}" x-intercept-click="1" />`;
            }
            return `<img class="default-image" src="${href}" alt="${text}" title="${title}" x-intercept-click="1" />`;
        };
        renderer.table = (header, body) => {
            return `<div class="marked-table-container"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>`;
        };
        renderer.html = (html, block) => {
            const anchorRegex = /<a[^>]+href="?([^"\s]+)"?\s*\/?>/g;
            const anchorMatches = html.match(anchorRegex);
            if (anchorMatches) {
                html = anchorMatches.reduce((acc, match) => {
                    return acc.replace(match, match.replace(/<a/, '<a target="_blank" rel="noopener noreferrer"'));
                }, html);
            }
            const imgRegex = /<img\s+[^>]*src="?([^"]+)"?[^>]*>/g;
            const imgMatches = html.match(imgRegex);
            if (imgMatches) {
                html = imgMatches.reduce((acc, match) => {
                    return acc.replace(match, match.replace(/<img/g, '<img x-intercept-click="1"'));
                }, html);
            }
            return sanitize(html, {
                ADD_ATTR: ['target', 'x-intercept-click'],
                USE_PROFILES: {
                    html: true
                },
                FORBID_TAGS: ['style', 'form', 'input', 'checkbox', 'svg'],
                FORBID_ATTR: ['action', 'style']
            });
        };
        return renderer;
    }, []);
    useEffect(() => {
        const handleClick = (event) => {
            if (event.target.classList.contains('copy-button')) {
                const code = event.target.parentNode.nextElementSibling.querySelector('code').textContent;
                navigator.clipboard
                    .writeText(code)
                    .then(() => {
                    success({ content: commonT('code_copied') });
                })
                    .catch(error => {
                    notificationError({
                        content: `${commonT('copy_failed')} ${error}`,
                        id: `${commonT('copy_failed')} ${error}`
                    });
                });
            }
        };
        if (mdViewerRef.current) {
            mdViewerRef.current.addEventListener('click', handleClick);
        }
        return () => {
            if (mdViewerRef.current) {
                mdViewerRef.current.removeEventListener('click', handleClick);
            }
        };
    }, [commonT, notificationError, success]);
    const convertMarkdownToHTML = (content, status) => {
        const imageRegex = /!\[.*?\]\((.*?)\)/g;
        const regex = /!\[(.*?)\]$/;
        const str = content || '';
        let truncatedStr = str.trim();
        let overWaitTime = false;
        let endTime = 0;
        if (startTime.current !== 0) {
            endTime = performance.now();
            overWaitTime = (endTime - startTime.current) / 1000 > maxWaitTime;
        }
        if (!imageRegex.test(truncatedStr) && regex.test(truncatedStr) && status !== 'DONE') {
            if (!overWaitTime) {
                if (startTime.current === 0) {
                    startTime.current = performance.now();
                }
                else {
                    const imageIndex = truncatedStr.search(regex);
                    truncatedStr = imageIndex !== -1 ? truncatedStr.substring(0, imageIndex) : str;
                }
            }
            else if (startTime.current !== 0 && (endTime - startTime.current) / 1000 > 2 * maxWaitTime) {
                startTime.current = 0;
            }
        }
        else if (startTime.current !== 0) {
            startTime.current = 0;
        }
        const tokens = marked.lexer(truncatedStr);
        const dirtyHTML = marked.parser(tokens, {
            renderer,
            extensions: {
                renderers: {
                    inlineKatex: token => renderKatex(token.text),
                    blockKatex: token => renderKatex(token.text, { displayMode: true })
                },
                childTokens: {}
            }
        });
        return sanitize(dirtyHTML, {
            ADD_ATTR: ['target', 'x-intercept-click'],
            USE_PROFILES: {
                html: true
            }
        });
    };
    return (_jsx("div", { ref: mdViewerRef, className: clsx(props.className
            ? props.className
            : 'md-viewer prose-base prose-pre:my-0 prose-pre:p-0 prose-headings:m-0 prose-hr:my-[1em] max-w-fit overflow-hidden', props.nouseProse ? '' : 'prose dark:prose-invert'), dangerouslySetInnerHTML: {
            __html: convertMarkdownToHTML(props.content, props.status)
        } }));
}
export default memo(MdViewer);
