import { RefObject } from 'react';
interface P {
    className?: string;
    userId?: string;
    containerRef: RefObject<HTMLDivElement>;
}
export default function GalleryList({ className, userId, containerRef }: P): import("react/jsx-runtime").JSX.Element | null;
export {};
