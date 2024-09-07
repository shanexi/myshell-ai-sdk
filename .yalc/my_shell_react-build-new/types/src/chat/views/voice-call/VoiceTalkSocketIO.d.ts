import { SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk';
import { Socket } from 'socket.io-client';
import { AudioPlayer } from './AudioPlayer';
import { Decoder } from './protocol/decoder';
import { Encoder } from './protocol/encoder';
import { AsrStreamingPack, EnergyInfo, GptPack, PlayStatus, StreamingServerMessage } from './protocol/types';
export interface Callbacks {
    onAsrMessage?: (respPack: AsrStreamingPack) => void;
    onGptMessage?: (resp: GptPack) => void;
    onVoiceEnd?: (lastSegment: string[]) => void;
    onStart?: () => void;
    onStop?: () => void;
    onPlayerStatusChanged?: (status: PlayStatus, segment: GptPack) => void;
    onInterrupt?: () => void;
    onConnectTimeout?: () => void;
    onConnectError?: () => void;
    onEnergyCommand?: (resp: EnergyInfo) => void;
}
export interface TalkConfig {
    firstTalk?: string;
    isVideoCall?: boolean;
    deviceId?: string;
}
export declare class MyshellTalkSocketIO {
    static CONNECT_TIMEOUT: number;
    socket?: Socket;
    mediaStream?: MediaStream;
    isBotTalking: boolean;
    callback: Callbacks;
    talkConfig: TalkConfig;
    player: AudioPlayer;
    isChatStop: boolean;
    selectedBotID: string;
    packBuffers: StreamingServerMessage[];
    binaryEncoder: Encoder;
    binaryDecoder: Decoder;
    azureLanguageCode: string | undefined;
    speechRecognizer: SpeechRecognizer | undefined;
    usingInputDevice: string;
    connTimeout: NodeJS.Timeout | undefined;
    pingTimer: NodeJS.Timer | null;
    asrUuid: string;
    constructor(botID: string, callback: Callbacks, c: TalkConfig);
    startAzureSpeechRecognizer(uuid: string): Promise<void>;
    stopAzureSpeechRecognizer(): Promise<void>;
    setInputDevice(deviceId: string): Promise<void>;
    reloadAzureConnection(): Promise<void>;
    setOutputDevice(deviceId?: string): void;
    playerStatusChanged(status: PlayStatus, segment: GptPack): void;
    connect(): Promise<void>;
    handlePack: (pack: StreamingServerMessage) => void;
    interrupt(): Promise<void>;
    startRecord(): Promise<void>;
    pauseRecord(): Promise<void>;
    pauseChat(): Promise<void>;
    resumeRecord(): Promise<void>;
    resumeChat(): Promise<void>;
    stopRecord(): Promise<void>;
}
