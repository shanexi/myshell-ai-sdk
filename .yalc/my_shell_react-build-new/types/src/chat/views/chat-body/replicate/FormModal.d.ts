import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    imagePanelParams: any;
    setOpen: (value: boolean) => void;
    scrollToBottom: () => void;
    isMobile?: boolean;
    botInfo?: BotInfo | null;
};
declare function FormModal({ imagePanelParams, setOpen, scrollToBottom, isMobile, botInfo }: P): import("react/jsx-runtime").JSX.Element;
export default FormModal;
