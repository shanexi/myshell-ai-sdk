declare function Attachments({ botId, onDelete, isMobile, isChoosingFile }: {
    botId: string;
    onDelete: (botId: string, id: string) => void;
    isMobile: boolean;
    isChoosingFile?: React.MutableRefObject<boolean>;
}): import("react/jsx-runtime").JSX.Element | null;
declare const _default: import("react").MemoExoticComponent<typeof Attachments>;
export default _default;
