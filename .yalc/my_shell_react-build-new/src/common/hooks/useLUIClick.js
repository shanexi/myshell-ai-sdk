"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLUIClick;
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_use_1 = require("react-use");
const usehooks_ts_1 = require("usehooks-ts");
const enums_1 = require("../../chat/model/enums.js");
const sensors_1 = require("../../lib/sensors/index.js");
const store_1 = require("../../services/store/index.js");
const useCopyClipboard_1 = __importDefault(require("../../common/hooks/useCopyClipboard.js"));
function useLUIClick(actions, btnId, msgId, clickHandler, setFormModalVisible, selectedBot, widgetInfo, buttonContent) {
    const sensors = (0, sensors_1.useSensors)();
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const user = (0, store_1.useUserStore)(state => state.user);
    const { value: loading, setTrue, setFalse } = (0, usehooks_ts_1.useBoolean)(false);
    const [formInteracting, setFormInteracting] = (0, react_use_1.useToggle)(false);
    const [formSubmitError, setFormSubmitError] = (0, react_use_1.useToggle)(false);
    const { onCopy } = (0, useCopyClipboard_1.default)('');
    const router = (0, navigation_1.useRouter)();
    const handleRouteRedirect = (0, react_1.useCallback)((route) => {
        return async () => {
            try {
                router.push(route);
                return await Promise.resolve();
            }
            catch (e) {
                return Promise.reject(e);
            }
        };
    }, [router]);
    const handleCopy = (0, react_1.useCallback)((text) => {
        return async () => {
            onCopy(text);
        };
    }, [router]);
    const onSendSensors = () => {
        if (sensors && sensors.track) {
            const tagnames = selectedBot?.tagList?.map((e) => `${e.label}`) || [];
            sensors?.track('UserSendMessage', {
                message_type: 'buttonclick',
                button_name: buttonContent?.text,
                ...(widgetInfo?.id
                    ? {
                        widget_id: widgetInfo?.id,
                        widget_name: widgetInfo?.name
                    }
                    : {
                        bot_id: selectedBot?.id,
                        bot_name: selectedBot?.name
                    }),
                chat_platform: 'web2',
                ...(tagnames?.length > 0 && { tag_name: tagnames }),
                bot_battery_cost: parseInt(buttonContent?.iconLabel || '') || 0,
                user_membership_type: isVisitor ? '0' : user?.isGenesisPasscard || user?.isPasscard ? '3' : `${user?.level}`
            });
        }
    };
    const handleSendMessage = (0, react_1.useCallback)((action) => {
        return async () => {
            try {
                if (action.interactionInput?.displayType ===
                    enums_1.MessageComponentsButtonActionInteractionInputDisplayTypeEnum.NOTHING) {
                    setTrue();
                }
                onSendSensors();
                clickHandler(action.action, btnId, msgId, action.interactionInput?.displayType ===
                    enums_1.MessageComponentsButtonActionInteractionInputDisplayTypeEnum.NOTHING
                    ? undefined
                    : action.interactionInput?.content ?? action.interactionInput?.slashCommandInput.name, undefined, action.interactionInput?.slashCommandInput, action.interactionInput?.displayType ===
                    enums_1.MessageComponentsButtonActionInteractionInputDisplayTypeEnum.NOTHING
                    ? setFalse
                    : undefined);
                return await Promise.resolve();
            }
            catch (e) {
                setFalse();
                return Promise.reject(e);
            }
        };
    }, [btnId, clickHandler, msgId, setFalse, setTrue, selectedBot, buttonContent, user, isVisitor, widgetInfo]);
    const handlePopupForm = (0, react_1.useCallback)((action) => {
        return async () => {
            try {
                setFormModalVisible(action);
                return await Promise.resolve();
            }
            catch (e) {
                return Promise.reject(e);
            }
        };
    }, [setFormModalVisible]);
    const handleFormSuccess = (0, react_1.useCallback)(() => {
        setFalse();
        setFormInteracting(false);
    }, [setFalse, setFormInteracting]);
    const handleFormError = (0, react_1.useCallback)(() => {
        setFalse();
        setFormInteracting(false);
        setFormSubmitError(true);
    }, [setFalse, setFormInteracting, setFormSubmitError]);
    const handleFormSubmit = (0, react_1.useCallback)((action, params) => {
        try {
            setTrue();
            setFormInteracting(true);
            onSendSensors();
            clickHandler(action.action, btnId, msgId, action.componentInput?.name, JSON.stringify(params ?? {}), undefined, undefined, handleFormError, handleFormSuccess);
            return Promise.resolve();
        }
        catch (e) {
            setFalse();
            setFormInteracting(false);
            return Promise.reject(e);
        }
    }, [btnId, clickHandler, handleFormError, handleFormSuccess, msgId, setFalse, setFormInteracting, setTrue]);
    const clickFn = (0, react_1.useCallback)((action) => {
        switch (action.action) {
            case enums_1.MessageComponentsButtonActionTypeEnum.JUMP_LINK:
                return handleRouteRedirect(action.actionLink);
            case enums_1.MessageComponentsButtonActionTypeEnum.INTERACTION:
                return handleSendMessage(action);
            case enums_1.MessageComponentsButtonActionTypeEnum.CLIPBOARD:
                return handleCopy(action.clipboardContent);
            case enums_1.MessageComponentsButtonActionTypeEnum.POP_UP_FORM:
                sensors?.track('Close_Button_PopUp', {
                    button_name: buttonContent?.text,
                    ...(widgetInfo?.id
                        ? {
                            widget_id: widgetInfo?.id,
                            widget_name: widgetInfo?.name
                        }
                        : {
                            bot_id: selectedBot?.id,
                            bot_name: selectedBot?.name
                        })
                });
                return handlePopupForm(action);
            default:
                return async () => {
                    return Promise.reject('no matched branch');
                };
        }
    }, [handlePopupForm, handleRouteRedirect, handleSendMessage, handleCopy]);
    const executeActions = (0, react_1.useCallback)(async (actionsQueue) => {
        if (actionsQueue.length === 0)
            return;
        const action = actionsQueue.shift();
        try {
            const actionFn = clickFn(action);
            await actionFn();
            executeActions(actionsQueue);
        }
        catch (error) {
            console.error('Error executing action: ', error);
        }
    }, [clickFn]);
    const handleClick = (0, react_1.useCallback)(async () => {
        await executeActions([...actions]);
    }, [actions, executeActions]);
    return { loading, handleClick, handleFormSubmit, formInteracting, formSubmitError, setFormSubmitError };
}
