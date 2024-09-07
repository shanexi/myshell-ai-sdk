import { BotInfo, TagInfo } from '../../../../../../src/common/constants/interfaces/bot.js';
export declare function BotCardTags({ bot, tags, langDisplayName, tagOptions, energyPerChat, className, outputVoice }: {
    bot: BotInfo | null;
    tags: string;
    langDisplayName: string;
    tagOptions: TagInfo[];
    energyPerChat: number;
    className?: string;
    outputVoice: boolean;
}): import("react/jsx-runtime").JSX.Element;
