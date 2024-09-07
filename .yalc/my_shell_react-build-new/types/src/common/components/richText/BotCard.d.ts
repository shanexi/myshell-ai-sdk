import type { BotDetail, BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
type Bot = BotInfo & {
    botDetail?: BotDetail;
    botSummary?: BotInfo;
    botDetailUrls?: string[];
    botOverviewUrls?: string[];
    title?: string;
    titleDescription?: string;
    headline?: string;
    headlineDescription?: string;
    secName?: string;
    secDesc?: string;
    featurePhotoUrls?: string[];
    mobileFeaturePhotoUrls?: string[];
};
export declare const BotCard: React.FC<{
    bots?: Bot[];
    botIds?: string[];
    clickCallback?: (clickArea: string, chatId?: string, chatName?: string, chatType?: string) => void;
    itemClickCallback?: (clickArea: string, chatId?: string, chatName?: string, chatType?: string) => void;
}>;
export {};
