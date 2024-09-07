declare function WidgetAttachments({ widgetId, onDelete, isMobile, isChoosingFile }: {
    widgetId: string;
    onDelete: (widgetId: string, id: string) => void;
    isMobile: boolean;
    isChoosingFile?: React.MutableRefObject<boolean>;
}): import("react/jsx-runtime").JSX.Element | null;
declare const _default: import("react").MemoExoticComponent<typeof WidgetAttachments>;
export default _default;
