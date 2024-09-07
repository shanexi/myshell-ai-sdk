import { BotInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
type ReactLive2dProps = {
    botInfo?: BotInfo | null;
    isOpen: boolean;
    isTalking: boolean;
    live2dModelLoad?: () => void;
};
declare function ReactLive2d(props: ReactLive2dProps): import("react/jsx-runtime").JSX.Element;
export default ReactLive2d;
