"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatEntityDetailLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_use_1 = require("react-use");
const context_1 = __importDefault(require("./context.js"));
function ChatEntityDetailLayout({ chat, entityDetail }) {
    const scrollContainerRef = (0, react_1.useRef)(null);
    const editorContainerRef = (0, react_1.useRef)(null);
    const editorAnchorRef = (0, react_1.useRef)(null);
    const textareaRef = (0, react_1.useRef)(null);
    const scrollLayoutToTop = (0, react_1.useCallback)(() => {
        if (!scrollContainerRef.current)
            return;
        scrollContainerRef.current.scrollTop = 0;
    }, []);
    const manuallyScrollDetailToTop = (0, react_1.useCallback)(() => {
        if (!editorContainerRef.current || !scrollContainerRef.current)
            return;
        const editorRect = editorContainerRef.current.getBoundingClientRect();
        const scrollContainerRect = scrollContainerRef.current.getBoundingClientRect();
        const relativeTop = editorRect.top - scrollContainerRect.top;
        scrollContainerRef.current.scrollTop = Math.ceil(scrollContainerRef.current.scrollTop + relativeTop);
    }, [editorContainerRef, scrollContainerRef]);
    const [isSticky, setSticky] = (0, react_use_1.useToggle)(false);
    const contextParams = (0, react_1.useMemo)(() => {
        return {
            isSticky,
            editorAnchorRef,
            editorContainerRef,
            textareaRef,
            scrollLayoutToTop,
            manuallyScrollDetailToTop
        };
    }, [isSticky, scrollLayoutToTop, manuallyScrollDetailToTop]);
    (0, react_1.useEffect)(() => {
        let animationFrameId;
        const scrollContainerEle = scrollContainerRef.current;
        const handleScroll = () => {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                if (scrollContainerEle && editorContainerRef.current && editorAnchorRef.current) {
                    const scrollContainerRect = scrollContainerEle.getBoundingClientRect();
                    const anchorRect = editorAnchorRef.current.getBoundingClientRect();
                    const topDistance = anchorRect.top - scrollContainerRect.top;
                    const shouldSticky = topDistance <= 0;
                    if (shouldSticky !== isSticky) {
                        setSticky(shouldSticky);
                        if (shouldSticky) {
                            const editorHeight = editorContainerRef.current.offsetHeight;
                            editorAnchorRef.current.style.height = `${editorHeight}px`;
                            editorContainerRef.current.style.position = 'absolute';
                            editorContainerRef.current.style.borderTopColor = 'transparent';
                            editorContainerRef.current.style.borderBottom = '1px solid var(--border)';
                            editorContainerRef.current.style.boxShadow = '0px 20px 20px -10px var(--shadow-modal-bolder)';
                            textareaRef.current?.blur();
                        }
                        else {
                            editorAnchorRef.current.style.height = 'auto';
                            editorContainerRef.current.style.position = 'static';
                            editorContainerRef.current.style.borderTopColor = 'inherit';
                            editorContainerRef.current.style.borderBottom = 'none';
                            editorContainerRef.current.style.boxShadow = 'none';
                        }
                    }
                }
            });
        };
        if (scrollContainerEle) {
            scrollContainerEle.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollContainerEle) {
                scrollContainerEle.removeEventListener('scroll', handleScroll);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, [isSticky]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full overflow-hidden relative", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full overflow-auto bg-surface-container-default no-scrollbar scroll-smooth", ref: scrollContainerRef, children: (0, jsx_runtime_1.jsxs)(context_1.default.Provider, { value: contextParams, children: [chat, (0, jsx_runtime_1.jsx)("div", { className: "mt-2 min-h-full bg-surface-default p-6 rounded-3xl", children: entityDetail })] }) }) }));
}
