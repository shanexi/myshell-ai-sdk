"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitQueue = void 0;
const limitQueue = (concurrency) => {
    let queue = [];
    let activeCount = 0;
    const next = () => {
        activeCount--;
        if (queue.length > 0) {
            queue.shift()();
        }
    };
    const run = async (function_, resolve, arguments_) => {
        activeCount++;
        const result = (async () => function_(...arguments_))();
        resolve(result);
        try {
            await result;
        }
        catch { }
        next();
    };
    const enqueue = (function_, resolve, arguments_) => {
        queue.push(run.bind(undefined, function_, resolve, arguments_));
        (async () => {
            await Promise.resolve();
            if (activeCount < concurrency && queue.length > 0) {
                queue.shift()();
            }
        })();
    };
    const generator = ((function_, ...arguments_) => new Promise(resolve => {
        enqueue(function_, resolve, arguments_);
    }));
    Object.defineProperties(generator, {
        activeCount: {
            get: () => activeCount
        },
        pendingCount: {
            get: () => queue.length
        },
        clearQueue: {
            value() {
                queue = [];
            }
        }
    });
    return generator;
};
exports.limitQueue = limitQueue;
