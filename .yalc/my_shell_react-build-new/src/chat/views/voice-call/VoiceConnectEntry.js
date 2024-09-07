"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VoiceConnectEntry;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const PhoneIcon_1 = __importDefault(require("@heroicons/react/24/outline/PhoneIcon"));
const VideoCameraIcon_1 = __importDefault(require("@heroicons/react/24/outline/VideoCameraIcon"));
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const navigation_1 = require("next/navigation");
const react_2 = require("react");
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const tooltip_1 = require("../../../common/components/ui/tooltip.js");
const constants_1 = require("../../../common/constants/constants.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const useUserSettings_1 = __importDefault(require("../../../common/hooks/useUserSettings.js"));
const common_helper_1 = require("../../../common/utils/common-helper.js");
const store_1 = require("../../../services/store/index.js");
const FeedbackModal_1 = __importDefault(require("./FeedbackModal.js"));
const LessOfEnergyModal_1 = __importDefault(require("./LessOfEnergyModal.js"));
const UseEnergyPackModal_1 = __importDefault(require("./UseEnergyPackModal.js"));
const VoiceCallModal_1 = __importDefault(require("./VoiceCallModal.js"));
const types_1 = require("./protocol/types.js");
function VoiceConnectEntry({ botInfo }) {
    const voiceCallDisclosure = (0, react_1.useDisclosure)();
    const feedbackDisclosure = (0, react_1.useDisclosure)();
    const lessOfEnergyDisclosure = (0, react_1.useDisclosure)();
    const useEnergyPackDisclosure = (0, react_1.useDisclosure)();
    const [hasVideo, setHasVideo] = (0, react_2.useState)(false);
    const voiceCallModalRef = (0, react_2.useRef)(null);
    const [energyItem, setEnergyItem] = (0, react_2.useState)(undefined);
    const t = (0, next_intl_1.useTranslations)('chat');
    const { error } = (0, useNotification_1.useNotification)();
    const query = (0, navigation_1.useSearchParams)();
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const bg = resolvedTheme === 'dark' ? '#885907' : '#FFE6BB';
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const voiceCallUsed = (0, store_1.useUserStore)(state => state.voiceCallUsed);
    const { handleVoiceCallUsed } = (0, useUserSettings_1.default)();
    const videoCallUsed = (0, store_1.useUserStore)(state => state.videoCallUsed);
    const { handleVideoCallUsed } = (0, useUserSettings_1.default)();
    const handleVoiceCall = (hasVideo) => {
        const canCall = () => {
            if (isVisitor) {
                if ((voiceCallUsed || videoCallUsed) && energy < constants_1.VoiceCallEnerygyUsedPerSecond) {
                    return false;
                }
                return true;
            }
            return energy < constants_1.VoiceCallEnerygyUsedPerSecond;
        };
        return () => {
            if (!canCall()) {
                error({ id: 'voice_call_low_battery', isClosable: true, content: t('voice_call_feedback_low_battery') });
                return;
            }
            if (hasVideo) {
                if (!videoCallUsed) {
                    handleVideoCallUsed();
                }
            }
            else if (!voiceCallUsed) {
                handleVoiceCallUsed();
            }
            voiceCallDisclosure.onOpen();
            setHasVideo(hasVideo);
        };
    };
    const canUseLive2D = () => {
        if ((0, common_helper_1.isMobileDevice)()) {
            return false;
        }
        if (botInfo && botInfo.voiceCall.isVideoCall) {
            return true;
        }
        return false;
    };
    const canUsePhone = () => {
        if (botInfo && botInfo.voiceCall.isVoiceCall) {
            return true;
        }
        return false;
    };
    const onVoiceCallModalClose = () => {
        voiceCallDisclosure.onClose();
        feedbackDisclosure.onOpen();
    };
    const onEnergyInfo = (info) => {
        if (info.command == types_1.EnergyCommand.CHAT_END) {
            if (!lessOfEnergyDisclosure.isOpen) {
                lessOfEnergyDisclosure.onOpen();
            }
        }
        else if (info.command == types_1.EnergyCommand.ENERGY_PACK) {
            if (!useEnergyPackDisclosure.isOpen) {
                setEnergyItem(info.energyPack);
                useEnergyPackDisclosure.onOpen();
            }
        }
        voiceCallModalRef.current.pause();
    };
    const onLessOfEnergyModalClose = () => {
        voiceCallDisclosure.onClose();
        lessOfEnergyDisclosure.onClose();
        feedbackDisclosure.onOpen();
    };
    const onUseEnergyStop = () => {
        useEnergyPackDisclosure.onClose();
        voiceCallDisclosure.onClose();
        feedbackDisclosure.onOpen();
    };
    const onUseEnergyResume = () => {
        voiceCallModalRef.current.resume();
        useEnergyPackDisclosure.onClose();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [useEnergyPackDisclosure.isOpen && ((0, jsx_runtime_1.jsx)(UseEnergyPackModal_1.default, { isOpen: useEnergyPackDisclosure.isOpen, onResume: onUseEnergyResume, onStop: onUseEnergyStop, propItem: energyItem })), lessOfEnergyDisclosure.isOpen && ((0, jsx_runtime_1.jsx)(LessOfEnergyModal_1.default, { isOpen: lessOfEnergyDisclosure.isOpen, onClose: onLessOfEnergyModalClose })), feedbackDisclosure.isOpen && ((0, jsx_runtime_1.jsx)(FeedbackModal_1.default, { botInfo: botInfo, isOpen: feedbackDisclosure.isOpen, onClose: feedbackDisclosure.onClose })), (0, jsx_runtime_1.jsx)(VoiceCallModal_1.default, { ref: voiceCallModalRef, isOpen: voiceCallDisclosure.isOpen, onClose: onVoiceCallModalClose, onEnergyInfo: onEnergyInfo, hasVideo: hasVideo, selectedBot: botInfo }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row space-x-[6px] md:space-x-3", children: [canUsePhone() && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('voice_call_tip.tip1'), disabled: !query.get('tips'), defaultOpen: true, variant: "info", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", size: "md", icon: PhoneIcon_1.default, className: "data-[state=open]:bg-surface-hovered", onClick: handleVoiceCall(false) }) })), canUseLive2D() && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('voice_call_tip.tip2'), disabled: !query.get('tips'), defaultOpen: !canUsePhone(), variant: "info", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", color: "brand", size: "md", icon: VideoCameraIcon_1.default, className: "data-[state=open]:bg-surface-hovered", onClick: handleVoiceCall(true) }) }))] })] }));
}
