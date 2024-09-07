"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CantBindTipModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const dayjs_1 = __importDefault(require("dayjs"));
const duration_1 = __importDefault(require("dayjs/plugin/duration"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const button_1 = require("../../../../common/components/ui/button.js");
const dialog_1 = require("../../../../common/components/ui/dialog.js");
const utils_1 = require("../../../../lib/utils.js");
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
    const hours = (0, react_1.useMemo)(() => {
        return duration ? duration.hours().toString().padStart(2, '0') : null;
    }, [duration]);
    const minutes = (0, react_1.useMemo)(() => {
        return duration ? duration.minutes().toString().padStart(2, '0') : null;
    }, [duration]);
    const seconds = (0, react_1.useMemo)(() => {
        return duration ? duration.seconds().toString().padStart(2, '0') : null;
    }, [duration]);
    return ((0, jsx_runtime_1.jsx)("span", { className: "inline-block font-semibold text-subtle text-sm", children: `${hours ?? '00'}${t('hrs')} ${minutes ?? '00'}${t('mins')} ${seconds ?? '00'}${t('secs')}` }));
}
function CantBindTipModal({ isOpen, errorReason, bindType, nextTimeCanBind, onClose }) {
    const t = (0, next_intl_1.useTranslations)();
    let content = '';
    switch (errorReason) {
        case 'error_reason_invalid_oauth_info':
            content = t('code_bind_err', { bindType });
            break;
        case 'error_reason_account_not_found':
            content = t('account_not_found_err', { bindType });
            break;
        case 'error_reason_user_already_connected':
            content = t('account_early_bind_err', { bindType });
            break;
        case 'error_reason_already_connected_to_another_user':
            content = t('account_bind_err', { bindType });
            break;
        case 'error_reason_account_in_cooldown':
            content = '';
            console.log('该twitter账号还在冷却期');
            break;
        default:
            content = t('request.error.common');
            break;
    }
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, { onClose: onClose, className: (0, utils_1.cn)('w-[90%] md:max-w-[380px] max-h-[60%] overflow-hidden pb-0 text-on-surface focus-visible:outline-none'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 p-5", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-12 h-12 rounded-full flex items-center justify-center bg-[#FFEBD3] dark:bg-[#4F3E2C] border-[6px] border-[#FFF5EA] dark:border-[#383029] flex-shrink-0 ", children: (0, jsx_runtime_1.jsx)(ExclamationTriangleIcon_1.default, { className: "w-6 h-6 stroke-icon-warning" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col text-default space-y-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl text-default font-ppt pt-3", children: t('disconnect_tip_oops') }), (0, jsx_runtime_1.jsx)("p", { className: "text-subtle text-sm", children: nextTimeCanBind ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-x-1", children: [t('account_cooldown1', {
                                            bindType
                                        }), (0, jsx_runtime_1.jsx)(CountDown, { endTime: nextTimeCanBind }), t('account_cooldown2')] })) : (content) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center space-x-4 pt-3", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full focus-visible:outline-none md:min-w-[162px]", color: "warning", onClick: () => {
                                onClose();
                            }, children: t('common.got_it') }) })] }) }) }));
}
