"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TradeModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const viem_1 = require("viem");
const agentPump_1 = require("../../../../../apis/agentPump.js");
const bnb_svg_1 = __importDefault(require("@/assets/icons/web3/bnb.svg"));
const modal_1 = require("../../../../../common/components/ui/modal.js");
const use_toast_1 = require("../../../../../common/components/ui/toast/use-toast.js");
const useBondingContract_1 = require("../../../../../hooks/web3/useBondingContract.js");
const utils_1 = require("../../../../../lib/utils.js");
const Actions_1 = __importDefault(require("./Actions.js"));
const Trade_1 = __importDefault(require("./Trade.js"));
const BadgeInfo_1 = __importDefault(require("../BadgeInfo.js"));
const ModalTitle_1 = __importDefault(require("../ModalTitle.js"));
function TradeModal(props) {
    const { open, avatar, author, botName, tickerName, curveId = '-1', trading, creatorFirst, creatorFirstDDL, setTrading, onClose, onBack, onTradeSubmitted, onTradeStart } = props;
    const bid = BigInt(curveId);
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const tRequest = (0, next_intl_1.useTranslations)('request');
    const { toast } = (0, use_toast_1.useToast)();
    const { buyBonding, sellBonding } = (0, useBondingContract_1.useBondingContract)();
    const [action, setAction] = (0, react_1.useState)('buy');
    const [badgeQuantity, setBadgeQuantity] = (0, react_1.useState)('');
    const [errorText, setErrorText] = (0, react_1.useState)('');
    const [slippage, setSlippage] = (0, react_1.useState)('0');
    const [tickerBuyPrice, setTickerBuyPrice] = (0, react_1.useState)();
    const [tickerSellPrice, setTickerSellPrice] = (0, react_1.useState)();
    const [tickerPriceChanged, setTickerPriceChanged] = (0, react_1.useState)(false);
    const [disableShowPriceChange, setDisableShowPriceChange] = (0, react_1.useState)(false);
    const [retryCount, setRetryCount] = (0, react_1.useState)(0);
    const [bnbPrice, setBnbPrice] = (0, react_1.useState)();
    const [loadingBnbPrice, setLoadingBnbPrice] = (0, react_1.useState)(true);
    const CurrencyLogo = (0, jsx_runtime_1.jsx)(image_1.default, { src: bnb_svg_1.default, width: 16, height: 16, alt: "currency", className: "rounded-full" });
    const tradeInfo = (0, useBondingContract_1.useTradeInfo)({
        bid: BigInt(curveId),
        amount: Number(badgeQuantity ?? 1),
        slippage: Number(slippage) / 100
    });
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            if (action === 'buy') {
                const latestPrice = tradeInfo?.data?.buySinglePrice;
                if (latestPrice !== undefined) {
                    if (!tickerBuyPrice) {
                        setTickerBuyPrice(latestPrice.formatted);
                        return;
                    }
                    if (tickerBuyPrice !== latestPrice.formatted) {
                        if (!disableShowPriceChange) {
                            setTickerPriceChanged(true);
                        }
                        setTickerBuyPrice(latestPrice.formatted);
                    }
                }
            }
            else {
                const latestPrice = tradeInfo?.data?.sellSinglePrice;
                if (latestPrice !== undefined) {
                    if (!tickerSellPrice) {
                        setTickerSellPrice(latestPrice.formatted);
                        return;
                    }
                    if (tickerSellPrice !== latestPrice.formatted) {
                        if (!disableShowPriceChange) {
                            setTickerPriceChanged(true);
                        }
                        setTickerSellPrice(latestPrice.formatted);
                    }
                }
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [tradeInfo, action, open, tickerBuyPrice, disableShowPriceChange, tickerSellPrice]);
    const getBNBPrice = (0, react_1.useCallback)(async () => {
        try {
            setLoadingBnbPrice(true);
            const response = await (0, agentPump_1.get_bnb_price)();
            if (response.success) {
                setBnbPrice(response.data.price);
            }
        }
        catch (error) {
            if (retryCount < 3) {
                setRetryCount(retryCount + 1);
                await getBNBPrice();
            }
        }
        finally {
            setLoadingBnbPrice(false);
        }
    }, [retryCount]);
    (0, react_1.useEffect)(() => {
        getBNBPrice().then();
    }, [getBNBPrice]);
    const insufficientBalance = (0, react_1.useMemo)(() => {
        if (action === 'buy') {
            if (tradeInfo?.data?.buyTotal.value === undefined ||
                tradeInfo?.data?.buyFee.value === undefined ||
                tradeInfo?.data?.userBalance.value === undefined) {
                return false;
            }
            return tradeInfo.data?.buyTotal.value + tradeInfo.data?.buyFee.value > tradeInfo.data?.userBalance.value;
        }
        if (tradeInfo.data?.userBidAmount === undefined)
            return false;
        return tradeInfo.data?.userBidAmount < 1;
    }, [action, tradeInfo]);
    const canBuy = (0, react_1.useMemo)(() => {
        return action === 'buy' && tradeInfo.data?.buyTotal.value;
    }, [action, tradeInfo.data?.buyTotal.value]);
    const canSell = (0, react_1.useMemo)(() => {
        return action === 'sell' && tradeInfo.data?.sellTotal.value;
    }, [action, tradeInfo.data?.sellTotal.value]);
    const disabled = (0, react_1.useMemo)(() => {
        if (!badgeQuantity) {
            return true;
        }
        if (insufficientBalance) {
            return true;
        }
        if (Number(badgeQuantity) < 1) {
            return true;
        }
        if (!canBuy && action === 'buy') {
            return true;
        }
        return !canSell && action === 'sell';
    }, [badgeQuantity, action, canBuy, canSell, insufficientBalance]);
    (0, react_1.useEffect)(() => {
        if (action === 'buy') {
        }
        else {
            if (!tradeInfo?.data?.userBidAmount)
                return;
            const validQuantity = Number(badgeQuantity) > tradeInfo?.data?.userBidAmount
                ? tradeInfo?.data?.userBidAmount.toString()
                : badgeQuantity;
            setBadgeQuantity(validQuantity);
        }
    }, [action, badgeQuantity, tradeInfo?.data?.userBidAmount]);
    (0, react_1.useEffect)(() => {
        if (action === 'sell' && Number(slippage) > 100) {
            setSlippage('100');
        }
    }, [action, slippage]);
    const handleTrade = async () => {
        try {
            setDisableShowPriceChange(true);
            setTrading?.(true);
            onTradeStart?.(action);
            const timer = setTimeout(() => {
                setDisableShowPriceChange(false);
            }, 12000);
            if (canBuy) {
                const response = await (0, agentPump_1.get_buy_signature)({
                    curveId,
                    amount: Number(badgeQuantity)
                });
                if (response.success) {
                    const { signature, validTill } = response.data;
                    const tx = await buyBonding({
                        bid,
                        amount: BigInt(badgeQuantity),
                        sig: signature,
                        validTill: BigInt(validTill),
                        value: tradeInfo.data?.buyTotal.value
                    });
                    if (tx) {
                        onTradeSubmitted?.(tx);
                        setTickerBuyPrice(undefined);
                    }
                    toast({
                        variant: 'success',
                        title: t('buy_submitted'),
                        description: t('tx_submitted_tip')
                    });
                }
                else if (response.reason === 'ERROR_REASON_NOT_ALLOWED_BUY_BADGE_FOR_NON_MY_SOUL') {
                    toast({
                        variant: 'error',
                        title: t('buy_fail'),
                        description: t('mysoul_only')
                    });
                    setTrading?.(false);
                    clearTimeout(timer);
                    setDisableShowPriceChange(false);
                }
                else {
                    toast({
                        variant: 'error',
                        title: t('buy_fail'),
                        description: response.msg
                    });
                    setTrading?.(false);
                    clearTimeout(timer);
                    setDisableShowPriceChange(false);
                }
            }
            else if (canSell) {
                const tx = await sellBonding({
                    bid,
                    amount: BigInt(badgeQuantity),
                    minOut: tradeInfo.data?.sellTotal.value
                });
                if (tx) {
                    onTradeSubmitted?.(tx);
                    setTickerSellPrice(undefined);
                }
                toast({
                    variant: 'success',
                    title: t('sell_submitted'),
                    description: t('tx_submitted_tip')
                });
            }
        }
        catch (error) {
            console.log('🚀 ~ handleTrade ~ error:', error);
            if (error instanceof Error) {
                const message = error.message.includes('User reject') ? tRequest('error.user_reject') : error.message;
                toast({
                    variant: 'error',
                    title: t('operation_failed'),
                    description: message
                });
            }
            setTrading?.(false);
            setDisableShowPriceChange(false);
        }
    };
    const getTotalCost = (cost, fee) => {
        if (!cost || !fee) {
            return '0';
        }
        return (0, viem_1.formatUnits)(cost, 18);
    };
    const onAmountChange = (value) => {
        setBadgeQuantity(value);
        setTickerPriceChanged(false);
    };
    const handleClose = () => {
        onClose?.();
    };
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, onClose: handleClose, overlayClose: false, hideClose: trading, size: "sm", modalOnly: false, contentClassName: "max-h-[680px]", focusScopeOptions: { trapped: false }, children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: (0, utils_1.cn)('text-default py-4 visible'), children: [(0, jsx_runtime_1.jsx)(ModalTitle_1.default, { content: t('trade_modal_title'), showBack: true, onBack: () => {
                        if (trading)
                            return;
                        onBack?.();
                    } }), (0, jsx_runtime_1.jsx)(BadgeInfo_1.default, { loading: tradeInfo.isLoading, avatar: avatar, currencyLogo: CurrencyLogo, botName: botName, badgeName: tickerName, price: action === 'buy' ? tradeInfo.data?.buySinglePrice.formatted : tradeInfo.data?.sellSinglePrice.formatted, author: author, showPrice: true, tickerPriceChanged: tickerPriceChanged, bnbPrice: bnbPrice, loadingBnbPrice: loadingBnbPrice }), (0, jsx_runtime_1.jsx)(Trade_1.default, { action: action, curveId: curveId, currencyLogo: CurrencyLogo, setAction: setAction, errorText: errorText, ticker: tickerName, amount: badgeQuantity, creatorFirst: creatorFirst, creatorFirstDDL: creatorFirstDDL, bnbPrice: bnbPrice, loadingBnbPrice: loadingBnbPrice, loading: trading, total: action === 'buy'
                        ? getTotalCost(tradeInfo.data?.buyTotal?.value, tradeInfo.data?.buyFee?.value)
                        : getTotalCost(tradeInfo.data?.sellTotal.value, tradeInfo.data?.sellFee.value), balanceOfBNB: tradeInfo.data?.userBalance.formatted, tickerBalance: tradeInfo.data?.userBidAmount, onAmountChange: onAmountChange }), (0, jsx_runtime_1.jsx)(Actions_1.default, { loading: trading, onTrade: handleTrade, disabled: disabled, action: action, insufficientBalance: insufficientBalance })] }) }));
}
