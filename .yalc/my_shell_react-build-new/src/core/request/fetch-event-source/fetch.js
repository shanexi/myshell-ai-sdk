"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStreamContentType = void 0;
exports.fetchEventSource = fetchEventSource;
const computeChecksum1226_1 = require("../../../common/utils/computeChecksum1226.js");
const modal_1 = require("../../../services/store/modal.js");
const CfMitigatedHandler_1 = __importDefault(require("../CfMitigatedHandler.js"));
const parse_1 = require("./parse.js");
exports.EventStreamContentType = 'text/event-stream';
const DefaultRetryInterval = 1000;
const LastEventId = 'last-event-id';
function fetchEventSource(input, { signal: inputSignal, headers: inputHeaders, onopen: inputOnOpen, onmessage, onclose, onerror, openWhenHidden, fetch: inputFetch, ...rest }) {
    const args = {
        input,
        options: {
            signal: inputSignal,
            headers: inputHeaders,
            onopen: inputOnOpen,
            onmessage,
            onclose,
            onerror,
            openWhenHidden,
            fetch: inputFetch,
            ...rest
        }
    };
    return new Promise((resolve, reject) => {
        const headers = { ...inputHeaders };
        if (!headers.accept) {
            headers.accept = exports.EventStreamContentType;
        }
        headers['myshell-client-version'] = 'v1.6.4';
        headers.timestamp = (0, computeChecksum1226_1.computeChecksum1226)(new Date().getTime()).toString();
        let curRequestController;
        function onVisibilityChange() {
            curRequestController.abort();
            if (!document.hidden) {
                create();
            }
        }
        if (!openWhenHidden) {
            document.addEventListener('visibilitychange', onVisibilityChange);
        }
        let retryInterval = DefaultRetryInterval;
        const retryTimer = 0;
        function dispose() {
            document.removeEventListener('visibilitychange', onVisibilityChange);
            window.clearTimeout(retryTimer);
            curRequestController.abort();
        }
        inputSignal?.addEventListener('abort', () => {
            onclose?.();
            dispose();
            resolve();
        });
        const fetch = inputFetch ?? window.fetch;
        const onopen = inputOnOpen ?? defaultOnOpen;
        async function create() {
            curRequestController = new AbortController();
            try {
                const response = await fetch(input, {
                    ...rest,
                    headers: {
                        ...headers
                    },
                    credentials: 'include',
                    signal: curRequestController.signal
                });
                if (!(response.status >= 200 && response.status < 300)) {
                    try {
                        const clonedResponse = response.clone();
                        const result = await clonedResponse.json();
                        if (result.code === 400 && result.reason === 'ERROR_REASON_SAFETY_NEED_VERIFY_CAPTCHA') {
                            await new Promise(resolve => (0, modal_1.openModal)({ open: true, onOk: () => resolve(), triggerScene: 'SendMessage' }));
                            return await fetchEventSource(args.input, { ...args.options });
                        }
                    }
                    catch (e) {
                    }
                }
                if (response.status === 403) {
                    const cfMitigated = response.headers.get('cf-mitigated');
                    (0, CfMitigatedHandler_1.default)(cfMitigated);
                }
                await onopen(response);
                await (0, parse_1.getBytes)(response.body, (0, parse_1.getLines)((0, parse_1.getMessages)(id => {
                    if (id) {
                        headers[LastEventId] = id;
                    }
                    else {
                        delete headers[LastEventId];
                    }
                }, retry => {
                    retryInterval = retry;
                }, onmessage)));
                onclose?.();
                dispose();
                resolve();
            }
            catch (err) {
                dispose();
                reject(err);
            }
        }
        create();
    });
}
async function defaultOnOpen(response) {
    const contentType = response.headers.get('content-type');
    if (!contentType?.startsWith(exports.EventStreamContentType)) {
        throw new Error(`Expected content-type to be ${exports.EventStreamContentType}, Actual: ${contentType}`);
    }
}
