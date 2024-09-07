import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
import { EnergyInfo } from './protocol/types';
type VoiceCallProps = {
    isOpen: boolean;
    onClose: () => void;
    onEnergyInfo: (info: EnergyInfo) => void;
    hasVideo: boolean;
    selectedBot?: BotInfo | null;
};
declare const VoiceCallModal: import("react").ForwardRefExoticComponent<VoiceCallProps & import("react").RefAttributes<{}>>;
export default VoiceCallModal;
