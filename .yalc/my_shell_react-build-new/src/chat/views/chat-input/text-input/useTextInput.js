"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const useTextMessageSender_1 = __importDefault(require("../../../../chat/views/hooks/useTextMessageSender.js"));
const useCheckEnergyPack_1 = __importDefault(require("../../../../common/hooks/useCheckEnergyPack.js"));
const useDetectKeyboardOpen_1 = require("../../../../common/hooks/useDetectKeyboardOpen.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const tokenizer2_1 = require("../../../../common/utils/tokenizer2.js");
const sensors_1 = require("../../../../lib/sensors/index.js");
const store_1 = require("../../../../services/store/index.js");
const useTextInput = ({ onSend, selectedBot, textInputRef, workshopChat = false, scrollLayoutToTop }) => {
    const { warning } = (0, useNotification_1.useNotification)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const sensors = (0, sensors_1.useSensors)();
    const t = (0, next_intl_1.useTranslations)('chat');
    const sending = (0, store_1.useChatStore)(state => state.sending);
    const setInputType = (0, store_1.useChatStore)(state => state.setInputType);
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const reEditTriggerred = (0, store_1.useChatStore)(state => state.reEditTriggerred);
    const setReEditTriggerred = (0, store_1.useChatStore)(state => state.setReEditTriggerred);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const user = (0, store_1.useUserStore)(state => state.user);
    const setLastInputMethod = (0, store_1.useChatStore)(state => state.setLastInputMethod);
    const lastInputMethod = (0, store_1.useChatStore)(state => state.lastInputMethod);
    const compositionFlag = (0, react_1.useRef)(false);
    const [tokenLen, setTokenLen] = (0, react_1.useState)(0);
    const { checkBeforePopupNoEnergy } = (0, useCheckEnergyPack_1.default)();
    const { textMessage, inputLock, setTextMessage, clearTextMessage, sendTextMessage } = (0, useTextMessageSender_1.default)(selectedBot);
    const scrollIntoView = (0, react_1.useCallback)((isOpen) => {
        if (isOpen) {
            textInputRef?.current?.scrollIntoView();
        }
    }, [textInputRef?.current]);
    (0, useDetectKeyboardOpen_1.useDetectKeyboardOpen)({ callback: scrollIntoView });
    (0, react_1.useEffect)(() => {
        if (inputType === 'text' && !isMobile) {
            textInputRef?.current?.focus();
            onSend(false);
        }
    }, [inputType]);
    (0, react_1.useEffect)(() => {
        if (!sending && !isMobile) {
            textInputRef?.current && textInputRef?.current.focus();
        }
    }, [sending]);
    (0, react_1.useEffect)(() => {
        if (reEditTriggerred) {
            textInputRef?.current && textInputRef?.current.focus();
            setReEditTriggerred(false);
        }
    }, [reEditTriggerred]);
    const sendMsg = (msg) => {
        sendTextMessage(msg);
        if (isMobile) {
            textInputRef?.current && textInputRef?.current.blur();
        }
        const tagnames = selectedBot?.tagList?.map((e) => `${e.label}`) || [];
        if (sensors && sensors.track) {
            sensors?.track('UserSendMessage', {
                message_type: 'text',
                bot_id: selectedBot?.id,
                bot_name: selectedBot?.name,
                keyboard_behavior: lastInputMethod,
                chat_platform: 'web2',
                ...(tagnames?.length > 0 && { tag_name: tagnames }),
                bot_battery_cost: neededEnergy,
                token_count: tokenLen,
                user_membership_type: isVisitor ? '0' : user?.isGenesisPasscard || user?.isPasscard ? '3' : `${user?.level}`
            });
        }
    };
    const handleSend = async (msg) => {
        onSend(true);
        if (isVisitor !== 2) {
            sendMsg(msg);
            return;
        }
        if (energy < neededEnergy) {
            checkBeforePopupNoEnergy();
            return;
        }
        sendMsg(msg);
    };
    const handleKeyDown = (event, getMsg, toolbarState) => {
        const functionKeys = [
            'CapsLock',
            'Tab',
            'Shift',
            'Control',
            'Alt',
            'Meta',
            'ContextMenu',
            'ArrowLeft',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown'
        ];
        if (!functionKeys.includes(event.key)) {
            setLastInputMethod('DirectInput');
        }
        if (event.key === 'Enter' && !isMobile) {
            scrollLayoutToTop?.();
            event.preventDefault();
            if (event.shiftKey || event.altKey) {
                if (textInputRef?.current) {
                    const { selectionStart, selectionEnd } = textInputRef?.current;
                    const newValue = `${textMessage.substring(0, selectionStart)}\n${textMessage.substring(selectionEnd)}`;
                    setTextMessage(newValue);
                    requestAnimationFrame(() => {
                        if (textInputRef?.current) {
                            textInputRef?.current.setSelectionRange(selectionStart + 1, selectionStart + 1);
                        }
                    });
                }
                setTimeout(() => {
                    if (textInputRef?.current) {
                        textInputRef?.current.scrollTo({
                            top: textInputRef?.current.scrollHeight
                        });
                    }
                });
            }
            else {
                if (!compositionFlag.current && toolbarState.notReachMiniumFilesTip) {
                    warning({ content: toolbarState.notReachMiniumFilesTip });
                    return;
                }
                if (!compositionFlag.current && getMsg && !toolbarState.sendDisabled) {
                    const msg = getMsg();
                    handleSend(msg);
                }
            }
        }
        else if (event.key === 'Escape') {
            event.preventDefault();
            clearTextMessage();
        }
    };
    const handleCompositionStart = () => {
        compositionFlag.current = true;
    };
    const handleCompositionEnd = () => {
        compositionFlag.current = false;
    };
    const handleFocus = () => {
    };
    const disabled = inputLock ||
        sending ||
        (isVisitor === 2 && energy < (selectedBot?.energyPerChat ?? 1)) ||
        (isVisitor === 1 && selectedBot?.visitorCanChat == false);
    const updateTokenLen = async (value) => {
        const count = await (0, tokenizer2_1.getTokenCount)(value);
        setTokenLen(count);
    };
    (0, react_1.useEffect)(() => {
        updateTokenLen(textMessage);
    }, [textMessage]);
    const placeholder = disabled && !sending ? t('current_feature_unavailable') : t('placeholder');
    const neededEnergy = (0, react_1.useMemo)(() => {
        if (tokenLen > (selectedBot?.llmModel?.model?.maxChatToken || 1500)) {
            return (selectedBot?.llmModel?.energyPerLevelByPass || [])[(selectedBot?.llmModel?.energyPerLevelByPass?.length ?? 0) - 1];
        }
        return (selectedBot?.llmModel?.energyPerLevelByPass || [])[Math.ceil((tokenLen || 1) / 1500) - 1] || 1;
    }, [selectedBot?.llmModel, tokenLen]);
    const hasEnoughEnergy = (0, react_1.useMemo)(() => {
        return energy >= neededEnergy;
    }, [energy, neededEnergy]);
    return {
        textMessage,
        handleCompositionStart,
        handleCompositionEnd,
        handleKeyDown,
        handleFocus,
        tokenLen,
        setTextMessage,
        sending,
        handleSend,
        disabled,
        setInputType,
        placeholder,
        neededEnergy,
        hasEnoughEnergy
    };
};
exports.default = useTextInput;
