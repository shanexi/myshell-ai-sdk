"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MobileChatEntityDetailLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowUpIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const button_1 = require("../../common/components/ui/button.js");
const useDetectKeyboardOpen_1 = require("../../common/hooks/useDetectKeyboardOpen.js");
const context_1 = __importDefault(require("./context.js"));
function MobileChatEntityDetailLayout({ mobileTopActions, chat, entityDetail, showInnerMobileActions = false }) {
    const t = (0, next_intl_1.useTranslations)('bot');
    const scrollContainerRef = (0, react_1.useRef)(null);
    const editorContainerRef = (0, react_1.useRef)(null);
    const editorAnchorRef = (0, react_1.useRef)(null);
    const textareaRef = (0, react_1.useRef)(null);
    const contentRef = (0, react_1.useRef)(null);
    const detailRef = (0, react_1.useRef)(null);
    const detailScrollRef = (0, react_1.useRef)(null);
    const { y: detailScrollY } = (0, react_use_1.useScroll)(detailScrollRef);
    const [contentActive, setContentActive] = (0, react_use_1.useToggle)(true);
    const showMobileDetail = (0, react_1.useCallback)(() => {
        setContentActive(false);
    }, []);
    const isKeyboardOpen = (0, useDetectKeyboardOpen_1.useDetectKeyboardOpen)({});
    const contextParams = (0, react_1.useMemo)(() => {
        return {
            editorAnchorRef,
            editorContainerRef,
            textareaRef,
            showMobileDetail
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (isKeyboardOpen) {
            if (editorContainerRef.current) {
                editorContainerRef.current.style.borderRadius = 'unset';
            }
        }
        else {
            scrollContainerRef.current?.scrollTo({
                top: 0,
                behavior: 'instant'
            });
            if (editorContainerRef.current) {
                editorContainerRef.current.style.boxShadow = 'none';
                editorContainerRef.current.style.borderRadius = 'inherit';
            }
        }
    }, [isKeyboardOpen]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full relative flex flex-col bg-surface-container-default", children: [mobileTopActions && (!showInnerMobileActions || (showInnerMobileActions && !contentActive)) && ((0, jsx_runtime_1.jsx)("div", { className: "shrink-0 bg-surface-default", children: mobileTopActions })), (0, jsx_runtime_1.jsx)("div", { className: "grow overflow-hidden", children: (0, jsx_runtime_1.jsxs)(context_1.default.Provider, { value: contextParams, children: [(0, jsx_runtime_1.jsx)("div", { ref: contentRef, className: (0, clsx_1.default)('h-full w-full transition-transform duration-500 ease-in-out', !contentActive && '-translate-y-full'), children: chat }), (0, jsx_runtime_1.jsxs)("div", { ref: detailRef, className: (0, clsx_1.default)('h-full w-full overflow-hidden transition-transform duration-500 ease-in-out transform bg-surface-default relative', contentActive ? 'translate-y-0' : '-translate-y-full', isKeyboardOpen && 'hidden'), children: [(0, jsx_runtime_1.jsx)("div", { ref: detailScrollRef, className: "w-full h-full p-4 overflow-auto", children: entityDetail }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", color: "brand", className: (0, clsx_1.default)('absolute left-1/2 -translate-x-1/2 bottom-32 px-6 bg-surface-search-field shadow-modal border-none transition-all duration-300', detailScrollY > 0 && 'w-11 h-11 px-0'), onClick: setContentActive, children: (0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center space-x-[6px]", children: [(0, jsx_runtime_1.jsx)(ArrowUpIcon_1.default, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)(detailScrollY > 0 && 'hidden'), children: t('back_to_chat') })] }) })] })] }) })] }));
}
