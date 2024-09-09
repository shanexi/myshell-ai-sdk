import { WidgetMessageDetail } from '../../../src/common/constants/interfaces/workshop';
declare class WidgetChatIdbService {
    private db;
    private chats;
    constructor();
    storeChat(userId: string, widgetId: string, chatList: WidgetMessageDetail[]): Promise<void>;
    getChat(userId: string, widgetId: string): Promise<WidgetMessageDetail[] | null>;
}
declare const widgetChatIdbService: WidgetChatIdbService;
export default widgetChatIdbService;
