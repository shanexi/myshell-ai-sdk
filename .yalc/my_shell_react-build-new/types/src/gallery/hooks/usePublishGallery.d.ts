import { IPublishItem } from '../../../../src/gallery/modal/interfaces';
export default function usePublishGallery(): {
    publishing: boolean;
    publishGalleryList: (successCb?: () => void, list?: IPublishItem[]) => Promise<void>;
    checkGalleryUpdateHandle: (botId: string) => Promise<void>;
};
