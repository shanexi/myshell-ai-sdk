"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_mentions_1 = require("react-mentions");
const variable_provider_1 = require("../variable-provider/index.js");
const index_module_css_1 = __importDefault(require("./index.module.css"));
const lodash_es_1 = require("lodash-es");
function findVariable(scope, target) {
    const key = Object.keys(scope).find(key => target.indexOf(key) === 0);
    return key ? (0, lodash_es_1.uniqBy)(scope[key], 'variable') : undefined;
}
const mentionRegex = /@\[(.*?)\]\(variable:(.*?)\)/;
const wrapperRegex = /^\{\{(.*?)\}\}/;
const DEFAULT_LABEL = 'veriable undefined';
const ExpInput = props => {
    const { name, onChange, value, className, placeholder, singleLine } = props;
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const { scope = {} } = (0, variable_provider_1.useVariableContext)();
    const vars = findVariable(scope, name);
    const v2l = (value) => {
        return (vars?.reduce((prev, item) => {
            const { variable, name } = item;
            if (variable && prev) {
                prev = prev.replaceAll(variable, `@[${name || DEFAULT_LABEL}](variable:${variable})`);
            }
            return prev;
        }, value) || value);
    };
    const l2v = (label) => {
        const str = vars?.reduce((prev, item) => {
            const { variable, name } = item;
            if (variable && prev) {
                prev = prev.replaceAll(`@[${name || DEFAULT_LABEL}](variable:${variable})`, variable || '');
            }
            return prev;
        }, label) || label;
        return str;
    };
    const getWrappedText = (text) => {
        let currentIndex = 0;
        while (currentIndex < text.length) {
            const wrapperMatch = text.slice(currentIndex).match(wrapperRegex);
            if (wrapperMatch) {
                currentIndex += wrapperMatch[0].length;
            }
            else {
                const startIndex = currentIndex;
                currentIndex++;
                while (currentIndex < text.length && text[currentIndex] !== '{') {
                    currentIndex++;
                }
                const endIndex = currentIndex;
                const matchText = text.slice(startIndex, endIndex);
                const [curText] = matchText.match(mentionRegex) || [];
                if (curText) {
                    let firstPart = text.slice(0, startIndex);
                    let lastPart = text.slice(endIndex + 1);
                    let replaceChar = text.slice(startIndex, endIndex).replace(curText, `{{ ${curText} }}`);
                    text = firstPart + replaceChar + lastPart;
                }
            }
        }
        return text;
    };
    const onNewChange = (e, newValue) => {
        const text = getWrappedText(newValue);
        e.target.value = l2v(text);
        onChange?.(e);
    };
    const newValue = value ? v2l(value) : value;
    const mentions = vars?.reduce((memo, cur) => {
        if (cur.variable) {
            memo.push({
                id: cur.variable,
                display: cur.name || DEFAULT_LABEL
            });
        }
        return memo;
    }, []) || [];
    const source = (search, callback) => {
        if (!search) {
            callback(mentions);
        }
        else {
            callback(mentions.filter(item => item.display?.includes(search)));
        }
    };
    return ((0, jsx_runtime_1.jsx)(react_mentions_1.MentionsInput, { value: newValue, onChange: onNewChange, className: "mentions", classNames: index_module_css_1.default, allowSpaceInQuery: true, singleLine: singleLine, placeholder: placeholder || i18n('widget.exp_input_placeholder') || "Mention variable using '/'", a11ySuggestionsListLabel: 'Suggested mentions', customSuggestionsContainer: children => ((0, jsx_runtime_1.jsx)("div", { className: index_module_css_1.default.mentions__suggestions_container, children: children })), children: (0, jsx_runtime_1.jsx)(react_mentions_1.Mention, { markup: "@[__display__](variable:__id__)", trigger: '/', data: source, className: index_module_css_1.default.mentions__mention }) }));
};
exports.ExpInput = ExpInput;
