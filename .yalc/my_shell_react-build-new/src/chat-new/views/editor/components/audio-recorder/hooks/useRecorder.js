"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordActionType = exports.RecordStateEnum = void 0;
exports.default = useRecorder;
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_use_1 = require("react-use");
const eventTypes_1 = require("../../../../../../common/constants/enums/eventTypes.js");
const useNotification_1 = require("../../../../../../common/hooks/useNotification.js");
const EventEmitter_1 = __importDefault(require("../../../../../../common/utils/EventEmitter.js"));
const common_helper_1 = require("../../../../../../common/utils/common-helper.js");
const maxRecordingTime = 90;
var RecordStateEnum;
(function (RecordStateEnum) {
    RecordStateEnum["Idle"] = "Idle";
    RecordStateEnum["Recording"] = "Recording";
    RecordStateEnum["Stopped"] = "Stopped";
    RecordStateEnum["Playing"] = "Playing";
    RecordStateEnum["Completed"] = "Completed";
    RecordStateEnum["CallUping"] = "CallUping";
})(RecordStateEnum || (exports.RecordStateEnum = RecordStateEnum = {}));
var RecordActionType;
(function (RecordActionType) {
    RecordActionType["INIT"] = "INIT";
    RecordActionType["SET_RECORDER"] = "SET_RECORDER";
    RecordActionType["SET_TIME"] = "SET_TIME";
    RecordActionType["SET_TIME_UPDATE"] = "SET_TIME_UPDATE";
})(RecordActionType || (exports.RecordActionType = RecordActionType = {}));
const initialState = {
    status: RecordStateEnum.Idle,
    timeLeft: maxRecordingTime,
    duration: 0,
    recordBlob: null,
    recordBlobDataURI: '',
    recorder: null,
    chunks: [],
    audioUrl: '',
    callUping: false,
    timeUpdate: 0,
    mimeType: ''
};
const reducer = (state, action) => {
    const { type, payload = {} } = action;
    switch (type) {
        case RecordActionType.INIT:
            return { ...initialState };
        case RecordStateEnum.CallUping:
            return { ...state, ...payload };
        case RecordStateEnum.Recording:
            return { ...state, chunks: [], status: RecordStateEnum.Recording, ...payload };
        case RecordStateEnum.Stopped:
            return { ...state, status: RecordStateEnum.Stopped, ...payload };
        case RecordStateEnum.Playing:
            return { ...state, status: RecordStateEnum.Playing, ...payload };
        case RecordStateEnum.Completed:
            return { ...state, status: RecordStateEnum.Completed, ...payload };
        case RecordActionType.SET_RECORDER:
            return { ...state, ...payload };
        case RecordActionType.SET_TIME: {
            const newTimeLeft = state.timeLeft - 1;
            const needStop = newTimeLeft === 0;
            const status = needStop ? RecordStateEnum.Stopped : state.status;
            return { ...state, duration: state.duration + 1, status, timeLeft: newTimeLeft };
        }
        case RecordActionType.SET_TIME_UPDATE:
            return { ...state, ...payload };
        default:
            return state;
    }
};
function useRecorder({ onChangePlayingAudio, onChangeInputType, onRecordEnd }) {
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { error } = (0, useNotification_1.useNotification)();
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    const [supportedType, setSupportedType] = (0, react_1.useState)('');
    const timerRef = (0, react_1.useRef)();
    const destoryRef = (0, react_1.useRef)(false);
    const timeLeftRef = (0, react_1.useRef)(state.timeLeft);
    (0, react_1.useMemo)(() => {
        timeLeftRef.current = state.timeLeft;
    }, [state.timeLeft]);
    (0, react_1.useEffect)(() => {
        setSupportedType((0, common_helper_1.checkSupportedMimeType)());
    }, []);
    const destroyAudioRecorder = (0, react_1.useCallback)(async () => {
        if (state.recorder && state.recorder.state === 'recording') {
            return new Promise(resolve => {
                if (state.recorder) {
                    state.recorder.stop();
                    state.recorder.stream.getTracks().forEach((track) => {
                        track.stop();
                    });
                    const cb = (data) => {
                        dispatch({
                            type: RecordStateEnum.Stopped,
                            payload: {
                                recorder: null
                            }
                        });
                        resolve(data);
                    };
                    EventEmitter_1.default.subscribe(eventTypes_1.EventTypes.AWAIT_RECORD_COMPLETE, cb, true);
                }
            });
        }
    }, [state.recorder]);
    const startRecording = (0, react_1.useCallback)(async () => {
        destoryRef.current = false;
        if (state.recorder) {
            await destroyAudioRecorder();
        }
        dispatch({
            type: RecordStateEnum.CallUping,
            payload: {
                callUping: true,
                status: isMobile ? RecordStateEnum.Recording : RecordStateEnum.Idle
            }
        });
        setTimeout(() => {
            if ((0, common_helper_1.checkAudioRecordSupport)()) {
                (0, common_helper_1.requestAudioRecordAccess)().then(stm => {
                    try {
                        if (supportedType) {
                            dispatch({
                                type: RecordActionType.SET_RECORDER,
                                payload: {
                                    recorder: new MediaRecorder(stm, {
                                        mimeType: supportedType
                                    }),
                                    mimeType: supportedType
                                }
                            });
                        }
                        else {
                            dispatch({
                                type: RecordActionType.SET_RECORDER,
                                payload: {
                                    recorder: new MediaRecorder(stm)
                                }
                            });
                        }
                    }
                    catch (e) {
                        error({
                            content: "The browser doesn't support mediaRecorder",
                            id: 'mediaRecorder'
                        });
                        dispatch({
                            type: RecordStateEnum.CallUping,
                            payload: {
                                callUping: false
                            }
                        });
                    }
                }, err => {
                    error({ content: JSON.stringify(err.message), id: JSON.stringify(err.message) });
                    dispatch({
                        type: RecordStateEnum.CallUping,
                        payload: {
                            callUping: false
                        }
                    });
                    destroyAudioRecorder();
                });
            }
            else {
                dispatch({
                    type: RecordStateEnum.CallUping,
                    payload: {
                        callUping: false
                    }
                });
                error({ content: commonT('not_support_record'), id: commonT('not_support_record') });
            }
        });
    }, [destroyAudioRecorder, error, state.recorder, supportedType, isMobile]);
    const stopRecording = (0, react_1.useCallback)(async () => {
        return destroyAudioRecorder();
    }, [destroyAudioRecorder]);
    (0, react_1.useEffect)(() => {
        if (state.recorder) {
            state.recorder.start();
        }
    }, [state.recorder]);
    (0, react_1.useEffect)(() => {
        if (isMobile) {
            startRecording();
        }
    }, [isMobile]);
    (0, react_1.useEffect)(() => {
        if (state.recorder) {
            state.recorder.ondataavailable = (event) => {
                state.chunks.push(event.data);
            };
        }
    }, [state.recorder, state.chunks]);
    (0, react_1.useEffect)(() => {
        if (state.recorder) {
            state.recorder.onstop = async () => {
                clearInterval(timerRef.current);
                const blob = new Blob(state.chunks, { type: supportedType });
                const payload = {
                    timeLeft: maxRecordingTime,
                    chunks: [],
                    recordBlob: blob,
                    audioUrl: URL.createObjectURL(blob),
                    mimeType: supportedType
                };
                dispatch({
                    type: RecordStateEnum.Completed,
                    payload
                });
                EventEmitter_1.default.dispatch(eventTypes_1.EventTypes.AWAIT_RECORD_COMPLETE, payload);
            };
        }
    }, [state.chunks, state.recorder, supportedType]);
    (0, react_1.useEffect)(() => {
        if (state.recorder) {
            state.recorder.onerror = (err) => {
                error({ content: err.toString(), id: err.toString() });
                destroyAudioRecorder();
            };
        }
    }, [destroyAudioRecorder, error, state.recorder]);
    const onStart = (0, react_1.useCallback)(() => {
        onChangeInputType('audio');
        onChangePlayingAudio();
        dispatch({
            type: RecordStateEnum.Recording
        });
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = window.setInterval(() => {
            if (timeLeftRef.current) {
                const newTimeLeft = timeLeftRef.current - 1;
                if (newTimeLeft === 0) {
                    stopRecording();
                }
            }
            dispatch({
                type: RecordActionType.SET_TIME
            });
        }, 1000);
    }, [onChangeInputType, onChangePlayingAudio, stopRecording]);
    (0, react_1.useEffect)(() => {
        if (state.recorder) {
            state.recorder.onstart = () => {
                onStart();
            };
        }
    }, [state.recorder, onStart]);
    const clearRecord = (0, react_1.useCallback)(async () => {
        destoryRef.current = true;
        await stopRecording();
        return new Promise(resolve => {
            setTimeout(() => {
                dispatch({
                    type: RecordActionType.INIT
                });
                resolve(true);
            }, 50);
        });
    }, [state.recorder, stopRecording]);
    (0, react_1.useEffect)(() => {
        const keydownHandler = async (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            if (e.code === 'Space') {
                e.preventDefault();
                if (state.status === RecordStateEnum.Idle) {
                    startRecording();
                }
                if (state.status === RecordStateEnum.Recording) {
                    const recordData = (await stopRecording());
                    await onRecordEnd(recordData);
                }
                if (state.status === RecordStateEnum.Stopped) {
                    await onRecordEnd(state);
                }
            }
            if (e.code === 'Enter') {
                e.preventDefault();
                if (state.status === RecordStateEnum.Completed) {
                    await onRecordEnd(state);
                }
            }
            if (e.code === 'Escape') {
                e.preventDefault();
                if (state.status === RecordStateEnum.Recording) {
                    stopRecording();
                }
                clearRecord();
            }
        };
        window.addEventListener('keydown', keydownHandler);
        return () => {
            window.removeEventListener('keydown', keydownHandler);
        };
    }, [clearRecord, state, onRecordEnd]);
    return {
        supportedType,
        startRecording,
        stopRecording,
        clearRecord,
        state,
        dispatch
    };
}
