import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    imagePanelParams: any;
    watch: any;
    reset: any;
    getValues: any;
    isMobile?: boolean;
    setModaOpen: (open: boolean) => void;
    isOpen: boolean;
    botInfo?: BotInfo | null;
};
declare function GetImageInfoModal({ imagePanelParams, watch, reset, setModaOpen, isMobile, isOpen, getValues, botInfo }: P): import("react/jsx-runtime").JSX.Element;
export default GetImageInfoModal;
