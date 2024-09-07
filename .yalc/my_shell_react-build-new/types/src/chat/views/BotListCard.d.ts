import { BotInfo } from '../../../../src/common/constants/interfaces/bot.js';
type BotListCardProps = {
    bot: BotInfo;
    selectedBotId: string;
    listIndex?: number;
};
declare function BotListCard(props: BotListCardProps): import("react/jsx-runtime").JSX.Element;
export default BotListCard;
