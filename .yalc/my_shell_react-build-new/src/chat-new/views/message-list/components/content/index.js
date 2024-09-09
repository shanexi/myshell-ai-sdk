import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { EmbedObjStatus } from '../../../../../chat-new/model/definitions.js';
import DefaultDisplay from '../../../../../chat-new/views/message-list/components/content/default-display.js';
import LoadingIcon from '../../../../../common/components/icons/LoadingIcon.js';
import { ContextMenuProvider } from '../context-menu/index.js';
import AsyncJobDisplay from './async-job-display/async-job-display.js';
export default function Content({ message, showText = true, showAudio = false }) {
    const Display = useMemo(() => {
        switch (message.type) {
            case 'PENDING_FOR_RESPONSE':
                return LoadingIcon;
            default:
                if (message.type !== 'GREETING' &&
                    ((message.asyncJobInfo &&
                        message.asyncJobInfo.jobId &&
                        message.asyncJobInfo.status !== EmbedObjStatus.UNKNOWN) ||
                        message.imageGenMessageResponse?.jobId)) {
                    return AsyncJobDisplay;
                }
                return DefaultDisplay;
        }
    }, [message.asyncJobInfo, message.imageGenMessageResponse?.jobId, message.type]);
    return (_jsx(ContextMenuProvider, { children: _jsx("div", { className: "flex gap-3 flex-col", children: _jsx(Display, { message: message, showText: showText, showAudio: showAudio }) }) }));
}
