import { PhotoInfo } from '../../../../../../../../../src/common/constants/interfaces/bot.js';
interface BotGalleryProps {
    id: string;
    photos: PhotoInfo[];
    onActionSuccess: (photos: PhotoInfo[]) => void;
    canUpload?: boolean;
}
export default function BotGallery({ id, photos, onActionSuccess, canUpload }: BotGalleryProps): import("react/jsx-runtime").JSX.Element;
export {};
