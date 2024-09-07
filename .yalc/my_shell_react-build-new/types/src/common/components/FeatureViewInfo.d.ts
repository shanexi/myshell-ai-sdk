import { WidgetInfo } from '../constants/interfaces/workshop';
interface Bot {
    id: string;
    name: string;
    description: string;
    isOfficial?: boolean;
    logoUrl?: string;
}
interface FeatureViewInfoProps {
    onClose: () => void;
    item: any;
    articleId?: string;
    isMobile: boolean;
}
export declare function FeatureViewInfoLayout({ coverImageUrl, overview, title, bot, widget, onClose, isPopup, children, clickCallback, featureType, from }: {
    coverImageUrl: string;
    overview: Omit<FeatureOverViewProps, 'bot'>;
    title: string;
    bot?: Bot;
    widget?: WidgetInfo;
    onClose?: () => void;
    isPopup?: boolean;
    children?: React.ReactNode;
    clickCallback?: (clickArea: string, chatId?: string, chatName?: string, chatType?: string) => void;
    featureType?: string;
    from?: string;
}): import("react/jsx-runtime").JSX.Element;
type FeatureOverViewProps = {
    cardImageUrl?: string;
    title: string;
    description: string;
    bot?: {
        id: string;
        name: string;
        description: string;
        logoUrl?: string;
    };
    clickCallback?: (clickArea: string, chatId?: string, chatName?: string, chatType?: string) => void;
    widget?: WidgetInfo;
    featureType?: string;
    from?: string;
};
export default function FeatureViewInfo(pros: FeatureViewInfoProps): import("react/jsx-runtime").JSX.Element;
export {};
