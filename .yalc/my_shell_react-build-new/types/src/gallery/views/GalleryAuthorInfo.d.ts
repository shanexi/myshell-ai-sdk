import { IGalleryItem } from '../modal/interfaces';
export default function GalleryAuthorInfo({ isMobile, item, botId, deleteCallback, followCallback }: {
    isMobile?: boolean;
    item: IGalleryItem;
    botId: string;
    deleteCallback?: (galleryId: string) => void;
    followCallback?: () => void;
}): import("react/jsx-runtime").JSX.Element;
