import { FeedbackState } from '../../../../../../../chat-new/model/definitions';
import { ChatModuleType } from '../../../../../../../chat/ChatStaticContext';
export default function useFeedback(type: ChatModuleType, messageId: string, updateFeedbackState: (state: FeedbackState) => void, updateFeedbackIssues: (feedbackIssues: string[]) => void): {
    reportMessage: (prevState: FeedbackState, state: FeedbackState) => Promise<void>;
    sendMessageFeedback: (issues: string[], otherDetail: string) => Promise<void>;
};
ing) => Promise<void>;
};
