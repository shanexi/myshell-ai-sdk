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
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const user_1 = require("../../../common/constants/enums/user.js");
const workshop_1 = require("../../../common/constants/enums/workshop.js");
const useCheckEnergyPack_1 = __importDefault(require("../../../common/hooks/useCheckEnergyPack.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const useWidgetRecorder_1 = __importStar(require("./useWidgetRecorder.js"));
const useWidgetVoiceMessageSender_1 = __importDefault(require("./useWidgetVoiceMessageSender.js"));
const useWidgetVoiceInput = ({ onSend, widgetInfo, userSelectVoiceRef, isMobile }) => {
    const { startRecording, stopRecording, clearRecord, supportedType, dispatch, state } = (0, useWidgetRecorder_1.default)(widgetInfo);
    const audioPlayer = (0, react_1.useRef)(null);
    const sensors = (0, sensors_1.useSensors)();
    const { sendVoiceMessage } = (0, useWidgetVoiceMessageSender_1.default)({
        audioType: supportedType,
        clearRecord,
        widgetInfo
    });
    const t = (0, next_intl_1.useTranslations)('chat');
    const widgetSending = (0, store_1.useWorkshopStore)(state => state.widgetSending);
    const setWidgetInputType = (0, store_1.useWorkshopStore)(state => state.setWidgetInputType);
    const widgetInputType = (0, store_1.useWorkshopStore)(state => state.widgetInputType);
    const user = (0, store_1.useUserStore)(state => state.user);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const { checkBeforePopupNoEnergy } = (0, useCheckEnergyPack_1.default)();
    const onlyOnceRef = (0, react_1.useRef)(false);
    const placeholder = widgetInfo?.status === workshop_1.WidgetStatusEnum.STATUS_PRIVATE ? t('placeholder_disabled') : t('record_top');
    const disabled = (0, react_1.useMemo)(() => widgetInfo?.status === workshop_1.WidgetStatusEnum.STATUS_PRIVATE ||
        (isVisitor === user_1.VisitorEnum.NO && energy < (widgetInfo?.energyPerChat ?? 1)) ||
        (!widgetInfo?.visitorCanChat && isVisitor === user_1.VisitorEnum.YES), [widgetInfo, isVisitor, energy]);
    const sendMsg = async (recordData) => {
        try {
            await sendVoiceMessage({ recordState: recordData });
        }
        catch (error) {
            console.error(error);
        }
        if (isMobile) {
            setWidgetInputType('text');
        }
        const tagnames = widgetInfo?.tags?.map(e => `${e.label}`) || [];
        sensors?.track('UserSendMessage', {
            message_type: 'voice',
            widget_id: widgetInfo?.id,
            widget_name: widgetInfo?.name,
            keyboard_behavior: 'DirectInput',
            chat_platform: 'web2',
            ...(tagnames?.length > 0 && { tag_name: tagnames }),
            bot_battery_cost: widgetInfo?.energyPerChat,
            user_membership_type: isVisitor ? '0' : user?.isGenesisPasscard || user?.isPasscard ? '3' : `${user?.level}`
        });
    };
    const handleSend = async () => {
        onSend(true);
        let recordData = state;
        try {
            if (isMobile) {
                recordData = (await stopRecording());
            }
        }
        catch (error) {
            console.error(error);
        }
        if (isVisitor !== 2) {
            sendMsg(recordData);
            return;
        }
        if (widgetInfo?.energyPerChat && energy < widgetInfo.energyPerChat) {
            checkBeforePopupNoEnergy();
            return;
        }
        sendMsg(recordData);
    };
    const onVisibilityChange = (0, react_1.useCallback)(() => {
        if (document.visibilityState !== 'visible') {
            stopRecording();
        }
    }, [stopRecording]);
    (0, react_1.useEffect)(() => {
        document.addEventListener('visibilitychange', onVisibilityChange);
        window.addEventListener('pagehide', onVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', onVisibilityChange);
            window.removeEventListener('pagehide', onVisibilityChange);
        };
    }, [onVisibilityChange, stopRecording]);
    const startPlaying = () => {
        dispatch({
            type: useWidgetRecorder_1.RecordStateEnum.Playing
        });
    };
    const stopPlaying = () => {
        dispatch({
            type: useWidgetRecorder_1.RecordStateEnum.Stopped
        });
    };
    const timeUpdate = (0, react_1.useCallback)(() => {
        if (audioPlayer.current) {
            const { currentTime } = audioPlayer.current;
            dispatch({
                type: useWidgetRecorder_1.RecordActionType.SET_TIME_UPDATE,
                payload: {
                    timeUpdate: currentTime
                }
            });
        }
    }, [dispatch]);
    const handlePlay = () => {
        if (audioPlayer.current) {
            if (state.status === useWidgetRecorder_1.RecordStateEnum.Playing) {
                audioPlayer.current.removeEventListener('timeupdate', timeUpdate);
                audioPlayer.current?.pause();
                stopPlaying();
            }
            else {
                audioPlayer.current.addEventListener('timeupdate', timeUpdate);
                audioPlayer.current.play();
                startPlaying();
            }
        }
    };
    const afterPlayEnd = () => {
        stopPlaying();
    };
    const handleStartRecording = () => {
        if (disabled) {
            return;
        }
        audioPlayer.current = null;
        startRecording();
    };
    const startRecordingRef = (0, react_1.useRef)(handleStartRecording);
    (0, react_1.useEffect)(() => {
        startRecordingRef.current = handleStartRecording;
    }, [handleStartRecording]);
    (0, react_1.useEffect)(() => {
        if (['delete'].includes(widgetInputType)) {
            userSelectVoiceRef.current = false;
        }
    }, [widgetInputType]);
    (0, react_1.useEffect)(() => {
        if (userSelectVoiceRef.current && !onlyOnceRef.current) {
            onlyOnceRef.current = true;
            startRecordingRef.current();
        }
    }, [userSelectVoiceRef.current]);
    return {
        audioPlayer,
        state,
        sending: widgetSending,
        disabled,
        setWidgetInputType,
        handleSend,
        afterPlayEnd,
        clearRecord,
        stopRecording,
        handlePlay,
        handleStartRecording,
        placeholder
    };
};
exports.default = useWidgetVoiceInput;
