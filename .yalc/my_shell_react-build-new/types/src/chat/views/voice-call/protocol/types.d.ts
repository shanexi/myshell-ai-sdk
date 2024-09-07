import { PropInfo } from '../../../../../../src/common/constants/interfaces/task.js';
export declare enum PacketType {
    ASR = 1,
    VAD = 2,
    Config = 3,
    TTS = 4,
    Chat = 5,
    Clear = 6,
    ChatResp = 7,
    AsrResp = 8,
    VadResp = 9,
    EnergyResp = 10,
    Ping = 11
}
export declare enum EncodingFormat {
    OGG = 0,
    PCM = 1,
    MP3 = 2,
    JSON = 3,
    NONE = 4
}
export declare enum EnergyCommand {
    CHAT_END = "end",
    ENERGY_PACK = "consume_energy_pack"
}
export type StreamingServerMessage = {
    type: 'asr';
    index: number;
    data: AsrStreamingPack;
} | {
    type: 'gpt';
    index: number;
    round: number;
    data: GptPack;
} | {
    type: 'vad';
    index: number;
    data: AsrStreamingPack;
} | {
    type: 'energy';
    index: number;
    data: EnergyInfo;
};
export type VadChunk = {
    start: number;
    end: number;
};
export type EnergyInfo = {
    command: EnergyCommand;
    energyPack: PropInfo;
};
export interface AsrStreamingPack {
    is_talking: boolean;
    result: string[];
    speech_chunks?: VadChunk[];
    is_final?: boolean;
}
export interface GptPack {
    sentence: string;
    language?: string;
    mp3Data: Uint8Array;
}
export declare enum PlayStatus {
    Playing = 1,
    Stop = 2,
    StartPlay = 3
}
