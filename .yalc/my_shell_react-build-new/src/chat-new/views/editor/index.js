import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useContext, useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { MessageContext } from '../../../chat-new/context/MessageContext.js';
import { StaticContext } from '../../../chat-new/context/StaticContext.js';
import { useNewChatStore } from '../../../chat-new/services/useNewChatStore.js';
import Termination from './Termination.js';
import { AudioRecorder } from './components/audio-recorder/index.js';
import { AudioInput } from './components/audio-recorder/audio-input.js';
import FileList from './components/file-list/index.js';
import { FileUploader } from './components/file-uploader.js';
import MenuList from './components/function-menu/menu-list.js';
import { SendButton } from './components/send-button.js';
import { TextInput } from './components/text-input.js';
import { MobileTextInput } from './components/text-input/MobileTextInput.js';
export default function Editor({ editorContainerRef, textareaRef, scrollLayoutToTop, showMobileDetail, otherModeSlot }) {
    const { interactionDisabled, disabledReason, entityInfo, showInteractionCostEnergy } = useContext(StaticContext);
    const { sendTextMessage, sendAudioMessage, sending, interacting, draftMessage, setDraftMessage, terminate } = useContext(MessageContext);
    const { energyPerChat } = entityInfo;
    const isDesktop = useMedia('(min-width: 768px)');
    const [type, setType] = useState('TEXT');
    const switchToAudioInput = () => {
        setType('AUDIO');
        scrollLayoutToTop?.();
    };
    const exitAudioInput = () => {
        setType('TEXT');
    };
    const [text, setText] = useState(draftMessage?.text ?? '');
    const sendTextHandler = useCallback(() => {
        scrollLayoutToTop?.();
        sendTextMessage(text);
        setText('');
    }, [scrollLayoutToTop, sendTextMessage, text]);
    useEffect(() => {
        setDraftMessage({ ...draftMessage, text });
    }, [text]);
    const showDragModal = useNewChatStore(state => state.fileUpload.dragModal);
    const uploading = useNewChatStore(state => state.fileUpload.uploading);
    const uploadProgress = uploading?.progress || 0;
    return (_jsxs("div", { ref: editorContainerRef, className: "px-0 md:px-6 py-3 md:py-4 flex flex-col gap-2 md:gap-1 w-full h-fit shrink-0 top-0 left-0 z-10 bg-surface-default md:rounded-b-3xl", children: [uploading && (_jsx("div", { className: "z-10 absolute top-10 left-1/2 -translate-x-1/2 ", children: _jsxs("div", { className: "relative bg-[#2B48D8] rounded-full w-[342px] overflow-hidden h-9", children: [_jsx("div", { className: "absolute z-[1] left-0 top-0 h-9  bg-stripped-loading bg-[length:50px_50px] animate-move", style: { width: `${uploadProgress}%` } }), _jsxs("div", { className: "absolute w-full z-10 h-9 text-center text-white flex flex-row justify-center items-center", children: [_jsx("span", { className: "line-clamp-1 break-all max-w-[60%]", children: uploading?.file?.name ?? '' }), _jsxs("span", { className: "absolute right-4", children: [uploadProgress, " %"] })] })] }) })), showDragModal && (_jsx("div", { className: "absolute top-0 bottom-0 left-0 right-0 z-10 bg-[#FFFFFFBF] dark:bg-[#17181CBF] flex justify-center items-center", children: _jsx("div", { children: _jsx("img", { src: "/images/drop-file.png", className: "w-[245px] h-[116px]" }) }) })), _jsxs("div", { className: "relative", children: [interacting && (_jsx("div", { className: "flex justify-center absolute -top-12 md:-top-[78px] left-1/2 -translate-x-1/2 z-20", children: _jsx(Termination, { onTerminate: () => terminate?.() }) })), type === 'TEXT' &&
                        (isDesktop ? (_jsxs(_Fragment, { children: [_jsx(TextInput, { className: "w-full min-h-9 max-h-[156px]", onSend: sendTextHandler, autoFocus: true, value: text, ref: textareaRef, onChange: e => setText(e.target.value), disabled: interactionDisabled, disabledReason: disabledReason, onFocus: () => {
                                        scrollLayoutToTop?.();
                                    } }), _jsx(FileList, {}), _jsx("div", { className: "w-full flex items-center justify-between", children: _jsxs("div", { className: "flex w-full justify-between items-center", children: [_jsxs("div", { className: "flex gap-1", children: [_jsx(MenuList, {}), _jsx(FileUploader, { disabled: interactionDisabled })] }), text ? (_jsx(SendButton, { loading: sending, disabled: interactionDisabled, onSend: sendTextHandler, energyPerChat: energyPerChat, showEnergyCostIcon: showInteractionCostEnergy })) : (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(AudioInput, { onStart: switchToAudioInput, disabled: interactionDisabled }), otherModeSlot] }))] }) })] })) : (_jsx(MobileTextInput, { onSend: sendTextHandler, value: text, ref: textareaRef, onChange: e => setText(e.target.value), disabled: interactionDisabled, disabledReason: disabledReason, showMobileDetail: showMobileDetail, audioInputSlot: _jsx(AudioInput, { onStart: switchToAudioInput, disabled: interactionDisabled }), loading: sending, interactingDisabled: interactionDisabled, energyPerChat: energyPerChat, showEnergyCostIcon: showInteractionCostEnergy }))), type === 'AUDIO' && (_jsx(AudioRecorder, { exitAudioInput: exitAudioInput, onSend: sendAudioMessage, interacting: sending, disabled: interactionDisabled, scrollLayoutToTop: scrollLayoutToTop, onChangeType: value => setType(value) }))] })] }));
}
