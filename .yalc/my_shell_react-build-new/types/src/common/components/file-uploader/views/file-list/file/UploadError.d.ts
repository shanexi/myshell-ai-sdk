type UploadErrorProps = {
    name: string;
    onRetry: () => Promise<void>;
    onDelete: () => void;
};
export default function UploadError({ name, onRetry, onDelete }: UploadErrorProps): import("react/jsx-runtime").JSX.Element;
export {};
