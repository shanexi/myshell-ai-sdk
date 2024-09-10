import { BotInfo } from '../../common/constants/interfaces/bot';
declare function UserBotList({ bots, loading, disableJumpToChat, onBotClick, selectedBotId, containerClassName, itemBoxClassName, itemLinkClassName, itemDividerClassName }: {
    bots: BotInfo[];
    loading?: boolean;
    disableJumpToChat?: boolean;
    onClose?: () => void;
    onBotClick?: (bot: BotInfo) => void;
    selectedBotId?: string;
    containerClassName?: string;
    itemBoxClassName?: string;
    itemLinkClassName?: string;
    itemDividerClassName?: string;
}): import("react/jsx-runtime").JSX.Element;
export default UserBotList;
UserBotList;
