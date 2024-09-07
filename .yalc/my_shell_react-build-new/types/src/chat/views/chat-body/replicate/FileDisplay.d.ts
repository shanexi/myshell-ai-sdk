import { FileProps } from '../../../../../../src/services/store/index.js';
type FileCardP = {
    data: FileProps;
    onDelete: () => void;
    defaultUrl?: string;
};
declare const FileDisplay: ({ data, onDelete }: FileCardP) => import("react/jsx-runtime").JSX.Element;
export default FileDisplay;
