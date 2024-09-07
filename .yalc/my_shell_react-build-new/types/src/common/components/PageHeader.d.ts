type P = {
    children?: React.ReactNode;
    onSearchChange?: (value: string) => void;
    searchBar?: boolean;
    title?: string;
    onClear?: () => void;
    border?: boolean;
    backUrl: string;
    isEmptyFilterValues: boolean;
    page: string;
};
declare function PageHeader({ onSearchChange, searchBar, title, border, onClear, page, backUrl, isEmptyFilterValues, children }: P): import("react/jsx-runtime").JSX.Element;
export default PageHeader;
