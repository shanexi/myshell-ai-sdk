interface ChartProps {
    data?: Array<{
        date: string;
        value: number;
    }>;
    extraConfig?: {
        tickCount: number;
        xMin?: string;
        xMax?: string;
        yMin?: number;
        yMax?: number;
        xAxisTickMethod?: () => string[];
        xAxisLabelFormatter?: (text: string, item: any) => string;
    };
    loading?: boolean;
}
declare function StakeTrendChart({ data, extraConfig, loading }: ChartProps): import("react/jsx-runtime").JSX.Element;
declare const Chart: import("react").MemoExoticComponent<typeof StakeTrendChart>;
export default Chart;
