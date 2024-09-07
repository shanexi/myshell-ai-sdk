type P = {
    item: any;
    isMobile?: boolean;
    loading: boolean;
    isLine: boolean;
    showChat?: boolean;
    singleList?: boolean;
    showAuthor?: boolean;
    setShowUserDetail?: (item: any) => void;
    chatType?: string;
};
declare function BotCommonItem(props: P): import("react/jsx-runtime").JSX.Element;
export default BotCommonItem;
