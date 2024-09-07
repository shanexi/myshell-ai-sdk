export interface IPublishItem {
    messageId: string;
    imageLink: string;
    botId: string;
    naturalHeight: number;
    naturalWidth: number;
}
export interface IGalleryItem {
    authInfo: {
        avatar: string;
        followStatus: string;
        name: string;
        nameTag: string;
        userId: string;
    };
    botId: string;
    botName: string;
    galleryImageLink: string;
    generationInfo: {
        sourceImageLink: string;
        sourceText: string;
    };
    id: string;
    isNsfw: boolean;
    messageId: string;
    viewCount: number;
}
