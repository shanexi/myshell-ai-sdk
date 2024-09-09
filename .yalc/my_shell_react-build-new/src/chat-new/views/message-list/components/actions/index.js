import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback } from 'react';
import { MenuActionType } from '../../../../../chat-new/model/definitions.js';
import { useDisplayContext } from '../display-provider/index.js';
import TextException from './TextException.js';
import Translation from './Translation.js';
import CopyMessage from './copy-message.js';
import DeleteMessage from './delete-message/views/DeleteMessage.js';
import DownloadVoice from './download-voice/views/DownloadVoice.js';
import MessageFeedback from './feedback/views/MessageFeedback.js';
import Share from '../../../../../chat-new/views/message-list/components/actions/share.js';
export default function Actions({ source }) {
    const { actions } = useDisplayContext();
    const Component = useCallback(({ action_type }) => {
        switch (action_type) {
            case MenuActionType.Copy_Message:
                return _jsx(CopyMessage, { source: source });
            case MenuActionType.Delete:
                return _jsx(DeleteMessage, { source: source });
            case MenuActionType.Download_Voice:
                return _jsx(DownloadVoice, { source: source });
            case MenuActionType.Feedback:
                return _jsx(MessageFeedback, { source: source });
            case MenuActionType.Show_Text:
                return _jsx(TextException, { source: source });
            case MenuActionType.Translate:
                return _jsx(Translation, { source: source });
            case MenuActionType.Share:
                return _jsx(Share, { source: source });
            default:
                console.error(`${action_type}类型的组件不存在`);
        }
    }, [source]);
    return actions.map(action_type => _jsx(Component, { action_type: action_type }, action_type));
}
