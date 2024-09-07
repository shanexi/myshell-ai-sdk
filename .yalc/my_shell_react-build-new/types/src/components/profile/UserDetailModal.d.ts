interface UserDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    detailData?: any;
    userName?: string;
    nameTag?: string;
    defaultTab?: string;
}
export default function UserDetailModal({ isOpen, onClose, detailData, userName, nameTag, defaultTab }: UserDetailModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
