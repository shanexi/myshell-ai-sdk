import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import ArrowUpIcon from '@heroicons/react/24/outline/ArrowUpIcon';
import PauseIcon from '@heroicons/react/24/solid/PauseIcon';
import PlayIcon from '@heroicons/react/24/solid/PlayIcon';
import StopIcon from '@heroicons/react/24/solid/StopIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMedia } from 'react-use';
import KeyboardIcon from '../../../../../common/components/icons/KeyboardIcon.js';
import { IconButton } from '../../../../../common/components/ui/icon-button.js';
import { durationFormatter, getPercent } from '../../../../../common/utils/common-helper.js';
import CountdownTips from './count-down-tips.js';
import useRecorder, { RecordActionType, RecordStateEnum } from './hooks/useRecorder.js';
import MenuList from '../function-menu/menu-list.js';
export function AudioRecorder({ interacting = false, disabled = false, exitAudioInput, scrollLayoutToTop, onSend, onChangeType }) {
    const t = useTranslations('chat');
    const audioPlayerRef = useRef(null);
    const isMobile = useMedia('(max-width: 768px)');
    const [sending, setSending] = useState(false);
    const onChangeInputType = () => { };
    const onRecordEnd = async (state) => { };
    const onChangePlayingAudio = () => { };
    const { clearRecord, state, startRecording, stopRecording, dispatch } = useRecorder({
        onChangeInputType,
        onRecordEnd,
        onChangePlayingAudio
    });
    const handleDelete = async () => {
        try {
            if (isMobile) {
                onChangeType('TEXT');
            }
            await clearRecord();
        }
        catch (error) {
            console.error(error);
        }
    };
    const timeUpdate = useCallback(() => {
        if (audioPlayerRef.current) {
            const { currentTime } = audioPlayerRef.current;
            dispatch({
                type: RecordActionType.SET_TIME_UPDATE,
                payload: {
                    timeUpdate: currentTime
                }
            });
        }
    }, [dispatch]);
    const startPlaying = () => {
        dispatch({
            type: RecordStateEnum.Playing
        });
    };
    const stopPlaying = () => {
        dispatch({
            type: RecordStateEnum.Stopped
        });
    };
    const handleAudioPlay = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.addEventListener('timeupdate', timeUpdate);
            audioPlayerRef.current.play();
            startPlaying();
        }
    };
    const handleAudioPause = () => {
        if (audioPlayerRef.current) {
            audioPlayerRef.current.removeEventListener('timeupdate', timeUpdate);
            audioPlayerRef.current?.pause();
            stopPlaying();
        }
    };
    const handleSend = () => {
        const { recordBlob, mimeType } = state;
        if (recordBlob) {
            onSend(recordBlob, mimeType);
            clearRecord();
        }
    };
    const handleMobileSend = async () => {
        setSending(true);
        const data = (await stopRecording());
        const { recordBlob, mimeType } = data;
        if (recordBlob) {
            onSend(recordBlob, mimeType);
            clearRecord();
            setSending(false);
            onChangeType('TEXT');
        }
    };
    const onStart = () => {
        startRecording();
    };
    const renderRecordIdle = () => {
        return (_jsxs(_Fragment, { children: [_jsx(MenuList, {}), _jsx("div", { className: clsx('w-full px-4 py-2 bg-surface-default text-center text-primary text-sm leading-6 border border-default rounded-xl hover:bg-surface-container-low cursor-pointer', { 'cursor-not-allowed': disabled }), onClick: onStart, children: t('record_top') }), _jsx(IconButton, { variant: "ghost", size: "md", color: "brand", onClick: () => {
                        exitAudioInput?.();
                    }, children: _jsx(KeyboardIcon, { className: "w-6 h-6 text-primary" }) })] }));
    };
    const renderRecording = () => {
        return (_jsxs("div", { className: "w-full flex items-center flex-col md:flex-row gap-x-2", children: [_jsx(IconButton, { variant: "primary", color: "default", size: "md", icon: XMarkIcon, className: "hidden md:inline-flex", onClick: handleDelete }), _jsxs("div", { className: "relative w-full px-4 py-2 flex flex-row justify-between text-white text-sm leading-6 rounded-xl cursor-pointer overflow-hidden bg-[#F2F4FE] md:dark:bg-[#292C38] md:bg-[#FFF4F4] md:dark:bg-[#382A29]", onClick: () => !isMobile && stopRecording(), children: [_jsx("span", { className: "z-10 rounded-xl px-2 py-[2px] text-sm leading-[24px] bg-[#CCD4FF] dark:bg-[#2B3561] text-[#3E5CFA] dark:text-[#5974FF]  md:text-[#EC2F0D] md:dark:text-[#FD5749] md:bg-[#FED3D1] md:dark:bg-[#612E2B]", children: durationFormatter(state.duration) }), sending ? (_jsx("span", { className: "text-[#414345] dark:text-[#B8BCCF] text-sm z-10 self-center", children: t('sending') })) : (_jsxs("span", { className: "text-sm self-center justify-center z-10 text-[#3E5CFA] dark:text-[#5974FF] md:text-[#EC2F0D] md:dark:text-[#FD5749]", children: [t('recording'), "..."] })), _jsx("div", { className: "z-10 rounded-full bg-[#FED3D1] dark:bg-[#612E2B] w-7 h-7 md:flex justify-center items-center hidden", onClick: stopRecording, children: _jsx(StopIcon, { className: "w-4 h-4 text-[#EC2F0D] dark:text-[#FD5749]" }) }), _jsx(IconButton, { className: "md:hidden", variant: "primary", size: "sm", icon: ArrowUpIcon, loading: interacting, onClick: handleMobileSend })] }), _jsx(IconButton, { variant: "primary", color: "default", size: "sm", icon: XMarkIcon, className: "mt-2 md:hidden", onClick: handleDelete })] }));
    };
    const renderRecordStop = () => {
        return (_jsxs(_Fragment, { children: [_jsx(IconButton, { variant: "primary", color: "default", size: "md", icon: XMarkIcon, className: "hidden md:inline-flex", onClick: handleDelete }), _jsxs("div", { className: "relative w-full px-4 py-2 flex flex-row justify-between text-white text-sm leading-6 rounded-xl cursor-pointer overflow-hidden bg-[#F2F4FE] md:bg-[#EDEEEF] md:dark:bg-[#42434A]", onClick: stopRecording, children: [_jsx("span", { className: "z-10 rounded-xl px-2 py-[2px] text-sm leading-[24px] bg-[#CCD4FF] dark:bg-[#2B3561] text-[#3E5CFA] dark:text-[#5974FF] md:text-[#414345] md:dark:text-[#B8BCCF] md:bg-[#DBDDDF] md:dark:bg-[#54565E]", children: durationFormatter(state.duration) }), _jsx(IconButton, { variant: "ghost", size: "md", onClick: handleAudioPlay, className: "text-primary  z-10 bg-[#DBDDDF] dark:bg-[#54565E] w-7 h-7 rounded-full hidden md:flex md:justify-center md:items-center", children: _jsx(PlayIcon, { className: "w-4 h-4" }) }), state.timeUpdate > 0 && (_jsx("div", { className: "absolute z-0 top-0 left-0 h-full bg-[#E0E0E0] dark:bg-[#595A63] opacity-60 rounded-l-xl", style: { width: `${getPercent(state.timeUpdate, state.duration) * 100}%` } }))] }), _jsx(IconButton, { variant: "primary", size: "md", icon: ArrowUpIcon, loading: interacting, onClick: handleSend })] }));
    };
    const renderRecordPlaying = () => {
        return (_jsxs(_Fragment, { children: [_jsx(IconButton, { variant: "primary", color: "default", size: "md", icon: XMarkIcon, className: "hidden md:inline-flex", onClick: handleDelete }), _jsxs("div", { className: "relative w-full px-4 py-2 flex flex-row justify-between text-white text-sm leading-6 rounded-xl cursor-pointer overflow-hidden bg-[#F2F4FE] md:bg-[#EDEEEF] md:dark:bg-[#42434A]", children: [_jsx("span", { className: "z-10 rounded-xl px-2 py-[2px] text-sm leading-[24px] bg-[#CCD4FF] dark:bg-[#2B3561] text-[#3E5CFA] dark:text-[#5974FF] md:text-[#414345] md:dark:text-[#B8BCCF] md:bg-[#DBDDDF] md:dark:bg-[#54565E]", children: durationFormatter(state.duration) }), _jsx(IconButton, { variant: "ghost", size: "md", onClick: handleAudioPause, className: "text-primary  z-10 bg-[#DBDDDF] dark:bg-[#54565E] w-7 h-7 rounded-full hidden md:flex md:justify-center md:items-center", children: _jsx(PauseIcon, { className: "w-4 h-4" }) }), state.timeUpdate > 0 && (_jsx("div", { className: "absolute z-0 top-0 left-0 h-full w-full bg-[#E0E0E0] dark:bg-[#595A63] opacity-60 rounded-l-xl", style: { width: `${getPercent(state.timeUpdate, state.duration) * 100}%` } }))] }), _jsx(IconButton, { variant: "primary", size: "md", icon: ArrowUpIcon, onClick: handleSend, loading: sending })] }));
    };
    useEffect(() => {
        if (state.status === RecordStateEnum.Recording) {
            scrollLayoutToTop?.();
        }
    }, [scrollLayoutToTop, state.status]);
    return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "w-full flex space-x-2 items-center justify-between h-18", children: [state.status === RecordStateEnum.CallUping && _jsx("div", { children: "111" }), state.status === RecordStateEnum.Idle && renderRecordIdle(), state.status === RecordStateEnum.Recording && renderRecording(), (state.status === RecordStateEnum.Completed || state.status === RecordStateEnum.Stopped) && renderRecordStop(), state.status === RecordStateEnum.Playing && renderRecordPlaying()] }), state.audioUrl && _jsx("audio", { ref: audioPlayerRef, src: state.audioUrl, onEnded: stopPlaying }), state.timeLeft <= 10 && _jsx(CountdownTips, {})] }));
}
