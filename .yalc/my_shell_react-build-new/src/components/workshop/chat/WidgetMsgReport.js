"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetMsgReport;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const HandThumbDownIcon_1 = __importDefault(require("@heroicons/react/24/solid/HandThumbDownIcon"));
const HandThumbUpIcon_1 = __importDefault(require("@heroicons/react/24/solid/HandThumbUpIcon"));
const react_2 = require("react");
const MsgReportDialog_1 = require("../../../chat/views/chat-body/msg-report/MsgReportDialog.js");
const useWidgetFeedback_1 = require("../../../hooks/workshop/chat/useWidgetFeedback.js");
function WidgetMsgReport({ chat, updateMessage, type, handleClose, showMsgReport, isMobile }) {
    const { resetFeedbackState, handleReportMsg, reportT, sendFeedback, handleDislike, chatT, dialogRef, feedbackTxt, feedbackState, removeDislike } = (0, useWidgetFeedback_1.useWidgetFeedback)({
        chat,
        updateWidgetMessage: updateMessage,
        type
    });
    (0, react_2.useEffect)(() => {
        if (type === 'image') {
            dialogRef.current.show();
        }
    }, [type]);
    const renderButtons = () => {
        return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {}));
    };
    if (type === 'image') {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showMsgReport && renderButtons(), (0, jsx_runtime_1.jsx)(MsgReportDialog_1.MsgReportDialog, { ref: dialogRef, onConfirm: val => sendFeedback(val), type: type, handleClose: handleClose })] }));
    }
    if (feedbackState == -1) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
    if (feedbackState > 0) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [feedbackState === 1 && ((0, jsx_runtime_1.jsx)("button", { className: "justify-center items-center p-1.5 w-8 h-8 rounded-lg border border-default hover:bg-on-surface-container-low bg-surface hidden xl:flex", onClick: () => resetFeedbackState(), children: (0, jsx_runtime_1.jsx)(HandThumbUpIcon_1.default, { className: "w-5 h-5 text-primary" }) })), feedbackState === 2 && ((0, jsx_runtime_1.jsx)(MsgReportDialog_1.MsgReportDialog, { ref: dialogRef, onConfirm: val => sendFeedback(val), removeDislike: removeDislike, children: (0, jsx_runtime_1.jsxs)("button", { className: "justify-center items-center p-1.5 h-8 rounded-lg border border-default hover:bg-surface-container-low bg-surface hidden xl:flex", onClick: () => handleDislike(), children: [(0, jsx_runtime_1.jsx)("div", { className: "w-fit", children: (0, jsx_runtime_1.jsx)(HandThumbDownIcon_1.default, { className: "w-5 h-5 text-[#EC2F0D]" }) }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "14px", lineHeight: "24px", fontWeight: "400", color: "#EC2F0D", className: "truncate", children: feedbackTxt ? feedbackTxt.slice(0, 8) : `${chatT('feedback')}` })] }) }))] }));
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderButtons() });
}
