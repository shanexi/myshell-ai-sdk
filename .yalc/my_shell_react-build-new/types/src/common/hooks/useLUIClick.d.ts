import { MessageComponentsButtonActionTypeEnum } from '../../../../src/chat/model/enums.js';
import { ImSlashCommandInput, MessageComponentsButtonAction, MessageComponentsButtonContent } from '../../../../src/chat/model/interfaces.js';
import { BotInfo } from '../constants/interfaces/bot';
import { WidgetInfo } from '../constants/interfaces/workshop';
export default function useLUIClick(actions: MessageComponentsButtonAction[], btnId: string, msgId: string, clickHandler: (actionType: MessageComponentsButtonActionTypeEnum, buttonId: string, msgId: string, text?: string, componentInputMessage?: any, imSlashCommandInput?: ImSlashCommandInput, callback?: () => void, errorCb?: () => void, closeCb?: () => void) => Promise<void>, setFormModalVisible: (action: MessageComponentsButtonAction) => void, selectedBot?: BotInfo | null, widgetInfo?: WidgetInfo | null, buttonContent?: MessageComponentsButtonContent): {
    loading: boolean;
    handleClick: () => Promise<void>;
    handleFormSubmit: (action: MessageComponentsButtonAction, params: any) => Promise<void>;
    formInteracting: boolean;
    formSubmitError: boolean;
    setFormSubmitError: (nextValue?: any) => void;
};
