import { GetListFn } from '../../../../../../src/chat-new/context/StaticContext.js';
import { DraftMessage, LocalErrorMessage, Message } from '../../../../../../src/chat-new/model/definitions.js';
import { LocalRoomStatus, RoomStatus } from '../../models/definitions';
export default function useSocket(id: string, onSendText: (text: string) => void, onSendAudio: (audio: string) => void, replaceDraftMessage: (message: Message | LocalErrorMessage) => void, addMessage: (message: (Message | DraftMessage | LocalErrorMessage) | Array<Message | DraftMessage | LocalErrorMessage>) => void, updateRoomStatus: (roomStatus: RoomStatus | LocalRoomStatus) => void, getList: GetListFn<unknown>, onReceivedReward: () => void, updateDetail: () => Promise<void>): {
    socketStatus: import("react-use-websocket").ReadyState;
    sendTextMessage: (text: string) => void;
    sendAudioMessage: (audioBlob: Blob, mimeType?: string) => Promise<void>;
    leaveRoom: () => void;
};
