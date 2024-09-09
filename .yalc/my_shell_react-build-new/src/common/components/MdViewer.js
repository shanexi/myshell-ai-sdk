"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@/styles/md-viewer.scss");
const clsx_1 = __importDefault(require("clsx"));
const dompurify_1 = __importDefault(require("dompurify"));
const highlight_js_1 = __importDefault(require("highlight.js"));
const isomorphic_dompurify_1 = require("isomorphic-dompurify");
const marked_1 = require("marked");
const marked_gfm_heading_id_1 = require("marked-gfm-heading-id");
const marked_mangle_1 = require("marked-mangle");
const marked_smartypants_1 = require("marked-smartypants");
const marked_xhtml_1 = require("marked-xhtml");
const mermaid_1 = __importDefault(require("mermaid"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const KatexExtension_1 = __importStar(require("../../common/components/extension/KatexExtension"));
const useHljsCss_1 = require("../../common/hooks/useHljsCss");
const useNotification_1 = require("../../common/hooks/useNotification");
marked_1.marked.use({
    pedantic: false,
    gfm: true,
    breaks: true
});
mermaid_1.default.initialize({
    theme: 'neutral'
});
marked_1.marked.use((0, marked_mangle_1.mangle)());
marked_1.marked.use((0, marked_xhtml_1.markedXhtml)());
marked_1.marked.use((0, marked_smartypants_1.markedSmartypants)());
marked_1.marked.use((0, marked_gfm_heading_id_1.gfmHeadingId)({
    prefix: 'shell-'
}));
marked_1.marked.use((0, KatexExtension_1.default)({
    throwOnError: false
}));
dompurify_1.default?.addHook?.('uponSanitizeElement', (node, data) => {
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
    (0, useHljsCss_1.useHljsCss)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const t = (0, next_intl_1.useTranslations)('chat');
    const { success, error: notificationError } = (0, useNotification_1.useNotification)();
    const mdViewerRef = (0, react_1.useRef)(null);
    const startTime = (0, react_1.useRef)(0);
    const renderer = (0, react_1.useMemo)(() => {
        const renderer = new marked_1.marked.Renderer();
        renderer.blockquote = quote => {
            return `<blockquote>${quote}</blockquote>`;
        };
        renderer.code = (code, language) => {
            try {
                if (language === 'mermaid') {
                    const svgId = `mermaid-svg-${Date.now()}`;
                    const svgBox = `mermaid-box-${Date.now()}`;
                    mermaid_1.default.render(svgId, code, svg => {
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
            const validLanguage = highlight_js_1.default.getLanguage(language) ? language : 'plaintext';
            const highlightedCode = language?.toLowerCase() === 'json' && code?.length > 2000
                ? code
                : highlight_js_1.default.highlight(validLanguage, code).value;
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
            return (0, isomorphic_dompurify_1.sanitize)(html, {
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
    (0, react_1.useEffect)(() => {
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
        const tokens = marked_1.marked.lexer(truncatedStr);
        const dirtyHTML = marked_1.marked.parser(tokens, {
            renderer,
            extensions: {
                renderers: {
                    inlineKatex: token => (0, KatexExtension_1.renderKatex)(token.text),
                    blockKatex: token => (0, KatexExtension_1.renderKatex)(token.text, { displayMode: true })
                },
                childTokens: {}
            }
        });
        return (0, isomorphic_dompurify_1.sanitize)(dirtyHTML, {
            ADD_ATTR: ['target', 'x-intercept-click'],
            USE_PROFILES: {
                html: true
            }
        });
    };
    return ((0, jsx_runtime_1.jsx)("div", { ref: mdViewerRef, className: (0, clsx_1.default)(props.className
            ? props.className
            : 'md-viewer prose-base prose-pre:my-0 prose-pre:p-0 prose-headings:m-0 prose-hr:my-[1em] max-w-fit overflow-hidden', props.nouseProse ? '' : 'prose dark:prose-invert'), dangerouslySetInnerHTML: {
            __html: convertMarkdownToHTML(props.content, props.status)
        } }));
}
exports.default = (0, react_1.memo)(MdViewer);
