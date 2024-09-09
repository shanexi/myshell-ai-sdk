import { MessageComponentsButtonActionTypeEnum } from '../../../../../src/chat/model/enums';
import { ImSlashCommandInput } from '../../../../../src/chat/model/interfaces';
import { BotInfo } from '../../../../../src/common/constants/interfaces/bot';
import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop';
export declare const LUIButtonInteractionContext: import("react").Context<{
    clickFn: (actionType: MessageComponentsButtonActionTypeEnum, buttonId: string, msgId: string, text?: string, componentInputMessage?: any, imSlashCommandInput?: ImSlashCommandInput, callback?: () => void, errorCb?: () => void, closeCb?: () => void) => Promise<void>;
    msgId: string;
    selectedBot?: BotInfo | null;
    widgetInfo?: WidgetInfo | null;
}>;
