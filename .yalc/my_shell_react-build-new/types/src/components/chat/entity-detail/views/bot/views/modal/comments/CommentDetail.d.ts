import { Comment, Reply } from '../../../../../../../../../../src/apis/apiTypes.js';
export interface CommentItem extends Comment {
    replies?: Reply[];
    showReply?: boolean;
    noMoreReplies?: boolean;
}
export interface CommentDetailProps {
    comment: CommentItem | Reply;
    onReplyTo?: (comment: CommentItem) => void;
    isReply?: boolean;
    onUpdateComment: (comment: Partial<CommentItem | Reply>) => void;
    onRemoveComment: (comment: CommentItem | Reply) => void;
    enableInput?: boolean;
}
export default function CommentDetail(props: CommentDetailProps): import("react/jsx-runtime").JSX.Element;
