import { ExtendedRecordMap } from 'notion-types';
export type PageMeta = {
    bot_name: string;
    card_image: string;
    inside_image: string;
    card_type_desc: string;
    feature_id?: string;
    feature_id_type?: 'BOT' | 'WIDGET';
    feature_title: string;
};
export interface ArticleInfo {
    id: string;
    pageMeta: PageMeta;
    pageContent: ExtendedRecordMap;
}
