import { BotDetail, BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
type Widget = WidgetInfo & {
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
export declare const WidgetCard: React.FC<{
    widgets?: Widget[];
    widgetIds?: string[];
    clickCallback?: (clickArea: string, chatId?: string, chatName?: string, chatType?: string) => void;
    itemClickCallback?: (clickArea: string, chatId?: string, chatName?: string, chatType?: string) => void;
}>;
export {};
