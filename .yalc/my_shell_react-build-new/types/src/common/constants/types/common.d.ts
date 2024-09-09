export type HeroIcon = React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
    title?: string;
    titleId?: string;
} & React.RefAttributes<SVGSVGElement>>;
declare global {
    interface Window {
        DATAFLUX_RUM: any;
        VConsole: any;
        sensors: any;
        sensorsDataAnalytic201505: any;
        abtest: any;
    }
}
