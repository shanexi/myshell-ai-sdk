"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWidgetRunningText = exports.convertSecondsToMinutesAndSeconds = void 0;
exports.widgetImComponentsParser = widgetImComponentsParser;
exports.botDetailParser = botDetailParser;
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
dayjs_1.default.extend(duration_1.default);
const convertSecondsToMinutesAndSeconds = (seconds) => {
    const duration = dayjs_1.default.duration(seconds, 'seconds');
    const minutes = Math.floor(duration.asMinutes());
    const remainingSeconds = duration.seconds();
    if (minutes > 0) {
        return `${minutes}min${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
};
exports.convertSecondsToMinutesAndSeconds = convertSecondsToMinutesAndSeconds;
const generateWidgetRunningText = (widgetInfoInProconfig) => {
    const { widgetName, status, endTimeTimestamp, startTimeTimestamp } = widgetInfoInProconfig;
    const seconds = status === 'PROCESSING'
        ? (0, dayjs_1.default)().valueOf() / 1000 - Number(startTimeTimestamp)
        : Number(endTimeTimestamp) - Number(startTimeTimestamp);
    return `${widgetName} (${(0, exports.convertSecondsToMinutesAndSeconds)(seconds)})`;
};
exports.generateWidgetRunningText = generateWidgetRunningText;
function widgetImComponentsParser(imComponent) {
    return {
        ...(imComponent ?? {}),
        componentsInput: imComponent?.componentsInput?.map((item) => {
            let inputType = '';
            let defaultValue = '';
            let options = [];
            const props = {};
            let supportedFileTypes = [];
            switch (item.type) {
                case 'BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = item.supportedFileTypes;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_AUDIO_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_AUDIO_FILE'];
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_VIDEO_FILE'];
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_IMAGE_FILE'];
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD':
                    inputType = 'upload';
                    supportedFileTypes = ['MESSAGE_METADATA_TYPE_TEXT_FILE'];
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT':
                    inputType = 'textarea';
                    defaultValue = item.stringDefault;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR':
                    inputType = 'select';
                    defaultValue = item.textSelectorDefault;
                    options = item.textSelectorAllOf?.map((e) => {
                        return {
                            label: e.label || e.value,
                            value: e.value,
                            iconUrl: e.iconUrl
                        };
                    });
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT':
                    inputType = item.hasNumberLimitation ? 'numberSlider' : 'numberInput';
                    defaultValue = item.numberDefault;
                    props.maxLength = item.numberMax;
                    props.minLength = item.numberMin;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT':
                    inputType = item.hasIntegerLimitation ? 'interSlider' : 'interInput';
                    defaultValue = item.integerDefault;
                    props.maxLength = item.integerMax;
                    props.minLength = item.integerMin;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX':
                    inputType = 'checkbox';
                    defaultValue = item.booleanDefault;
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR':
                    inputType = 'numberSelect';
                    defaultValue = item.numberSelectorDefault;
                    options = item.numberSelectorAllOf?.map((e) => {
                        return {
                            label: e.label || e.value,
                            value: e.value,
                            iconUrl: e.iconUrl
                        };
                    });
                    break;
                case 'BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR':
                    inputType = 'codeEditor';
                    defaultValue = item.stringDefault;
                    break;
            }
            return {
                ...item,
                id: item.fieldName,
                serverType: item.type,
                props,
                rules: props,
                type: inputType,
                defaultValue,
                options,
                supportedFileTypes
            };
        })
    };
}
function botDetailParser(detail) {
    const { lastMessage = {}, latestInteractionDateUnix, canEditBot, inChatList, photos, pinned, summary = {}, setting = {}, unreadMessageCount, visitorCanChat, widgets, generateVoiceCostEnergy } = detail;
    const { backgroundImageThemeHexColors, ...sRest } = summary || {};
    const data = {
        canEditBot,
        pinned,
        inChatList,
        photos,
        generateVoiceCostEnergy,
        official: summary?.isOfficial,
        nsfw: summary?.tagList?.some((tag) => tag.id === '1800000000000000019'),
        userId: Number(summary?.author?.id || 0),
        lastMessage: lastMessage
            ? {
                ...lastMessage,
                createdDate: Number(lastMessage?.createdDateUnix),
                updatedDate: Number(lastMessage?.updatedDateUnix)
            }
            : null,
        ...(sRest || {}),
        createdDate: summary?.createdDateUnix,
        updatedDate: summary?.updatedDateUnix,
        botSetting: setting,
        language: summary?.language?.name ?? 'English',
        unreadMessageCount,
        privateBotId: Number(summary?.privateBotId || 0),
        lastInteractionDate: Number(latestInteractionDateUnix || 0),
        schemes: backgroundImageThemeHexColors?.schemes ?? null,
        visitorCanChat,
        isImageBot: summary?.botGenType === 'BOT_GEN_TYPE_IMAGE' || summary?.botGenType === 'BOT_GEN_TYPE_GIF',
        membershipChatConfig: summary?.membershipChatConfig ?? {},
        stakingDisabled: summary?.stakingDisabled,
        isPanelImageBot: summary?.chatPanelType === 'BOT_CHAT_PANEL_TYPE_COMPONENT',
        isComponentBot: summary?.chatPanelType === 'BOT_CHAT_PANEL_TYPE_COMPONENT',
        imComponent: {
            ...summary?.imComponent,
            componentsInput: summary?.imComponent?.componentsInput?.map((item) => {
                let inputType = '';
                let defaultValue = '';
                let options = [];
                const props = {};
                let supportedFileTypes = [];
                switch (item.type) {
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_FILE_UPLOAD':
                        inputType = 'upload';
                        supportedFileTypes = item.supportedFileTypes;
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_AUDIO_UPLOAD':
                        inputType = 'upload';
                        supportedFileTypes = ['MESSAGE_METADATA_TYPE_AUDIO_FILE'];
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_VIDEO_UPLOAD':
                        inputType = 'upload';
                        supportedFileTypes = ['MESSAGE_METADATA_TYPE_VIDEO_FILE'];
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_IMAGE_UPLOAD':
                        inputType = 'upload';
                        supportedFileTypes = ['MESSAGE_METADATA_TYPE_IMAGE_FILE'];
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_UPLOAD':
                        inputType = 'upload';
                        supportedFileTypes = ['MESSAGE_METADATA_TYPE_TEXT_FILE'];
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_INPUT':
                        inputType = 'textarea';
                        defaultValue = item.stringDefault;
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_TEXT_SELECTOR':
                        inputType = 'select';
                        defaultValue = item.textSelectorDefault;
                        options = item.textSelectorAllOf?.map((e) => {
                            return {
                                label: e.label || e.value,
                                value: e.value,
                                iconUrl: e.iconUrl
                            };
                        });
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_INPUT':
                        inputType = item.hasNumberLimitation ? 'numberSlider' : 'numberInput';
                        defaultValue = item.numberDefault;
                        props.maxLength = item.numberMax;
                        props.minLength = item.numberMin;
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_INTEGER_INPUT':
                        inputType = item.hasIntegerLimitation ? 'interSlider' : 'interInput';
                        defaultValue = item.integerDefault;
                        props.maxLength = item.integerMax;
                        props.minLength = item.integerMin;
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_CHECKBOX':
                        inputType = 'checkbox';
                        defaultValue = item.booleanDefault;
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_NUMBER_SELECTOR':
                        inputType = 'numberSelect';
                        defaultValue = item.numberSelectorDefault;
                        options = item.numberSelectorAllOf?.map((e) => {
                            return {
                                label: e.label || e.value,
                                value: e.value,
                                iconUrl: e.iconUrl
                            };
                        });
                        break;
                    case 'BOT_IM_COMPONENT_INPUT_TYPE_CODE_EDITOR':
                        inputType = 'codeEditor';
                        defaultValue = item.stringDefault;
                        break;
                    default:
                        break;
                }
                return {
                    ...item,
                    id: item.fieldName,
                    serverType: item.type,
                    props,
                    rules: props,
                    type: inputType,
                    defaultValue,
                    options,
                    supportedFileTypes
                };
            })
        },
        widgets
    };
    return data;
}
