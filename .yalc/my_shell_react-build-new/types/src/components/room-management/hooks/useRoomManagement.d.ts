import { GetListFn } from '../../../../../src/chat-new/context/StaticContext.js';
import { RoomMini } from '../../room/models/definitions';
export default function useRoomManagement(getList: GetListFn<unknown>): {
    creating: boolean;
    create: () => Promise<void>;
    gettingList: boolean;
    roomList: RoomMini[];
};
