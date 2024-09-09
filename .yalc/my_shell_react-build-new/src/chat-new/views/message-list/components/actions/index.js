"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Actions;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const definitions_1 = require("../../../../../chat-new/model/definitions");
const display_provider_1 = require("../display-provider");
const TextException_1 = __importDefault(require("./TextException"));
const Translation_1 = __importDefault(require("./Translation"));
const copy_message_1 = __importDefault(require("./copy-message"));
const DeleteMessage_1 = __importDefault(require("./delete-message/views/DeleteMessage"));
const DownloadVoice_1 = __importDefault(require("./download-voice/views/DownloadVoice"));
const MessageFeedback_1 = __importDefault(require("./feedback/views/MessageFeedback"));
const share_1 = __importDefault(require("../../../../../chat-new/views/message-list/components/actions/share"));
function Actions({ source }) {
    const { actions } = (0, display_provider_1.useDisplayContext)();
    const Component = (0, react_1.useCallback)(({ action_type }) => {
        switch (action_type) {
            case definitions_1.MenuActionType.Copy_Message:
                return (0, jsx_runtime_1.jsx)(copy_message_1.default, { source: source });
            case definitions_1.MenuActionType.Delete:
                return (0, jsx_runtime_1.jsx)(DeleteMessage_1.default, { source: source });
            case definitions_1.MenuActionType.Download_Voice:
                return (0, jsx_runtime_1.jsx)(DownloadVoice_1.default, { source: source });
            case definitions_1.MenuActionType.Feedback:
                return (0, jsx_runtime_1.jsx)(MessageFeedback_1.default, { source: source });
            case definitions_1.MenuActionType.Show_Text:
                return (0, jsx_runtime_1.jsx)(TextException_1.default, { source: source });
            case definitions_1.MenuActionType.Translate:
                return (0, jsx_runtime_1.jsx)(Translation_1.default, { source: source });
            case definitions_1.MenuActionType.Share:
                return (0, jsx_runtime_1.jsx)(share_1.default, { source: source });
            default:
                console.error(`${action_type}类型的组件不存在`);
        }
    }, [source]);
    return actions.map(action_type => (0, jsx_runtime_1.jsx)(Component, { action_type: action_type }, action_type));
}
