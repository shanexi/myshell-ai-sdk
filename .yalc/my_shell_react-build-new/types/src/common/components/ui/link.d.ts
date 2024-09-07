import { UrlObject } from 'url';
export interface LinkProps {
    href: string | UrlObject;
    scroll?: boolean;
    replace?: boolean;
    prefetch?: boolean;
    passHref?: boolean;
    className?: string;
    onClick?: (e: any) => void;
    children?: React.ReactNode;
    [key: string]: any;
}
export declare function Link({ className, href, scroll, replace, prefetch, children, onClick, ...props }: LinkProps): import("react/jsx-runtime").JSX.Element;
export default Link;
