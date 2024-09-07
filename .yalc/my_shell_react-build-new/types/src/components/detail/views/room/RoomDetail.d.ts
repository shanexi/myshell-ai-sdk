import { ReactNode } from 'react';
import { ChatModuleType } from '../../../../../../src/chat/ChatStaticContext.js';
type P = {
    type: ChatModuleType;
    id: string;
    name: string;
    logoUrl?: string;
    buttonSlot?: ReactNode;
};
export default function RoomDetail({ type, id, name, logoUrl, buttonSlot }: P): import("react/jsx-runtime").JSX.Element;
export {};
