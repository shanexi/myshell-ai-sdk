interface ClaimedModalProps {
    isOpen: boolean;
    claimedPoints: number;
    onClose: () => void;
    points: number;
    data: number[];
    showBtn?: boolean;
}
export declare function ClaimedModal(props: ClaimedModalProps): import("react/jsx-runtime").JSX.Element;
interface IDayItemProps {
    label: string;
    points: number;
    active: boolean;
    full?: boolean;
    isDark: boolean;
}
export declare function DayItem(props: IDayItemProps): import("react/jsx-runtime").JSX.Element;
export {};
