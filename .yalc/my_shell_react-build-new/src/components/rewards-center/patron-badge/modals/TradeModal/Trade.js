"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Trade;
const jsx_runtime_1 = require("react/jsx-runtime");
const dayjs_1 = __importDefault(require("dayjs"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const agentPump_1 = require("../../../../../apis/agentPump.js");
const icon_1 = require("../../../../../common/components/ui/icon.js");
const input_1 = require("../../../../../common/components/ui/input.js");
const skeleton_1 = require("../../../../../common/components/ui/skeleton.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const utils_1 = require("../../../../../lib/utils.js");
const Stars = () => ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "17", viewBox: "0 0 16 17", fill: "currentColor", children: (0, jsx_runtime_1.jsxs)("g", { "clip-path": "url(#clip0_1590_146953)", children: [(0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6 3.5C6.22324 3.5 6.41943 3.64799 6.48076 3.86264L7.02289 5.7601C7.26018 6.59062 7.90938 7.23982 8.7399 7.47711L10.6374 8.01924C10.852 8.08057 11 8.27676 11 8.5C11 8.72324 10.852 8.91943 10.6374 8.98076L8.7399 9.52289C7.90938 9.76019 7.26018 10.4094 7.02289 11.2399L6.48076 13.1374C6.41943 13.352 6.22324 13.5 6 13.5C5.77676 13.5 5.58057 13.352 5.51924 13.1374L4.97711 11.2399C4.73982 10.4094 4.09062 9.76019 3.2601 9.52289L1.36264 8.98076C1.14799 8.91943 1 8.72324 1 8.5C1 8.27676 1.14799 8.08057 1.36264 8.01924L3.2601 7.47711C4.09062 7.23982 4.73982 6.59062 4.97711 5.7601L5.51924 3.86264C5.58057 3.64799 5.77676 3.5 6 3.5Z" }), (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 1.5C12.2294 1.5 12.4294 1.65615 12.4851 1.87873L12.6576 2.56904C12.8144 3.19604 13.304 3.6856 13.931 3.84235L14.6213 4.01493C14.8439 4.07057 15 4.27057 15 4.5C15 4.72943 14.8439 4.92943 14.6213 4.98507L13.931 5.15765C13.304 5.3144 12.8144 5.80396 12.6576 6.43096L12.4851 7.12127C12.4294 7.34385 12.2294 7.5 12 7.5C11.7706 7.5 11.5706 7.34385 11.5149 7.12127L11.3424 6.43096C11.1856 5.80396 10.696 5.3144 10.069 5.15765L9.37873 4.98507C9.15615 4.92943 9 4.72943 9 4.5C9 4.27057 9.15615 4.07057 9.37873 4.01493L10.069 3.84235C10.696 3.6856 11.1856 3.19604 11.3424 2.56904L11.5149 1.87873C11.5706 1.65615 11.7706 1.5 12 1.5Z" }), (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11 10.5C11.2152 10.5 11.4063 10.6377 11.4743 10.8419L11.7372 11.6304C11.8367 11.929 12.071 12.1633 12.3696 12.2628L13.1581 12.5257C13.3623 12.5937 13.5 12.7848 13.5 13C13.5 13.2152 13.3623 13.4063 13.1581 13.4743L12.3696 13.7372C12.071 13.8367 11.8367 14.071 11.7372 14.3696L11.4743 15.1581C11.4063 15.3623 11.2152 15.5 11 15.5C10.7848 15.5 10.5937 15.3623 10.5257 15.1581L10.2628 14.3696C10.1633 14.071 9.92898 13.8367 9.63037 13.7372L8.84189 13.4743C8.63771 13.4063 8.5 13.2152 8.5 13C8.5 12.7848 8.63771 12.5937 8.84189 12.5257L9.63037 12.2628C9.92898 12.1633 10.1633 11.929 10.2628 11.6304L10.5257 10.8419C10.5937 10.6377 10.7848 10.5 11 10.5Z" })] }) }));
function Trade(props) {
    const { curveId, action = 'buy', tickerBalance, total, balanceOfBNB, currencyLogo, errorText = '', amount, ticker, creatorFirst, creatorFirstDDL, bnbPrice, loadingBnbPrice = false, loading, setAction, onAmountChange } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const [m, setM] = (0, react_1.useState)();
    const [s, setS] = (0, react_1.useState)();
    const handleAmountChange = (e) => {
        const { value } = e.target;
        if (!Number.isFinite(Number(value))) {
            return;
        }
        if (!Number.isInteger(Number(value)) || value.includes('.')) {
            return;
        }
        onAmountChange?.(value);
    };
    (0, react_1.useEffect)(() => {
        if (!creatorFirst) {
            return;
        }
        const targetTime = dayjs_1.default.unix(Number(creatorFirstDDL));
        const timer = setInterval(() => {
            const currentTime = (0, dayjs_1.default)();
            const duration = dayjs_1.default.duration(targetTime.diff(currentTime));
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            if (minutes < 0) {
                clearInterval(timer);
            }
            setM(minutes > 0 ? String(minutes) : '0');
            setS(seconds > 0 ? String(seconds) : '0');
        }, 1000);
        window.onbeforeunload = function onLeave() {
            if (curveId) {
                (0, agentPump_1.set_end_creator_priority)(curveId).then();
            }
        };
        return () => {
            clearInterval(timer);
            window.onbeforeunload = null;
        };
    }, [creatorFirst, creatorFirstDDL, curveId]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 px-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex p-0.5 bg-surface-container-default rounded-full items-center border border-default", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)('flex items-center justify-center flex-1 text-sm text-subtler font-medium cursor-pointer select-none py-[7px]', action === 'buy' && 'bg-surface-success-pressed rounded-full h-full cursor-auto text-static'), onClick: () => {
                            setAction?.('buy');
                        }, children: t('buy') }), !creatorFirst && ((0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)('flex items-center justify-center flex-1 text-sm text-subtler font-medium cursor-pointer select-none py-[7px]', action === 'sell' && 'bg-surface-critical-default rounded-full h-full cursor-auto text-static'), onClick: () => {
                            setAction?.('sell');
                        }, children: t('sell') }))] }), creatorFirst && ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('w-full rounded-xl flex items-start gap-1.5 bg-utility-status05-20 p-2'), children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "sm", className: "translate-y-0.5 text-utility-status05-90", children: (0, jsx_runtime_1.jsx)(Stars, {}) }), (0, jsx_runtime_1.jsxs)(typography_1.Text, { size: "sm", weight: "medium", className: "text-utility-status05-90", children: [t('creator_first_tip'), (0, jsx_runtime_1.jsx)("br", {}), m && s ? t('creator_first_countdown', { m, s }) : null] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 shadow-background-border", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex flex-col gap-3 border rounded-xl px-3 py-4 bg-surface-search-field', errorText ? 'border-critical' : 'border-default'), children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { color: "brand", size: "sm", weight: "medium", children: `$${ticker}` }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-3 justify-between", children: (0, jsx_runtime_1.jsx)(input_1.Input, { className: "h-9 text-3xl font-medium text-default pl-0 placeholder:text-disabled", border: "none", outline: "none", placeholder: "0", background: "none", shadow: "none", value: amount, onChange: handleAmountChange, disabled: loading }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-between w-full", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: action === 'buy'
                                        ? ''
                                        : t.rich('own_keys', {
                                            count: tickerBalance,
                                            highlight: chunk => ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "brand", children: chunk }))
                                        }) }) })] }), !!errorText && (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-critical", children: errorText })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "py-2 border-b border-default space-y-2", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex items-start justify-between", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center space-x-1", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: t('total_with_fee') }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [currencyLogo, (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "default", children: total })] }), loadingBnbPrice ? ((0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, { className: "w-5 h-4" })) : ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xs", color: "subtlest", children: `≈$${(Number(bnbPrice) * Number(total)).toFixed(2)}` }))] })] }) }), action === 'buy' && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex items-center justify-between py-2", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: t('balance') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [currencyLogo, (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "default", children: balanceOfBNB })] })] }))] })] }));
}
