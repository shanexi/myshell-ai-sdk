import { Comment, Reply } from '../../../../../../../../../../src/apis/apiTypes.js';
export interface CommentInputProps {
    enable?: boolean;
    curveId: string;
    onCommentCreated?: (comment: Comment) => void;
    replyTo: Comment | null;
    onClearReplyTo?: () => void;
    onReplyCreated?: (reply: Reply) => void;
}
export default function CommentInput(props: CommentInputProps): import("react/jsx-runtime").JSX.Element;
