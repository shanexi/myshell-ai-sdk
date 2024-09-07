interface UserBgProps {
    bgPhoto?: string;
    onActionSuccess?: (background: string) => void;
    loading?: boolean;
    className?: string;
    showUpload?: boolean;
}
export default function UserBg({ bgPhoto, onActionSuccess, loading, className, showUpload }: UserBgProps): import("react/jsx-runtime").JSX.Element;
export {};
