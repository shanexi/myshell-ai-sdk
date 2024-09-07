"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const HandThumbDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/HandThumbDownIcon"));
const HandThumbUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/HandThumbUpIcon"));
const HandThumbDownIcon_2 = __importDefault(require("@heroicons/react/24/solid/HandThumbDownIcon"));
const HandThumbUpIcon_2 = __importDefault(require("@heroicons/react/24/solid/HandThumbUpIcon"));
const react_2 = require("react");
const useActionSensors_1 = __importStar(require("../../../../chat/views/hooks/useActionSensors.js"));
const lodash_es_1 = require("lodash-es");
const MsgReportDialog_1 = require("./MsgReportDialog.js");
const useFeedback_1 = require("./useFeedback.js");
function MsgReport({ chat, updateMessage, type, handleClose, showMsgReport, isMobile }) {
    const { resetFeedbackState, handleReportMsg, reportT, sendFeedback, handleDislike, chatT, dialogRef, feedbackTxt, feedbackState, removeDislike } = (0, useFeedback_1.useFeedback)({
        chat,
        updateMessage,
        type
    });
    const { onSendActionSensors } = (0, useActionSensors_1.default)();
    (0, react_2.useEffect)(() => {
        if (type === 'image') {
            dialogRef.current.show();
        }
    }, [type]);
    const renderButtons = () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { className: "justify-center items-center p-1.5  w-8 h-8 rounded-lg border border-default hover:bg-surface-container-low bg-surface hidden xl:flex", onClick: () => {
                        onSendActionSensors(useActionSensors_1.ActionType.Like);
                        handleReportMsg(1);
                    }, children: (0, jsx_runtime_1.jsx)(HandThumbUpIcon_1.default, { className: "w-5 h-5 text-on-surface" }) }), (0, jsx_runtime_1.jsx)("button", { className: "justify-center items-center p-1.5  w-8 h-8 rounded-lg border border-default hover:bg-surface-container-low bg-surface hidden xl:flex", onClick: () => {
                        onSendActionSensors(useActionSensors_1.ActionType.Dislike);
                        handleReportMsg(2);
                    }, children: (0, jsx_runtime_1.jsx)(HandThumbDownIcon_1.default, { className: "w-5 h-5 text-on-surface" }) })] }));
    };
    if (type === 'image') {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showMsgReport && renderButtons(), (0, jsx_runtime_1.jsx)(MsgReportDialog_1.MsgReportDialog, { ref: dialogRef, onConfirm: val => {
                        sendFeedback(val);
                        onSendActionSensors(useActionSensors_1.ActionType.Feedback, {
                            feedback_detail: Object.keys((0, lodash_es_1.pickBy)(val.issues, value => value === true))
                        });
                    }, type: type, handleClose: handleClose })] }));
    }
    if (feedbackState == -1) {
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    }
    if (feedbackState > 0) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [feedbackState === 1 && ((0, jsx_runtime_1.jsx)("button", { className: "justify-center items-center p-1.5 w-8 h-8 rounded-lg border border-default hover:bg-on-surface-container-low bg-surface hidden xl:flex", onClick: () => {
                        resetFeedbackState();
                        onSendActionSensors(useActionSensors_1.ActionType.Remove_Like);
                    }, children: (0, jsx_runtime_1.jsx)(HandThumbUpIcon_2.default, { className: "w-5 h-5 text-primary" }) })), feedbackState === 2 && ((0, jsx_runtime_1.jsx)(MsgReportDialog_1.MsgReportDialog, { ref: dialogRef, onConfirm: val => {
                        sendFeedback(val);
                        onSendActionSensors(useActionSensors_1.ActionType.Feedback, {
                            feedback_detail: Object.keys((0, lodash_es_1.pickBy)(val.issues, value => value === true))
                        });
                    }, removeDislike: () => {
                        removeDislike();
                        onSendActionSensors(useActionSensors_1.ActionType.Remove_Dislike);
                    }, children: (0, jsx_runtime_1.jsxs)("button", { className: "justify-center items-center p-1.5 h-8 rounded-lg border border-default hover:bg-surface-container-low bg-surface hidden xl:flex", onClick: () => {
                            onSendActionSensors(useActionSensors_1.ActionType.Remove_Dislike);
                            handleDislike();
                        }, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-fit", children: (0, jsx_runtime_1.jsx)(HandThumbDownIcon_2.default, { className: "w-5 h-5 text-[#EC2F0D]" }) }), (0, jsx_runtime_1.jsx)(react_1.Text, { ml: "8px", fontSize: "14px", lineHeight: "24px", fontWeight: "400", color: "#EC2F0D", className: "truncate", children: feedbackTxt ? feedbackTxt.slice(0, 8) : `${chatT('feedback')}` })] }) }))] }));
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: renderButtons() });
}
exports.default = MsgReport;
