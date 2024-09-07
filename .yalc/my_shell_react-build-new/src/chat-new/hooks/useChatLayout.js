"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useChatLayout;
const react_1 = require("react");
const react_use_1 = require("react-use");
function useChatLayout() {
    const scrollContainerRef = (0, react_1.useRef)(null);
    const editorContainerRef = (0, react_1.useRef)(null);
    const editorAnchorRef = (0, react_1.useRef)(null);
    const textareaRef = (0, react_1.useRef)(null);
    const chatContainerRef = (0, react_1.useRef)(null);
    const detailContainerRef = (0, react_1.useRef)(null);
    const detailScrollRef = (0, react_1.useRef)(null);
    const { y: detailScrollY } = (0, react_use_1.useScroll)(detailScrollRef);
    const [isEditorSticky, setIsEditorSticky] = (0, react_use_1.useToggle)(false);
    const [contentActive, setContentActive] = (0, react_use_1.useToggle)(true);
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
    const showMobileDetail = (0, react_1.useCallback)(() => {
        setContentActive(false);
    }, [setContentActive]);
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
                    if (shouldSticky !== isEditorSticky) {
                        setIsEditorSticky(shouldSticky);
                        if (shouldSticky) {
                            const editorHeight = editorContainerRef.current.offsetHeight;
                            editorAnchorRef.current.style.height = `${editorHeight}px`;
                            editorContainerRef.current.style.position = 'absolute';
                            editorContainerRef.current.style.borderBottom = '1px solid var(--border)';
                            editorContainerRef.current.style.boxShadow = '0px 20px 20px -10px var(--shadow-modal-bolder)';
                            textareaRef.current?.blur();
                        }
                        else {
                            editorAnchorRef.current.style.height = 'auto';
                            editorContainerRef.current.style.position = 'static';
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
    }, [isEditorSticky]);
    return {
        scrollContainerRef,
        editorContainerRef,
        editorAnchorRef,
        textareaRef,
        chatContainerRef,
        detailContainerRef,
        detailScrollRef,
        scrollLayoutToTop,
        manuallyScrollDetailToTop,
        isEditorSticky,
        contentActive,
        setContentActive,
        detailScrollY,
        showMobileDetail
    };
}
