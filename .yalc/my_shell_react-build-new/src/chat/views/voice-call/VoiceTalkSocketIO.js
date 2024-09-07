"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyshellTalkSocketIO = void 0;
const microsoft_cognitiveservices_speech_sdk_1 = require("microsoft-cognitiveservices-speech-sdk");
const socket_io_client_1 = require("socket.io-client");
const uuid_1 = require("uuid");
const auth_1 = require("../../../apis/auth.js");
const interfaces_1 = require("../../../chat/model/interfaces.js");
const identityService_1 = require("../../../common/services/identityService.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const rx_http_1 = require("../../../common/utils/rx-http.js");
const AudioPlayer_1 = require("./AudioPlayer.js");
const decoder_1 = require("./protocol/decoder.js");
const encoder_1 = require("./protocol/encoder.js");
const common_helper_2 = require("../../../common/utils/common-helper.js");
const types_1 = require("./protocol/types.js");
class MyshellTalkSocketIO {
    static CONNECT_TIMEOUT = 10 * 1000;
    socket;
    mediaStream;
    isBotTalking;
    callback;
    talkConfig;
    player;
    isChatStop;
    selectedBotID;
    packBuffers;
    binaryEncoder;
    binaryDecoder;
    azureLanguageCode;
    speechRecognizer;
    usingInputDevice = '';
    connTimeout;
    pingTimer;
    asrUuid;
    constructor(botID, callback, c) {
        this.callback = callback;
        this.talkConfig = c;
        this.player = new AudioPlayer_1.AudioPlayer({ onStatusChange: this.playerStatusChanged.bind(this) });
        this.isBotTalking = false;
        this.binaryEncoder = new encoder_1.Encoder();
        this.binaryDecoder = new decoder_1.Decoder();
        this.isChatStop = false;
        this.selectedBotID = botID;
        this.packBuffers = [];
        this.pingTimer = null;
        this.asrUuid = '';
    }
    async startAzureSpeechRecognizer(uuid) {
        const classPtr = this;
        const res = await (0, auth_1.getAzureToken)();
        if (!res.success) {
            this.callback.onConnectError?.();
            return;
        }
        if (!this.mediaStream) {
            return;
        }
        const speechConfig = microsoft_cognitiveservices_speech_sdk_1.SpeechConfig.fromAuthorizationToken(res.data.token, res.data.region);
        speechConfig.setProperty(microsoft_cognitiveservices_speech_sdk_1.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, "15000");
        speechConfig.setProperty(microsoft_cognitiveservices_speech_sdk_1.PropertyId.Conversation_Initial_Silence_Timeout, "15000");
        const useLanguage = this.azureLanguageCode ?? 'en-US';
        speechConfig.speechRecognitionLanguage = useLanguage;
        const audioConfig = microsoft_cognitiveservices_speech_sdk_1.AudioConfig.fromStreamInput(this.mediaStream);
        this.speechRecognizer = new microsoft_cognitiveservices_speech_sdk_1.SpeechRecognizer(speechConfig, audioConfig);
        this.speechRecognizer.recognizing = (s, e) => {
            if (classPtr.asrUuid != uuid) {
                return;
            }
            this.callback.onAsrMessage?.({
                is_talking: true,
                result: [e.result.text]
            });
            this.interrupt();
        };
        this.speechRecognizer.recognized = (s, e) => {
            if (classPtr.asrUuid != uuid) {
                return;
            }
            if (e.result.reason == microsoft_cognitiveservices_speech_sdk_1.ResultReason.RecognizedSpeech) {
                this.callback.onVoiceEnd?.([e.result.text]);
                this.socket?.emit('voice_msg', {
                    data: this.binaryEncoder.encodeChatPack(e.result.text)
                });
            }
        };
        this.speechRecognizer.sessionStopped = (s, e) => {
            console.log('stop recording', e);
        };
        this.speechRecognizer.canceled = (s, e) => {
            console.log('cancel recording', e);
        };
        this.speechRecognizer.startContinuousRecognitionAsync();
    }
    async stopAzureSpeechRecognizer() {
        await this.speechRecognizer?.close();
        this.speechRecognizer = undefined;
    }
    async setInputDevice(deviceId) {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = undefined;
        }
        this.mediaStream = await window.navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
                deviceId: deviceId
            }
        });
        this.usingInputDevice = deviceId;
    }
    async reloadAzureConnection() {
        const uuid = (0, uuid_1.v4)();
        this.asrUuid = uuid;
        await this.stopAzureSpeechRecognizer();
        this.startAzureSpeechRecognizer(uuid);
    }
    setOutputDevice(deviceId) {
        this.player.setOutputDevice(deviceId);
    }
    playerStatusChanged(status, segment) {
        if (status == types_1.PlayStatus.StartPlay) {
            this.isBotTalking = true;
        }
        if (status == types_1.PlayStatus.Playing) {
            this.callback.onGptMessage?.(segment);
        }
        if (status == types_1.PlayStatus.Stop) {
            this.isBotTalking = false;
            this.reloadAzureConnection();
        }
        this.callback.onPlayerStatusChanged?.(status, segment);
    }
    async connect() {
        let visitorId;
        const randomVisitorId = ((0, common_helper_2.isClient)() && identityService_1.identityService.getRandomVisitorId()) ?? '';
        if (randomVisitorId) {
            visitorId = randomVisitorId;
        }
        else {
            visitorId = (0, common_helper_1.generateUUID)();
        }
        const socket = (0, socket_io_client_1.io)(`${rx_http_1.wsBaseURL}/voice_chat`, {
            path: '/voice_chat_ws',
            transports: ['websocket'],
            auth: {
                token: identityService_1.identityService.getToken(),
                visitorId,
                botID: this.selectedBotID,
                reqID: (0, common_helper_1.generateUUID)(),
                isVideo: this.talkConfig.isVideoCall
            }
        });
        const connTimeout = setTimeout(() => {
            if (!socket.connected) {
                socket.close();
                this.callback.onConnectTimeout?.();
            }
        }, MyshellTalkSocketIO.CONNECT_TIMEOUT);
        this.connTimeout = connTimeout;
        this.socket = socket;
        socket.on('connect', async () => {
            clearTimeout(connTimeout);
            this.setInputDevice(this.talkConfig.deviceId ?? '');
            this.pingTimer = setInterval(() => {
                this.socket?.emit('voice_msg', {
                    data: this.binaryEncoder.encodePingPack()
                });
            }, 10000);
            this.callback.onStart?.();
        });
        socket.on('voice_msg', async (event) => {
            const pack = await this.binaryDecoder.decode(event.data);
            this.handlePack(pack);
        });
        socket.on('disconnect', () => {
            clearTimeout(connTimeout);
            this.pingTimer && clearInterval(this.pingTimer);
            this.player.stop();
        });
        socket.on('connect_error', () => {
            clearTimeout(connTimeout);
            this.callback.onConnectError?.();
        });
        return;
    }
    handlePack = (pack) => {
        const { data, type } = pack;
        if (type == 'gpt') {
            if (this.isChatStop) {
                this.packBuffers.push(pack);
                return;
            }
            if (data.language) {
                this.azureLanguageCode = interfaces_1.AzureLanguageCode[data.language];
            }
            this.player.talk(data, pack.round, pack.index == -1);
        }
        if (type == 'energy') {
            if (this.isChatStop) {
                return;
            }
            this.callback.onEnergyCommand?.(data);
        }
    };
    async interrupt() {
        this.isBotTalking = false;
        this.player.stop();
        this.callback.onInterrupt?.();
        this.callback.onPlayerStatusChanged?.(types_1.PlayStatus.Stop, { sentence: '', mp3Data: new Uint8Array() });
    }
    async startRecord() {
        this.player.init();
        if (!this.socket) {
            await this.connect();
        }
    }
    async pauseRecord() {
        this.isChatStop = true;
        await this.speechRecognizer?.close();
    }
    async pauseChat() {
        this.player?.pause();
    }
    async resumeRecord() {
        this.isChatStop = false;
        this.reloadAzureConnection();
    }
    async resumeChat() {
        this.player.resume();
        this.resumeRecord();
        if (this.packBuffers.length > 0) {
            this.packBuffers.forEach(p => this.handlePack(p));
            this.packBuffers = [];
        }
    }
    async stopRecord() {
        try {
            if (this.mediaStream) {
                this.mediaStream.getTracks().forEach(track => track.stop());
                this.mediaStream = undefined;
            }
            if (this.speechRecognizer) {
                this.stopAzureSpeechRecognizer();
            }
            this.player.stop();
            clearTimeout(this.connTimeout);
            this.callback.onStop?.();
            if (!this.socket) {
                return;
            }
            this.socket?.close();
        }
        catch (err) {
            console.error(`stop record error`, err);
        }
    }
}
exports.MyshellTalkSocketIO = MyshellTalkSocketIO;
