"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RenderScheduler {
    renderInterval;
    queue;
    timeoutId;
    renderFunc;
    constructor(renderInterval, renderFunc) {
        this.renderInterval = renderInterval;
        this.queue = [];
        this.timeoutId = undefined;
        this.renderFunc = renderFunc;
    }
    enqueue(data) {
        this.queue.push(data);
        if (this.timeoutId === undefined) {
            this.timeoutId = setTimeout(this.processQueue.bind(this), this.renderInterval);
        }
    }
    processQueue() {
        clearTimeout(this.timeoutId);
        this.timeoutId = undefined;
        const tempQueue = this.queue.slice();
        this.queue = [];
        const ansMsg = tempQueue[tempQueue.length - 1];
        let text = '';
        tempQueue.forEach(msg => {
            text += msg.text;
        });
        ansMsg.text = text;
        this.renderFunc(ansMsg);
    }
}
exports.default = RenderScheduler;
