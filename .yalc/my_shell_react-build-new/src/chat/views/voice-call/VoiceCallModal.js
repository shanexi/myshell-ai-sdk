"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDownIcon"));
const ChevronUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronUpIcon"));
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const image_1 = __importDefault(require("next/image"));
const react_2 = require("react");
const enums_1 = require("../../../chat/model/enums.js");
const hangup_svg_1 = __importDefault(require("@/common/assets/icons/voice/hangup.svg"));
const highLatency_svg_1 = __importDefault(require("@/common/assets/icons/voice/highLatency.svg"));
const lowLatency_svg_1 = __importDefault(require("@/common/assets/icons/voice/lowLatency.svg"));
const microphoneOff_svg_1 = __importDefault(require("@/common/assets/icons/voice/microphoneOff.svg"));
const microphoneOn_svg_1 = __importDefault(require("@/common/assets/icons/voice/microphoneOn.svg"));
const middleLatency_svg_1 = __importDefault(require("@/common/assets/icons/voice/middleLatency.svg"));
const selected_svg_1 = __importDefault(require("@/common/assets/icons/voice/selected.svg"));
const subtitleOff_svg_1 = __importDefault(require("@/common/assets/icons/voice/subtitleOff.svg"));
const subtitleOn_svg_1 = __importDefault(require("@/common/assets/icons/voice/subtitleOn.svg"));
const windowOff_svg_1 = __importDefault(require("@/common/assets/icons/voice/windowOff.svg"));
const windowOn_svg_1 = __importDefault(require("@/common/assets/icons/voice/windowOn.svg"));
const EnergyProgress_1 = __importDefault(require("../../../common/components/EnergyProgress.js"));
const LoadingIcon_1 = __importDefault(require("../../../common/components/icons/LoadingIcon.js"));
const tooltip_1 = require("../../../common/components/ui/tooltip.js");
const useNotification_1 = require("../../../common/hooks/useNotification.js");
const useTimer_1 = __importDefault(require("../../../common/hooks/useTimer.js"));
const common_helper_1 = require("../../../common/utils/common-helper.js");
const useChatHistory_1 = require("../../../hooks/voicecall/useChatHistory.js");
const useLatency_1 = __importDefault(require("../../../hooks/voicecall/useLatency.js"));
const store_1 = require("../../../services/store/index.js");
const VoiceTalkSocketIO_1 = require("./VoiceTalkSocketIO.js");
const live2d_1 = __importDefault(require("./live2d/index.js"));
const LAppDefine = __importStar(require("./live2d/Manager/lappdefine.js"));
const lapplive2dmanager_1 = require("./live2d/Manager/lapplive2dmanager.js");
const lappwavfilehandler_1 = require("./live2d/Manager/lappwavfilehandler.js");
const types_1 = require("./protocol/types.js");
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
const VoiceCallModal = (0, react_2.forwardRef)((props, ref) => {
    const [isMicrophoneOn, setIsMicrophoneOn] = (0, react_2.useState)(true);
    const [selectedInputDevice, setSelectedInputDevice] = (0, react_2.useState)(undefined);
    const [selectedOutputDevice, setSelectedOutputDevice] = (0, react_2.useState)(undefined);
    const [inputDeviceList, setInputDeviceList] = (0, react_2.useState)([]);
    const [outputDeviceList, setOtputDeviceList] = (0, react_2.useState)([]);
    const [isWindowOn, setIsWindowOn] = (0, react_2.useState)(false);
    const [isSubtitleOn, setIsSubtitleOn] = (0, react_2.useState)(true);
    const [useMobile, setUseMobile] = (0, react_2.useState)((0, common_helper_1.isMobileDevice)());
    const { isOpen, onClose, hasVideo, selectedBot, onEnergyInfo } = props;
    const subtitleRef = (0, react_2.useRef)(null);
    const { timeFormatted, startClock, stopClock } = (0, useTimer_1.default)();
    const { latency, startPing, stopPing } = (0, useLatency_1.default)();
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const user = (0, store_1.useUserStore)(state => state.user);
    const dailyEnergy = (0, store_1.useUserStore)(state => state.dailyEnergy);
    const devicesPopover = (0, react_1.useDisclosure)();
    const deviceSelectedOpen = (0, react_2.useRef)(false);
    const { name, logoUrl } = selectedBot || { name: 'Unknown Bot', logo: '' };
    const talk = (0, react_2.useRef)();
    const [chatHistory, appendChatHistory, clearChatHistory] = (0, useChatHistory_1.useChatHistory)([]);
    const [isAiTalking, setIsAiTalking] = (0, react_2.useState)(false);
    const [asrTalkingResult, setAsrTalkingResult] = (0, react_2.useState)('');
    const [isReplyLoading, setIsReplyLoading] = (0, react_2.useState)(false);
    const [connectState, setConnectState] = (0, react_2.useState)(enums_1.VoiceCallStatusEnum.NOT_CONNECTED);
    const notify = (0, useNotification_1.useNotification)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const isUseMobileStyle = (width, height) => {
        if ((0, common_helper_1.isMobileDevice)()) {
            return true;
        }
        if (height / width > 1.1) {
            return true;
        }
        return false;
    };
    const updateIsUseMobileStyle = (width, height) => {
        const use = isUseMobileStyle(width, height);
        setUseMobile(use);
    };
    (0, react_2.useEffect)(() => {
        const originHeight = window.innerHeight;
        const handleResize = () => {
            const width = window.innerWidth;
            updateIsUseMobileStyle(width, originHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const onAsrMessage = (msg) => {
        msg.result = msg.result.map(line => line.replace('[BLANK_AUDIO]', '').trim()).filter(line => line !== '');
        setAsrTalkingResult(msg.result.join(' '));
        setTimeout(() => {
            if (subtitleRef.current) {
                subtitleRef.current.scrollTo(0, -1);
            }
        }, 100);
    };
    const onStart = () => {
        setConnectState(enums_1.VoiceCallStatusEnum.CONNECTED);
        startClock();
        setIsReplyLoading(true);
    };
    const onConnectError = () => {
        notify.error({ content: t('voice_call_connect_error') });
    };
    const onConnectTimeout = () => {
        notify.error({ content: t('voice_call_connect_timeout') });
    };
    const onVoiceEnd = async (lastSegment) => {
        const humanContent = lastSegment.filter(c => c !== '').join('\n');
        if ((humanContent || '').trim() == '') {
            return;
        }
        setAsrTalkingResult('');
        setIsReplyLoading(true);
        appendChatHistory({ role: 'human', content: humanContent });
        setTimeout(() => {
            if (subtitleRef.current) {
                subtitleRef.current.scrollTo(0, -1);
            }
        }, 100);
    };
    const onEnergyCommand = (resp) => {
        onEnergyInfo(resp);
    };
    const onGptMessage = (resp) => {
        setIsReplyLoading(false);
        appendChatHistory({ role: 'bot', content: (resp.sentence || '').trim() });
        setTimeout(() => {
            if (subtitleRef.current) {
                subtitleRef.current.scrollTo(0, -1);
            }
        }, 100);
    };
    const onPlayerStatusChanged = async (status, segment) => {
        setIsAiTalking(status == types_1.PlayStatus.Playing);
        if (hasVideo) {
            if (status == types_1.PlayStatus.Playing) {
                const blob = new Blob([segment.mp3Data]);
                const audio = await blob.arrayBuffer();
                const instance = lapplive2dmanager_1.LAppLive2DManager.getInstance();
                instance._models
                    .at(0)
                    .startRandomMotion(LAppDefine.MotionGroupTapBody, LAppDefine.PriorityForce, undefined, audio);
            }
            else if (status == types_1.PlayStatus.Stop) {
                const instance = lapplive2dmanager_1.LAppLive2DManager.getInstance();
                const wav = lappwavfilehandler_1.LAppWavFileHandler.getInstance();
                instance._models.at(0).startRandomMotion(LAppDefine.MotionGroupIdle, LAppDefine.PriorityForce);
                wav.releasePcmData();
            }
        }
    };
    const connect = () => {
        clearChatHistory();
        setAsrTalkingResult('');
        talk.current = new VoiceTalkSocketIO_1.MyshellTalkSocketIO(selectedBot?.id || '', {
            onAsrMessage,
            onStart,
            onVoiceEnd,
            onPlayerStatusChanged,
            onGptMessage,
            onConnectTimeout,
            onConnectError,
            onEnergyCommand
        }, {
            isVideoCall: hasVideo
        });
        talk.current.startRecord();
    };
    const disconnect = () => {
        talk.current?.stopRecord();
        talk.current = undefined;
        clearChatHistory();
        setAsrTalkingResult('');
        setConnectState(enums_1.VoiceCallStatusEnum.NOT_CONNECTED);
    };
    (0, react_2.useEffect)(() => {
        if (isOpen) {
            connect();
            startPing();
            setConnectState(enums_1.VoiceCallStatusEnum.CONNECTING);
        }
        else {
            disconnect();
        }
        return () => {
            stopClock();
            stopPing();
        };
    }, [isOpen]);
    (0, react_2.useEffect)(() => {
        if (isMicrophoneOn) {
            talk.current?.resumeRecord();
        }
        else {
            talk.current?.pauseRecord();
        }
    }, [isMicrophoneOn]);
    (0, react_2.useImperativeHandle)(ref, () => ({
        pause() {
            talk.current?.pauseChat();
        },
        resume() {
            talk.current?.resumeChat();
        }
    }));
    const buttonAndChatWidth = () => {
        if (isWindowOn) {
            return 'mx-0';
        }
        return 'md:mx-0 lg:mx-72 mx-0';
    };
    const hasBackgroundImageInBotConfig = () => {
        if (!selectedBot || !selectedBot.voiceCall.param) {
            return false;
        }
        const voiceCallParam = JSON.parse(selectedBot.voiceCall.param);
        if (!voiceCallParam.live2d) {
            return false;
        }
        const img = voiceCallParam.live2d.backgroundURL;
        return img != undefined && img != '';
    };
    const backgroundImage = () => {
        if (!hasVideo) {
            return logoUrl;
        }
        if (!hasBackgroundImageInBotConfig()) {
            return logoUrl;
        }
        if (!selectedBot || !selectedBot.voiceCall.param) {
            return logoUrl;
        }
        const voiceCallParam = JSON.parse(selectedBot.voiceCall.param);
        return voiceCallParam.live2d?.backgroundURL;
    };
    const hangup = () => {
        onClose();
    };
    const getDevicesInfo = async (kind) => {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const devicesInfo = window.navigator.mediaDevices.enumerateDevices().then(devices => {
            const idSet = new Set();
            const input = devices
                .filter(d => d.kind == kind)
                .filter(d => {
                if (idSet.has(d.deviceId)) {
                    return false;
                }
                idSet.add(d.deviceId);
                return true;
            })
                .map(d => {
                if (d.label == '') {
                    return { deviceId: d.deviceId, label: 'Default', kind: d.kind, groupId: d.groupId };
                }
                return d;
            });
            return input;
        });
        mediaStream.getTracks().forEach(track => {
            track.stop();
        });
        return devicesInfo;
    };
    (0, react_2.useEffect)(() => {
        if (isOpen) {
            const getDeviceInfo = async () => {
                const inputList = await getDevicesInfo('audioinput');
                const outputList = await getDevicesInfo('audiooutput');
                setInputDeviceList(inputList);
                setOtputDeviceList(outputList);
                if (inputList.length) {
                    setSelectedInputDevice(inputList[0]);
                }
                if (outputList.length) {
                    setSelectedOutputDevice(outputList[0]);
                }
            };
            getDeviceInfo();
        }
    }, [isOpen]);
    const isDisplayAvatarAndName = () => {
        if (hasVideo) {
            return false;
        }
        if (useMobile && isWindowOn) {
            return false;
        }
        return true;
    };
    const isDislaySubtitle = () => {
        if (!isSubtitleOn) {
            return false;
        }
        if (isWindowOn && !useMobile) {
            return false;
        }
        return true;
    };
    const subTitleSlice = () => {
        if (!isWindowOn && hasVideo) {
            return [...chatHistory].slice(-4);
        }
        return [...chatHistory];
    };
    return ((0, jsx_runtime_1.jsx)(react_1.Modal, { onClose: onClose, size: "full", isOpen: isOpen, children: (0, jsx_runtime_1.jsx)(react_1.ModalContent, { className: "bg-surface", children: (0, jsx_runtime_1.jsxs)(react_1.ModalBody, { style: {
                    display: 'flex',
                    overflow: 'hidden',
                    padding: useMobile ? '0px' : '8px',
                    borderRadius: useMobile ? '0px' : '1.5rem',
                    width: '100%',
                    maxHeight: '100dvh'
                }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            backgroundImage: `url(${backgroundImage()})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }, className: `${isWindowOn && !useMobile ? 'w-1/2 mr-2' : 'w-full'} ${useMobile ? '' : 'rounded-4xl'}`, children: (0, jsx_runtime_1.jsxs)("div", { style: {
                                backdropFilter: hasVideo && hasBackgroundImageInBotConfig() ? '' : 'blur(40px)',
                                WebkitBackdropFilter: hasVideo && hasBackgroundImageInBotConfig() ? '' : 'blur(40px)',
                                background: hasVideo && hasBackgroundImageInBotConfig()
                                    ? ''
                                    : 'linear-gradient(180deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.80) 100%)'
                            }, className: `flex flex-col gap-y-4 h-full px-6 ${useMobile ? '' : 'rounded-4xl'}`, children: [hasVideo && ((0, jsx_runtime_1.jsx)(live2d_1.default, { isOpen: connectState == enums_1.VoiceCallStatusEnum.CONNECTING || connectState == enums_1.VoiceCallStatusEnum.CONNECTED, isTalking: isAiTalking, botInfo: selectedBot })), (0, jsx_runtime_1.jsxs)("div", { className: `flex flex-row justify-between align-middle relative py-10 ${useMobile ? '' : 'p-6'}`, children: [(0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('voice_call_hover_delay'), side: "bottom", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-white flex-row flex gap-2 relative items-center", children: [latency > 500 ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: highLatency_svg_1.default, alt: "voice call icon", className: "w-[14px] h-[18px]" })) : latency > 200 ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: middleLatency_svg_1.default, alt: "voice call icon", className: "w-[14px] h-[18px]" })) : ((0, jsx_runtime_1.jsx)(image_1.default, { src: lowLatency_svg_1.default, alt: "voice call icon", className: "w-[14px] h-[18px]" })), (0, jsx_runtime_1.jsx)("div", { className: "absolute left-[20px] w-[80px] self-center", children: `${latency} ms` })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute left-1/2", style: { transform: 'translateX(-50%)' }, children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col justify-center text-white font-bold ", children: connectState != enums_1.VoiceCallStatusEnum.CONNECTED ? ((0, jsx_runtime_1.jsx)("div", { children: t('voice_call_connecting') })) : ((0, jsx_runtime_1.jsx)("div", { children: timeFormatted })) }) }), (0, jsx_runtime_1.jsx)(EnergyProgress_1.default, { className: "flex relative items-center", energy: energy, dailyEnergy: dailyEnergy, hoverText: t('voice_call_energy_consume') })] }), isDisplayAvatarAndName() && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center content-center items-center gap-4", children: [(0, jsx_runtime_1.jsx)(react_1.Avatar, { className: "rounded-4xl overflow-hidden", w: "160px", h: "160px", src: logoUrl }), (0, jsx_runtime_1.jsx)("div", { className: "text-2xl text-white", children: name })] })), (0, jsx_runtime_1.jsxs)("div", { className: `grow flex flex-col-reverse z-10 text-white overflow-y-auto ${buttonAndChatWidth()}`, ref: subtitleRef, onScroll: (event) => {
                                        const { scrollTop } = event.currentTarget;
                                        if (scrollTop > -1) {
                                            event.currentTarget.scrollTo(0, -1);
                                        }
                                    }, children: [isDislaySubtitle() && isReplyLoading && ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-row justify-start m-2", children: (0, jsx_runtime_1.jsx)("div", { className: `rounded-br-xl rounded-bl-xl
                      'rounded-tr-xl'
                     p-2 max-w-[80%] py-4`, style: {
                                                    background: `var(--alpha-facetime-white, ${hasVideo ? 'rgba(0, 0, 0, 0.20)' : 'rgba(255, 255, 255, 0.20)'})`,
                                                    backdropFilter: 'blur(28px)',
                                                    WebkitBackdropFilter: 'blur(28px)'
                                                }, children: (0, jsx_runtime_1.jsx)(LoadingIcon_1.default, {}) }) })), !isAiTalking && asrTalkingResult && isDislaySubtitle() && ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-row justify-end m-2", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-br-xl rounded-bl-xl rounded-tl-xl p-2 max-w-[80%]", style: {
                                                    background: `var(--alpha-facetime-white, ${hasVideo ? 'rgba(0, 0, 0, 0.20)' : 'rgba(255, 255, 255, 0.20)'})`,
                                                    backdropFilter: 'blur(28px)',
                                                    WebkitBackdropFilter: 'blur(28px)'
                                                }, children: asrTalkingResult }) })), isDislaySubtitle() &&
                                            subTitleSlice()
                                                .reverse()
                                                .map((chat, index) => {
                                                return ((0, jsx_runtime_1.jsx)("div", { className: `flex flex-row justify-${chat.role === 'human' ? 'end' : 'start'} m-2`, children: (0, jsx_runtime_1.jsx)("div", { className: `rounded-br-xl rounded-bl-xl ${chat.role === 'human' ? 'rounded-tl-xl' : 'rounded-tr-xl'} p-2 max-w-[80%]`, style: {
                                                            background: `var(--alpha-facetime-white, ${hasVideo ? 'rgba(0, 0, 0, 0.20)' : 'rgba(255, 255, 255, 0.20)'})`,
                                                            backdropFilter: 'blur(28px)',
                                                            WebkitBackdropFilter: 'blur(28px)'
                                                        }, children: (0, jsx_runtime_1.jsx)(MdViewer, { nouseProse: true, content: chat.content }) }) }, index));
                                            })] }), (0, jsx_runtime_1.jsx)("div", { className: `flex-col-reverse flex z-30 text-white pb-8 ${isWindowOn && !useMobile ? 'px-4' : ''}`, children: (0, jsx_runtime_1.jsxs)("div", { className: `flex flex-row justify-between  ${buttonAndChatWidth()}}`, children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => {
                                                    setIsMicrophoneOn(!isMicrophoneOn);
                                                }, className: "relative z-0 flex p-4 justify-center align-center rounded-full", style: {
                                                    background: isMicrophoneOn ? 'rgba(255, 255, 255)' : 'rgba(255,255,255,0.10)',
                                                    backdropFilter: 'blur(16px)',
                                                    WebkitBackdropFilter: 'blur(16px)'
                                                }, children: [(0, jsx_runtime_1.jsxs)(react_1.Popover, { returnFocusOnClose: false, isOpen: devicesPopover.isOpen, onClose: () => {
                                                            deviceSelectedOpen.current = !deviceSelectedOpen.current;
                                                            devicesPopover.onClose();
                                                        }, placement: "top", closeOnBlur: true, closeOnEsc: true, children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)("div", {}) }), (0, jsx_runtime_1.jsx)(react_1.PopoverContent, { className: "text-black", children: (0, jsx_runtime_1.jsxs)(react_1.PopoverBody, { children: [inputDeviceList.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-500 py-2 flex justify-start", children: "Input Devices" }), (0, jsx_runtime_1.jsx)("div", { children: inputDeviceList.map(device => {
                                                                                        return ((0, jsx_runtime_1.jsxs)("button", { onClick: () => {
                                                                                                devicesPopover.onClose();
                                                                                                setSelectedInputDevice(device);
                                                                                                if (talk.current) {
                                                                                                    talk.current?.setInputDevice(device.deviceId);
                                                                                                    talk.current?.reloadAzureConnection();
                                                                                                }
                                                                                            }, className: "flex justify-between items-center py-2 w-full", children: [(0, jsx_runtime_1.jsx)("div", { children: device.label }), device.label == selectedInputDevice?.label ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: selected_svg_1.default, alt: "selected", className: "w-[16px] h-[16px]" })) : ((0, jsx_runtime_1.jsx)("div", {}))] }, device.deviceId));
                                                                                    }) }), (0, jsx_runtime_1.jsx)("hr", {})] })), outputDeviceList.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm text-gray-500 py-2 flex justify-start", children: "Output Devices" }), (0, jsx_runtime_1.jsx)("div", { children: outputDeviceList.map(device => {
                                                                                        return ((0, jsx_runtime_1.jsxs)("button", { onClick: () => {
                                                                                                devicesPopover.onClose();
                                                                                                setSelectedOutputDevice(device);
                                                                                                if (talk.current) {
                                                                                                    talk.current.setOutputDevice(device.deviceId);
                                                                                                }
                                                                                            }, className: "flex justify-between items-center py-2 w-full", children: [(0, jsx_runtime_1.jsx)("div", { children: device.label }), device.label == selectedOutputDevice?.label ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: selected_svg_1.default, alt: "selected", className: "w-[16px] h-[16px]" })) : ((0, jsx_runtime_1.jsx)("div", {}))] }, device.deviceId));
                                                                                    }) })] }))] }) })] }), isMicrophoneOn ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: microphoneOn_svg_1.default, alt: "micro phone on", className: "w-[32px] h-[32px]" })) : ((0, jsx_runtime_1.jsx)(image_1.default, { src: microphoneOff_svg_1.default, alt: "micro phone off", className: "w-[32px] h-[32px]" })), (0, jsx_runtime_1.jsx)("button", { className: "absolute p-1 bottom-0.5 right-0.5 z-10 flex justify-center align-center rounded-full", onClick: e => {
                                                            e.stopPropagation();
                                                            if (deviceSelectedOpen.current) {
                                                                devicesPopover.onClose();
                                                            }
                                                            else {
                                                                devicesPopover.onOpen();
                                                            }
                                                            deviceSelectedOpen.current = !deviceSelectedOpen.current;
                                                        }, style: {
                                                            background: isMicrophoneOn ? 'rgba(255, 255, 255)' : 'rgba(255,255,255,0.0)'
                                                        }, children: isMicrophoneOn ? (devicesPopover.isOpen ? ((0, jsx_runtime_1.jsx)(ChevronUpIcon_1.default, { className: "w-[12px] h-[12px] text-black" })) : ((0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, { className: "w-[12px] h-[12px] text-black" }))) : devicesPopover.isOpen ? ((0, jsx_runtime_1.jsx)(ChevronUpIcon_1.default, { className: "w-[12px] h-[12px] text-white" })) : ((0, jsx_runtime_1.jsx)(ChevronDownIcon_1.default, { className: "w-[12px] h-[12px] text-white" })) })] }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('voice_call_hover_subtitles'), side: "top", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                        setIsSubtitleOn(!isSubtitleOn);
                                                    }, className: "flex p-4 justify-center align-center rounded-full", style: {
                                                        background: isSubtitleOn ? 'rgba(255, 255, 255)' : 'rgba(255,255,255,0.10)',
                                                        backdropFilter: 'blur(16px)',
                                                        WebkitBackdropFilter: 'blur(16px)'
                                                    }, children: isSubtitleOn ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: subtitleOn_svg_1.default, alt: "micro phont on", className: "w-[32px] h-[32px]" })) : ((0, jsx_runtime_1.jsx)(image_1.default, { src: subtitleOff_svg_1.default, alt: "micro phont off", className: "w-[32px] h-[32px]" })) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('voice_call_hover_window'), side: "top", children: (0, jsx_runtime_1.jsx)("button", { onClick: () => {
                                                        setIsWindowOn(!isWindowOn);
                                                    }, className: "flex p-4 justify-center align-center rounded-full", style: {
                                                        background: isWindowOn ? 'rgba(255, 255, 255)' : 'rgba(255,255,255,0.10)',
                                                        backdropFilter: 'blur(16px)'
                                                    }, children: isWindowOn ? ((0, jsx_runtime_1.jsx)(image_1.default, { src: windowOn_svg_1.default, alt: "micro phont on", className: "w-[32px] h-[32px]" })) : ((0, jsx_runtime_1.jsx)(image_1.default, { src: windowOff_svg_1.default, alt: "micro phont off", className: "w-[32px] h-[32px]" })) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('voice_call_hover_hangup'), side: "top", children: (0, jsx_runtime_1.jsx)("button", { onClick: hangup, children: (0, jsx_runtime_1.jsx)(image_1.default, { src: hangup_svg_1.default, alt: "hangup", className: "w-[96px] h-[64px]" }) }) })] }) })] }) }), isWindowOn && !useMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "w-1/2 bg-surface text-on-surface rounded-4xl ml-2 flex flex-col z-10", children: [(0, jsx_runtime_1.jsx)("div", { className: "p-8 text-4xl", children: t('chat') }), (0, jsx_runtime_1.jsx)("hr", { className: "w-full border-t-0 border-b border-default" }), (0, jsx_runtime_1.jsxs)("div", { className: "p-8 overflow-auto", children: [[...chatHistory].map((chat, index) => {
                                        return chat.role == 'bot' ? ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-start items-center space-x-2 my-2 pr-2 md:pr-0", children: [(0, jsx_runtime_1.jsx)(react_1.Avatar, { src: (0, common_helper_1.getAssetsUrl)(selectedBot?.logo), w: "32px", h: "32px" }), (0, jsx_runtime_1.jsx)("div", { className: "relative flex w-4/5 mr-10 sm:mr-0", children: (0, jsx_runtime_1.jsx)(react_1.Box, { className: "flex justify-start items-center space-x-2", children: (0, jsx_runtime_1.jsx)(react_1.Box, { className: "bg-on-primary max-w-full w-fit rounded-[7px] py-[10px] px-[12px] leading-[21px]", wordBreak: "break-word", children: (0, jsx_runtime_1.jsx)("div", { className: "leading-[21px] text-sm md:text-base", children: (0, jsx_runtime_1.jsx)(MdViewer, { content: chat.content }) }) }) }) })] }, index)) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-end space-x-2 my-2", children: (0, jsx_runtime_1.jsxs)(react_1.Box, { className: "relative w-full flex justify-end my-2 pl-2 md:pl-0", children: [(0, jsx_runtime_1.jsx)(react_1.Box, { className: "bg-surface-variant text-on-surface max-w-full w-fit rounded-[7px] py-[10px] px-[12px] leading-[21px] mr-2", wordBreak: "break-word", children: (0, jsx_runtime_1.jsx)(react_1.Text, { className: "leading-[21px] text-sm md:text-base", whiteSpace: "pre-wrap", children: chat.content }) }), (0, jsx_runtime_1.jsx)(react_1.Avatar, { src: (0, common_helper_1.getAssetsUrl)(user?.avatar), w: "32px", h: "32px", mt: "10px" })] }) }, index));
                                    }), !isAiTalking && asrTalkingResult && ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-end item-center space-x-2 my-2", children: (0, jsx_runtime_1.jsxs)(react_1.Box, { className: "relative w-full flex justify-end my-2 pl-2 md:pl-0", children: [(0, jsx_runtime_1.jsx)(react_1.Box, { className: "bg-surface-variant text-on-surface max-w-full w-fit rounded-[7px] py-[10px] px-[12px] leading-[21px]", wordBreak: "break-word", children: (0, jsx_runtime_1.jsx)(react_1.Text, { className: "leading-[21px] text-sm md:text-base", whiteSpace: "pre-wrap", children: asrTalkingResult }) }), (0, jsx_runtime_1.jsx)(react_1.Avatar, { src: (0, common_helper_1.getAssetsUrl)(user?.avatar), w: "32px", h: "32px", mt: "10px" })] }) })), isReplyLoading && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex justify-start space-x-2 my-2 pr-2 md:pr-0", children: [(0, jsx_runtime_1.jsx)(react_1.Avatar, { src: (0, common_helper_1.getAssetsUrl)(selectedBot?.logo), w: "32px", h: "32px" }), (0, jsx_runtime_1.jsx)("div", { className: "relative flex w-4/5 mr-10 sm:mr-0", children: (0, jsx_runtime_1.jsx)(react_1.Box, { className: "flex justify-start items-center space-x-2", children: (0, jsx_runtime_1.jsx)(react_1.Box, { className: "bg-surface-variant text-on-surface max-w-full w-fit rounded-[7px] py-[10px] px-[12px] leading-[21px]", wordBreak: "break-word", children: (0, jsx_runtime_1.jsx)("div", { className: "w-[60px] p-1 rounded-xl", children: (0, jsx_runtime_1.jsx)(LoadingIcon_1.default, {}) }) }) }) })] }))] })] }))] }) }) }));
});
VoiceCallModal.displayName = 'VoiceCallModal';
exports.default = VoiceCallModal;
