import { MessageComponentsButtonActionTypeEnum } from '../../../../../src/chat/model/enums.js';
import { ImSlashCommandInput } from '../../../../../src/chat/model/interfaces.js';
import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
import { WidgetInfo } from '../../../../../src/common/constants/interfaces/workshop.js';
export declare const LUIButtonInteractionContext: import("react").Context<{
    clickFn: (actionType: MessageComponentsButtonActionTypeEnum, buttonId: string, msgId: string, text?: string, componentInputMessage?: any, imSlashCommandInput?: ImSlashCommandInput, callback?: () => void, errorCb?: () => void, closeCb?: () => void) => Promise<void>;
    msgId: string;
    selectedBot?: BotInfo | null;
    widgetInfo?: WidgetInfo | null;
}>;
