"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MessageItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const alert_message_1 = __importDefault(require("../../../../chat-new/views/message-list/message-item/alert-message/index.js"));
const mine_message_1 = __importDefault(require("../../../../chat-new/views/message-list/message-item/mine-message/index.js"));
const reply_message_1 = __importDefault(require("../../../../chat-new/views/message-list/message-item/reply-message/index.js"));
function MessageItem({ msgDisplayType, source }) {
    return (0, react_1.useMemo)(() => {
        switch (msgDisplayType) {
            case 'NORMAL':
                if (source === 'USER') {
                    return (0, jsx_runtime_1.jsx)(mine_message_1.default, {});
                }
                return (0, jsx_runtime_1.jsx)(reply_message_1.default, {});
            case 'INFO':
            case 'NOTIFICATION':
            default:
                return (0, jsx_runtime_1.jsx)(alert_message_1.default, {});
        }
    }, [msgDisplayType, source]);
}
