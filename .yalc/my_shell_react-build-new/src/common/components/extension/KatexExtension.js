import katex from 'katex';
import 'katex/dist/katex.min.css';
export default function (options = {}) {
    return {
        extensions: [inlineKatex(options), blockKatex(options)]
    };
}
export const renderKatex = (text, options = {}) => {
    try {
        return katex.renderToString(text, {
            macros: {
                '\\RR': '\\mathbb{R}',
                '\\f': '#1f(#2)'
            },
            output: 'htmlAndMathml',
            leqno: false,
            fleqn: false,
            ...options
        });
    }
    catch (e) {
        console.log('render katex error: ', e);
        return text;
    }
};
function inlineKatex(options) {
    return {
        name: 'inlineKatex',
        level: 'inline',
        start(src) {
            return src.indexOf('$') || src.indexOf('\\[') || src.indexOf('\\(');
        },
        tokenizer(src, _tokens) {
            const match = src.match(/^\\\[+([^$\n]+?)\\\]+/) || src.match(/^\$+([^$\n]+?)\$+/) || src.match(/^\\\(+([^$\n]+?)\\\)+/);
            if (match) {
                return {
                    type: 'inlineKatex',
                    raw: match[0],
                    text: match[1].trim()
                };
            }
        },
        renderer(token) {
            return renderKatex(token.text, options);
        }
    };
}
function blockKatex(options) {
    return {
        name: 'blockKatex',
        level: 'block',
        start(src) {
            return src.indexOf('$$') || src.indexOf('\\[') || src.indexOf('\\(');
        },
        tokenizer(src, _tokens) {
            const match = src.match(/^\$\$+\n?([^$]+?)\n?\$\$/) ||
                src.match(/^\\\[+\n?([^$]+?)\n?\\\]/) ||
                src.match(/^\\\(+\n?([^$]+?)\n?\\\)/);
            if (match) {
                return {
                    type: 'blockKatex',
                    raw: match[0],
                    text: match[1].trim()
                };
            }
        },
        renderer(token) {
            options.displayMode = true;
            return renderKatex(token.text, options);
        }
    };
}
