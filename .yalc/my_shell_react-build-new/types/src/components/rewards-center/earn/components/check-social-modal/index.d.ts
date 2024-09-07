interface P {
    isOpen: boolean;
    onClose: (success: boolean, isOpenTweetBind?: boolean) => void;
}
export default function CheckSocialModal({ isOpen, onClose }: P): import("react/jsx-runtime").JSX.Element;
export {};
