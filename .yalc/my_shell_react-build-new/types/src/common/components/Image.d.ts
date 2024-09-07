import { ImageStatus } from '../../../../src/chat/model/interfaces.js';
type P = {
    src: string;
    alt: string;
    placeholder?: any;
    errorMessage?: string;
    className?: string;
    status?: ImageStatus;
    index?: number;
    imageLoadCallback?: () => void;
    [key: string]: any;
};
declare const Image: ({ src, alt, placeholder, errorMessage, className, style, aspectRatio, status, index, imageLoadCallback, ...props }: P) => import("react/jsx-runtime").JSX.Element;
export default Image;
