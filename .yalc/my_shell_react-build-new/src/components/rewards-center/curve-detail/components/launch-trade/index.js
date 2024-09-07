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
exports.default = LaunchTrade;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowRightIcon"));
const dayjs_1 = __importDefault(require("dayjs"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const wagmi_1 = require("wagmi");
const agentPump_1 = require("../../../../../apis/agentPump.js");
const icon_1 = require("../../../../../common/components/ui/icon.js");
const link_1 = require("../../../../../common/components/ui/link.js");
const use_toast_1 = require("../../../../../common/components/ui/toast/use-toast.js");
const constants_1 = require("../../../../../common/constants/constants.js");
const useNotification_1 = require("../../../../../common/hooks/useNotification.js");
const identityService_1 = require("../../../../../common/services/identityService.js");
const bind_2FA_1 = __importStar(require("../../../../../components/rewards-center/components/bind-2FA/index.js"));
const useBondingContract_1 = require("../../../../../hooks/web3/useBondingContract.js");
const store_1 = require("../../../../../services/store/index.js");
const LaunchTradeButton_1 = __importDefault(require("./LaunchTradeButton.js"));
const TradeModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../patron-badge/modals/TradeModal/index.js'))), { ssr: false });
const CommentModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../patron-badge/modals/CommentModal/index.js'))), { ssr: false });
const CreatorFirstConfirmModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../patron-badge/modals/CreatorFirstConfirmModal/index.js'))), {
    ssr: false
});
const LaunchModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../components/rewards-center/patron-badge/modals/LaunchModal/index.js'))), {
    ssr: false
});
function LaunchTrade(props) {
    const { curve, botInfo, isBlock } = props;
    const router = (0, navigation_1.useRouter)();
    const tRequest = (0, next_intl_1.useTranslations)('request');
    const tBadge = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const { error: errorToast } = (0, useNotification_1.useNotification)();
    const { toast } = (0, use_toast_1.useToast)();
    const isBind2FA = (0, bind_2FA_1.useBind2FA)();
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const [openTrade, setOpenTrade] = (0, react_1.useState)(false);
    const [openCommentModal, setOpenCommentModal] = (0, react_1.useState)(false);
    const [openLaunch, setOpenLaunch] = (0, react_1.useState)(false);
    const [openCreatorConfirm, setOpenCreatorConfirm] = (0, react_1.useState)(false);
    const [creatingBadge, setCreatingBadge] = (0, react_1.useState)(false);
    const [operationTx, setOperationTx] = (0, react_1.useState)();
    const [ticker, setTicker] = (0, react_1.useState)('');
    const [tradeAction, setTradeAction] = (0, react_1.useState)('buy');
    const [openBind2FAForTrade, setOpenBind2FAForTrade] = (0, react_1.useState)(false);
    const [openBind2FAForLaunch, setOpenBind2FAForLaunch] = (0, react_1.useState)(false);
    const { launchBonding } = (0, useBondingContract_1.useBondingContract)();
    const [trading, setTrading] = (0, react_1.useState)(false);
    const botSummary = curve?.detail?.boundingCurveSummary?.botSummary || botInfo;
    const [curveSummary, setCurveSummary] = (0, react_1.useState)(curve?.detail?.boundingCurveSummary);
    const isSelf = identityService_1.identityService.getUserId() === botSummary?.author?.id;
    const creatorFirst = dayjs_1.default.unix(Number(curveSummary?.creatorFirstDeadlineUnixStamp)).isAfter((0, dayjs_1.default)());
    const handleOpenTradeModal = (ignore2Fa) => {
        if (!isBind2FA && !identityService_1.identityService.getDontShow2FA() && !ignore2Fa) {
            setOpenBind2FAForTrade(true);
            return;
        }
        const token = identityService_1.identityService.getToken();
        if (!token) {
            toggleLoginModal(true);
            return;
        }
        if (!curve)
            return;
        if (creatorFirst) {
            if (!isSelf) {
                return;
            }
        }
        setOpenTrade(true);
    };
    const handleOpenLaunchModal = (ignore2Fa) => {
        if (!isBind2FA && !identityService_1.identityService.getDontShow2FA() && !ignore2Fa) {
            setOpenBind2FAForLaunch(true);
            return;
        }
        setOpenLaunch(true);
    };
    const onTradeSubmitted = (tx) => {
        setOperationTx(tx);
    };
    const onTradeStart = (action) => {
        setOperationTx(undefined);
        setTradeAction(action);
    };
    const onCreatorFirst = async (botId) => {
        const maxRetries = 3;
        let retryCount = 0;
        const run = async () => {
            try {
                const response = await (0, agentPump_1.get_curve)({ botId });
                if (response.success) {
                    const curveItem = response.data?.detail?.boundingCurveSummary;
                    if (curveItem) {
                        return curveItem;
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
            const botId = botSummary?.id;
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
                if (botId) {
                    const curve = await onCreatorFirst(botId);
                    if (curve) {
                        setCurveSummary(curve);
                        handleOpenTradeModal();
                    }
                }
                setTicker('');
                setOpenLaunch(false);
                toast({
                    variant: 'success',
                    title: tBadge('create_ticker_success'),
                    description: tBadge('create_ticker_success_tip'),
                    action: ((0, jsx_runtime_1.jsx)(link_1.Link, { href: `${constants_1.BSC_EXPLORER_URL}/tx/${tx}`, target: "_blank", rel: "noreferrer noopener", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[6px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-surface-primary-default", children: tBadge('view_in_explorer') }), (0, jsx_runtime_1.jsx)(ArrowRightIcon_1.default, { className: "w-5 h-5", color: "var(--surface-primary-default)" })] }) }))
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
                content: error.message
            });
        }
        finally {
            setCreatingBadge(false);
        }
    };
    const { status: txStatus } = (0, wagmi_1.useWaitForTransactionReceipt)({
        hash: operationTx,
        chainId: constants_1.bsc_chain_id_current_env,
        query: {
            notifyOnChangeProps: 'all'
        }
    });
    const timerRef = (0, react_1.useRef)(null);
    const cancelDelay = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
    const handleCloseCommentModal = () => {
        setOpenCommentModal(false);
    };
    const handleCloseTradeModal = () => {
        if (creatorFirst && isSelf) {
            setOpenCreatorConfirm(true);
        }
        setOpenTrade(false);
        setTrading(false);
        cancelDelay();
    };
    (0, react_1.useEffect)(() => {
        if (txStatus === 'success') {
            const txUrl = `${constants_1.BSC_EXPLORER_URL}/tx/${operationTx}`;
            toast({
                key: 'trade_success',
                variant: 'success',
                title: tBadge('buy_success'),
                description: tBadge('buy_success_tip'),
                action: ((0, jsx_runtime_1.jsx)(link_1.Link, { href: txUrl, target: "_blank", rel: "noreferrer noopener", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-brand", children: tBadge('view_in_explorer') }), (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: ArrowRightIcon_1.default, color: "brand", size: "sm" })] }) }))
            });
            timerRef.current = setTimeout(() => {
                setOpenTrade(false);
                setTrading(false);
                if (tradeAction === 'buy') {
                    setOpenCommentModal(true);
                }
                else {
                    router.push('/rewards-center/rewards-aipp-store?tab=portfolio');
                }
                if (creatorFirst && isSelf && curveSummary) {
                    (0, agentPump_1.set_end_creator_priority)(curveSummary?.id);
                }
            }, 12000);
        }
        else if (txStatus === 'error') {
            setTrading(false);
        }
        else {
        }
        return () => {
            cancelDelay();
        };
    }, [txStatus]);
    (0, react_1.useEffect)(() => {
        if (curve?.detail?.boundingCurveSummary) {
            setCurveSummary(curve?.detail?.boundingCurveSummary);
        }
    }, [curve]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(LaunchTradeButton_1.default, { curve: curve, isSelf: isSelf, creatorFirst: creatorFirst, isBlock: isBlock, onTrade: () => handleOpenTradeModal(), onLaunch: () => handleOpenLaunchModal() }), openCommentModal && ((0, jsx_runtime_1.jsx)(CommentModal, { curveId: curveSummary?.id || '', tickerName: curveSummary?.symbol || '', isOpen: openCommentModal, onClose: handleCloseCommentModal, needReloadCurrentPage: true })), openTrade && ((0, jsx_runtime_1.jsx)(TradeModal, { open: openTrade, trading: trading, setTrading: setTrading, onClose: handleCloseTradeModal, avatar: botSummary?.logoUrl, botName: botSummary?.name, author: botSummary?.author?.name, price: curveSummary?.price, tickerName: curveSummary?.symbol, tickerBalance: curveSummary?.holdInfo?.holdCount?.toString(), curveId: curveSummary?.id, creatorFirst: creatorFirst, creatorFirstDDL: curveSummary?.creatorFirstDeadlineUnixStamp, onBack: () => {
                    if (creatorFirst && isSelf) {
                        setOpenCreatorConfirm(true);
                    }
                    setOpenTrade(false);
                }, onTradeStart: onTradeStart, onTradeSubmitted: onTradeSubmitted })), openCreatorConfirm && ((0, jsx_runtime_1.jsx)(CreatorFirstConfirmModal, { open: openCreatorConfirm, onConfirm: () => {
                    setOpenCreatorConfirm(false);
                    setOpenTrade(true);
                }, onClose: () => {
                    setOpenCreatorConfirm(false);
                    if (curveSummary?.id) {
                        (0, agentPump_1.set_end_creator_priority)(curveSummary?.id);
                    }
                } })), openLaunch && ((0, jsx_runtime_1.jsx)(LaunchModal, { open: openLaunch, onOpenChange: setOpenLaunch, onConfirm: onCreateBadgeOnChain, ticker: ticker, onTickerChange: setTicker, loading: creatingBadge })), (openBind2FAForTrade || openBind2FAForLaunch) && ((0, jsx_runtime_1.jsx)(bind_2FA_1.default, { open: openBind2FAForTrade || openBind2FAForLaunch, onClose: isBind2FA => {
                    setOpenBind2FAForTrade(false);
                    setOpenBind2FAForLaunch(false);
                    if (!isBind2FA) {
                        if (openBind2FAForTrade) {
                            handleOpenTradeModal(true);
                        }
                        if (openBind2FAForLaunch) {
                            handleOpenLaunchModal(true);
                        }
                    }
                } }))] }));
}
