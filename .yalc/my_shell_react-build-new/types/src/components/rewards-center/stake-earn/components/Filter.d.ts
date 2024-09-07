export declare enum FilterType {
    MY_PORTFOLIO = "portfolio",
    PRESALE = "presale",
    TRENDING = "trending",
    POTENTIAL = "potential",
    RECENT = "recent"
}
interface IFilterProps {
    className?: string;
    selected: FilterType;
    onChange: (value: FilterType) => void;
}
export default function Filter(pros: IFilterProps): import("react/jsx-runtime").JSX.Element;
export {};
