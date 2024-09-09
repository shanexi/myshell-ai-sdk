import { messageFeedback, messageReport } from '../../../../../../../apis/new-chat.js';
import { FeedbackState } from '../../../../../../../chat-new/model/definitions.js';
export default function useFeedback(type, messageId, updateFeedbackState, updateFeedbackIssues) {
    const reportApi = () => {
        let api;
        switch (type) {
            default:
                api = messageReport;
                break;
        }
        return api;
    };
    const feedbackApi = () => {
        let api;
        switch (type) {
            default:
                api = messageFeedback;
                break;
        }
        return api;
    };
    const reportMessage = async (prevState, state) => {
        try {
            updateFeedbackState(state);
            const { success } = await reportApi()(state, messageId);
            if (success) {
                if (prevState === FeedbackState.DISLIKE && state === FeedbackState.NORMAL) {
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
