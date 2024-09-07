"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FromNowTime;
const jsx_runtime_1 = require("react/jsx-runtime");
const dayjs_1 = __importDefault(require("dayjs"));
const zh_1 = __importDefault(require("dayjs/locale/zh"));
const relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
const next_intl_1 = require("next-intl");
dayjs_1.default.extend(relativeTime_1.default);
function FromNowTime({ time }) {
    const t = (0, next_intl_1.useTranslations)();
    const customLocale = {
        ...zh_1.default,
        name: 'custom',
        relativeTime: {
            ...zh_1.default.relativeTime,
            future: `${t('common.in')} %s`,
            past: `%s ${t('common.ago')}`,
            s: t('common.few'),
            m: `1 ${t('reward_center.mins')}`,
            mm: `%d ${t('reward_center.mins')}`,
            h: `1 ${t('reward_center.hrs')}`,
            hh: `%d ${t('reward_center.hrs')}`,
            d: `1 ${t('common.days')}`,
            dd: `%d ${t('common.days')}`,
            M: `1 ${t('common.month')}`,
            MM: `%d ${t('common.month')}`,
            y: `1 ${t('common.year')}`,
            yy: `%d ${t('common.year')}`
        }
    };
    const now = (0, dayjs_1.default)();
    const inputTime = (0, dayjs_1.default)(parseInt(`${time}000`, 10));
    const diffInMinutes = now.diff(inputTime, 'minute');
    const diffInHours = now.diff(inputTime, 'hour');
    const diffInDays = now.diff(inputTime, 'day');
    let displayTime;
    if (diffInMinutes < 60 || diffInHours < 24 || diffInDays <= 3) {
        displayTime = inputTime.locale('custom', customLocale).fromNow();
    }
    else {
        displayTime = inputTime.format('MM/DD/YYYY');
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: displayTime });
}
