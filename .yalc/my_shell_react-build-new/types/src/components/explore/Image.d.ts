type P = {
    src: string;
    alt: string;
    placeholder?: any;
    errorMessage?: string;
    className?: string;
    [key: string]: any;
};
declare const Image: ({ src, alt, placeholder, errorMessage, className, ...props }: P) => import("react/jsx-runtime").JSX.Element;
export default Image;
