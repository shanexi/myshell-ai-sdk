import { EncodingFormat, PacketType } from './types';
export declare class Pack {
    startFlag: number;
    version: number;
    packetType: PacketType;
    sessionNumber: number;
    encodingFormat: EncodingFormat;
    sessionRound: number;
    payloadLength: number;
    payload: ArrayBuffer;
    extra: ArrayBuffer | undefined;
    constructor(packetType: PacketType, sessionNumber: number, encodingFormat: EncodingFormat, sessionRound: number, payload: ArrayBuffer);
    encode(): ArrayBuffer;
    static decode(buffer: ArrayBuffer): Pack;
}
