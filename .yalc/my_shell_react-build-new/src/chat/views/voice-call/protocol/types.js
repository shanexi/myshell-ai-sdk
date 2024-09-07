"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayStatus = exports.EnergyCommand = exports.EncodingFormat = exports.PacketType = void 0;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["ASR"] = 1] = "ASR";
    PacketType[PacketType["VAD"] = 2] = "VAD";
    PacketType[PacketType["Config"] = 3] = "Config";
    PacketType[PacketType["TTS"] = 4] = "TTS";
    PacketType[PacketType["Chat"] = 5] = "Chat";
    PacketType[PacketType["Clear"] = 6] = "Clear";
    PacketType[PacketType["ChatResp"] = 7] = "ChatResp";
    PacketType[PacketType["AsrResp"] = 8] = "AsrResp";
    PacketType[PacketType["VadResp"] = 9] = "VadResp";
    PacketType[PacketType["EnergyResp"] = 10] = "EnergyResp";
    PacketType[PacketType["Ping"] = 11] = "Ping";
})(PacketType || (exports.PacketType = PacketType = {}));
var EncodingFormat;
(function (EncodingFormat) {
    EncodingFormat[EncodingFormat["OGG"] = 0] = "OGG";
    EncodingFormat[EncodingFormat["PCM"] = 1] = "PCM";
    EncodingFormat[EncodingFormat["MP3"] = 2] = "MP3";
    EncodingFormat[EncodingFormat["JSON"] = 3] = "JSON";
    EncodingFormat[EncodingFormat["NONE"] = 4] = "NONE";
})(EncodingFormat || (exports.EncodingFormat = EncodingFormat = {}));
var EnergyCommand;
(function (EnergyCommand) {
    EnergyCommand["CHAT_END"] = "end";
    EnergyCommand["ENERGY_PACK"] = "consume_energy_pack";
})(EnergyCommand || (exports.EnergyCommand = EnergyCommand = {}));
var PlayStatus;
(function (PlayStatus) {
    PlayStatus[PlayStatus["Playing"] = 1] = "Playing";
    PlayStatus[PlayStatus["Stop"] = 2] = "Stop";
    PlayStatus[PlayStatus["StartPlay"] = 3] = "StartPlay";
})(PlayStatus || (exports.PlayStatus = PlayStatus = {}));
