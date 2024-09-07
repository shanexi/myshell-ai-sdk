"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LabelActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowRightIcon"));
const PlusIcon_1 = __importDefault(require("@heroicons/react/24/outline/PlusIcon"));
const ArrowSmallUpIcon_1 = __importDefault(require("@heroicons/react/24/solid/ArrowSmallUpIcon"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const link_1 = __importDefault(require("next-intl/link"));
const react_1 = require("react");
const wagmi_1 = require("wagmi");
const agentPump_1 = require("../../../../apis/agentPump.js");
const use_toast_1 = require("../../../../common/components/ui/toast/use-toast.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const constants_1 = require("../../../../common/constants/constants.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const useBondingContract_1 = require("../../../../hooks/web3/useBondingContract.js");
const bind_2FA_1 = __importStar(require("../../components/bind-2FA/index.js"));
const wallet_1 = __importDefault(require("../../patron-badge/wallet/index.js"));
const SelectBotModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../patron-badge/modals/SelectBotModal/index.js'))), { ssr: false });
const LaunchModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../patron-badge/modals/LaunchModal/index.js'))), { ssr: false });
function LabelActions({ address, setOpenHowToPlay, onLaunchComplete }) {
    const t = (0, next_intl_1.useTranslations)('share_key.stake_earn');
    const tAIpp = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const tRequest = (0, next_intl_1.useTranslations)('request');
    const { toast } = (0, use_toast_1.useToast)();
    const { error: errorToast } = (0, useNotification_1.useNotification)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const [openSelectBot, setOpenSelectBot] = (0, react_1.useState)(false);
    const [openLaunch, setOpenLaunch] = (0, react_1.useState)(false);
    const [ticker, setTicker] = (0, react_1.useState)('');
    const [selectedBotId, setSelectedBotId] = (0, react_1.useState)('');
    const [openBind2FA, setOpenBind2FA] = (0, react_1.useState)(false);
    const hasBind2FA = (0, bind_2FA_1.useBind2FA)();
    const [creatingBadge, setCreatingBadge] = (0, react_1.useState)(false);
    const { data: balanceOfBNB, isLoading: loadingBnbBalance, refetch: refetchBnbBalance } = (0, wagmi_1.useBalance)({
        address,
        chainId: constants_1.bsc_chain_id_current_env
    });
    const { launchBonding } = (0, useBondingContract_1.useBondingContract)();
    (0, react_1.useEffect)(() => {
        if (!refetchBnbBalance)
            return;
        const interval = setInterval(() => {
            refetchBnbBalance();
        }, 10000);
        return () => {
            clearInterval(interval);
        };
    }, [refetchBnbBalance]);
    const onBotConfirmed = (botId) => {
        setSelectedBotId(botId);
        setOpenSelectBot(false);
        setOpenLaunch(true);
    };
    const onLaunch = () => {
        if (!hasBind2FA && !identityService_1.identityService.getDontShow2FA()) {
            setOpenBind2FA(true);
            return;
        }
        setOpenSelectBot(true);
    };
    const onCreatorFirst = async (botId) => {
        const maxRetries = 3;
        let retryCount = 0;
        const run = async () => {
            try {
                const response = await (0, agentPump_1.get_curve)({ botId });
                if (response.success) {
                    const curve = response.data.detail.boundingCurveSummary;
                    if (curve) {
                        return curve;
                    }
                    return null;
                }
                return null;
            }
            catch (e) {
                return null;
            }
        };
        return new Promise(resolve => {
            const fetchCurve = async () => {
                const curve = await run();
                if (curve) {
                    resolve(curve);
                }
                else if (retryCount < maxRetries) {
                    retryCount += 1;
                    setTimeout(fetchCurve, 5000);
                }
                else {
                    resolve(null);
                }
            };
            setTimeout(fetchCurve, 12000);
        });
    };
    const onCreateBadgeOnChain = async () => {
        try {
            setCreatingBadge(true);
            const botId = selectedBotId;
            const response = await (0, agentPump_1.get_create_curve_signature)({
                name: botId,
                symbol: ticker
            });
            if (response.success) {
                const { signature, name, symbol, validTill } = response.data;
                const tx = await launchBonding({
                    name,
                    symbol,
                    sig: signature,
                    validTill: BigInt(validTill)
                });
                const curve = await onCreatorFirst(botId);
                if (curve) {
                    onLaunchComplete(curve);
                }
                setTicker('');
                setOpenLaunch(false);
                toast({
                    variant: 'success',
                    title: tAIpp('create_ticker_success'),
                    description: tAIpp('create_ticker_success_tip'),
                    action: ((0, jsx_runtime_1.jsx)(link_1.default, { href: `${constants_1.BSC_EXPLORER_URL}/tx/${tx}`, target: "_blank", rel: "noreferrer noopener", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[6px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-surface-primary-default", children: tAIpp('view_in_explorer') }), (0, jsx_runtime_1.jsx)(ArrowRightIcon_1.default, { className: "w-5 h-5", color: "var(--surface-primary-default)" })] }) }))
                });
            }
            else {
                errorToast({
                    content: response.msg || tRequest('error.common')
                });
            }
        }
        catch (error) {
            if (error instanceof Error && error.message.includes('User reject')) {
                return;
            }
            errorToast({
                content: error?.message
            });
        }
        finally {
            setCreatingBadge(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3 items-center w-full justify-center md:w-fit px-4 md:px-0", children: [isMobile ? ((0, jsx_runtime_1.jsx)("div", { className: "absolute right-3 top-3", children: (0, jsx_runtime_1.jsx)(wallet_1.default, {}) })) : ((0, jsx_runtime_1.jsx)(wallet_1.default, {})), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 md:flex-f-grow-0 items-center justify-center flex-shrink-0 bg-utility-status03-20 hover:bg-utility-status03-30 rounded-full py-1.5 px-2.5 md:py-2 md:px-4 gap-1 cursor-pointer", onClick: onLaunch, children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", className: "text-sm whitespace-nowrap text-utility-status03-70", children: t('start_a_new_agent') }), (0, jsx_runtime_1.jsx)(PlusIcon_1.default, { className: "w-3 h-3 text-utility-status03-70" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 md:flex-grow-0 items-center justify-center flex-shrink-0 bg-surface-primary-subtle-hovered hover:bg-surface-primary-subtle-pressed rounded-full py-1.5 px-2.5 md:py-2 md:px-4 gap-1 cursor-pointer", onClick: () => setOpenHowToPlay(true), children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", className: "text-sm whitespace-nowrap", color: "brand", children: t('how_to_play') }), (0, jsx_runtime_1.jsx)(ArrowSmallUpIcon_1.default, { className: "w-3 h-3 rotate-90 text-brand" })] }), openSelectBot && ((0, jsx_runtime_1.jsx)(SelectBotModal, { open: openSelectBot, onOpenChange: setOpenSelectBot, onBotConfirmed: onBotConfirmed })), openLaunch && ((0, jsx_runtime_1.jsx)(LaunchModal, { open: openLaunch, onOpenChange: setOpenLaunch, onConfirm: onCreateBadgeOnChain, ticker: ticker, onTickerChange: setTicker, loading: creatingBadge })), openBind2FA && ((0, jsx_runtime_1.jsx)(bind_2FA_1.default, { open: openBind2FA, onClose: wantToBind2FA => {
                    setOpenBind2FA(false);
                    if (!wantToBind2FA) {
                        setOpenSelectBot(true);
                    }
                } }))] }));
}
