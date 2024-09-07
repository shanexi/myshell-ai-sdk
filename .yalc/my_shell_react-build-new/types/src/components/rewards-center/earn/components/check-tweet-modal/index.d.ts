export interface CheckTweetModalProps {
    isOpen: boolean;
    text: string;
    onClose: (success: boolean, isOpenTweetBind?: boolean) => void;
}
export default function CheckTweetModal({ isOpen, text, onClose }: CheckTweetModalProps): import("react/jsx-runtime").JSX.Element;
