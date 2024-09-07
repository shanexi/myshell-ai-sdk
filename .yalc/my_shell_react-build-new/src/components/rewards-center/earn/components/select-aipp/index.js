"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SelectAIppModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const BoltIcon_1 = __importDefault(require("@heroicons/react/24/solid/BoltIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const agentPump_1 = require("../../../../../apis/agentPump.js");
const avatar_1 = require("../../../../../common/components/ui/avatar.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const icon_1 = require("../../../../../common/components/ui/icon.js");
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const arrow_left_1 = require("../../../../../common/components/ui/icons/outline/arrow-left.js");
const caret_down_1 = require("../../../../../common/components/ui/icons/solid/caret-down.js");
const link_1 = require("../../../../../common/components/ui/link.js");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const spinner_1 = __importDefault(require("../../../../../common/components/ui/spinner.js"));
const typography_1 = require("../../../../../common/components/ui/typography.js");
const dayjs_1 = __importDefault(require("dayjs"));
function SelectAIppModal({ isOpen, onClose, onBack }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.earn_content.select_aipp');
    const [curves, setCurves] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const fetch = async () => {
        setLoading(true);
        try {
            const response = await (0, agentPump_1.get_my_collection)();
            if (response.success) {
                setCurves([...response.data.curvesWithEarningStats]);
            }
        }
        catch {
        }
        finally {
            setLoading(false);
        }
    };
    const onSelect = (record) => {
        const dateStr = (0, dayjs_1.default)().format('YYMMDD');
        const encodedUrl = `https://app.myshell.ai/rewards-center/rewards-aipp-store/${record?.curve?.symbol}?utm_source=twitter&utm_medium=social&utm_campaign=mypnlsharing_${dateStr}&utm_content=${record?.curve?.symbol}`.trim();
        const encodedText = encodeURIComponent(`
📊 <${record?.curve?.botSummary?.name || 'NAME'}> <$${record?.curve?.symbol || 'SYMBOL'}>
💰 Current Price: ${record?.curve?.price || 0}(BNB)
📈 Daily: ${record?.curve?.changesDaily?.change || 0}%
📈 Total: ${record?.earningStats?.earningRate || 0}%
🧙 My AI App is creating wealth magic!

🔗 ${encodedUrl}

`);
        const shareUrl = `https://x.com/intent/post?text=${encodedText}&hashtags=MyShell,AIppStore`;
        window.open(shareUrl);
        onBack();
    };
    (0, react_1.useEffect)(() => {
        fetch();
    }, []);
    return ((0, jsx_runtime_1.jsxs)(modal_1.Modal, { open: isOpen, onClose: () => onClose(), size: "sm", modalOnly: false, children: [(0, jsx_runtime_1.jsx)(modal_1.ModalHeader, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", variant: "ghost", icon: arrow_left_1.ArrowLeft, onClick: onBack }), (0, jsx_runtime_1.jsx)(modal_1.ModalTitle, { children: t('select_your_aipp') })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "h-[500px] overflow-auto", children: [loading && ((0, jsx_runtime_1.jsx)("div", { className: "h-[500px] flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(spinner_1.default, { color: "brand" }) })), !loading && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [curves.length ? ((0, jsx_runtime_1.jsx)("div", { className: "p-4 space-y-3", children: curves.map(record => {
                                    const rate = record?.earningStats?.earningRate ? Number(record?.earningStats?.earningRate) : 0;
                                    const isPositive = rate >= 0;
                                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border border-default shadow-background-default rounded-xl p-3 cursor-pointer hover:bg-surface-hovered", onClick: () => onSelect(record), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2.5 min-w-[220px]", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: "xl", src: record.curve?.botSummary?.logoUrl }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-grow space-y-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", className: "break-all", color: "subtlest", lineClamp: 1, children: `$${record.curve?.symbol}` }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", lineClamp: 1, children: record.curve?.botSummary?.name || 'Unknown Bot' })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(caret_down_1.CaretDown, { size: "2xs", color: isPositive ? 'success' : 'critical', rotate: isPositive ? '180' : undefined }), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", color: isPositive ? 'success' : 'critical', children: `${record?.earningStats?.earningRate ? record?.earningStats?.earningRate : 0}%` }) })] })] }));
                                }) })) : null, !curves.length ? ((0, jsx_runtime_1.jsxs)("div", { className: "h-[500px] flex flex-col items-center justify-center", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { component: BoltIcon_1.default, size: "4xl", color: "subtlest" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "semibold", color: "default", className: "mt-3", children: t('you_don_t_own_any_aipp') }), (0, jsx_runtime_1.jsx)(link_1.Link, { href: "/rewards-center/rewards-aipp-store", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: "brand", className: "mt-4", children: t('go_shopping') }) })] })) : null] }))] })] }));
}
