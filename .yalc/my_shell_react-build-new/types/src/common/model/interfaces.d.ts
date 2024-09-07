import { TagInfo } from '../constants/interfaces/bot';
export type FeaturedCardProps = {
    featureType: string;
    pageId: string;
    title: string;
    description: string;
    backgroundImageUrl: string;
    gotoUrl: string;
    featuredName: string;
    featuredDescription: string;
    featuredLogo: string;
    buttonTitle: string;
    buttonUrl: string;
    buttonMobileUrl: string;
    articleId: boolean;
    botId?: string;
    botName?: string;
    widgetId?: string;
    widgetName?: string;
};
export type NormalCardProps = {
    title: string;
    description: string;
    logoUrl?: string;
    authorName?: string;
    authorNameTag?: string;
    id: string;
    clickUrl: string;
    clickMobileUrl: string;
    showVoice?: string;
    buttonTitle?: string;
    buttonUrl?: string;
    type: 'BOT' | 'WIDGET';
    tags?: TagInfo[];
};
export interface RecommendInfo {
    type: string;
    title: string;
    rightTitle: string;
    rightClickUrl: string;
    rightMobileClickUrl: string;
    items: FeaturedCardProps[] | NormalCardProps[];
}
