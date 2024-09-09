import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useContext, useRef } from 'react';
import { useEffectOnce } from 'react-use';
import { MessageContext } from '../../../../../../chat-new/context/MessageContext.js';
import { EmbedObjStatus } from '../../../../../../chat-new/model/definitions.js';
import Spinner from '../../../../../../common/components/ui/spinner.js';
import { Text } from '../../../../../../common/components/ui/typography.js';
import DefaultDisplay from '../default-display.js';
import ImageGenDisplay from './image-gen-display/views/image-gen-display.js';
import RunningWidgetInfo, { RunningError } from './running-widget-info.js';
const MdViewer = dynamic(() => import('../../../../../../common/components/MdViewer.js'), {
    loading: () => _jsx("div", { children: "loading..." }),
    ssr: false
});
export default function AsyncJobDisplay({ message, showText, showAudio }) {
    const { getJobInfo } = useContext(MessageContext);
    const intervalId = useRef(null);
    const pollingInterval = 2000;
    const polling = () => {
        const fn = async () => {
            if (message?.asyncJobInfo?.jobId) {
                const res = await getJobInfo?.(message.asyncJobInfo.jobId, message.id);
                return res;
            }
            return false;
        };
        if (message?.asyncJobInfo?.status === EmbedObjStatus.PENDING ||
            message?.asyncJobInfo?.status === EmbedObjStatus.PROCESSING ||
            message?.asyncJobInfo?.status === EmbedObjStatus.QUEUEING) {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
            intervalId.current = setInterval(async () => {
                const keepPolling = await fn();
                if (!keepPolling) {
                    if (intervalId.current) {
                        clearInterval(intervalId.current);
                        intervalId.current = null;
                    }
                }
            }, pollingInterval);
        }
    };
    useEffectOnce(() => {
        polling();
    });
    const chatLocale = useTranslations('chat');
    if (message?.status === 'CANCELED') {
        return _jsx("p", { children: chatLocale('job_terminated') });
    }
    console.log('asyncJobInfo: ', message);
    if (message?.imageGenMessageResponse?.jobId) {
        return _jsx(ImageGenDisplay, { message: message, showText: showText, showAudio: showAudio });
    }
    if (message?.asyncJobInfo?.status === EmbedObjStatus.DONE ||
        message?.asyncJobInfo?.status === EmbedObjStatus.UNKNOWN) {
        if (message.runningError) {
            return _jsx(RunningError, { message: message });
        }
        return _jsx(DefaultDisplay, { message: message, showText: showText, showAudio: showAudio });
    }
    if (message?.asyncJobInfo?.status === EmbedObjStatus.ERROR) {
        return _jsx(MdViewer, { className: "text-critical text-[14px]", content: message.text ?? '' });
    }
    if (message?.runningWidgetInfo?.length) {
        return _jsx(RunningWidgetInfo, { list: message?.runningWidgetInfo });
    }
    return (_jsxs("div", { className: "flex items-center", children: [_jsx(Spinner, { size: "xs", className: "text-brand" }), _jsx(Text, { size: "sm", color: "subtle", className: "ml-2", children: message?.text })] }));
}
