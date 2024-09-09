"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Content;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const definitions_1 = require("../../../../../chat-new/model/definitions.js");
const default_display_1 = __importDefault(require("../../../../../chat-new/views/message-list/components/content/default-display.js"));
const LoadingIcon_1 = __importDefault(require("../../../../../common/components/icons/LoadingIcon.js"));
const context_menu_1 = require("../context-menu/index.js");
const async_job_display_1 = __importDefault(require("./async-job-display/async-job-display.js"));
function Content({ message, showText = true, showAudio = false }) {
    const Display = (0, react_1.useMemo)(() => {
        switch (message.type) {
            case 'PENDING_FOR_RESPONSE':
                return LoadingIcon_1.default;
            default:
                if (message.type !== 'GREETING' &&
                    ((message.asyncJobInfo &&
                        message.asyncJobInfo.jobId &&
                        message.asyncJobInfo.status !== definitions_1.EmbedObjStatus.UNKNOWN) ||
                        message.imageGenMessageResponse?.jobId)) {
                    return async_job_display_1.default;
                }
                return default_display_1.default;
        }
    }, [message.asyncJobInfo, message.imageGenMessageResponse?.jobId, message.type]);
    return ((0, jsx_runtime_1.jsx)(context_menu_1.ContextMenuProvider, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex gap-3 flex-col", children: (0, jsx_runtime_1.jsx)(Display, { message: message, showText: showText, showAudio: showAudio }) }) }));
}
