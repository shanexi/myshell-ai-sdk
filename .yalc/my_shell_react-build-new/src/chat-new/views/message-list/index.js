import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ArrowDownIcon from '@heroicons/react/24/outline/ArrowDownIcon';
import clsx from 'clsx';
import { useContext, useEffect, useRef } from 'react';
import { useBoolean, useInterval, usePrevious } from 'react-use';
import { Virtuoso } from 'react-virtuoso';
import { MessageContext } from '../../../chat-new/context/MessageContext.js';
import { DisplayProvider } from '../../../chat-new/views/message-list/components/display-provider/index.js';
import Footer from '../../../chat-new/views/message-list/components/footer/index.js';
import Header from '../../../chat-new/views/message-list/components/header/index.js';
import MessageItem from '../../../chat-new/views/message-list/message-item/index.js';
import { IconButton } from '../../../common/components/ui/icon-button.js';
export default function MessageList() {
    const virtualRef = useRef(null);
    const { messageIdList, messageMap, hasMore, gettingHistory, getHistoryMessage, scrollToBottom } = useContext(MessageContext);
    const [atBottom, setAtBottom] = useBoolean(false);
    const [isScrolling, setIsScrolling] = useBoolean(false);
    const preMessageIdList = usePrevious(messageIdList);
    const scrollToIndex = (location, userTriggered = false) => {
        requestAnimationFrame(() => {
            virtualRef.current?.scrollToIndex({
                index: location?.index || 'LAST',
                align: location?.align || 'end',
                behavior: userTriggered ? 'smooth' : 'auto'
            });
        });
    };
    useEffect(() => {
        scrollToIndex();
    }, [scrollToBottom]);
    useInterval(() => {
        scrollToIndex();
    }, !isScrolling && atBottom ? 200 : null);
    const atTopStateChange = async (atTop) => {
        if (atTop && hasMore) {
            await getHistoryMessage();
        }
    };
    const atBottomStateChange = (value) => {
        if (preMessageIdList?.length !== messageIdList.length && atBottom) {
            scrollToIndex();
        }
        else {
            setAtBottom(value);
        }
    };
    return (_jsxs("div", { className: "h-full w-full relative", children: [_jsx(Virtuoso, { height: "100%", className: "h-full w-full overscroll-contain", ref: virtualRef, data: messageIdList, atTopStateChange: atTopStateChange, atBottomThreshold: 50, atBottomStateChange: atBottomStateChange, components: {
                    Header: () => _jsx(Header, { loading: gettingHistory }),
                    Footer
                }, isScrolling: setIsScrolling, itemContent: (index, id) => {
                    const message = messageMap.get(id);
                    if (message?.handled) {
                        return null;
                    }
                    return (_jsx("div", { className: clsx('flex flex-col items-center pb-4 md:pb-5', index === 0 && 'md:pt-[80px]'), children: _jsx(DisplayProvider, { message: message, children: _jsx(MessageItem, { source: message?.source, msgDisplayType: message?.msgDisplayType }) }) }, id));
                } }), _jsx("div", { className: "absolute w-full bottom-3 md:bottom-6 mx-auto flex justify-end transition-transform duration-1000 ease-in-out", children: atBottom ? null : (_jsx(IconButton, { size: "md", color: "default", icon: ArrowDownIcon, onClick: () => scrollToIndex(undefined, true) })) })] }));
}
