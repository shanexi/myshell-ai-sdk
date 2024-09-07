"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minMsgHeight = exports.CHAT_PAGE_SIZE = void 0;
exports.useScrollToBottomWidget = useScrollToBottomWidget;
const lodash_es_1 = require("lodash-es");
const react_1 = require("react");
exports.CHAT_PAGE_SIZE = 20;
exports.minMsgHeight = 80;
function useScrollToBottomWidget({ getHistory, chatList, chatListRef }) {
    const [hitBottom, setHitBottom] = (0, react_1.useState)(true);
    const scrollRef = (0, react_1.useRef)(null);
    const canScrollRef = (0, react_1.useRef)(false);
    const [autoScroll, setAutoScroll] = (0, react_1.useState)(true);
    const messageBoxRef = (0, react_1.useRef)(null);
    const lastIdRef = (0, react_1.useRef)('-1');
    const autoScrollRef = (0, react_1.useRef)(autoScroll);
    const offsetRef = (0, react_1.useRef)(false);
    const bottomSentryRef = (0, react_1.useRef)(null);
    const topSentryRef = (0, react_1.useRef)(null);
    const hasMoreRef = (0, react_1.useRef)(false);
    const lastScrollHeightRef = (0, react_1.useRef)(0);
    const lastScrollTopRef = (0, react_1.useRef)(0);
    const scrollFlagRef = (0, react_1.useRef)(0);
    const prevScrollFlagRef = (0, react_1.useRef)(0);
    const [disToBottom, setDisToBottom] = (0, react_1.useState)(0);
    (0, react_1.useMemo)(() => {
        autoScrollRef.current = autoScroll;
    }, [autoScroll]);
    const getFirstRenderMessagesSize = (0, react_1.useCallback)(() => {
        const containerEl = scrollRef.current;
        let size = exports.CHAT_PAGE_SIZE;
        if (containerEl) {
            const containerHeight = containerEl.clientHeight;
            const canRenderMsgLength = Math.ceil(containerHeight / exports.minMsgHeight);
            size = canRenderMsgLength + exports.CHAT_PAGE_SIZE;
        }
        return Math.max(size, exports.CHAT_PAGE_SIZE);
    }, []);
    const scrollToBottom = (0, react_1.useCallback)((0, lodash_es_1.throttle)((flag) => {
        const scrollEl = scrollRef.current;
        if (flag && !autoScrollRef.current) {
            return;
        }
        if (scrollEl) {
            const callback = () => {
                scrollEl.scrollTo(0, scrollEl.scrollHeight);
            };
            requestAnimationFrame(callback);
        }
    }, 50), []);
    const scrollToElement = (0, react_1.useCallback)((0, lodash_es_1.throttle)(className => {
        const scrollEl = scrollRef.current;
        const chatEl = document.querySelector(className);
        if (scrollEl && chatEl) {
            requestAnimationFrame(() => scrollEl.scrollTo(0, scrollEl.scrollHeight - chatEl.scrollHeight - 50));
        }
    }, 50), []);
    (0, react_1.useEffect)(() => {
        const scrollEl = scrollRef.current;
        const msEl = messageBoxRef.current;
        if (scrollEl) {
            if (scrollEl.scrollHeight > scrollEl.clientHeight) {
                canScrollRef.current = true;
            }
            else {
                canScrollRef.current = false;
            }
        }
        if (chatList.length > 1 && autoScroll) {
            const lastChat = chatList[chatList.length - 1];
            if (lastIdRef.current !== lastChat.id && lastChat?.type === 'GREETING') {
                scrollToElement(`.chatId-${lastChat.id}`);
                lastIdRef.current = lastChat.id;
            }
        }
    }, [autoScroll, chatList.length]);
    (0, react_1.useEffect)(() => {
        if (autoScroll) {
            scrollToBottom(true);
        }
    }, [autoScroll]);
    (0, react_1.useEffect)(() => {
        const top = (scrollRef?.current?.clientHeight ?? 1000) * 1.5;
        const options = {
            rootMargin: `${top}px 0px 0px 0px`,
            root: scrollRef.current
        };
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasMoreRef.current && !chatListRef.current.loading) {
                chatListRef.current.loading = true;
                getHistory(exports.CHAT_PAGE_SIZE, false);
            }
        }, options);
        const topElement = topSentryRef.current;
        if (topElement) {
            intersectionObserver.observe(topElement);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        const scrollEl = scrollRef.current;
        if (scrollEl && chatList.length > 0 && lastScrollHeightRef.current !== scrollEl.scrollHeight) {
            const newMessagesHeight = scrollEl.scrollHeight - lastScrollHeightRef.current;
            scrollEl.scrollTop = lastScrollTopRef.current + newMessagesHeight;
            lastScrollHeightRef.current = scrollEl.scrollHeight;
        }
    }, [chatList.length]);
    (0, react_1.useEffect)(() => {
        const intersectionObserver = new IntersectionObserver(([entry]) => {
            const { boundingClientRect, rootBounds } = entry;
            if (autoScrollRef.current) {
                const scrollEl = scrollRef.current;
                if (scrollEl) {
                    requestAnimationFrame(() => {
                        const scrollEl = scrollRef.current;
                        if (scrollEl) {
                            scrollEl.scrollTo(0, scrollEl.scrollHeight);
                        }
                    });
                }
            }
        }, { root: scrollRef.current, rootMargin: '0px 0px 0px 0px' });
        const bottomElement = bottomSentryRef.current;
        if (bottomElement) {
            intersectionObserver.observe(bottomElement);
        }
    }, []);
    const onChatBodyScroll = (e) => {
        if (scrollRef?.current) {
            lastScrollTopRef.current = scrollRef?.current?.scrollTop;
            const isTouchBottom = e.scrollTop + e.clientHeight >= e.scrollHeight - 10;
            const disToBottom = e.scrollHeight - (e.scrollTop + e.clientHeight);
            setDisToBottom(disToBottom);
            setHitBottom(isTouchBottom);
        }
    };
    return {
        hitBottom,
        onChatBodyScroll,
        messageBoxRef,
        scrollRef,
        canScrollRef,
        hasMoreRef,
        scrollToBottom,
        autoScroll,
        setAutoScroll,
        autoScrollRef,
        scrollFlagRef,
        prevScrollFlagRef,
        bottomSentryRef,
        topSentryRef,
        getFirstRenderMessagesSize,
        disToBottom
    };
}
