"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Output;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowDownIcon"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = require("react");
const react_use_1 = require("react-use");
const react_virtuoso_1 = require("react-virtuoso");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const RoomItem_1 = __importDefault(require("../list/RoomItem.js"));
const Creating_1 = __importDefault(require("./Creating.js"));
const Greeting_1 = __importDefault(require("./Greeting.js"));
function RoomMessageRender({ room, creating, create }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [room.type === 'GREETING' && (0, jsx_runtime_1.jsx)(Greeting_1.default, { disabled: creating, onCreate: create }), room.type === 'ROOM' && ((0, jsx_runtime_1.jsx)(RoomItem_1.default, { id: room.roomInfo.channelId, name: room.roomInfo.channelName, invitationUrl: room.roomInfo.invitationUrl, invitationImgUrl: room.roomInfo.invitationImgUrl })), room.type === 'CREATING' && (0, jsx_runtime_1.jsx)(Creating_1.default, {})] }));
}
function Output({ creating, create, roomList }) {
    const roomMessageList = (0, react_1.useMemo)(() => {
        const greetingMessage = {
            id: 'greeting',
            type: 'GREETING'
        };
        const roomListMessageList = roomList.reduce((acc, room) => {
            const newEntries = {
                id: `room-${room.channelId}`,
                type: 'ROOM',
                roomInfo: room
            };
            return acc.concat(newEntries);
        }, []);
        const creatingMessage = {
            id: 'creating',
            type: 'CREATING'
        };
        return [greetingMessage, ...roomListMessageList, ...(creating ? [creatingMessage] : [])];
    }, [creating, roomList]);
    const virtualRef = (0, react_1.useRef)(null);
    const [atBottom, setAtBottom] = (0, react_use_1.useToggle)(false);
    const scrollToBottom = (userClick = false) => {
        requestAnimationFrame(() => {
            virtualRef.current?.scrollToIndex({
                index: 'LAST',
                align: 'end',
                behavior: userClick ? 'smooth' : 'auto'
            });
        });
    };
    (0, react_1.useEffect)(() => {
        scrollToBottom();
    }, [roomMessageList]);
    const atBottomStateChange = (value) => {
        setAtBottom(value);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_virtuoso_1.Virtuoso, { height: "100%", className: "w-full h-full no-scrollbar overscroll-contain", ref: virtualRef, data: roomMessageList, atBottomStateChange: atBottomStateChange, initialItemCount: roomMessageList.length, itemContent: (index, message) => ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('pb-4 md:pb-6', index === 0 && 'md:pt-[80px]'), children: (0, jsx_runtime_1.jsx)(RoomMessageRender, { room: message, creating: creating, create: create }, message.id) }, message.id)) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-3 md:bottom-6 right-3 md:right-6 mx-auto flex justify-end transition-transform duration-1000 ease-in-out", children: atBottom ? null : ((0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", color: "default", icon: ArrowDownIcon_1.default, onClick: () => scrollToBottom(true) })) })] }));
}
