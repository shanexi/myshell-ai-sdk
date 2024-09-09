import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useMedia } from 'react-use';
import { EventTypes } from '../../../../../../common/constants/enums/eventTypes.js';
import { useNotification } from '../../../../../../common/hooks/useNotification.js';
import EventEmitter from '../../../../../../common/utils/EventEmitter.js';
import { checkAudioRecordSupport, checkSupportedMimeType, requestAudioRecordAccess } from '../../../../../../common/utils/common-helper.js';
const maxRecordingTime = 90;
export var RecordStateEnum;
(function (RecordStateEnum) {
    RecordStateEnum["Idle"] = "Idle";
    RecordStateEnum["Recording"] = "Recording";
    RecordStateEnum["Stopped"] = "Stopped";
    RecordStateEnum["Playing"] = "Playing";
    RecordStateEnum["Completed"] = "Completed";
    RecordStateEnum["CallUping"] = "CallUping";
})(RecordStateEnum || (RecordStateEnum = {}));
export var RecordActionType;
(function (RecordActionType) {
    RecordActionType["INIT"] = "INIT";
    RecordActionType["SET_RECORDER"] = "SET_RECORDER";
    RecordActionType["SET_TIME"] = "SET_TIME";
    RecordActionType["SET_TIME_UPDATE"] = "SET_TIME_UPDATE";
})(RecordActionType || (RecordActionType = {}));
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
export default function useRecorder({ onChangePlayingAudio, onChangeInputType, onRecordEnd }) {
    const isMobile = useMedia('(max-width: 768px)');
    const commonT = useTranslations('common');
    const { error } = useNotification();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [supportedType, setSupportedType] = useState('');
    const timerRef = useRef();
    const destoryRef = useRef(false);
    const timeLeftRef = useRef(state.timeLeft);
    useMemo(() => {
        timeLeftRef.current = state.timeLeft;
    }, [state.timeLeft]);
    useEffect(() => {
        setSupportedType(checkSupportedMimeType());
    }, []);
    const destroyAudioRecorder = useCallback(async () => {
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
                    EventEmitter.subscribe(EventTypes.AWAIT_RECORD_COMPLETE, cb, true);
                }
            });
        }
    }, [state.recorder]);
    const startRecording = useCallback(async () => {
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
            if (checkAudioRecordSupport()) {
                requestAudioRecordAccess().then(stm => {
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
    const stopRecording = useCallback(async () => {
        return destroyAudioRecorder();
    }, [destroyAudioRecorder]);
    useEffect(() => {
        if (state.recorder) {
            state.recorder.start();
        }
    }, [state.recorder]);
    useEffect(() => {
        if (isMobile) {
            startRecording();
        }
    }, [isMobile]);
    useEffect(() => {
        if (state.recorder) {
            state.recorder.ondataavailable = (event) => {
                state.chunks.push(event.data);
            };
        }
    }, [state.recorder, state.chunks]);
    useEffect(() => {
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
                EventEmitter.dispatch(EventTypes.AWAIT_RECORD_COMPLETE, payload);
            };
        }
    }, [state.chunks, state.recorder, supportedType]);
    useEffect(() => {
        if (state.recorder) {
            state.recorder.onerror = (err) => {
                error({ content: err.toString(), id: err.toString() });
                destroyAudioRecorder();
            };
        }
    }, [destroyAudioRecorder, error, state.recorder]);
    const onStart = useCallback(() => {
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
    useEffect(() => {
        if (state.recorder) {
            state.recorder.onstart = () => {
                onStart();
            };
        }
    }, [state.recorder, onStart]);
    const clearRecord = useCallback(async () => {
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
    useEffect(() => {
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
