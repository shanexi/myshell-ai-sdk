import { PropsWithChildren } from 'react';
interface ImagePopupMenuProps extends PropsWithChildren {
    xImage: string;
    imageModel?: string;
    className?: string;
    isProconfigMd?: boolean;
    isOpen: boolean;
    onClose: () => void;
    menuPosition: number[];
}
export default function ImagePopupMenu({ className, isOpen, onClose, children, isProconfigMd, menuPosition, xImage }: ImagePopupMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
