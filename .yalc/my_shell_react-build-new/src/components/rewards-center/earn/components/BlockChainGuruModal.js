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
exports.default = BlockChainGuruModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/CheckIcon"));
const ArrowRightIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/ArrowRightIcon"));
const clsx_1 = __importDefault(require("clsx"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_2 = require("react");
const Close_1 = __importDefault(require("../../../../common/components/icons/Close"));
const link_1 = __importDefault(require("../../../../common/components/ui/link"));
const identityService_1 = require("../../../../common/services/identityService");
const common_helper_1 = require("../../../../common/utils/common-helper");
const useOnChainInteraction_1 = __importStar(require("../../../../hooks/rewards-center/useOnChainInteraction"));
const store_1 = require("../../../../services/store");
const WagmiErrorModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./blockchain/WagmiErrorModal'))), {
    loading: () => null,
    ssr: false
});
const NeedReLoginModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./blockchain/NeedReLoginModal'))), {
    loading: () => null,
    ssr: false
});
function BlockChainGuruModal({ isOpen, onClose, blockChainInteractionState, setBlockChainInteractionState, task, txHash, setTxHash }) {
    const contractAddress = task?.taskInfo?.contractAddress;
    const chainId = task?.taskInfo?.blockchainType;
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const t = (0, next_intl_1.useTranslations)('reward_center.earn_content.blockchain_interaction_guide');
    const { wagmiErrorModalVisible, wagmiErrorType, onCallContractFunction, handleWagmiErrorModalClose, needReLoginModalVisible, setNeedReLoginModalVisible } = (0, useOnChainInteraction_1.default)(chainId, contractAddress);
    const [step, setStep] = (0, react_2.useState)(1);
    const goToStep1 = (0, react_2.useCallback)(() => {
        setStep(1);
        identityService_1.identityService.setBlockChainGuruStep(userId, 1);
    }, [userId]);
    const getStart = (0, react_2.useCallback)(() => {
        setStep(2);
        identityService_1.identityService.setBlockChainGuruStep(userId, 2);
    }, [userId]);
    const handleBtnClick = () => {
        if (blockChainInteractionState === 'not_start' || blockChainInteractionState === 'error') {
            onCallContractFunction(setBlockChainInteractionState, setTxHash);
        }
        else {
        }
    };
    (0, react_2.useEffect)(() => {
        const stepData = identityService_1.identityService.getBlockChainGuruStep();
        if (stepData) {
            const userStep = JSON.parse(stepData);
            if (userStep[`${userId}`]) {
                setStep(Number(userStep[`${userId}`]));
            }
        }
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_1.Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, size: {
                    base: 'md',
                    md: '5xl'
                }, children: [(0, jsx_runtime_1.jsx)(react_1.ModalOverlay, { className: "bg-alpha-mask-desktop" }), (0, jsx_runtime_1.jsxs)(react_1.ModalContent, { w: {
                            base: '342px',
                            md: 'full'
                        }, h: {
                            base: '620px',
                            md: 'fit-content'
                        }, rounded: "24px", overflow: "hidden", boxShadow: "0px 0px 40px 0px #0000001A", className: "bg-surface", children: [(0, jsx_runtime_1.jsxs)(react_1.ModalHeader, { className: "flex flex-col space-y-3 md:space-y-8 p-4 md:p-10", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center relative", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-[20px] md:text-[24px] leading-[28px] md:leading-8 text-start md:text-center font-[400] text-on-surface", children: t('title') }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 top-0 h-full flex justify-center items-center p-[6px]", children: (0, jsx_runtime_1.jsx)(Close_1.default, { className: "cursor-pointer text-[24px] text-secondary", onClick: onClose }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "w-full flex space-x-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 w-1/2", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('h-[2px] md:h-[3px]', {
                                                            'bg-primary': step === 1,
                                                            'bg-outline': step !== 1
                                                        }) }), (0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('text-xs md:text-sm font-[500] text-center', step === 1 ? 'text-on-surface' : 'text-on-secondary-container'), children: t('step1.step_name') })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 w-1/2", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('h-[2px] md:h-[3px]', {
                                                            'bg-primary': step === 2,
                                                            'bg-outline': step !== 2
                                                        }) }), (0, jsx_runtime_1.jsx)("p", { className: (0, clsx_1.default)('text-xs md:text-sm font-[500] text-center', step === 2 ? 'text-on-surface' : 'text-on-secondary-container'), children: t('step2.step_name') })] })] })] }), (0, jsx_runtime_1.jsx)(react_1.ModalBody, { p: "0", maxH: {
                                    base: '446px',
                                    md: '452px'
                                }, children: (0, jsx_runtime_1.jsxs)("div", { className: "p-4 pt-0 md:p-10 md:pt-0 flex flex-col md:flex-row max-h-[446px] md:max-h-[452px]", children: [step === 1 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(image_1.default, { alt: "step1-img", width: 310, height: 155, src: (0, common_helper_1.getAssetsUrl)('mobile/user-task/blockchain/step1.png'), className: "w-[310px] h-[155px] md:hidden" }), (0, jsx_runtime_1.jsx)(image_1.default, { alt: "step1-img", width: 412, height: 412, src: (0, common_helper_1.getAssetsUrl)('user-task/blockchain/step1.png'), className: "w-[412px] h-[412px] shrink-0 hidden md:block" }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 md:mt-0 md:ml-6 flex flex-col base:grow md:flex-auto overflow-auto md:overflow-hidden text-on-surface-variant", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-full flex flex-col space-y-[10px] md:space-y-6 py-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-[18px] leading-[26px] md:text-[28px] md:leading-[36px] font-[400] text-on-surface shrink-0", children: t(`step1.title`) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-[10px] md:space-y-6 md:overflow-auto", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step1.desc1') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step1.desc2') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step1.desc3') })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm md:text-base text-surface-bold shrink-0", children: t('step1.desc4') })] }) })] })), step === 2 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(image_1.default, { alt: "step2-img", width: 310, height: 155, src: (0, common_helper_1.getAssetsUrl)('mobile/user-task/blockchain/step2.png'), className: "w-[310px] h-[155px] md:hidden" }), (0, jsx_runtime_1.jsx)(image_1.default, { alt: "step2-img", width: 412, height: 412, src: (0, common_helper_1.getAssetsUrl)('user-task/blockchain/step2.png'), className: "w-[412px] h-[412px] shrink-0 hidden md:block" }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 md:mt-0 md:ml-6 flex flex-col base:grow md:flex-auto overflow-y-auto text-on-surface-variant md:justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-[10px] md:space-y-6 py-2", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-[18px] leading-[26px] md:text-[28px] md:leading-[36px] font-[400] text-on-surface", children: t(`step2.title`) }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step2.desc1') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step2.desc2') }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm md:text-base font-bold shrink-0", children: [t('step1.desc5'), ' ', (0, jsx_runtime_1.jsx)("a", { href: "https://opbnb-bridge.bnbchain.org/deposit", target: "_blank", rel: "noopener noreferrer", className: "font-bold underline text-primary", children: "https://opbnb-bridge.bnbchain.org/deposit" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-[6px] hidden md:block", children: [blockChainInteractionState === 'on-chain' && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-[#FAAC00]", children: [t('step2.loading_tip'), (0, jsx_runtime_1.jsx)(link_1.default, { href: `${useOnChainInteraction_1.chainIdNameScannerMap[chainId].scanner}/${txHash}`, target: "_blank", className: "text-primary outline-none", children: t('view_transaction') })] })), (0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", className: (0, clsx_1.default)('px-4 md:px-6 py-2 md:py-[10px] h-9 md:h-[44px] w-[199px] rounded-full text-white text-sm md:text-base flex justify-center items-center space-x-[6px]', blockChainInteractionState === 'error'
                                                                        ? 'bg-[#E8A900]'
                                                                        : blockChainInteractionState === 'confirmed'
                                                                            ? 'bg-[#0BB26F]'
                                                                            : 'bg-[var(--primary)]'), _loading: {
                                                                        bgColor: 'var(--primary)',
                                                                        _hover: {
                                                                            bgColor: 'var(--primary)'
                                                                        }
                                                                    }, isLoading: blockChainInteractionState === 'acting' || blockChainInteractionState === 'on-chain', onClick: handleBtnClick, children: [blockChainInteractionState === 'confirmed' && (0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-5 h-5 text-white" }), (0, jsx_runtime_1.jsx)("span", { children: t(`step2.${blockChainInteractionState === 'not_start'
                                                                                ? 'lets_start'
                                                                                : blockChainInteractionState === 'confirmed'
                                                                                    ? 'task_completed'
                                                                                    : 'try_again'}`) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "md:hidden", children: [blockChainInteractionState === 'on-chain' && ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-[#FAAC00]", children: [t('step2.loading_tip'), (0, jsx_runtime_1.jsx)(link_1.default, { href: `${useOnChainInteraction_1.chainIdNameScannerMap[chainId].scanner}/${txHash}`, target: "_blank", className: "text-primary outline-none", children: t('view_transaction') })] })), blockChainInteractionState === 'confirmed' && ((0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-[6px]", children: [(0, jsx_runtime_1.jsx)(CheckIcon_1.default, { className: "w-[18px] h-[18px] text-[#0DCC7F]" }), (0, jsx_runtime_1.jsx)("span", { className: "text-[#0DCC7F] text-sm", children: t('step2.task_completed') })] }))] })] })] }))] }) }), (0, jsx_runtime_1.jsx)(react_1.Divider, { className: "border-default" }), (0, jsx_runtime_1.jsx)(react_1.ModalFooter, { className: "p-0 w-full block", children: (0, jsx_runtime_1.jsx)(BlockChainGuruFooter, { currentStep: step, blockChainInteractionState: blockChainInteractionState, goToStep1: goToStep1, getStart: getStart, onClose: onClose, handleBtnClick: handleBtnClick }) })] })] }), wagmiErrorModalVisible && ((0, jsx_runtime_1.jsx)(WagmiErrorModal, { isOpen: wagmiErrorModalVisible, onClose: handleWagmiErrorModalClose, wagmiErrorType: wagmiErrorType, chainId: task?.taskInfo?.blockchainType })), needReLoginModalVisible && ((0, jsx_runtime_1.jsx)(NeedReLoginModal, { isOpen: needReLoginModalVisible, onClose: () => {
                    setNeedReLoginModalVisible(false);
                } }))] }));
}
function BlockChainGuruFooter({ currentStep, goToStep1, getStart, blockChainInteractionState, onClose, handleBtnClick }) {
    const t = (0, next_intl_1.useTranslations)('reward_center.earn_content.blockchain_interaction_guide');
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('p-4 md:py-5 md:px-10 flex items-center w-full', {
            'justify-end': currentStep === 1,
            'justify-between': currentStep !== 1
        }), children: [currentStep === 2 && ((0, jsx_runtime_1.jsx)("div", { className: "text-primary cursor-pointer text-sm md:text-base", onClick: goToStep1, children: t('prev') })), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2 md:space-x-6", children: [currentStep === 1 && ((0, jsx_runtime_1.jsxs)(react_1.Button, { variant: "unstyled", className: "border border-default px-4 md:px-6 py-2 md:py-[10px] h-[36px] md:h-[44px] rounded-full text-primary flex items-center space-x-[6px] shadow-[0_1_0_0_#0000000D] text-sm md:text-base font-[600]", onClick: getStart, children: [(0, jsx_runtime_1.jsx)("span", { children: t('get_start') }), (0, jsx_runtime_1.jsx)(ArrowRightIcon_1.default, { className: "w-[14px] h-[14px]" })] })), (0, jsx_runtime_1.jsx)("div", { className: "hidden md:block", children: blockChainInteractionState === 'confirmed' && ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "px-4 md:px-6 py-2 md:py-[10px] h-9 md:h-[44px] rounded-full bg-primary text-white text-sm md:text-base flex justify-center items-center", _hover: {
                                bgColor: 'var(--primary)',
                                _disabled: {
                                    bgColor: 'var(--primray)'
                                },
                                _loading: {
                                    bgColor: 'var(--primray)'
                                }
                            }, onClick: onClose, children: t('back_to_rewards_center') })) }), (0, jsx_runtime_1.jsx)("div", { className: "md:hidden", children: blockChainInteractionState === 'confirmed' ? ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: "px-4 md:px-6 py-2 md:py-[10px] h-9 md:h-[44px] rounded-full bg-primary text-white text-sm md:text-base flex justify-center items-center", _hover: {
                                bgColor: 'var(--primary)',
                                _disabled: {
                                    bgColor: 'var(--primray)'
                                },
                                _loading: {
                                    bgColor: 'var(--primray)'
                                }
                            }, onClick: onClose, children: t('back_to_rewards_center') })) : (currentStep === 2 && ((0, jsx_runtime_1.jsx)(react_1.Button, { variant: "unstyled", className: (0, clsx_1.default)('px-6 py-2 h-9 rounded-full text-white font-[500] text-sm flex justify-center items-center', blockChainInteractionState === 'error' ? 'bg-[#E8A900]' : 'bg-[var(--primary)]'), _loading: {
                                bgColor: 'var(--primary)',
                                _hover: {
                                    bgColor: 'var(--primary)'
                                }
                            }, isLoading: blockChainInteractionState === 'acting' || blockChainInteractionState === 'on-chain', onClick: handleBtnClick, children: t(`step2.${blockChainInteractionState === 'not_start' ? 'lets_start' : 'try_again'}`) }))) })] })] }));
}
