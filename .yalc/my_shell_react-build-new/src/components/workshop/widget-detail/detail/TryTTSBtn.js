"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TryTTSBtn;
const jsx_runtime_1 = require("react/jsx-runtime");
const PauseIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/PauseIcon"));
const PlayIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/PlayIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const workshop_1 = require("../../../../apis/workshop");
const button_1 = require("../../../../common/components/ui/button");
const useNotification_1 = require("../../../../common/hooks/useNotification");
function TryTTSBtn({ widgetId }) {
    const { warning } = (0, useNotification_1.useNotification)();
    const t = (0, next_intl_1.useTranslations)('workshop');
    const { value: loading, setTrue, setFalse } = (0, usehooks_ts_1.useBoolean)(false);
    const { value: playing, setTrue: setPlaying, setFalse: setPlayingFalse } = (0, usehooks_ts_1.useBoolean)(false);
    const [trailVoiceUrl, setTrailVoiceUrl] = (0, react_1.useState)();
    const ref = (0, react_1.useRef)(null);
    const onPlay = () => {
        setPlaying();
    };
    const handlePlay = () => {
        if (ref.current) {
            if (ref.current.paused) {
                ref.current.play();
            }
        }
    };
    const handlePause = () => {
        if (ref.current && !ref.current.paused) {
            ref.current.pause();
            setPlayingFalse();
        }
    };
    const handleError = () => {
        warning({
            content: t('tts_widget_trail_failed')
        });
        setTrailVoiceUrl(undefined);
    };
    const handleEnded = () => {
        if (ref.current) {
            setPlayingFalse();
        }
    };
    const handleClick = async (e) => {
        e.preventDefault();
        if (playing) {
            handlePause();
        }
        else {
            if (!trailVoiceUrl) {
                await tryVoice();
            }
            handlePlay();
        }
    };
    const tryVoice = async () => {
        try {
            setTrue();
            const { data, success } = await (0, workshop_1.ttsWidgetTrail)(widgetId);
            if (!success) {
                warning({
                    content: t('tts_widget_trail_failed')
                });
                return;
            }
            setTrailVoiceUrl(data);
        }
        catch (e) {
        }
        finally {
            setFalse();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "default", className: "w-7 h-7 px-1 min-w-7", onClick: handleClick, loading: loading, children: playing ? ((0, jsx_runtime_1.jsx)(PauseIcon_1.default, { className: "w-[14px] h-[14px] text-brand stroke-[2px]" })) : ((0, jsx_runtime_1.jsx)(PlayIcon_1.default, { className: "w-[14px] h-[14px] text-brand stroke-[2px]" })) }), trailVoiceUrl && ((0, jsx_runtime_1.jsx)("audio", { ref: ref, src: trailVoiceUrl, onError: handleError, autoPlay: true, onPlay: onPlay, onEnded: handleEnded }))] }));
}
