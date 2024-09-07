import { ReactNode } from 'react';
interface RewardsPopoverProps {
    onCheck: (e: any) => void;
    children: ReactNode;
    isOpen: boolean;
    onClose: (e: any) => void;
    isMob?: boolean;
}
export default function RewardsPopoverWrap({ onCheck, children, onClose, isOpen, isMob }: RewardsPopoverProps): import("react/jsx-runtime").JSX.Element;
export {};
