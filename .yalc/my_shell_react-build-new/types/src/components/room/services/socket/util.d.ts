import { GetListFn } from '../../../../../../src/chat-new/context/StaticContext.js';
import { DraftMessage, LocalErrorMessage, Message } from '../../../../../../src/chat-new/model/definitions.js';
import { EnergyInfo } from '../../../../../../src/common/constants/interfaces/user.js';
import { LocalRoomStatus, RoomStatus } from '../../models/definitions';
export default function socketEventHandler(socketMsg: string, addMessage: (message: (Message | DraftMessage | LocalErrorMessage) | Array<Message | DraftMessage | LocalErrorMessage>) => void, replaceDraftMessage: (message: Message | LocalErrorMessage) => void, setEnergyInfo: (energyInfo: EnergyInfo) => void, updateRoomStatus: (roomStatus: RoomStatus | LocalRoomStatus) => void, getList: GetListFn<unknown>, updateDetail: () => Promise<void>, onReceivedReward: () => void, userId?: string): void;
