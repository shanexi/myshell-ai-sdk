"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageList;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/ArrowDownIcon"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const react_virtuoso_1 = require("react-virtuoso");
const MessageContext_1 = require("../../../chat-new/context/MessageContext");
const display_provider_1 = require("../../../chat-new/views/message-list/components/display-provider");
const footer_1 = __importDefault(require("../../../chat-new/views/message-list/components/footer"));
const header_1 = __importDefault(require("../../../chat-new/views/message-list/components/header"));
const message_item_1 = __importDefault(require("../../../chat-new/views/message-list/message-item"));
const icon_button_1 = require("../../../common/components/ui/icon-button");
function MessageList() {
    const virtualRef = (0, react_1.useRef)(null);
    const { messageIdList, messageMap, hasMore, gettingHistory, getHistoryMessage, scrollToBottom } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const [atBottom, setAtBottom] = (0, react_use_1.useBoolean)(false);
    const [isScrolling, setIsScrolling] = (0, react_use_1.useBoolean)(false);
    const preMessageIdList = (0, react_use_1.usePrevious)(messageIdList);
    const scrollToIndex = (location, userTriggered = false) => {
        requestAnimationFrame(() => {
            virtualRef.current?.scrollToIndex({
                index: location?.index || 'LAST',
                align: location?.align || 'end',
                behavior: userTriggered ? 'smooth' : 'auto'
            });
        });
    };
    (0, react_1.useEffect)(() => {
        scrollToIndex();
    }, [scrollToBottom]);
    (0, react_use_1.useInterval)(() => {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full w-full relative", children: [(0, jsx_runtime_1.jsx)(react_virtuoso_1.Virtuoso, { height: "100%", className: "h-full w-full overscroll-contain", ref: virtualRef, data: messageIdList, atTopStateChange: atTopStateChange, atBottomThreshold: 50, atBottomStateChange: atBottomStateChange, components: {
                    Header: () => (0, jsx_runtime_1.jsx)(header_1.default, { loading: gettingHistory }),
                    Footer: footer_1.default
                }, isScrolling: setIsScrolling, itemContent: (index, id) => {
                    const message = messageMap.get(id);
                    if (message?.handled) {
                        return null;
                    }
                    return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('flex flex-col items-center pb-4 md:pb-5', index === 0 && 'md:pt-[80px]'), children: (0, jsx_runtime_1.jsx)(display_provider_1.DisplayProvider, { message: message, children: (0, jsx_runtime_1.jsx)(message_item_1.default, { source: message?.source, msgDisplayType: message?.msgDisplayType }) }) }, id));
                } }), (0, jsx_runtime_1.jsx)("div", { className: "absolute w-full bottom-3 md:bottom-6 mx-auto flex justify-end transition-transform duration-1000 ease-in-out", children: atBottom ? null : ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", color: "default", icon: ArrowDownIcon_1.default, onClick: () => scrollToIndex(undefined, true) })) })] }));
}
