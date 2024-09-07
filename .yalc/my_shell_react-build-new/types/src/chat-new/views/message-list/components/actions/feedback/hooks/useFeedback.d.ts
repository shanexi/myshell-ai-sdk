import { FeedbackState } from '../../../../../../../../../src/chat-new/model/definitions.js';
import { ChatModuleType } from '../../../../../../../../../src/chat/ChatStaticContext.js';
export default function useFeedback(type: ChatModuleType, messageId: string, updateFeedbackState: (state: FeedbackState) => void, updateFeedbackIssues: (feedbackIssues: string[]) => void): {
    reportMessage: (prevState: FeedbackState, state: FeedbackState) => Promise<void>;
    sendMessageFeedback: (issues: string[], otherDetail: string) => Promise<void>;
};
