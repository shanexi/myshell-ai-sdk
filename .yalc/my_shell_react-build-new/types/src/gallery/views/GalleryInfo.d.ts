import { IGalleryItem } from '../modal/interfaces';
export default function GalleryInfo({ item, botId, galleryId, isShare, isMobile, deleteCallback, followCallback }: {
    item?: IGalleryItem;
    botId: string;
    galleryId: string;
    isShare?: boolean;
    isMobile?: boolean;
    deleteCallback?: (galleryId: string) => void;
    followCallback?: () => void;
}): import("react/jsx-runtime").JSX.Element | null;
