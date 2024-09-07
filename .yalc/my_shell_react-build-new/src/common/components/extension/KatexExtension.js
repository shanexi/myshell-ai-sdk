"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderKatex = void 0;
exports.default = default_1;
const katex_1 = __importDefault(require("katex"));
require("katex/dist/katex.min.css");
function default_1(options = {}) {
    return {
        extensions: [inlineKatex(options), blockKatex(options)]
    };
}
const renderKatex = (text, options = {}) => {
    try {
        return katex_1.default.renderToString(text, {
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
exports.renderKatex = renderKatex;
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
            return (0, exports.renderKatex)(token.text, options);
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
            return (0, exports.renderKatex)(token.text, options);
        }
    };
}
