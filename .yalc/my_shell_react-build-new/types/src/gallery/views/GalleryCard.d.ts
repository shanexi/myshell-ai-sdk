import { IGalleryItem } from '../modal/interfaces';
export default function GalleryCard({ item, from, deleteCallback, followCallback }: {
    item: IGalleryItem;
    from?: string;
    deleteCallback: (id: string) => void;
    followCallback?: () => void;
}): import("react/jsx-runtime").JSX.Element;
