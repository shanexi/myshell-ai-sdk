export declare class Encoder {
    packageIndex: number;
    sessionRound: number;
    constructor();
    private sendPack;
    encodeAsrFinishPack(): ArrayBuffer;
    encodeAsrPack(audio: ArrayBuffer): ArrayBuffer;
    encodeVadPack(audio: ArrayBuffer): ArrayBuffer;
    encodeConfigPack(config: {
        prompt: string;
        voice: string;
        reqID: string;
    }): ArrayBuffer;
    encodeTtsPack(input: string): ArrayBuffer;
    encodeChatPack(input: string): ArrayBuffer;
    encodePingPack(): ArrayBuffer;
    encodeClearPack(): ArrayBuffer;
}
