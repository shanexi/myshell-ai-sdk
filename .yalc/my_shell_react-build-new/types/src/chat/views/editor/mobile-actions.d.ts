import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
type MobileActionsProps = {
    isPanelImageBot: boolean;
    toolbarState: any;
    toggleVoice: () => void;
    name?: string;
    logoUrl?: string;
    isWorkshop?: boolean;
    botInfo?: BotInfo | null;
};
export default function MobileActions(props: MobileActionsProps): import("react/jsx-runtime").JSX.Element;
export {};
