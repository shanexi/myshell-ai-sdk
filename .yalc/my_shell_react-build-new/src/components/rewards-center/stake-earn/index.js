"use strict";
'use client';
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
exports.default = StakeEarn;
const jsx_runtime_1 = require("react/jsx-runtime");
const outline_1 = require("@heroicons/react/24/outline");
const ArrowRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowRightIcon"));
const react_auth_1 = require("@privy-io/react-auth");
const dayjs_1 = __importDefault(require("dayjs"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const wagmi_1 = require("wagmi");
const agentPump_1 = require("../../../apis/agentPump.js");
const apiTypes_1 = require("../../../apis/apiTypes.js");
const FilterTagListBox_1 = __importDefault(require("../../../common/components/filter-tags/FilterTagListBox.js"));
const icon_1 = require("../../../common/components/ui/icon.js");
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const link_1 = require("../../../common/components/ui/link.js");
const search_bar_1 = require("../../../common/components/ui/search-bar.js");
const use_toast_1 = require("../../../common/components/ui/toast/use-toast.js");
const typography_1 = require("../../../common/components/ui/typography.js");
const constants_1 = require("../../../common/constants/constants.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const useUserSettings_1 = __importDefault(require("../../../common/hooks/useUserSettings.js"));
const identityService_1 = require("../../../common/services/identityService.js");
const usePrivyLogin_1 = require("../../../hooks/user/usePrivyLogin.js");
const useWalletInteraction_1 = __importDefault(require("../../../hooks/web3/useWalletInteraction.js"));
const sensors_1 = require("../../../lib/sensors/index.js");
const store_1 = require("../../../services/store/index.js");
const web3_1 = require("../../../services/store/web3.js");
const Filter_1 = __importStar(require("./components/Filter.js"));
const LabelActions_1 = __importDefault(require("./components/LabelActions.js"));
const bind_2FA_1 = __importStar(require("../components/bind-2FA/index.js"));
const RecommendedSwiper_1 = __importDefault(require("../patron-badge/RecommendedSwiper/index.js"));
const HowToPlayModal_1 = __importDefault(require("../patron-badge/modals/HowToPlayModal/index.js"));
const ReceiveBNBModal_1 = __importDefault(require("../patron-badge/modals/ReceiveBNBModal/index.js"));
const MyCollectionTable_1 = __importDefault(require("../patron-badge/tables/MyCollectionTable.js"));
const TrendingTable_1 = __importDefault(require("../patron-badge/tables/TrendingTable.js"));
const TradeModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../patron-badge/modals/TradeModal/index.js'))), { ssr: false });
const CommentModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../patron-badge/modals/CommentModal/index.js'))), { ssr: false });
const CreatorFirstConfirmModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../patron-badge/modals/CreatorFirstConfirmModal/index.js'))), {
    ssr: false
});
const NeedReLoginModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../earn/components/blockchain/NeedReLoginModal.js'))), { ssr: false });
const ScamAlertModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../patron-badge/modals/ScamAlertModal/index.js'))), { ssr: false });
const UpgradeModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../patron-badge/modals/UpgradeModal/index.js'))), { ssr: false });
function StakeEarn() {
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const { toast } = (0, use_toast_1.useToast)();
    const { address } = (0, useWalletInteraction_1.default)();
    const { switchChain } = (0, wagmi_1.useSwitchChain)();
    const { wallets } = (0, react_auth_1.useWallets)();
    const isBind2FA = (0, bind_2FA_1.useBind2FA)();
    const toggleNeedReLoginModal = (0, web3_1.useWeb3Store)(state => state.toggleNeedReLoginModal);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const openNeedReLoginModal = (0, web3_1.useWeb3Store)(state => state.openNeedReLoginModal);
    const timerRef = (0, react_1.useRef)(null);
    const [selectedFilter, setSelectedFilter] = (0, react_1.useState)(window?.localStorage?.getItem('last_selected_aipp_tab_filter') || Filter_1.FilterType.RECENT);
    const [searchValue, setSearchValue] = (0, react_1.useState)('');
    const [selectedCurve, setSelectedCurve] = (0, react_1.useState)();
    const [openScamAlert, setOpenScamAlert] = (0, react_1.useState)(false);
    const [openTrade, setOpenTrade] = (0, react_1.useState)(false);
    const [openCommentModal, setOpenCommentModal] = (0, react_1.useState)(false);
    const [openUpgradeModal, setOpenUpgradeModal] = (0, react_1.useState)(false);
    const [openHowToPlay, setOpenHowToPlay] = (0, react_1.useState)(false);
    const [openReceive, setOpenReceive] = (0, react_1.useState)(false);
    const [openCreatorConfirm, setOpenCreatorConfirm] = (0, react_1.useState)(false);
    const [tagsLoading, setTagsLoading] = (0, react_1.useState)(false);
    const [tagFilters, setTagFilters] = (0, react_1.useState)([]);
    const pageId = 'patron-badge';
    const [selectedTagIds, setSelectedTagIds] = (0, react_1.useState)([]);
    const [showMore, setShowMore] = (0, react_1.useState)(false);
    const [openBind2FA, setOpenBind2FA] = (0, react_1.useState)(false);
    const [curveFor2FA, setCurveFor2FA] = (0, react_1.useState)();
    const subscribingEarnViewed = (0, store_1.useUserStore)(state => state.subscribingEarnViewed);
    const { handleSubscribingEarnViewed } = (0, useUserSettings_1.default)();
    const tCommon = (0, next_intl_1.useTranslations)();
    const t = (0, next_intl_1.useTranslations)('share_key.stake_earn');
    const tBadge = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const [operationTx, setOperationTx] = (0, react_1.useState)();
    const [trading, setTrading] = (0, react_1.useState)(false);
    const [tradeAction, setTradeAction] = (0, react_1.useState)('buy');
    const [ruggedCurves, setRuggedCurves] = (0, react_1.useState)();
    const [tradingCurveId, setTradingCurveId] = (0, react_1.useState)('');
    const isSelf = identityService_1.identityService.getUserId() === selectedCurve?.botSummary?.author?.id;
    const creatorFirst = dayjs_1.default.unix(Number(selectedCurve?.creatorFirstDeadlineUnixStamp)).isAfter((0, dayjs_1.default)());
    const setSelectedFilterAndSave = (filter) => {
        setSelectedFilter(filter);
        window?.localStorage?.setItem('last_selected_aipp_tab_filter', filter);
    };
    const sensors = (0, sensors_1.useSensors)();
    (0, react_1.useEffect)(() => {
        sensors?.track('EnterStakeEarnPage');
    }, [sensors]);
    (0, react_1.useEffect)(() => {
        const tabInSearch = new URLSearchParams(window.location.search).get('tab');
        if (tabInSearch) {
            setSelectedFilterAndSave(tabInSearch);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        const loginMethod = identityService_1.identityService.getLoginMethod();
        if (!loginMethod) {
            console.error('loginMethod is undefined');
            return;
        }
        const isWeb3 = [usePrivyLogin_1.LoginMethod.OKX, usePrivyLogin_1.LoginMethod.Metamask, usePrivyLogin_1.LoginMethod.WalletConnect, usePrivyLogin_1.LoginMethod.BSC].includes(loginMethod);
        if (isWeb3) {
            switchChain({ chainId: constants_1.bsc_chain_id_current_env });
        }
        else {
            const embeddedWallet = wallets.find(wallet => wallet.connectorType === 'embedded');
            embeddedWallet?.switchChain(constants_1.bsc_chain_id_current_env);
        }
    }, [switchChain, wallets]);
    const checkIfHoldRuggedPump = async () => {
        const response = await (0, agentPump_1.check_if_hold_rugged_pump)();
        if (response.success) {
            const ruggedCurves2 = response.data.curves;
            if (ruggedCurves2.length > 0) {
                setRuggedCurves(ruggedCurves2);
                setOpenScamAlert(true);
            }
        }
    };
    const { status: txStatus } = (0, wagmi_1.useWaitForTransactionReceipt)({
        hash: operationTx,
        chainId: constants_1.bsc_chain_id_current_env,
        query: {
            notifyOnChangeProps: 'all'
        }
    });
    const loadCurveTags = async () => {
        try {
            setTagsLoading(true);
            const response = await (0, agentPump_1.listCurveTags)('BOT_TAG_TYPE_SEARCH');
            if (response.success) {
                setTagFilters(response.data);
            }
        }
        finally {
            setTagsLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        if (isMobile)
            return;
        const firstToAIpp = identityService_1.identityService.getIsFirstToAIpp();
        if (!firstToAIpp) {
            identityService_1.identityService.setIsFirstToAIpp(false);
            setOpenUpgradeModal(true);
            return;
        }
        const viewedHowToPlay = identityService_1.identityService.getIsViewedHowToPlay();
        if (!viewedHowToPlay) {
            setOpenHowToPlay(true);
        }
    }, [isMobile]);
    (0, react_1.useEffect)(() => {
        const viewed = window?.sessionStorage.getItem('alertViewed');
        if (!viewed) {
            checkIfHoldRuggedPump().then();
            window?.sessionStorage.setItem('alertViewed', 'true');
        }
    }, []);
    const cancelDelay = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
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
                setSelectedFilter(Filter_1.FilterType.MY_PORTFOLIO);
                if (tradeAction === 'buy') {
                    setOpenCommentModal(true);
                }
                if (creatorFirst && isSelf && selectedCurve) {
                    (0, agentPump_1.set_end_creator_priority)(selectedCurve?.id).then();
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
        if (!subscribingEarnViewed) {
            handleSubscribingEarnViewed();
        }
    }, [handleSubscribingEarnViewed, subscribingEarnViewed]);
    (0, react_1.useEffect)(() => {
        loadCurveTags().then();
    }, []);
    const handleTrendingCardClick = (symbol) => {
        const link = isMobile
            ? `/m/rewards-center/rewards-aipp-store/${symbol}`
            : `/rewards-center/rewards-aipp-store/${symbol}`;
        window.open(link, '_blank');
    };
    const handleOpenTradeModal = ({ curve }, ignore2Fa) => {
        if (!isBind2FA && !identityService_1.identityService.getDontShow2FA() && !ignore2Fa) {
            setOpenBind2FA(true);
            setCurveFor2FA(curve);
            return;
        }
        setCurveFor2FA(null);
        const token = identityService_1.identityService.getToken();
        if (!token) {
            toggleLoginModal(true);
            return;
        }
        if (!curve)
            return;
        if (creatorFirst) {
            const isSelfL = curve?.creator?.id === identityService_1.identityService.getUserId();
            if (!isSelfL) {
                return;
            }
        }
        setSelectedCurve(curve);
        setOpenTrade(true);
        setTradingCurveId('');
    };
    const handleOpenShareModal = (record) => {
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
    };
    const handleCloseTradeModal = () => {
        if (creatorFirst && isSelf) {
            setOpenCreatorConfirm(true);
        }
        setOpenTrade(false);
        setTrading(false);
        cancelDelay();
    };
    const handleCloseCommentModal = () => {
        setOpenCommentModal(false);
    };
    const handleOpenBotModal = (symbol) => {
        window.open(`/rewards-center/rewards-aipp-store/${symbol}`, '_blank');
    };
    const onTradeSubmitted = (tx) => {
        setOperationTx(tx);
        setTradingCurveId(selectedCurve?.id || '');
    };
    const onTradeStart = (action) => {
        setOperationTx(undefined);
        setTradeAction(action);
    };
    const onFundWallet = () => {
        setOpenReceive(true);
        setOpenHowToPlay(false);
    };
    const onLaunchCompleted = async (curve) => {
        if (curve) {
            handleOpenTradeModal({
                curve
            });
        }
    };
    const onSearch = async (value) => {
        setSearchValue((value || '').trim());
    };
    const onChangeFilter = (filter) => {
        setSelectedFilterAndSave(filter);
    };
    const tagFiltersChange = (tagIds) => {
        setSelectedTagIds([...tagIds]);
    };
    const allTagFilterChange = (tagIds) => {
        setSelectedTagIds([...tagIds]);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col bg-surface-default overflow-hidden relative", children: [(0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex flex-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hidden md:flex items-center justify-between px-4 md:px-6 h-15", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: t('title') }), (0, jsx_runtime_1.jsx)(LabelActions_1.default, { onLaunchComplete: onLaunchCompleted, setOpenHowToPlay: setOpenHowToPlay, address: address })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex md:hidden justify-between items-center shrink-0 px-4 py-2.5 relative", children: [(0, jsx_runtime_1.jsx)(link_1.Link, { href: "/rewards-center", className: "relative z-10", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "ghost", size: "md", icon: outline_1.ArrowLeftIcon, color: "brand" }) }), (0, jsx_runtime_1.jsx)("div", { className: "absolute left-0 top-0 w-full h-full flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(typography_1.Display, { size: "xs", color: "default", children: t('title') }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "md:hidden flex w-full items-center justify-center py-1", children: (0, jsx_runtime_1.jsx)(LabelActions_1.default, { onLaunchComplete: onLaunchCompleted, setOpenHowToPlay: setOpenHowToPlay, address: address }) }), (0, jsx_runtime_1.jsx)("div", { className: "md:border-b md:border-default" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grow overflow-x-hidden md:overflow-x-auto overflow-y-auto no-scrollbar relative", id: "stake-earn-scrollable", children: [(0, jsx_runtime_1.jsx)(RecommendedSwiper_1.default, { onCardClick: handleTrendingCardClick }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col grow overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex xs:flex-col xs:gap-3 md:flex-row md:flex-wrap md:justify-between md:items-end md:gap-y-2 px-4 md:px-6 pb-2 md:pb-3 shrink-0 pt-0 md:pt-1 border-default border-t border-b", children: [(0, jsx_runtime_1.jsx)(Filter_1.default, { className: "shrink", selected: selectedFilter, onChange: onChangeFilter }), selectedFilter !== Filter_1.FilterType.MY_PORTFOLIO && selectedFilter !== Filter_1.FilterType.PRESALE && ((0, jsx_runtime_1.jsx)(search_bar_1.SearchBar, { className: "xs:w-full md:w-[270px]", searchValue: searchValue, onSearchChange: onSearch, placeholder: tCommon('search') }))] }), selectedFilter !== Filter_1.FilterType.MY_PORTFOLIO && selectedFilter !== Filter_1.FilterType.PRESALE && ((0, jsx_runtime_1.jsx)("div", { className: "w-full pt-2 md:pt-3", children: (0, jsx_runtime_1.jsx)(FilterTagListBox_1.default, { onTagClick: tagFiltersChange, onAllClick: allTagFilterChange, filterLoading: tagsLoading, tagFilters: tagFilters, page: pageId, filterAll: "", filterIds: selectedTagIds, hideAllTag: !!searchValue, showMore: showMore, updateShowMore: setShowMore, hideLabel: true }) })), selectedFilter === Filter_1.FilterType.MY_PORTFOLIO && ((0, jsx_runtime_1.jsx)(MyCollectionTable_1.default, { openBotModal: handleOpenBotModal, openTradeModal: handleOpenTradeModal, openShareModal: handleOpenShareModal })), selectedFilter === Filter_1.FilterType.TRENDING && ((0, jsx_runtime_1.jsx)(TrendingTable_1.default, { openBotModal: handleOpenBotModal, openTradeModal: handleOpenTradeModal, searchValue: searchValue, tagIds: selectedTagIds })), selectedFilter === Filter_1.FilterType.POTENTIAL && ((0, jsx_runtime_1.jsx)(TrendingTable_1.default, { openBotModal: handleOpenBotModal, openTradeModal: handleOpenTradeModal, defaultField: apiTypes_1.OrderByFields.ORDER_BY_FIELDS_PRICE_CHANGE_DAILY, searchValue: searchValue, tagIds: selectedTagIds })), selectedFilter === Filter_1.FilterType.RECENT && ((0, jsx_runtime_1.jsx)(TrendingTable_1.default, { openBotModal: handleOpenBotModal, openTradeModal: handleOpenTradeModal, defaultField: apiTypes_1.OrderByFields.ORDER_BY_FIELDS_LAST_TRADE_AT, searchValue: searchValue, tagIds: selectedTagIds }))] })] }), openCommentModal && ((0, jsx_runtime_1.jsx)(CommentModal, { curveId: selectedCurve?.id || '', tickerName: selectedCurve?.symbol || '', isOpen: openCommentModal, onClose: handleCloseCommentModal })), openTrade && ((0, jsx_runtime_1.jsx)(TradeModal, { open: openTrade, trading: trading, setTrading: setTrading, onClose: handleCloseTradeModal, avatar: selectedCurve?.botSummary?.logoUrl, botName: selectedCurve?.botSummary?.name, author: selectedCurve?.botSummary?.author?.name, price: selectedCurve?.price, tickerName: selectedCurve?.symbol, tickerBalance: selectedCurve?.holdInfo?.holdCount?.toString(), curveId: selectedCurve?.id, creatorFirst: creatorFirst, creatorFirstDDL: selectedCurve?.creatorFirstDeadlineUnixStamp, onBack: () => {
                    if (creatorFirst && isSelf) {
                        setOpenCreatorConfirm(true);
                    }
                    setOpenTrade(false);
                }, onTradeStart: onTradeStart, onTradeSubmitted: onTradeSubmitted })), openNeedReLoginModal && ((0, jsx_runtime_1.jsx)(NeedReLoginModal, { isOpen: openNeedReLoginModal, onClose: () => toggleNeedReLoginModal(false) })), openScamAlert && ((0, jsx_runtime_1.jsx)(ScamAlertModal, { isOpen: openScamAlert, onClose: () => setOpenScamAlert(false), curves: ruggedCurves })), openUpgradeModal && ((0, jsx_runtime_1.jsx)(UpgradeModal, { open: openUpgradeModal, onClose: () => {
                    setOpenHowToPlay(true);
                    setOpenUpgradeModal(false);
                } })), openHowToPlay && ((0, jsx_runtime_1.jsx)(HowToPlayModal_1.default, { open: openHowToPlay, onOpenChange: open => setOpenHowToPlay(open), onFundWallet: onFundWallet })), openReceive && ((0, jsx_runtime_1.jsx)(ReceiveBNBModal_1.default, { address: address, open: openReceive, onClose: () => setOpenReceive(false) })), openCreatorConfirm && ((0, jsx_runtime_1.jsx)(CreatorFirstConfirmModal, { open: openCreatorConfirm, onConfirm: () => {
                    setOpenCreatorConfirm(false);
                    setOpenTrade(true);
                }, onClose: () => {
                    setOpenCreatorConfirm(false);
                    if (selectedCurve?.id) {
                        (0, agentPump_1.set_end_creator_priority)(selectedCurve?.id);
                    }
                } })), openBind2FA && ((0, jsx_runtime_1.jsx)(bind_2FA_1.default, { open: openBind2FA, onClose: isBind2FAParam => {
                    setOpenBind2FA(false);
                    if (curveFor2FA && !isBind2FAParam) {
                        handleOpenTradeModal({ curve: curveFor2FA }, true);
                    }
                } }))] }));
}
