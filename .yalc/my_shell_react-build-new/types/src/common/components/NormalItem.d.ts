type P = {
    item: any;
    setShowDetail: (item: any) => void;
    setShowUserDetail?: (item: any) => void;
    loading: boolean;
    isLine: boolean;
    showChat?: boolean;
    showAuthor?: boolean;
};
declare function NormalItem(props: P): import("react/jsx-runtime").JSX.Element;
export default NormalItem;
