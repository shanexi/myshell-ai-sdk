import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ExclamationCircleIcon from '@heroicons/react/24/solid/ExclamationCircleIcon';
import PlayIcon from '@heroicons/react/24/solid/PlayIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';
import Spinner from '../../../../../common/components/ui/spinner.js';
import { Tooltip } from '../../../../../common/components/ui/tooltip.js';
import AudioPlayer from '../audio-player.js';
const File = memo(({ data, onDelete, onPreview, uploadFiles, index, isMobile, isChoosingFile }) => {
    const commonT = useTranslations('common');
    const { status, uiData, file, botId, id } = data;
    const { mimeType, icon, iconUrl, bg, type, name, serverType, ex } = uiData;
    const isError = status === 'error';
    const isPending = status === 'pending';
    const isSuccess = status === 'completed';
    const isFile = mimeType === 'application' || mimeType === 'text';
    const isImage = mimeType === 'image';
    const isAudio = mimeType === 'audio';
    const isVideo = mimeType === 'video';
    const preview = useMemo(() => {
        if (file) {
            return ['image', 'audio', 'video'].includes(mimeType) ? URL.createObjectURL(file) : '';
        }
        return '';
    }, [isPending, index]);
    const handlePreview = (index) => {
        if (isSuccess && (isImage || isVideo)) {
            onPreview(id);
            if (isChoosingFile) {
                isChoosingFile.current = true;
            }
        }
        if (isError) {
            uploadFiles(botId, [{ ...data, status: 'pending' }], true);
        }
    };
    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        document.getElementById('mobileInput')?.focus();
        onDelete(botId, id);
    };
    return (_jsxs("div", { className: clsx('relative rounded-xl group/attach first:ml-3 last:mr-3 mr-2 cursor-default', isError ? 'border-[#D72C0D]' : 'border-outline', {
            border: !(isImage || isVideo) || isError,
            relative: isImage || isVideo,
            'flex justify-start items-center px-3 py-1.5': isFile,
            'w-[180px] flex justify-start items-center p-1.5 rounded-xl': isAudio
        }), onClick: e => {
            e.preventDefault();
            document.getElementById('mobileInput')?.focus();
            handlePreview(index);
        }, children: [(isAudio || (!isSuccess && isFile)) && (_jsxs("div", { className: clsx({
                    'absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center': isImage || isVideo,
                    'w-7 h-7 rounded-lg mr-3': !(isImage || isVideo),
                    'bg-[#D72C0D]': isError && !(isImage || isVideo),
                    'bg-[#8C9196]': isPending && !(isImage || isVideo),
                    hidden: isAudio,
                    'flex justify-center items-center': isFile
                }), style: bg ? { background: bg } : {}, children: [isError && _jsx(ArrowPathIcon, { className: "w-4 h-4 text-white" }), isPending && (_jsx("div", { className: "w-4 h-4 flex justify-center items-center", children: _jsx(Spinner, { size: "sm", className: "text-static w-[14px] h-[14px]" }) }))] })), isSuccess && isFile && (_jsx("div", { className: "w-7 h-7 rounded-lg mr-3", children: _jsx("img", { src: iconUrl }) })), isFile && (_jsxs("div", { className: "w-[116px] flex flex-col justify-center items-start", children: [_jsx("span", { className: "text-xs text-on-surface line-clamp-1 break-all font-medium", children: file.name }), _jsx("span", { className: "text-xs text-secondary line-clamp-1 break-all", children: type })] })), isImage && (_jsxs("div", { className: clsx('w-12 h-12 rounded-xl overflow-hidden', { 'border border-outline': !isError }), children: [_jsx("img", { src: preview, className: "w-full h-full object-cover", onLoad: () => {
                            URL.revokeObjectURL(preview);
                        } }), !isSuccess && (_jsxs("div", { className: clsx('absolute z-[1] left-0 top-0 bottom-0 right-0 rounded-xl flex justify-center items-center', {
                            'bg-[#EC2F0D33]': isError,
                            'bg-[#FFFFFFBF] dark:bg-[#000000BF]': !isError
                        }), children: [isPending && (_jsx("div", { className: "w-4 h-4 flex justify-center items-center", children: _jsx(Spinner, { size: "sm", className: "text-static w-[14px] h-[14px]" }) })), isError && _jsx(ArrowPathIcon, { className: "w-4 h-4 text-white" })] }))] })), isVideo && (_jsxs("div", { className: clsx('relative w-12 h-12 rounded-xl overflow-hidden', { 'border border-outline': !isError }), children: [_jsx("video", { src: preview, className: "w-full h-full object-fill overflow-hidden", onLoad: () => {
                            URL.revokeObjectURL(preview);
                        } }), _jsxs("div", { className: clsx('absolute z-[1] left-0 top-0 bottom-0 right-0 flex justify-center items-center', {
                            'bg-[#EC2F0D33]': isError,
                            'bg-[#000000BF]': !isError
                        }), children: [isSuccess && _jsx(PlayIcon, { className: "w-5 h-5 text-white" }), isPending && (_jsx("div", { className: "w-4 h-4 flex justify-center items-center", children: _jsx(Spinner, { size: "sm", className: "text-static w-[14px] h-[14px]" }) })), isError && _jsx(ArrowPathIcon, { className: "w-4 h-4 text-white" })] })] })), isAudio && _jsx(AudioPlayer, { data: data, preview: preview }), isError && (_jsx("div", { className: "absolute z-[1] -right-[10px] -top-[10px] rounded-full error-icon bg-surface justify-center items-center flex group-hover/attach:hidden", children: _jsx(ExclamationCircleIcon, { className: "w-5 h-5 text-[#D72C0D]" }) })), _jsx(Tooltip, { description: commonT('delete'), children: _jsx("button", { className: clsx('absolute z-[1] -right-[10px] -top-[10px] w-5 h-5 border border-white rounded-full bg-secondary justify-center items-center group-hover/attach:flex', isMobile ? 'flex' : 'hidden'), onClick: handleDelete, children: _jsx(XMarkIcon, { className: "w-3 h-3 text-white" }) }) })] }));
});
File.displayName = 'File';
const FileCard = memo((props) => (_jsx(File, { data: props.data, onDelete: props.onDelete, onPreview: props.onPreview, uploadFiles: props.uploadFiles, index: props.index, isMobile: props.isMobile, isChoosingFile: props.isChoosingFile })));
FileCard.displayName = 'FileCard';
export default FileCard;
