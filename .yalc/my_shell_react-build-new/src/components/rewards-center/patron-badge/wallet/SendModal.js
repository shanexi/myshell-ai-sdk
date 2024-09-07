"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SendModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowRightIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowRightIcon"));
const ArrowSmallLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowSmallLeftIcon"));
const MagnifyingGlassIcon_1 = __importDefault(require("@heroicons/react/24/solid/MagnifyingGlassIcon"));
const react_auth_1 = require("@privy-io/react-auth");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const viem_1 = require("viem");
const chains_1 = require("viem/chains");
const wagmi_1 = require("wagmi");
const Close_1 = __importDefault(require("../../../../common/components/icons/Close.js"));
const button_1 = require("../../../../common/components/ui/button.js");
const input_1 = require("../../../../common/components/ui/input.js");
const link_1 = __importDefault(require("../../../../common/components/ui/link.js"));
const modal_1 = require("../../../../common/components/ui/modal.js");
const use_toast_1 = require("../../../../common/components/ui/toast/use-toast.js");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const constants_1 = require("../../../../common/constants/constants.js");
const user_1 = require("../../../../common/constants/enums/user.js");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const utils_1 = require("../../../../lib/utils.js");
const web3_1 = require("../../../../services/store/web3.js");
var ModalStatus;
(function (ModalStatus) {
    ModalStatus[ModalStatus["SelectToken"] = 0] = "SelectToken";
    ModalStatus[ModalStatus["SendOrReceive"] = 1] = "SendOrReceive";
})(ModalStatus || (ModalStatus = {}));
function SendModal(props) {
    const { open, name, assets, nftItems, onClose, setOpenSend, onRefresh, refetchNFts } = props;
    const t = (0, next_intl_1.useTranslations)('profile.transfer_modal');
    const t_web3 = (0, next_intl_1.useTranslations)('web3');
    const { wallets } = (0, react_auth_1.useWallets)();
    const { sendTransaction } = (0, react_auth_1.useSendTransaction)();
    const { sendTransactionAsync: sendTransactionWithWagmi } = (0, wagmi_1.useSendTransaction)();
    const toggleNeedReLoginModal = (0, web3_1.useWeb3Store)(state => state.toggleNeedReLoginModal);
    const { toast } = (0, use_toast_1.useToast)();
    const { address: wagmiConnectedAddress, isConnected: wagmiIsConnected } = (0, wagmi_1.useAccount)();
    const [asset, setAsset] = (0, react_1.useState)();
    const [address, setAddress] = (0, react_1.useState)('');
    const [amount, setAmount] = (0, react_1.useState)('');
    const [errorMessage, setErrorMessage] = (0, react_1.useState)('');
    const [status, setStatus] = (0, react_1.useState)(ModalStatus.SelectToken);
    const embeddedWallet = wallets?.find(wallet => wallet.connectorType === 'embedded');
    const mySoulNfts = (0, react_1.useMemo)(() => nftItems.filter(nft => nft.name.includes('MySoul')), [nftItems]);
    const creatorPassNfts = (0, react_1.useMemo)(() => nftItems.filter(nft => nft.name.includes('Creator Pass')), [nftItems]);
    const { error } = (0, useNotification_1.useNotification)();
    const onConfirm = async ({ address, amount, token, tokenId, contractAddress }) => {
        try {
            const onTransactionSubmitted = (tx) => {
                toast({
                    variant: 'success',
                    title: t_web3('notification.transaction_submitted'),
                    description: t_web3('notification.transaction_submitted_desc'),
                    action: ((0, jsx_runtime_1.jsx)(link_1.default, { href: `${constants_1.MYSHELL_EXPLORER_URL}/tx/${tx}`, target: "_blank", rel: "noreferrer noopener", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[6px]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-surface-primary-default", children: t_web3('notification.view_in_explorer') }), (0, jsx_runtime_1.jsx)(ArrowRightIcon_1.default, { className: "w-5 h-5", color: "var(--surface-primary-default)" })] }) }))
                });
                setOpenSend(false);
                refetchNFts?.();
                setTimeout(() => {
                    onRefresh?.();
                }, 3000);
            };
            if (name === user_1.WalletType.Privy) {
                if (!embeddedWallet) {
                    setOpenSend(false);
                    toggleNeedReLoginModal(true);
                    return;
                }
                switch (token) {
                    case user_1.WalletAssetType.CreatorPass: {
                        if (!tokenId) {
                            error({
                                content: 'Token ID is required'
                            });
                            throw new Error('Token ID is required');
                        }
                        const encodedData = (0, viem_1.encodeFunctionData)({
                            abi: viem_1.erc721Abi,
                            functionName: 'safeTransferFrom',
                            args: [embeddedWallet.address, address, tokenId]
                        });
                        const tx = await sendTransaction({
                            to: constants_1.MYSHELL_CREATOR_PASS_CONTRACT_ADDRESS,
                            data: encodedData,
                            chainId: chains_1.mainnet.id,
                            gasLimit: constants_1.GAS_LIMIT_LOW
                        });
                        if (tx) {
                            onTransactionSubmitted(tx.transactionHash);
                        }
                        break;
                    }
                    case user_1.WalletAssetType.MYSOUL: {
                        if (!tokenId) {
                            error({
                                content: 'Token ID is required'
                            });
                            throw new Error('Token ID is required');
                        }
                        const encodedData = (0, viem_1.encodeFunctionData)({
                            abi: viem_1.erc721Abi,
                            functionName: 'safeTransferFrom',
                            args: [embeddedWallet.address, address, tokenId]
                        });
                        const tx = await sendTransaction({
                            to: constants_1.MYSOUL_NFT_CONTRACT_ADDRESS,
                            data: encodedData,
                            chainId: chains_1.mainnet.id,
                            gasLimit: constants_1.GAS_LIMIT_LOW
                        });
                        if (tx) {
                            onTransactionSubmitted(tx.transactionHash);
                        }
                        break;
                    }
                    case user_1.WalletAssetType.ETH: {
                        const tx = await sendTransaction({
                            to: address,
                            value: (0, viem_1.parseEther)(amount),
                            chainId: chains_1.mainnet.id
                        });
                        if (tx) {
                            onTransactionSubmitted(tx.transactionHash);
                        }
                        break;
                    }
                    case user_1.WalletAssetType.BNB_OP: {
                        const tx = await sendTransaction({
                            to: address,
                            value: (0, viem_1.parseEther)(amount),
                            chainId: chains_1.opBNB.id
                        });
                        if (tx) {
                            onTransactionSubmitted(tx.transactionHash);
                        }
                        break;
                    }
                    case user_1.WalletAssetType.BNB_BSC: {
                        const tx = await sendTransaction({
                            to: address,
                            value: (0, viem_1.parseEther)(amount),
                            chainId: constants_1.bsc_chain_id_current_env
                        });
                        if (tx) {
                            onTransactionSubmitted(tx.transactionHash);
                        }
                        break;
                    }
                    case user_1.WalletAssetType.HER:
                    case user_1.WalletAssetType.LLM:
                    case user_1.WalletAssetType.SD:
                    case user_1.WalletAssetType.TTS:
                    case user_1.WalletAssetType.PIC: {
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            else {
                if (!wagmiIsConnected) {
                    setOpenSend(false);
                    toggleNeedReLoginModal(true);
                }
                let chainId = -1;
                switch (token) {
                    case user_1.WalletAssetType.ETH: {
                        chainId = chains_1.mainnet.id;
                        break;
                    }
                    case user_1.WalletAssetType.BNB_OP: {
                        chainId = chains_1.opBNB.id;
                        break;
                    }
                    case user_1.WalletAssetType.BNB_BSC: {
                        chainId = constants_1.bsc_chain_id_current_env;
                        break;
                    }
                    case user_1.WalletAssetType.CreatorPass: {
                        chainId = chains_1.mainnet.id;
                        break;
                    }
                    case user_1.WalletAssetType.MYSOUL: {
                        chainId = chains_1.mainnet.id;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                if (chainId === -1) {
                    console.error('wrong chainId');
                    return;
                }
                if (token === user_1.WalletAssetType.ETH || token === user_1.WalletAssetType.BNB_OP || token === user_1.WalletAssetType.BNB_BSC) {
                    const tx = await sendTransactionWithWagmi({
                        to: address,
                        value: (0, viem_1.parseEther)(amount),
                        chainId
                    });
                    if (tx) {
                        onTransactionSubmitted(tx);
                    }
                }
                else {
                    if (!tokenId) {
                        error({
                            content: 'Token ID is required'
                        });
                        throw new Error('Token ID is required');
                    }
                    const tx = await sendTransactionWithWagmi({
                        to: address,
                        data: (0, viem_1.encodeFunctionData)({
                            abi: viem_1.erc721Abi,
                            functionName: 'safeTransferFrom',
                            args: [wagmiConnectedAddress, address, tokenId]
                        }),
                        chainId
                    });
                    if (tx) {
                        onTransactionSubmitted(tx);
                    }
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    };
    const onMax = () => {
        setAmount(asset?.balance !== undefined ? (0, viem_1.formatEther)(asset?.balance) : '');
    };
    const onBack = () => {
        setStatus(ModalStatus.SelectToken);
    };
    const onAmountChange = (e) => {
        const { value } = e.target;
        if (Number(value) > Number(asset?.balance)) {
            setErrorMessage(t_web3('swap.insufficient_balance'));
            setAmount(value);
            return;
        }
        setErrorMessage('');
        setAmount(value);
    };
    const renderSelectToken = (assets) => {
        const displayAssets = assets.filter(asset => asset.formatBalance !== '0');
        const transferableAssets = displayAssets.filter(asset => constants_1.transferableTokens.includes(asset.label));
        const nonTransferableAssets = displayAssets.filter(asset => !constants_1.transferableTokens.includes(asset.label));
        if (displayAssets.length === 0 && nftItems.length === 0) {
            return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center gap-3 h-[224px]", children: [(0, jsx_runtime_1.jsx)(MagnifyingGlassIcon_1.default, { className: "w-6 h-6" }), (0, jsx_runtime_1.jsx)("p", { className: "w-[65%] text-center text-subtlest", children: t('no_available_token') })] }));
        }
        return ((0, jsx_runtime_1.jsxs)("ul", { className: "px-3 flex flex-col gap-4 mt-4 overflow-y-auto no-scrollbar", children: [transferableAssets.map(asset => {
                    const { label, formatBalance, logo, chain } = asset;
                    return ((0, jsx_runtime_1.jsxs)("li", { className: (0, utils_1.cn)('flex items-center justify-between p-1 relative rounded-lg', formatBalance === '--' ? 'cursor-auto' : 'cursor-pointer hover:bg-surface-container-hovered'), onClick: () => {
                            if (formatBalance === '--')
                                return;
                            setAsset(asset);
                            setStatus(ModalStatus.SendOrReceive);
                        }, children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center gap-2'), children: [logo, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-14 font-medium", children: label }), (0, jsx_runtime_1.jsx)("p", { className: "text-[#6D7175] dark:text-[#868996] text-12-n", children: chain })] })] }), (0, jsx_runtime_1.jsx)("p", { className: (0, utils_1.cn)('text-16 text-[#6D7175] dark:text-[#868996]'), children: formatBalance })] }, label));
                }), creatorPassNfts.map(nft => {
                    const { name, image, tokenId, contractAddress } = nft;
                    return ((0, jsx_runtime_1.jsx)("li", { className: "p-1 cursor-pointer hover:bg-surface-container-hovered rounded-lg", onClick: () => {
                            setAsset({
                                label: user_1.WalletAssetType.CreatorPass,
                                chain: 'ETH',
                                balance: BigInt(nftItems.length),
                                formatBalance: nftItems.length.toString(),
                                logo: (0, jsx_runtime_1.jsx)(image_1.default, { src: image, alt: name, width: 32, height: 32, className: "rounded-full" }),
                                tokenId: BigInt(tokenId),
                                contractAddress,
                                key: user_1.WalletAssetType.CreatorPass
                            });
                            setStatus(ModalStatus.SendOrReceive);
                        }, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center gap-2'), children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: image, alt: name, width: 32, height: 32, className: "rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-14 font-medium", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-[#6D7175] dark:text-[#868996] text-12-n", children: "ETH" })] })] }) }, name));
                }), mySoulNfts.map(nft => {
                    const { name, image, tokenId, contractAddress } = nft;
                    return ((0, jsx_runtime_1.jsx)("li", { className: "p-1 cursor-pointer hover:bg-surface-container-hovered rounded-lg", onClick: () => {
                            setAsset({
                                label: user_1.WalletAssetType.MYSOUL,
                                chain: 'ETH',
                                balance: BigInt(nftItems.length),
                                formatBalance: nftItems.length.toString(),
                                logo: (0, jsx_runtime_1.jsx)(image_1.default, { src: image, alt: name, width: 32, height: 32, className: "rounded-full" }),
                                tokenId: BigInt(tokenId),
                                contractAddress,
                                key: user_1.WalletAssetType.MYSOUL
                            });
                            setStatus(ModalStatus.SendOrReceive);
                        }, children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center gap-2'), children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: image, alt: name, width: 32, height: 32, className: "rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-14 font-medium", children: name }), (0, jsx_runtime_1.jsx)("p", { className: "text-[#6D7175] dark:text-[#868996] text-12-n", children: "ETH" })] })] }) }, name));
                }), nonTransferableAssets.map(asset => {
                    const { label, formatBalance, logo, chain } = asset;
                    return ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('not_support_transfer'), children: (0, jsx_runtime_1.jsxs)("li", { className: (0, utils_1.cn)('flex items-center p-1 justify-between relative opacity-30'), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('flex items-center gap-2'), children: [logo, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-start", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-on-surface text-14 font-medium", children: label }), (0, jsx_runtime_1.jsx)("p", { className: "text-[#6D7175] dark:text-[#868996] text-12-n", children: chain })] })] }), (0, jsx_runtime_1.jsx)("p", { className: (0, utils_1.cn)('text-16 text-[#6D7175] dark:text-[#868996]'), children: formatBalance })] }, label) }, label));
                })] }));
    };
    const renderPrivyTransfer = () => {
        if (status === ModalStatus.SelectToken) {
            return renderSelectToken(assets);
        }
        const isNFT = asset?.label === user_1.WalletAssetType.MYSOUL || asset?.label === user_1.WalletAssetType.CreatorPass;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-between h-[356px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: " flex flex-col py-3 gap-4 px-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[6px]", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-sans", children: t('receiving_address') }), (0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: t('receiving_address_placeholder'), className: "font-sans h-[40px]", value: address, onChange: e => setAddress(e.target.value) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[6px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-sans", children: t(isNFT ? 'quantity' : 'amount') }), !isNFT && ((0, jsx_runtime_1.jsxs)("span", { className: "text-[#6D7175] dark:text-[#868996]", children: [t('balance'), ": ", asset?.formatBalance, " ", asset?.label] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { placeholder: "0.0000", className: "font-sans h-[40px]", value: isNFT ? 1 : amount, onChange: e => onAmountChange(e), type: "number", disabled: isNFT }), errorMessage && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('h-[14px] mb-[6px] mt-[6px]'), children: (0, jsx_runtime_1.jsx)("p", { className: "text-[12px] mt-0 text-[var(--error)]", children: errorMessage }) })), !isNFT && ((0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)('text-primary cursor-pointer absolute top-[10px] right-3'), onClick: onMax, children: t('max') }))] })] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full h-[1px] bg-[var(--border)]" }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('p-4 pb-0 w-full'), children: (0, jsx_runtime_1.jsx)(button_1.Button, { disabled: isNFT ? !!errorMessage || !address : !amount || !!errorMessage || !address, className: "w-full font-sans", onClick: () => {
                                    onConfirm({
                                        address,
                                        amount,
                                        token: asset?.key || '',
                                        tokenId: asset?.tokenId,
                                        contractAddress: asset?.contractAddress
                                    });
                                    onClose();
                                }, children: t('confirm') }) })] })] }));
    };
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: open, hideClose: true, modalOnly: false, size: "sm", children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: (0, utils_1.cn)('py-4 text-on-surface w-full md:w-[380px] overflow-y-auto no-scrollbar', name === user_1.WalletType.Privy && 'max-h-[430px] h-[430px]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "pb-4 flex items-center justify-between px-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 items-center", children: [status === ModalStatus.SendOrReceive && ((0, jsx_runtime_1.jsx)(ArrowSmallLeftIcon_1.default, { className: "w-[22px] h-[22px] cursor-pointer", onClick: onBack })), (0, jsx_runtime_1.jsx)("h2", { className: "text-20 font-medium font-sans", children: t(status === ModalStatus.SelectToken ? 'select_token' : 'send') })] }), (0, jsx_runtime_1.jsx)(Close_1.default, { className: "w-6 h-6 cursor-pointer", onClick: onClose })] }), (0, jsx_runtime_1.jsx)("div", { className: "w-full h-[1px] bg-[var(--border)]" }), renderPrivyTransfer()] }) }));
}
