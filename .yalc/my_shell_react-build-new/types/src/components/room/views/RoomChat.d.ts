import { BotInfo } from '../../../../../src/common/constants/interfaces/bot.js';
import { Room } from '../../../../../src/components/room/models/definitions.js';
type P = {
    roomInfo: Room;
    roomBotInfo: BotInfo;
};
export default function RoomChat({ roomInfo, roomBotInfo }: P): import("react/jsx-runtime").JSX.Element;
export {};
