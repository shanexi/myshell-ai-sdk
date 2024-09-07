import { RoomMini } from '../../../room/models/definitions';
type P = {
    creating: boolean;
    create: () => Promise<void>;
    roomList: RoomMini[];
};
export default function Output({ creating, create, roomList }: P): import("react/jsx-runtime").JSX.Element;
export {};
