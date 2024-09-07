interface ChartProps {
    data?: Array<{
        timestampUnix: number;
        value: number;
    }>;
    loading?: boolean;
}
declare function StakeTrendChartTvLight({ data, loading }: ChartProps): import("react/jsx-runtime").JSX.Element;
declare const ChartTvLight: import("react").MemoExoticComponent<typeof StakeTrendChartTvLight>;
export default ChartTvLight;
