"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioPlayer = void 0;
const types_1 = require("./protocol/types.js");
class AudioPlayer {
    audioQueue;
    audioContext;
    currentAudio;
    currentAudioSource;
    onStatusChange;
    currentRound;
    constructor(props) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = 1;
        this.audioQueue = [];
        this.onStatusChange = props.onStatusChange;
        this.currentAudio = undefined;
        this.currentRound = -1;
    }
    init = () => {
        this.createEmptySource().then(s => {
            s.start(0);
        });
    };
    talk = (segment, round, isFinal) => {
        if (round > this.currentRound) {
            this.stop();
            this.onStatusChange(types_1.PlayStatus.StartPlay, segment);
            this.currentRound = round;
        }
        this.audioQueue.push({ segment, buf: new Blob([segment.mp3Data]), isFinal });
        if (!this.currentAudio) {
            this.playNextAudio();
        }
    };
    pause = () => {
        this.audioContext.suspend();
    };
    resume = () => {
        this.audioContext.resume();
    };
    stop = () => {
        this.audioQueue = [];
        this.currentAudioSource?.stop();
        this.currentAudioSource = undefined;
    };
    setOutputDevice(deviceId) {
        if (deviceId && 'setSinkId' in AudioContext.prototype) {
            if (deviceId == 'default') {
                this.audioContext.setSinkId('');
            }
            else {
                this.audioContext.setSinkId(deviceId);
            }
        }
    }
    handleAudioEnd = () => {
        if (this.currentAudio && this.currentAudio.isFinal) {
            this.onStatusChange(types_1.PlayStatus.Stop, this.currentAudio.segment);
        }
        this.currentAudioSource = undefined;
        this.playNextAudio();
    };
    async createEmptySource() {
        const buffer = this.audioContext.createBuffer(1, 1, 16000);
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.onended = this.handleAudioEnd;
        this.currentAudioSource = source;
        return source;
    }
    async createNewSource(buf) {
        const bufData = await buf.arrayBuffer();
        if (bufData.byteLength == 0) {
            return await this.createEmptySource();
        }
        const audioBuffer = await this.audioContext.decodeAudioData(await buf.arrayBuffer());
        const source = this.audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(this.audioContext.destination);
        source.onended = this.handleAudioEnd;
        this.currentAudioSource = source;
        return source;
    }
    async playNextAudio() {
        if (this.audioQueue.length > 0) {
            this.currentAudio = this.audioQueue.shift();
            if (!this.currentAudio) {
                return;
            }
            const source = await this.createNewSource(this.currentAudio.buf);
            source.start(0);
            this.onStatusChange(types_1.PlayStatus.Playing, this.currentAudio.segment);
        }
        else {
            this.currentAudio = undefined;
        }
    }
}
exports.AudioPlayer = AudioPlayer;
