interface ProgressBarProps extends React.ComponentPropsWithoutRef<'div'> {
    progress: number;
    wrapperClassName?: string;
    showInfo?: boolean;
    label?: string;
    tips?: React.ReactNode;
    steps?: number[];
}
declare const ProgressBar: ({ progress, steps, showInfo, label, tips, className, wrapperClassName }: ProgressBarProps) => import("react/jsx-runtime").JSX.Element;
export default ProgressBar;
