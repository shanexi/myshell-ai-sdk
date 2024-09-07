"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encoder = void 0;
const protocol_1 = require("./protocol.js");
const types_1 = require("./types.js");
class Encoder {
    packageIndex;
    sessionRound;
    constructor() {
        this.packageIndex = 0;
        this.sessionRound = 0;
    }
    sendPack() {
        this.packageIndex++;
    }
    encodeAsrFinishPack() {
        this.sendPack();
        this.sessionRound++;
        const p = new protocol_1.Pack(types_1.PacketType.ASR, -1, types_1.EncodingFormat.PCM, this.sessionRound, new Uint8Array());
        return p.encode();
    }
    encodeAsrPack(audio) {
        this.sendPack();
        const p = new protocol_1.Pack(types_1.PacketType.ASR, this.packageIndex, types_1.EncodingFormat.PCM, this.sessionRound, audio);
        return p.encode();
    }
    encodeVadPack(audio) {
        this.sendPack();
        const p = new protocol_1.Pack(types_1.PacketType.VAD, this.packageIndex, types_1.EncodingFormat.PCM, this.sessionRound, audio);
        return p.encode();
    }
    encodeConfigPack(config) {
        this.sendPack();
        const p = new protocol_1.Pack(types_1.PacketType.Config, this.packageIndex, types_1.EncodingFormat.JSON, 0, new TextEncoder().encode(JSON.stringify(config)));
        return p.encode();
    }
    encodeTtsPack(input) {
        this.sendPack();
        this.sessionRound++;
        const p = new protocol_1.Pack(types_1.PacketType.TTS, this.packageIndex, types_1.EncodingFormat.JSON, this.sessionRound, new TextEncoder().encode(JSON.stringify({ input })));
        return p.encode();
    }
    encodeChatPack(input) {
        this.sendPack();
        this.sessionRound++;
        const p = new protocol_1.Pack(types_1.PacketType.Chat, this.packageIndex, types_1.EncodingFormat.JSON, this.sessionRound, new TextEncoder().encode(JSON.stringify({ input })));
        return p.encode();
    }
    encodePingPack() {
        this.sendPack();
        this.sessionRound++;
        const p = new protocol_1.Pack(types_1.PacketType.Ping, this.packageIndex, types_1.EncodingFormat.JSON, this.sessionRound, new TextEncoder().encode(JSON.stringify({})));
        return p.encode();
    }
    encodeClearPack() {
        this.sendPack();
        const p = new protocol_1.Pack(types_1.PacketType.Clear, this.packageIndex, types_1.EncodingFormat.NONE, 0, new TextEncoder().encode(JSON.stringify({})));
        return p.encode();
    }
}
exports.Encoder = Encoder;
