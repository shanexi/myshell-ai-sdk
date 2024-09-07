"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vad = void 0;
class Vad {
    recognition;
    constructor(onVadEnd) {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new window.SpeechRecognition();
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
        this.recognition.continuous = true;
        this.recognition.onresult = function (event) {
            const resultArr = [];
            for (let i = 0; i < event.results.length; i++) {
                resultArr.push(event.results[i][0].transcript);
            }
            const ifFinal = event.results[event.results.length - 1].isFinal;
            if (ifFinal) {
                onVadEnd();
            }
        };
    }
    start() {
        this.recognition.start();
    }
}
exports.Vad = Vad;
