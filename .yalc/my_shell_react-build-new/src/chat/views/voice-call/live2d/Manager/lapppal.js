"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAppPal = void 0;
class LAppPal {
    static loadFileAsBytes(filePath, callback) {
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => callback(arrayBuffer, arrayBuffer.byteLength));
    }
    static getDeltaTime() {
        return this.s_deltaTime;
    }
    static updateTime() {
        this.s_currentFrame = Date.now();
        this.s_deltaTime = (this.s_currentFrame - this.s_lastFrame) / 1000;
        this.s_lastFrame = this.s_currentFrame;
    }
    static printMessage(message) {
        console.log(message);
    }
    static lastUpdate = Date.now();
    static s_currentFrame = 0.0;
    static s_lastFrame = 0.0;
    static s_deltaTime = 0.0;
}
exports.LAppPal = LAppPal;
