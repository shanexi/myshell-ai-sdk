import { BotStatus } from '../types/bot';
export interface RankingDetail {
    date: string;
    ranking: number;
}
export interface BotRankingData {
    botId: number;
    botUid: string;
    current: RankingDetail;
    logo: string | null;
    logoUrl: string | null;
    name: string;
    privateBotId: number | null;
    status: BotStatus;
    userId: number;
    yesterday: RankingDetail | null;
}
export interface PopularityRankDetail {
    date: string;
    ranking: number;
}
export interface PopularityRankData {
    botId: number;
    botUid: string;
    logo: string;
    name: string;
    privateBotId: number | null;
    rankings: PopularityRankDetail[];
    status: BotStatus;
    userId: number;
}
export interface InvitationDetail {
    date: string;
    invitationCount: number;
    validInvitationCount: number;
}
export interface InvitationBotDetail {
    botId: string;
    logo: string;
    name: string;
    privateBotId: number | null;
    status: BotStatus;
    userId: string;
}
export interface InvitationWidgetDetail {
    widgetId: string;
    logo: string;
    name: string;
    userId: string;
}
export interface InvitationArticleDetail {
    pageId: string;
    title: string;
}
export type InvitationDataType = 'bot' | 'user' | 'tgTotal' | 'widget' | 'article' | 'all';
export interface InvitationData {
    botInfo?: InvitationBotDetail;
    invitations: InvitationDetail[];
    type: InvitationDataType;
    widgetInfo?: InvitationWidgetDetail;
    articleInfo?: InvitationArticleDetail;
}
