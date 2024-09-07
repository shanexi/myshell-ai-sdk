"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayProvider = exports.useDisplayContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const MessageContext_1 = require("../../../../../chat-new/context/MessageContext.js");
const StaticContext_1 = require("../../../../../chat-new/context/StaticContext.js");
const definitions_1 = require("../../../../../chat-new/model/definitions.js");
const DisplayContext = (0, react_1.createContext)({
    actions: [],
    displayMode: 'NORMAL',
    setDisplayMode: () => { }
});
const useDisplayContext = () => {
    return (0, react_1.useContext)(DisplayContext);
};
exports.useDisplayContext = useDisplayContext;
const DisplayProvider = props => {
    const { message, children } = props;
    const { chatSetting, type, entityInfo } = (0, react_1.useContext)(StaticContext_1.StaticContext);
    const { id } = entityInfo;
    const { exceptionsForTextDisplay } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const contextMenuItems = (0, react_1.useMemo)(() => {
        const menuItems = [definitions_1.MenuActionType.Feedback, definitions_1.MenuActionType.Copy_Message, definitions_1.MenuActionType.Delete, definitions_1.MenuActionType.Share];
        const voiceMenuItem = message?.audioUrl ? [definitions_1.MenuActionType.Download_Voice] : [];
        const textExceptionItem = message?.source === 'OTHER' &&
            !chatSetting?.isTranscriptionOn &&
            !(exceptionsForTextDisplay?.[`${type}-${id}`] ?? []).includes(message?.id)
            ? [definitions_1.MenuActionType.Show_Text]
            : [];
        const translationItem = message?.source === 'OTHER' && chatSetting?.isTranslationOn ? [definitions_1.MenuActionType.Translate] : [];
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
    const [displayMode, setDisplayMode] = (0, react_1.useState)('NORMAL');
    const displayContextParams = (0, react_1.useMemo)(() => {
        return {
            message,
            actions: contextMenuItems,
            displayMode,
            setDisplayMode
        };
    }, [contextMenuItems, displayMode, message]);
    return (0, jsx_runtime_1.jsx)(DisplayContext.Provider, { value: displayContextParams, children: children });
};
exports.DisplayProvider = DisplayProvider;
