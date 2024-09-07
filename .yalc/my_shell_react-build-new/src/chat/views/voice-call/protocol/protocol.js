"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pack = void 0;
class Pack {
    startFlag;
    version;
    packetType;
    sessionNumber;
    encodingFormat;
    sessionRound;
    payloadLength;
    payload;
    extra;
    constructor(packetType, sessionNumber, encodingFormat, sessionRound, payload) {
        this.startFlag = 1874;
        this.version = 1;
        this.packetType = packetType;
        this.sessionNumber = sessionNumber;
        this.encodingFormat = encodingFormat;
        this.sessionRound = sessionRound;
        this.payloadLength = payload.byteLength;
        this.payload = payload;
    }
    encode() {
        const payloadLength = this.payload.byteLength;
        const buffer = new ArrayBuffer(12 + payloadLength);
        const view = new DataView(buffer);
        view.setInt32(0, this.startFlag);
        view.setInt8(4, this.version);
        view.setInt8(5, this.packetType);
        view.setInt16(6, this.sessionNumber);
        view.setInt8(8, this.encodingFormat);
        view.setInt8(9, this.sessionRound);
        view.setInt16(10, this.payloadLength);
        new Uint8Array(buffer, 12).set(new Uint8Array(this.payload));
        return buffer;
    }
    static decode(buffer) {
        const view = new DataView(buffer);
        if (view.getInt32(0) != 1874) {
            throw new Error('Invalid start flag');
        }
        const payloadLength = view.getInt16(10);
        const p = new Pack(view.getInt8(5), view.getInt16(6), view.getInt8(8), view.getInt8(9), buffer.slice(12, 12 + payloadLength));
        p.extra = buffer.slice(12 + payloadLength);
        return p;
    }
}
exports.Pack = Pack;
