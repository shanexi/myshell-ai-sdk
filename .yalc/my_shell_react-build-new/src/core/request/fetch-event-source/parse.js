"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBytes = getBytes;
exports.getLines = getLines;
exports.getMessages = getMessages;
async function getBytes(stream, onChunk) {
    const reader = stream.getReader();
    let result;
    while (!(result = await reader.read()).done) {
        onChunk(result.value);
    }
}
var ControlChars;
(function (ControlChars) {
    ControlChars[ControlChars["NewLine"] = 10] = "NewLine";
    ControlChars[ControlChars["CarriageReturn"] = 13] = "CarriageReturn";
    ControlChars[ControlChars["Space"] = 32] = "Space";
    ControlChars[ControlChars["Colon"] = 58] = "Colon";
})(ControlChars || (ControlChars = {}));
function getLines(onLine) {
    let buffer;
    let position;
    let fieldLength;
    let discardTrailingNewline = false;
    return function onChunk(arr) {
        if (buffer === undefined) {
            buffer = arr;
            position = 0;
            fieldLength = -1;
        }
        else {
            buffer = concat(buffer, arr);
        }
        const bufLength = buffer.length;
        let lineStart = 0;
        while (position < bufLength) {
            if (discardTrailingNewline) {
                if (buffer[position] === ControlChars.NewLine) {
                    lineStart = ++position;
                }
                discardTrailingNewline = false;
            }
            let lineEnd = -1;
            for (; position < bufLength && lineEnd === -1; ++position) {
                switch (buffer[position]) {
                    case ControlChars.Colon:
                        if (fieldLength === -1) {
                            fieldLength = position - lineStart;
                        }
                        break;
                    case ControlChars.CarriageReturn:
                        discardTrailingNewline = true;
                    case ControlChars.NewLine:
                        lineEnd = position;
                        break;
                }
            }
            if (lineEnd === -1) {
                break;
            }
            onLine(buffer.subarray(lineStart, lineEnd), fieldLength);
            lineStart = position;
            fieldLength = -1;
        }
        if (lineStart === bufLength) {
            buffer = undefined;
        }
        else if (lineStart !== 0) {
            buffer = buffer.subarray(lineStart);
            position -= lineStart;
        }
    };
}
function getMessages(onId, onRetry, onMessage) {
    let message = newMessage();
    const decoder = new TextDecoder();
    return function onLine(line, fieldLength) {
        if (line.length === 0) {
            onMessage?.(message);
            message = newMessage();
        }
        else if (fieldLength > 0) {
            const field = decoder.decode(line.subarray(0, fieldLength));
            const valueOffset = fieldLength + (line[fieldLength + 1] === ControlChars.Space ? 2 : 1);
            const value = decoder.decode(line.subarray(valueOffset));
            switch (field) {
                case 'data':
                    message.data = message.data ? `${message.data}\n${value}` : value;
                    break;
                case 'event':
                    message.event = value;
                    break;
                case 'id':
                    onId((message.id = value));
                    break;
                case 'retry':
                    const retry = parseInt(value, 10);
                    if (!isNaN(retry)) {
                        onRetry((message.retry = retry));
                    }
                    break;
                default:
                    break;
            }
        }
    };
}
function concat(a, b) {
    const res = new Uint8Array(a.length + b.length);
    res.set(a);
    res.set(b, a.length);
    return res;
}
function newMessage() {
    return {
        data: '',
        event: '',
        id: '',
        retry: undefined
    };
}
