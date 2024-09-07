"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CountDown;
const jsx_runtime_1 = require("react/jsx-runtime");
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
dayjs_1.default.extend(duration_1.default);
dayjs_1.default.extend(utc_1.default);
function CountDown({ target }) {
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const [duration, setDuration] = (0, react_1.useState)();
    const days = duration ? Math.floor(duration.asDays()).toString().padStart(2, '0') : null;
    const hours = (0, react_1.useMemo)(() => {
        return duration ? duration.hours().toString().padStart(2, '0') : null;
    }, [duration]);
    const minutes = (0, react_1.useMemo)(() => {
        return duration ? duration.minutes().toString().padStart(2, '0') : null;
    }, [duration]);
    const seconds = (0, react_1.useMemo)(() => {
        return duration ? duration.seconds().toString().padStart(2, '0') : null;
    }, [duration]);
    const date = [
        [days, t('days')],
        [hours, t('hrs')],
        [minutes, t('mins')],
        [seconds, t('secs')]
    ];
    (0, react_1.useEffect)(() => {
        const cb = () => {
            try {
                const currentTime = (0, dayjs_1.default)();
                let duration = null;
                if (target && !isNaN(Math.abs(target.diff(currentTime)))) {
                    duration = dayjs_1.default.duration(Math.abs(target.diff(currentTime)));
                    setDuration(duration);
                }
            }
            catch (e) {
                console.log(e);
            }
        };
        const interval = setInterval(() => cb(), 1000);
        cb();
        return () => {
            clearInterval(interval);
        };
    }, [target]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "inline-flex space-x-2 bg-[var(--alpha-70)] py-2 px-3 md:py-3 md:px-5 rounded-xl md:rounded-2xl", style: { backdropFilter: 'blur(12px)' }, children: date.map(([time, label], index) => ((0, jsx_runtime_1.jsx)("div", { className: "w-11 md:w-11 h-11 md:h-11", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-xl md:text-2xl font-medium text-default", children: time ?? '00' }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-default opacity-40", children: label })] }) }, index))) }));
}
