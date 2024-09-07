declare global {
    interface Window {
        DATAFLUX_RUM: any;
        VConsole: any;
        sensors: any;
        sensorsDataAnalytic201505: any;
        abtest: any;
    }
}
export declare function MainLayout({ className, children }: {
    className?: string;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
