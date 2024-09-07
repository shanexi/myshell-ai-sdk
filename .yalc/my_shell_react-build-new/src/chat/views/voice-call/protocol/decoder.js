"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decoder = void 0;
const protocol_1 = require("./protocol.js");
const types_1 = require("./types.js");
class Decoder {
    async decode(data) {
        const buffer = data;
        const p = protocol_1.Pack.decode(buffer);
        const payload = JSON.parse(new TextDecoder().decode(p.payload));
        if (p.packetType == types_1.PacketType.ChatResp) {
            return {
                type: 'gpt',
                index: p.sessionNumber,
                round: p.sessionRound,
                data: {
                    sentence: payload.sentence,
                    language: payload.language,
                    mp3Data: new Uint8Array(p.extra ?? new ArrayBuffer(0))
                }
            };
        }
        if (p.packetType == types_1.PacketType.AsrResp) {
            const asrRespPayload = JSON.parse(new TextDecoder().decode(p.payload));
            if (p.sessionNumber == -1) {
                asrRespPayload.is_final = true;
            }
            return {
                type: 'asr',
                index: p.sessionNumber,
                data: asrRespPayload
            };
        }
        if (p.packetType == types_1.PacketType.VadResp) {
            const vadRespPayload = JSON.parse(new TextDecoder().decode(p.payload));
            return {
                type: 'vad',
                index: p.sessionNumber,
                data: vadRespPayload
            };
        }
        if (p.packetType == types_1.PacketType.EnergyResp) {
            const energyPayload = JSON.parse(new TextDecoder().decode(p.payload));
            return {
                type: 'energy',
                index: p.sessionNumber,
                data: energyPayload
            };
        }
        throw new Error('unkonw package type');
    }
}
exports.Decoder = Decoder;
