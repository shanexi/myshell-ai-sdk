export declare const useGoToChat: ({ clickCallback, recommendationSpot }?: {
    clickCallback?: (clickArea: string, chatId?: string, chatName?: string, chatType?: string) => void;
    recommendationSpot?: string;
}) => (chatId: string, chatName: string, botUid?: string, callback?: () => void, chatType?: string, spot?: string) => Promise<void>;
