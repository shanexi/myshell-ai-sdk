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
function CountDown({ endTime, callback }) {
    const end = (0, dayjs_1.default)(parseInt(endTime));
    const [duration, setDuration] = (0, react_1.useState)(null);
    const t = (0, next_intl_1.useTranslations)('common');
    (0, react_1.useEffect)(() => {
        let timer = null;
        const countdown = () => {
            const now = (0, dayjs_1.default)();
            const diff = end.diff(now);
            if (diff > 0) {
                setDuration(dayjs_1.default.duration(diff));
                timer = setTimeout(countdown, 1000);
            }
            else {
                callback && callback();
            }
        };
        countdown();
        return () => {
            clearTimeout(timer);
        };
    }, []);
    const days = (0, react_1.useMemo)(() => {
        return duration ? duration.days().toString().padStart(2, '0') : null;
    }, [duration]);
    const hours = (0, react_1.useMemo)(() => {
        return duration ? duration.hours().toString().padStart(2, '0') : null;
    }, [duration]);
    const minutes = (0, react_1.useMemo)(() => {
        return duration ? duration.minutes().toString().padStart(2, '0') : null;
    }, [duration]);
    const seconds = (0, react_1.useMemo)(() => {
        return duration ? duration.seconds().toString().padStart(2, '0') : null;
    }, [duration]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 text-default", children: [(0, jsx_runtime_1.jsx)("div", { className: "px-[9px] py-1 rounded-xl min-w-[64px] h-[64px] border border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-[20px]", children: days ?? '00' }), (0, jsx_runtime_1.jsx)("p", { className: "opacity-60 text-[12px]", children: t('days') })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "px-[9px] py-1 rounded-xl min-w-[64px] h-[64px] border border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-[20px]", children: hours ?? '00' }), (0, jsx_runtime_1.jsx)("p", { className: "opacity-60 text-[12px]", children: t('hrs') })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "px-[9px] py-1 rounded-xl min-w-[64px] h-[64px] border border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-[20px]", children: minutes ?? '00' }), (0, jsx_runtime_1.jsx)("p", { className: "opacity-60 text-[12px]", children: t('mins') })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "px-[9px] py-1 rounded-xl min-w-[64px] h-[64px] border border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col justify-center items-center", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-[20px]", children: seconds ?? '00' }), (0, jsx_runtime_1.jsx)("p", { className: "opacity-60 text-[12px]", children: t('secs') })] }) })] }));
}
