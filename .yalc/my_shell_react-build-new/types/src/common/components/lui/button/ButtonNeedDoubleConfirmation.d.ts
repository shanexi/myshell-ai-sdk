interface P {
    children: React.ReactNode;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
    clicked: () => void;
}
declare function ButtonNeedDoubleConfirmation({ children, title, description, onConfirm, clicked }: P): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ButtonNeedDoubleConfirmation>;
export default _default;
