import { MessageComponentsButtonActionTypeEnum } from '../../../chat/model/enums';
import { ImSlashCommandInput } from '../../../chat/model/interfaces';
import { BotInfo } from '../../../common/constants/interfaces/bot';
import { WidgetInfo } from '../../../common/constants/interfaces/workshop';
export declare const LUIButtonInteractionContext: import("react").Context<{
    clickFn: (actionType: MessageComponentsButtonActionTypeEnum, buttonId: string, msgId: string, text?: string, componentInputMessage?: any, imSlashCommandInput?: ImSlashCommandInput, callback?: () => void, errorCb?: () => void, closeCb?: () => void) => Promise<void>;
    msgId: string;
    selectedBot?: BotInfo | null;
    widgetInfo?: WidgetInfo | null;
}>;
nfo | null;
    widgetInfo?: WidgetInfo | null;
}>;
