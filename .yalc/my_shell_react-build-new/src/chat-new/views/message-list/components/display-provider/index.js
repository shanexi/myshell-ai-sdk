import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo, useState } from 'react';
import { MessageContext } from '../../../../../chat-new/context/MessageContext.js';
import { StaticContext } from '../../../../../chat-new/context/StaticContext.js';
import { MenuActionType } from '../../../../../chat-new/model/definitions.js';
const DisplayContext = createContext({
    actions: [],
    displayMode: 'NORMAL',
    setDisplayMode: () => { }
});
export const useDisplayContext = () => {
    return useContext(DisplayContext);
};
export const DisplayProvider = props => {
    const { message, children } = props;
    const { chatSetting, type, entityInfo } = useContext(StaticContext);
    const { id } = entityInfo;
    const { exceptionsForTextDisplay } = useContext(MessageContext);
    const contextMenuItems = useMemo(() => {
        const menuItems = [MenuActionType.Feedback, MenuActionType.Copy_Message, MenuActionType.Delete, MenuActionType.Share];
        const voiceMenuItem = message?.audioUrl ? [MenuActionType.Download_Voice] : [];
        const textExceptionItem = message?.source === 'OTHER' &&
            !chatSetting?.isTranscriptionOn &&
            !(exceptionsForTextDisplay?.[`${type}-${id}`] ?? []).includes(message?.id)
            ? [MenuActionType.Show_Text]
            : [];
        const translationItem = message?.source === 'OTHER' && chatSetting?.isTranslationOn ? [MenuActionType.Translate] : [];
        return [...menuItems, ...voiceMenuItem, ...textExceptionItem, ...translationItem];
    }, [
        chatSetting?.isTranscriptionOn,
        chatSetting?.isTranslationOn,
        exceptionsForTextDisplay,
        id,
        message?.audioUrl,
        message?.id,
        message?.source,
        type
    ]);
    const [displayMode, setDisplayMode] = useState('NORMAL');
    const displayContextParams = useMemo(() => {
        return {
            message,
            actions: contextMenuItems,
            displayMode,
            setDisplayMode
        };
    }, [contextMenuItems, displayMode, message]);
    return _jsx(DisplayContext.Provider, { value: displayContextParams, children: children });
};
