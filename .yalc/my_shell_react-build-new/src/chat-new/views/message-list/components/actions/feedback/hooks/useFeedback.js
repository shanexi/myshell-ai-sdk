"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useFeedback;
const new_chat_1 = require("../../../../../../../apis/new-chat");
const definitions_1 = require("../../../../../../../chat-new/model/definitions");
function useFeedback(type, messageId, updateFeedbackState, updateFeedbackIssues) {
    const reportApi = () => {
        let api;
        switch (type) {
            default:
                api = new_chat_1.messageReport;
                break;
        }
        return api;
    };
    const feedbackApi = () => {
        let api;
        switch (type) {
            default:
                api = new_chat_1.messageFeedback;
                break;
        }
        return api;
    };
    const reportMessage = async (prevState, state) => {
        try {
            updateFeedbackState(state);
            const { success } = await reportApi()(state, messageId);
            if (success) {
                if (prevState === definitions_1.FeedbackState.DISLIKE && state === definitions_1.FeedbackState.NORMAL) {
                    updateFeedbackIssues([]);
                }
            }
            else {
                updateFeedbackState(prevState);
            }
        }
        catch (e) {
            updateFeedbackState(prevState);
            console.error(e);
        }
    };
    const sendMessageFeedback = async (issues, otherDetail) => {
        try {
            updateFeedbackIssues([...issues, otherDetail]);
            const { success } = await feedbackApi()('msg_feedback', messageId, issues, otherDetail);
            if (!success) {
                updateFeedbackIssues([]);
            }
        }
        catch (e) {
            updateFeedbackIssues([]);
            console.error(e);
        }
    };
    return {
        reportMessage,
        sendMessageFeedback
    };
}
