import { FileProps } from '../../../../../../../src/services/store';
type FileCardP = {
    data: FileProps;
    onDelete: (botId: string, id: string) => void;
    onPreview: (id: string) => void;
    uploadFiles: (botId: string, files: FileProps[], retry?: boolean) => void;
    index: number;
    isMobile: boolean;
    isChoosingFile?: React.MutableRefObject<boolean>;
};
declare const FileCard: import("react").MemoExoticComponent<(props: FileCardP) => import("react/jsx-runtime").JSX.Element>;
export default FileCard;
