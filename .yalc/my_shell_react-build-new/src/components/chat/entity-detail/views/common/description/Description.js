"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Description;
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const lodash_es_1 = require("lodash-es");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const typography_1 = require("../../../../../../common/components/ui/typography.js");
function trimNewlines(str) {
    return str.replace(/^\n+|\n+$/g, '');
}
function Description({ showMore = true, desc = '' }) {
    const trimmedDesc = trimNewlines(desc);
    const t = (0, next_intl_1.useTranslations)('common');
    const [show, setShow] = (0, react_use_1.useToggle)(false);
    const textRef = (0, react_1.useRef)(null);
    const [hasMore, setHasMore] = (0, react_1.useState)(false);
    const isMd = (0, react_use_1.useMedia)('(min-width: 768px)');
    (0, react_1.useEffect)(() => {
        const handleCalcActualSize = () => {
            setShow(false);
            if (textRef.current) {
                const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
                const maxHeight = isMd ? lineHeight * 2 : lineHeight * 3;
                setHasMore(textRef.current.scrollHeight > maxHeight);
            }
        };
        handleCalcActualSize();
        window.addEventListener('resize', (0, lodash_es_1.throttle)(handleCalcActualSize, 500));
        return () => {
            window.removeEventListener('resize', handleCalcActualSize);
        };
    }, [isMd, trimmedDesc]);
    const handleToggle = () => setShow(!show);
    if (!trimmedDesc)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "text-sm flex flex-col w-full whitespace-pre-line", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("p", { ref: textRef, className: (0, clsx_1.default)('text-subtler leading-[1.5]', hasMore && !show && 'line-clamp-3 md:line-clamp-2'), style: {
                        maxHeight: show ? 'none' : isMd ? '3rem' : '4.5rem'
                    }, children: trimmedDesc }), hasMore && showMore && ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "px-0.5 text-surface-primary-default cursor-pointer", weight: "medium", size: "sm", onClick: handleToggle, children: t(show ? 'show_less' : 'show_more') }))] }) }));
}
