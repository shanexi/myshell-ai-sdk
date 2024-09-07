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
const ArrowDownTrayIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowDownTrayIcon"));
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowPathIcon"));
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const MagnifyingGlassPlusIcon_1 = __importDefault(require("@heroicons/react/24/outline/MagnifyingGlassPlusIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dayjs_1 = __importDefault(require("dayjs"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const enums_1 = require("../../../../chat/model/enums.js");
const interfaces_1 = require("../../../../chat/model/interfaces.js");
const AudioStreamPlayer_1 = __importDefault(require("../../../../chat/views/chat-body/reply-message/stream/AudioStreamPlayer.js"));
const useTextMessageSender_1 = __importDefault(require("../../../../chat/views/hooks/useTextMessageSender.js"));
const Image_1 = __importDefault(require("../../../../common/components/Image.js"));
const ImageGallery_1 = __importDefault(require("../../../../common/components/ImageGallery/index.js"));
const LoadingIcon_1 = __importDefault(require("../../../../common/components/icons/LoadingIcon.js"));
const VariationIcon_1 = __importDefault(require("../../../../common/components/icons/VariationIcon.js"));
const checkbox_1 = require("../../../../common/components/ui/checkbox.js");
const modal_1 = require("../../../../common/components/ui/modal.js");
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const bot_1 = require("../../../../common/constants/interfaces/bot.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const download_1 = require("../../../../common/utils/download.js");
const image_1 = require("../../../../common/utils/image.js");
const Loading_1 = __importDefault(require("../../../../components/skeleton/Loading.js"));
const usePublishGallery_1 = __importDefault(require("../../../../gallery/hooks/usePublishGallery.js"));
const GalleryPublishTipModal_1 = __importDefault(require("../../../../gallery/views/GalleryPublishTipModal.js"));
const store_1 = require("../../../../services/store/index.js");
const AudioPlaceholder_1 = __importDefault(require("./AudioPlaceholder.js"));
const useReplyMessage_1 = require("./useReplyMessage.js");
const AudioPlayer_1 = __importDefault(require("../audio-player/AudioPlayer.js"));
const MsgReport = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../msg-report/MsgReport.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)(Loading_1.default, {}),
    ssr: false
});
const MdViewer = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../common/components/MdViewer.js'))), {
    loading: () => (0, jsx_runtime_1.jsx)("div", { children: "loading..." }),
    ssr: false
});
function ReplyMessage({ chat, onChangeCopyText, selectedBot, latest, botChatSetting, isMobile, scrollToBottom }) {
    const { imageGenMessageResponse } = chat;
    const { imgBatch, metadata, genStatus, jobId } = imageGenMessageResponse || {};
    const hasImages = Array.isArray(imgBatch) && imgBatch.length > 0;
    const { textMessage, showProgressBar, showAudio, urlAudio, streamAudio, iosAudio, pendingForRegenerate, generating, updateMessage, handleRegenerate, voiceNeedRegenerate, chatlocale, singleTranscriptionDisplayOpen } = (0, useReplyMessage_1.useReplyMessage)({ chat, onChangeCopyText, selectedBot, latest, botChatSetting });
    const { sendTextMessage } = (0, useTextMessageSender_1.default)(selectedBot);
    const sendTextRef = (0, react_1.useRef)(sendTextMessage);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const t = (0, next_intl_1.useTranslations)();
    const { warning } = (0, useNotification_1.useNotification)();
    const { pathname } = (0, usePathLocale_1.usePathLocale)();
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const [loadingIndex, setLoadingIndex] = (0, react_1.useState)(-1);
    const [showFeedback, setShowFeedback] = (0, react_1.useState)(false);
    const [preview, setPreview] = (0, react_1.useState)({
        isPreview: false,
        startIndex: 0
    });
    const [multiCheck, setMultiCheck] = (0, react_1.useState)({
        isChecked: false,
        payload: []
    });
    const multiPublishMap = (0, store_1.useChatStore)(state => state.multiPublishMap);
    const setMultiPublishMap = (0, store_1.useChatStore)(state => state.setMultiPublishMap);
    const flagUserFirstPublishGallery = (0, store_1.useUserStore)(state => state.flagUserFirstPublishGallery);
    (0, react_1.useMemo)(() => {
        sendTextRef.current = sendTextMessage;
    }, [sendTextMessage]);
    const handleImageMsgByType = (0, react_1.useCallback)(async (params) => {
        setLoadingIndex(params.index);
        await sendTextRef.current({
            requestData: params
        });
        setLoadingIndex(-1);
    }, []);
    const handleClosePreview = (0, react_1.useCallback)(() => {
        setPreview({
            isPreview: false,
            startIndex: 0
        });
    }, []);
    const aspectRatio = (0, image_1.divideToFraction)(Number(metadata?.width || 1), Number(metadata?.height || 1)).text;
    const aspectRatioStyle = hasImages
        ? {
            aspectRatio
        }
        : {};
    const isUpscale = metadata?.genType === 'IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE';
    const isGif = metadata?.genType === 'IMAGE_GEN_MESSAGE_TYPE_SIMPLE_GIF';
    const hidden = chat.status !== enums_1.MessageStatusEnum.DONE || !hasImages || genStatus === interfaces_1.ImageStatus.PROCESSING;
    const noEnoughEnergyWaring = (0, react_1.useCallback)(() => {
        warning({
            content: t('common.no_enough_energy_for_current_action'),
            id: 'no_enough_energy_for_current_action'
        });
    }, [t]);
    const handleCancelMultiCheck = (0, react_1.useCallback)(() => {
        setMultiCheck({
            isChecked: false,
            payload: []
        });
    }, []);
    const handleClick = (0, react_1.useCallback)(async ({ event, item, img, index, from }) => {
        event.stopPropagation();
        const isFromModal = from === 'modal';
        if (!img && !multiCheck.isChecked && item.type !== 'regenerate') {
            setMultiCheck({
                isChecked: true,
                payload: []
            });
            return;
        }
        let payload = [];
        if (img) {
            payload = [img];
        }
        else {
            payload = multiCheck.payload;
        }
        payload.sort((a, b) => a.index - b.index);
        const noEnoughEnergy = isVisitor === 2 && energy < payload.length * 4;
        switch (item.type) {
            case 'download':
                {
                    setLoadingIndex(index);
                    for (const p of payload) {
                        const url = p.original;
                        const type = url.split('.').pop();
                        const name = `Myshell_Image_${selectedBot?.name}_${(0, dayjs_1.default)().format('YYMMDD_HHmmss')}.${type}`;
                        await (0, download_1.downloadFile)(url, name);
                    }
                    setLoadingIndex(-1);
                    handleCancelMultiCheck();
                }
                break;
            case 'upscale':
                {
                    if (noEnoughEnergy) {
                        noEnoughEnergyWaring();
                        return;
                    }
                    if (isFromModal) {
                        handleClosePreview();
                    }
                    await scrollToBottom();
                    handleCancelMultiCheck();
                    for (const img of payload) {
                        await handleImageMsgByType({
                            index,
                            text: 'Upscale Image',
                            count: imgBatch?.length,
                            batchNumber: img.batchIndex,
                            imageNumber: img.index,
                            genType: 'IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE',
                            imageGenMessage: {
                                genType: bot_1.ImageGenMessageType.IMAGE_GEN_MESSAGE_TYPE_UPSCALE_MESSAGE,
                                upscaleMessage: { referenceMsgId: chat.id, batchNumber: img.batchIndex, imageNumber: img.index }
                            }
                        });
                    }
                }
                break;
            case 'variation':
                {
                    if (noEnoughEnergy) {
                        noEnoughEnergyWaring();
                        return;
                    }
                    if (isFromModal) {
                        handleClosePreview();
                    }
                    await scrollToBottom();
                    handleCancelMultiCheck();
                    for (const img of payload) {
                        await handleImageMsgByType({
                            index,
                            count: imgBatch?.length,
                            batchNumber: img.batchIndex,
                            imageNumber: img.index,
                            text: 'Variation Image',
                            genType: 'IMAGE_GEN_MESSAGE_TYPE_VARIATION_MESSAGE',
                            imageGenMessage: {
                                genType: bot_1.ImageGenMessageType.IMAGE_GEN_MESSAGE_TYPE_VARIATION_MESSAGE,
                                variationMessage: { referenceMsgId: chat.id, batchNumber: img.batchIndex, imageNumber: img.index }
                            }
                        });
                    }
                }
                break;
            case 'regenerate':
                {
                    if (noEnoughEnergy) {
                        noEnoughEnergyWaring();
                        return;
                    }
                    await scrollToBottom();
                    handleImageMsgByType({
                        index,
                        count: imgBatch?.length,
                        text: 'Regenerate Image',
                        genType: 'IMAGE_GEN_MESSAGE_TYPE_REGENERATE_MESSAGE',
                        imageGenMessage: {
                            genType: bot_1.ImageGenMessageType.IMAGE_GEN_MESSAGE_TYPE_REGENERATE_MESSAGE,
                            regenerateMessage: { referenceMsgId: chat.id }
                        }
                    });
                }
                break;
            case 'feedback':
                {
                    setShowFeedback(true);
                }
                break;
            default:
                break;
        }
    }, [
        noEnoughEnergyWaring,
        energy,
        scrollToBottom,
        chatlocale,
        handleImageMsgByType,
        multiCheck,
        selectedBot?.name,
        chat.id,
        handleClosePreview,
        hasImages && imgBatch.length,
        isVisitor,
        handleCancelMultiCheck
    ]);
    const handleImageChecked = (0, react_1.useCallback)((checkedState, img) => {
        setMultiCheck((prev) => {
            const { isChecked, payload } = prev;
            let newPayload = [...payload];
            if (checkedState) {
                newPayload.push(img);
            }
            else {
                newPayload = newPayload.filter(item => item.original !== img.original);
            }
            return {
                isChecked,
                payload: newPayload
            };
        });
    }, []);
    const handleImagePublishChecked = (0, react_1.useCallback)((img) => {
        setMultiPublishMap(img.original, {
            messageId: chat.id,
            imageLink: img.original,
            botId: chat.botId,
            naturalHeight: img.originalHeight,
            naturalWidth: img.originalWidth
        });
    }, []);
    const BottomActions = (0, react_1.useMemo)(() => {
        const actions = [
            {
                icon: MagnifyingGlassPlusIcon_1.default,
                event: handleClick,
                label: chatlocale('Upscale'),
                type: 'upscale',
                showText: false
            },
            {
                icon: VariationIcon_1.default,
                event: handleClick,
                label: chatlocale('Variation'),
                type: 'variation',
                showText: false
            },
            {
                icon: ArrowDownTrayIcon_1.default,
                event: handleClick,
                label: chatlocale('Download'),
                type: 'download',
                showText: false
            },
            {
                icon: ArrowPathIcon_1.default,
                event: handleClick,
                label: chatlocale('Regenerate'),
                type: 'regenerate',
                showText: false,
                alternate: {
                    type: 'cancel',
                    text: t('common.cancel'),
                    event: handleCancelMultiCheck,
                    showText: false
                }
            }
        ];
        if (isUpscale) {
            return [{ ...actions[2], showText: true }];
        }
        if (isGif) {
            return [{ ...actions[2], showText: true }];
        }
        return actions;
    }, [handleClick, isUpscale, t, chatlocale]);
    const feedbackAction = (0, react_1.useMemo)(() => {
        return {
            icon: ExclamationTriangleIcon_1.default,
            event: handleClick,
            label: chatlocale('feedback'),
            type: 'feedback',
            showText: false
        };
    }, [handleClick]);
    const ImageActions = (0, react_1.useMemo)(() => {
        return [...BottomActions.slice(0, 3), feedbackAction];
    }, [BottomActions, handleClick, feedbackAction]);
    const previeActions = (0, react_1.useMemo)(() => {
        const actions = isUpscale ? BottomActions : BottomActions.slice(0, 3);
        return isMobile ? actions.concat(feedbackAction) : actions;
    }, [isUpscale, BottomActions, isMobile, feedbackAction]);
    const images = (0, react_1.useMemo)(() => {
        return (hasImages ? imgBatch : []).map((batch, batchIndex) => {
            return batch.img.map((url, index) => {
                return {
                    original: url,
                    thumbnail: url,
                    batchIndex,
                    index,
                    originalHeight: String(metadata?.height ?? ''),
                    originalWidth: String(metadata?.width ?? '')
                };
            });
        });
    }, [hasImages, imgBatch, metadata]);
    const modalImages = (0, react_1.useMemo)(() => {
        return images.flat();
    }, [images]);
    const { publishing, publishGalleryList } = (0, usePublishGallery_1.default)();
    const [popupConfirmObj, setPopupConfirmObj] = (0, react_1.useState)(null);
    const [publishState, setPublishState] = (0, react_1.useState)('info');
    const [tipImageLoad, setTipImageLoad] = (0, react_1.useState)(false);
    const disabled = Object.keys(multiPublishMap).length >= 4;
    const imageLoadCallback = (index) => {
        index === 0 && setTipImageLoad(true);
    };
    const handlePreview = (0, react_1.useCallback)((event, img, isImgChecked, isPublishChecked) => {
        if (inputType === 'publish') {
            (!disabled || isPublishChecked) && handleImagePublishChecked(img);
        }
        else if (!multiCheck.isChecked) {
            setPreview({
                isPreview: true,
                startIndex: img.batchIndex * 4 + img.index
            });
        }
        else {
            setMultiCheck((prev) => {
                const { isChecked, payload } = prev;
                let newPayload = [...payload];
                if (!isImgChecked) {
                    newPayload.push(img);
                }
                else {
                    newPayload = newPayload.filter(item => item.original !== img.original);
                }
                return {
                    isChecked,
                    payload: newPayload
                };
            });
        }
    }, [multiCheck.isChecked, inputType, disabled]);
    const handleClose = (0, react_1.useCallback)(() => {
        setShowFeedback(false);
    }, []);
    const handlePreviewClose = (0, react_1.useCallback)(() => {
        setPreview({
            isPreview: false,
            startIndex: 0
        });
    }, []);
    const { success } = (0, useNotification_1.useNotification)();
    const publishSuccessCb = (0, react_1.useCallback)(() => {
        if (publishState === 'info' && !flagUserFirstPublishGallery) {
            setPublishState('success');
        }
        else {
            success({
                content: t('chat.suc_send')
            });
            setPopupConfirmObj(null);
            setPublishState('info');
            handlePreviewClose();
        }
    }, [setPopupConfirmObj]);
    const confirmHandler = (0, react_1.useCallback)(() => {
        if (publishState === 'success') {
            setPopupConfirmObj(null);
            setPublishState('info');
            handlePreviewClose();
        }
        else {
            popupConfirmObj && publishGalleryList(publishSuccessCb, [popupConfirmObj]);
        }
    }, [publishState, publishGalleryList, publishSuccessCb]);
    const publishGalleryHandle = (0, react_1.useCallback)((image) => {
        const publishObj = {
            botId: chat.botId,
            imageLink: image.original,
            messageId: chat.id,
            naturalHeight: image.originalHeight || 0,
            naturalWidth: image.originalWidth || 0
        };
        if (flagUserFirstPublishGallery) {
            publishGalleryList(publishSuccessCb, [publishObj]);
        }
        else {
            setPopupConfirmObj(publishObj);
        }
    }, [publishGalleryList, flagUserFirstPublishGallery]);
    const renderToolTipLabel = (item) => {
        const needEnergy = isVisitor === 2 && (item.type === 'upscale' || item.type === 'variation' || item.type === 'regenerate');
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row justify-center items-center", children: [(0, jsx_runtime_1.jsxs)("span", { children: [item.label, " "] }), needEnergy && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { children: "\u00A0(" }), (0, jsx_runtime_1.jsx)("img", { src: "/icons/thunder.svg", alt: "thunder", className: "w-[14px] h-[14px]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-on-surface ml-[2px]", children: "4" }), (0, jsx_runtime_1.jsx)("span", { children: ")" })] }))] }));
    };
    const renderItem = (0, react_1.useCallback)((item) => {
        if (!Array.isArray(item)) {
            return null;
        }
        const imgLen = item.length;
        let cl = '';
        switch (imgLen) {
            case 1:
                cl = 'grid-cols-1 grid-rows-1';
                break;
            case 2:
                cl = 'grid-cols-2 grid-rows-1';
                break;
            case 4:
                cl = 'grid-cols-2 grid-rows-2';
                break;
        }
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('grid gap-x-px gap-y-px', cl), children: item.map((img, index) => {
                const isChecked = !!multiCheck.payload.find((c) => c.original === img.original);
                const isPublishChecked = !!multiPublishMap[img.original];
                return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative', `group/item`), style: aspectRatioStyle, children: [(0, jsx_runtime_1.jsx)(Image_1.default, { style: aspectRatioStyle, alt: "", src: img.original, index: index, status: genStatus, aspectRatio: aspectRatio, onClick: (e) => handlePreview(e, img, isChecked, isPublishChecked), imageLoadCallback: () => {
                                imageLoadCallback(index);
                            } }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('hidden z-10 absolute left-1/2 -translate-x-1/2  flex-row justify-center items-center gap-x-2 xl:gap-x-4', {
                                'group-hover/item:flex': !isMobile && !hidden && loadingIndex === -1 && !multiCheck.isChecked && inputType !== 'publish',
                                'bottom-3': String(aspectRatio) !== '5/1',
                                'bottom-[50%] translate-y-1/2': String(aspectRatio) == '5/1'
                            }), children: ImageActions.map((item, index) => {
                                const Icon = item.icon;
                                return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: renderToolTipLabel(item), disabled: isMobile, children: (0, jsx_runtime_1.jsx)("div", { className: "bg-[#33333333] backdrop-blur-[28px] p-[3px] xl:p-[5px] rounded-full cursor-pointer", onClick: event => item.event({ event, item, img, index }), children: (0, jsx_runtime_1.jsx)(Icon, { className: "w-[16px] h-[16px] xl:w-[18px] xl:h-[18px] text-white" }) }, index) }, index));
                            }) }), multiCheck.isChecked && ((0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 ml-0 flex justify-center items-center absolute left-3 top-3 z-[1]", children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { variant: "circle-static", checked: isChecked, onCheckedChange: e => handleImageChecked(!!e, img) }) })), inputType === 'publish' && img.original && ((0, jsx_runtime_1.jsx)("div", { className: "w-6 h-6 ml-0 flex justify-center items-center absolute right-3 top-3 z-[1]", children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, { variant: "circle-static", checked: isPublishChecked, disabled: disabled && !isPublishChecked, onCheckedChange: checked => {
                                    (!disabled || !checked) && handleImagePublishChecked(img);
                                } }) })), !flagUserFirstPublishGallery &&
                            index === 0 &&
                            selectedBot?.isImageGenerator &&
                            !generating &&
                            tipImageLoad &&
                            inputType !== 'publish' && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute -right-10 -bottom-2 z-10 w-[150px] md:w-[220px] flex border-opaque rounded-lg bg-utility-sky-blue-500 py-2 pl-3 pr-5 text-wrap text-left", children: [(0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "static", children: isMobile ? t('chat.mob_publish_to_gallery') : t('chat.right_publish_to_gallery') }), (0, jsx_runtime_1.jsx)("span", { className: "absolute left-0 top-3 origin-center", style: {
                                        transformOrigin: '0px 0px',
                                        transform: 'translateY(50%) rotate(90deg) translateX(-50%)'
                                    }, children: (0, jsx_runtime_1.jsx)("svg", { className: "fill-utility-sky-blue-500 block", width: "10", height: "5", viewBox: "0 0 30 10", preserveAspectRatio: "none", children: (0, jsx_runtime_1.jsx)("polygon", { points: "0,0 30,0 15,10" }) }) })] }))] }, index));
            }) }));
    }, [genStatus, aspectRatio, aspectRatioStyle]);
    const renderBottomInModal = (imgIndex) => {
        const t = (0, next_intl_1.useTranslations)('chat');
        return ((0, jsx_runtime_1.jsx)("div", { className: "h-20 pb-5 w-full flex justify-center items-center space-x-3  overflow-x-auto", children: previeActions.map((item, index) => {
                const Icon = item.icon;
                const disabled = item.type !== 'download' && isVisitor === 2 && energy < multiCheck.payload.length * 4;
                return ((0, jsx_runtime_1.jsxs)("button", { disabled: disabled, className: (0, clsx_1.default)('w-[90px] relative group bg-primary rounded-full shadow-button-basic p-2 lg:p-1.5 flex justify-center items-center cursor-pointer', {
                        'opacity-30 cursor-not-allowed': disabled
                    }), onClick: event => item.event({ event, item, img: modalImages[imgIndex], index, from: 'modal' }), children: [(0, jsx_runtime_1.jsx)(Icon, { className: "w-5 h-5 text-white" }), !['download', 'feedback'].includes(item.type) && isVisitor === 2 && ((0, jsx_runtime_1.jsxs)("div", { className: "ml-1.5 flex flex-row justify-center items-center", children: [(0, jsx_runtime_1.jsx)("img", { src: "/icons/thunder.svg", alt: "thunder", className: "w-[14px] h-[14px]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-white ml-[2px]", children: "4" })] }))] }, index));
            }) }));
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: !!chat.text?.length ||
            chat.status === enums_1.MessageStatusEnum.DONE ||
            (chat.voiceUrl && chat.type === enums_1.MessageTypeEnum.GREETING) ? ((0, jsx_runtime_1.jsxs)("div", { className: `reply-message w-full ${chat.voiceUrl ||
                (botChatSetting?.isAudioOn &&
                    selectedBot?.botSetting?.outputVoice &&
                    chat.status === enums_1.MessageStatusEnum.PROCESSING)
                ? 'sm:w-5/6'
                : 'sm:max-w-[100%]'} flex flex-col space-y-3`, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('relative rounded-tl-[2px] md:rounded-tl-2xl rounded-2xl py-3 max-w-full bg-surface-hovered', showProgressBar ? 'w-full' : botChatSetting?.isTranslationOn ? 'w-full' : 'w-fit'), children: [(botChatSetting?.isTranscriptionOn || singleTranscriptionDisplayOpen) && ((0, jsx_runtime_1.jsx)("div", { className: "px-3 leading-6 max-w-fit", children: chat.text && !!chat.text.length && ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col  w-full overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "text-on-surface w-full", children: (0, jsx_runtime_1.jsx)(MdViewer, { content: textMessage, status: chat.status }) }) })) })), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [showAudio && (botChatSetting?.isTranscriptionOn || singleTranscriptionDisplayOpen) && ((0, jsx_runtime_1.jsx)("hr", { className: "mx-3 border-dashed border-[#DBDDDF] dark:border-[#54565E] mt-3 mb-1" })), showAudio &&
                                    (voiceNeedRegenerate ? ((0, jsx_runtime_1.jsx)(AudioPlaceholder_1.default, { blobDuration: chat.voiceFileDurationSeconds, loading: pendingForRegenerate || generating, onRegenerate: handleRegenerate, showProgressBar: showProgressBar, energyCost: selectedBot?.generateVoiceCostEnergy ?? 1, showEnergyCost: !isVisitor })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [streamAudio && ((0, jsx_runtime_1.jsx)(AudioStreamPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, audioList: chat.audioStream, borderColor: "#e9e9e9", messageStatus: chat.status, autoPlay: botChatSetting?.isAudioPlayOn, showProgressBar: showProgressBar })), iosAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, direction: "left", showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", autoPlay: botChatSetting?.isAudioPlayOn, showProgressBar: showProgressBar })), urlAudio && ((0, jsx_runtime_1.jsx)(AudioPlayer_1.default, { replyUid: chat.replyUid, id: chat.id, src: chat.voiceUrl, direction: "left", blobDuration: chat.voiceFileDurationSeconds, showBottomBorder: true, isFromHistory: chat.isFromHistory, borderColor: "#e9e9e9", showProgressBar: showProgressBar }))] })))] }), (0, jsx_runtime_1.jsx)("div", { className: "mx-3", style: aspectRatioStyle, children: (0, jsx_runtime_1.jsx)(ImageGallery_1.default, { images: images, renderItem: renderItem, showBullets: images.length > 1, showNav: images.length > 1, bulltetPosition: "outside", slideWrapperClass: "overflow-hidden rounded-xl", showFullscreenButton: false }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('mx-3 mt-3 grid gap-x-2 lg:gap-x-3', {
                                hidden,
                                'grid-cols-1': BottomActions.length === 1,
                                'grid-cols-2 gap-y-2': isMobile && BottomActions.length > 1,
                                'grid-cols-4': !isMobile && BottomActions.length === 4
                            }), children: BottomActions.map((item, index) => {
                                const Icon = item.icon;
                                const disabled = (multiCheck.isChecked && multiCheck.payload.length === 0) ||
                                    loadingIndex > -1 ||
                                    (item.type !== 'download' && isVisitor === 2 && energy < multiCheck.payload.length * 4);
                                const showCancel = item.alternate && item.alternate.type === 'cancel';
                                const primaryBg = multiCheck.isChecked && (multiCheck.payload.length > 0 || showCancel);
                                return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: renderToolTipLabel(item), disabled: isMobile || primaryBg || disabled, children: multiCheck.isChecked && showCancel ? ((0, jsx_runtime_1.jsx)("div", { className: "group bg-surface border border-default rounded-full w-full shadow-button-basic p-1.5 lg:p-2 text-xs md:text-sm lg:text-text-base flex justify-center items-center cursor-pointer hover:bg-surface-container-low text-on-surface", onClick: e => item.alternate.event(), children: item.alternate.text }, index)) : ((0, jsx_runtime_1.jsxs)("button", { disabled: disabled, className: (0, clsx_1.default)('relative group border border-default rounded-full w-full shadow-button-basic p-1.5 lg:p-2 flex justify-center items-center cursor-pointer', {
                                            'opacity-30 cursor-not-allowed': disabled,
                                            'bg-surface hover:bg-surface-container-low': !primaryBg,
                                            'bg-primary text-white': primaryBg
                                        }), onClick: event => item.event({ event, item, img: modalImages.length === 1 ? modalImages[0] : '', index }), children: [(0, jsx_runtime_1.jsx)(Icon, { className: (0, clsx_1.default)('w-4 h-4 lg:w-5 lg:h-5', {
                                                    'text-white': primaryBg,
                                                    'text-primary': !primaryBg
                                                }) }), primaryBg && item.type !== 'download' && isVisitor === 2 && ((0, jsx_runtime_1.jsxs)("div", { className: "ml-1 lg:ml-1.5 flex flex-row justify-center items-center", children: [(0, jsx_runtime_1.jsx)("img", { src: "/icons/thunder.svg", alt: "thunder", className: "w-[14px] h-[14px]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-white ml-[2px]", children: multiCheck.payload.length * 4 })] })), item.showText && (0, jsx_runtime_1.jsx)("span", { className: "text-primary pl-1.5", children: item.label }), loadingIndex === index && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { size: "sm", className: "text-brand" }) }))] }, index)) }, index));
                            }) })] }), showFeedback && ((0, jsx_runtime_1.jsx)(MsgReport, { chat: chat, updateMessage: updateMessage, type: showFeedback ? 'image' : '', handleClose: handleClose, showMsgReport: false })), (0, jsx_runtime_1.jsx)(modal_1.Modal, { open: preview.isPreview, onClose: handlePreviewClose, contentClassName: "w-full h-full max-h-full rounded-none z-[100] bg-beta-black-10", iconClassName: "text-static", fullScreen: true, children: (0, jsx_runtime_1.jsx)("div", { className: "relative bg-beta-black-10 xxxx overflow-hidden w-full h-full px-4 md:px-0", children: (0, jsx_runtime_1.jsx)("div", { className: "mt-6 w-full h-full relative overflow-hidden", children: (0, jsx_runtime_1.jsx)(ImageGallery_1.default, { images: modalImages, startIndex: preview.startIndex, showThumbnails: true, showBullets: false, showNav: modalImages.length > 1, showFullscreenButton: false, renderBottom: renderBottomInModal, onContainerClick: handlePreviewClose }) }) }) }), (0, jsx_runtime_1.jsx)(GalleryPublishTipModal_1.default, { publishing: publishing, publishState: publishState, open: !!popupConfirmObj?.botId, onClose: () => {
                        setPopupConfirmObj(null);
                        setPublishState('info');
                        publishState === 'success' && handlePreviewClose();
                    }, onConfirm: confirmHandler })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "w-[60px] p-4 rounded-xl bg-surface-hovered", children: (0, jsx_runtime_1.jsx)(LoadingIcon_1.default, {}) })) }));
}
exports.default = (0, react_1.memo)(ReplyMessage);
