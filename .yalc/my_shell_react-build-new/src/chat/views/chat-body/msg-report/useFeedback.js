"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeedback = void 0;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const common_1 = require("../../../../apis/common.js");
const api_1 = require("../../../../chat/model/api.js");
const common_2 = require("../../../../common/constants/interfaces/common.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const displayTxtMap = {
    Boring: 'boring',
    'Out of Character': 'out_of_character',
    Inaccurate: 'inaccurate',
    Offensive: 'offensive',
    Repetitive: 'repetitive',
    'Incorrect Voice Generation': 'incorrect_voice_generation',
    'Long Waiting Time': 'long_waiting_time',
    'Incorrect Translation': 'incorrect_translation',
    Others: 'others'
};
const useFeedback = ({ chat, updateMessage, type }) => {
    const reportT = (0, next_intl_1.useTranslations)('report');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const { success } = (0, useNotification_1.useNotification)();
    const getFeedbackTxt = () => {
        return ((chat.feedbackIssues || [])
            .map(e => (displayTxtMap[e] ? reportT(displayTxtMap[e]) : e))
            ?.join(', ') ?? '');
    };
    const [feedbackTxt, setFeedbackTxt] = (0, react_1.useState)(getFeedbackTxt());
    const feedbackState = chat.feedbackState || 0;
    const handleReportMsg = async (state) => {
        updateMessage({
            ...chat,
            feedbackState: state
        });
        const res = await (0, api_1.reportMsgV1)({
            action: state,
            messageId: String(chat.id)
        });
        if (!res.success) {
            updateMessage({
                ...chat,
                feedbackState: 0
            });
        }
    };
    const handleDislike = () => {
        if (feedbackTxt) {
            resetFeedbackState();
            setFeedbackTxt('');
            return;
        }
        showDialog();
    };
    const removeDislike = () => {
        resetFeedbackState();
        setFeedbackTxt('');
    };
    const dialogRef = (0, react_1.useRef)(null);
    const showDialog = () => {
        dialogRef.current.show();
    };
    const resetFeedbackState = async () => {
        const prevState = feedbackState;
        updateMessage({
            ...chat,
            feedbackState: 0,
            feedbackIssues: []
        });
        const res = await (0, api_1.reportMsgV1)({
            action: 3,
            messageId: String(chat.id)
        });
        if (!res.success) {
            updateMessage({
                ...chat,
                feedbackState: prevState,
                feedbackIssues: []
            });
        }
    };
    const sendFeedback = async ({ issues, othersDetail }) => {
        const filteredIssues = Object.keys(issues).filter(key => issues[key]);
        const isImage = type === 'image';
        const params = {
            issueType: isImage ? common_2.ReportIssueType.IMAGE_GEN_FEEDBACK : common_2.ReportIssueType.MSG_FEEDBACK,
            entityId: String(chat.id),
            content: JSON.stringify({
                issues: filteredIssues,
                othersContent: othersDetail
            })
        };
        if (!isImage) {
            const translatedIssues = filteredIssues?.map(e => reportT(displayTxtMap[e]))?.join(', ') ?? '';
            setFeedbackTxt(othersDetail ? [translatedIssues, reportT('others')].filter(Boolean).join(', ') : translatedIssues);
        }
        const res = await (0, common_1.reportIssueV1)(params);
        if (res.success) {
            if (!isImage) {
                updateMessage({
                    ...chat,
                    feedbackIssues: othersDetail ? [...filteredIssues, 'Others'] : filteredIssues
                });
            }
            success({
                content: reportT('feedback_tips')
            });
        }
        else {
            setFeedbackTxt('');
        }
    };
    return {
        handleDislike,
        resetFeedbackState,
        handleReportMsg,
        sendFeedback,
        chatT,
        reportT,
        feedbackTxt,
        dialogRef,
        feedbackState,
        removeDislike
    };
};
exports.useFeedback = useFeedback;
