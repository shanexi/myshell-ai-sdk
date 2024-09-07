import { ChatModuleType } from '../../../../../../../src/chat/ChatStaticContext.js';
import { WidgetChatCallerTypeEnum } from '../../../../../../../src/common/constants/enums/workshop.js';
import { AuthorInfo, TagInfo } from '../../../../../../../src/common/constants/interfaces/bot.js';
type P = {
    type: ChatModuleType;
    id: string;
    name: string;
    logoUrl?: string;
    tags: TagInfo[];
    description?: string;
    chatCallerType: WidgetChatCallerTypeEnum;
    author?: Pick<AuthorInfo, 'id' | 'name' | 'nameTag'>;
};
export default function WidgetDetail({ type, id, name, logoUrl, tags, description, author }: P): import("react/jsx-runtime").JSX.Element;
export {};
