import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import CheckIcon from '@heroicons/react/24/outline/CheckIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import CloseIcon from '../../../../common/components/icons/Close.js';
import Link from '../../../../common/components/ui/link.js';
import { identityService } from '../../../../common/services/identityService.js';
import { getAssetsUrl } from '../../../../common/utils/common-helper.js';
import useOnChainInteraction, { chainIdNameScannerMap } from '../../../../hooks/rewards-center/useOnChainInteraction.js';
import { useUserStore } from '../../../../services/store/index.js';
const WagmiErrorModal = dynamic(() => import('./blockchain/WagmiErrorModal.js'), {
    loading: () => null,
    ssr: false
});
const NeedReLoginModal = dynamic(() => import('./blockchain/NeedReLoginModal.js'), {
    loading: () => null,
    ssr: false
});
export default function BlockChainGuruModal({ isOpen, onClose, blockChainInteractionState, setBlockChainInteractionState, task, txHash, setTxHash }) {
    const contractAddress = task?.taskInfo?.contractAddress;
    const chainId = task?.taskInfo?.blockchainType;
    const userId = useUserStore(state => state.userId);
    const t = useTranslations('reward_center.earn_content.blockchain_interaction_guide');
    const { wagmiErrorModalVisible, wagmiErrorType, onCallContractFunction, handleWagmiErrorModalClose, needReLoginModalVisible, setNeedReLoginModalVisible } = useOnChainInteraction(chainId, contractAddress);
    const [step, setStep] = useState(1);
    const goToStep1 = useCallback(() => {
        setStep(1);
        identityService.setBlockChainGuruStep(userId, 1);
    }, [userId]);
    const getStart = useCallback(() => {
        setStep(2);
        identityService.setBlockChainGuruStep(userId, 2);
    }, [userId]);
    const handleBtnClick = () => {
        if (blockChainInteractionState === 'not_start' || blockChainInteractionState === 'error') {
            onCallContractFunction(setBlockChainInteractionState, setTxHash);
        }
        else {
        }
    };
    useEffect(() => {
        const stepData = identityService.getBlockChainGuruStep();
        if (stepData) {
            const userStep = JSON.parse(stepData);
            if (userStep[`${userId}`]) {
                setStep(Number(userStep[`${userId}`]));
            }
        }
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs(Modal, { isOpen: isOpen, onClose: onClose, isCentered: true, size: {
                    base: 'md',
                    md: '5xl'
                }, children: [_jsx(ModalOverlay, { className: "bg-alpha-mask-desktop" }), _jsxs(ModalContent, { w: {
                            base: '342px',
                            md: 'full'
                        }, h: {
                            base: '620px',
                            md: 'fit-content'
                        }, rounded: "24px", overflow: "hidden", boxShadow: "0px 0px 40px 0px #0000001A", className: "bg-surface", children: [_jsxs(ModalHeader, { className: "flex flex-col space-y-3 md:space-y-8 p-4 md:p-10", children: [_jsxs("div", { className: "flex items-center relative", children: [_jsx("h1", { className: "text-[20px] md:text-[24px] leading-[28px] md:leading-8 text-start md:text-center font-[400] text-on-surface", children: t('title') }), _jsx("div", { className: "absolute right-0 top-0 h-full flex justify-center items-center p-[6px]", children: _jsx(CloseIcon, { className: "cursor-pointer text-[24px] text-secondary", onClick: onClose }) })] }), _jsxs("div", { className: "w-full flex space-x-3", children: [_jsxs("div", { className: "flex flex-col space-y-2 w-1/2", children: [_jsx("div", { className: clsx('h-[2px] md:h-[3px]', {
                                                            'bg-primary': step === 1,
                                                            'bg-outline': step !== 1
                                                        }) }), _jsx("p", { className: clsx('text-xs md:text-sm font-[500] text-center', step === 1 ? 'text-on-surface' : 'text-on-secondary-container'), children: t('step1.step_name') })] }), _jsxs("div", { className: "flex flex-col space-y-2 w-1/2", children: [_jsx("div", { className: clsx('h-[2px] md:h-[3px]', {
                                                            'bg-primary': step === 2,
                                                            'bg-outline': step !== 2
                                                        }) }), _jsx("p", { className: clsx('text-xs md:text-sm font-[500] text-center', step === 2 ? 'text-on-surface' : 'text-on-secondary-container'), children: t('step2.step_name') })] })] })] }), _jsx(ModalBody, { p: "0", maxH: {
                                    base: '446px',
                                    md: '452px'
                                }, children: _jsxs("div", { className: "p-4 pt-0 md:p-10 md:pt-0 flex flex-col md:flex-row max-h-[446px] md:max-h-[452px]", children: [step === 1 && (_jsxs(_Fragment, { children: [_jsx(Image, { alt: "step1-img", width: 310, height: 155, src: getAssetsUrl('mobile/user-task/blockchain/step1.png'), className: "w-[310px] h-[155px] md:hidden" }), _jsx(Image, { alt: "step1-img", width: 412, height: 412, src: getAssetsUrl('user-task/blockchain/step1.png'), className: "w-[412px] h-[412px] shrink-0 hidden md:block" }), _jsx("div", { className: "mt-4 md:mt-0 md:ml-6 flex flex-col base:grow md:flex-auto overflow-auto md:overflow-hidden text-on-surface-variant", children: _jsxs("div", { className: "h-full flex flex-col space-y-[10px] md:space-y-6 py-2", children: [_jsx("h3", { className: "text-[18px] leading-[26px] md:text-[28px] md:leading-[36px] font-[400] text-on-surface shrink-0", children: t(`step1.title`) }), _jsxs("div", { className: "space-y-[10px] md:space-y-6 md:overflow-auto", children: [_jsx("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step1.desc1') }), _jsx("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step1.desc2') }), _jsx("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step1.desc3') })] }), _jsx("p", { className: "text-sm md:text-base text-surface-bold shrink-0", children: t('step1.desc4') })] }) })] })), step === 2 && (_jsxs(_Fragment, { children: [_jsx(Image, { alt: "step2-img", width: 310, height: 155, src: getAssetsUrl('mobile/user-task/blockchain/step2.png'), className: "w-[310px] h-[155px] md:hidden" }), _jsx(Image, { alt: "step2-img", width: 412, height: 412, src: getAssetsUrl('user-task/blockchain/step2.png'), className: "w-[412px] h-[412px] shrink-0 hidden md:block" }), _jsxs("div", { className: "mt-4 md:mt-0 md:ml-6 flex flex-col base:grow md:flex-auto overflow-y-auto text-on-surface-variant md:justify-between", children: [_jsxs("div", { className: "flex flex-col space-y-[10px] md:space-y-6 py-2", children: [_jsx("h3", { className: "text-[18px] leading-[26px] md:text-[28px] md:leading-[36px] font-[400] text-on-surface", children: t(`step2.title`) }), _jsx("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step2.desc1') }), _jsx("p", { className: "text-sm md:text-base text-on-surface-variant", children: t('step2.desc2') }), _jsxs("p", { className: "text-sm md:text-base font-bold shrink-0", children: [t('step1.desc5'), ' ', _jsx("a", { href: "https://opbnb-bridge.bnbchain.org/deposit", target: "_blank", rel: "noopener noreferrer", className: "font-bold underline text-primary", children: "https://opbnb-bridge.bnbchain.org/deposit" })] })] }), _jsxs("div", { className: "space-y-[6px] hidden md:block", children: [blockChainInteractionState === 'on-chain' && (_jsxs("p", { className: "text-sm text-[#FAAC00]", children: [t('step2.loading_tip'), _jsx(Link, { href: `${chainIdNameScannerMap[chainId].scanner}/${txHash}`, target: "_blank", className: "text-primary outline-none", children: t('view_transaction') })] })), _jsxs(Button, { variant: "unstyled", className: clsx('px-4 md:px-6 py-2 md:py-[10px] h-9 md:h-[44px] w-[199px] rounded-full text-white text-sm md:text-base flex justify-center items-center space-x-[6px]', blockChainInteractionState === 'error'
                                                                        ? 'bg-[#E8A900]'
                                                                        : blockChainInteractionState === 'confirmed'
                                                                            ? 'bg-[#0BB26F]'
                                                                            : 'bg-[var(--primary)]'), _loading: {
                                                                        bgColor: 'var(--primary)',
                                                                        _hover: {
                                                                            bgColor: 'var(--primary)'
                                                                        }
                                                                    }, isLoading: blockChainInteractionState === 'acting' || blockChainInteractionState === 'on-chain', onClick: handleBtnClick, children: [blockChainInteractionState === 'confirmed' && _jsx(CheckIcon, { className: "w-5 h-5 text-white" }), _jsx("span", { children: t(`step2.${blockChainInteractionState === 'not_start'
                                                                                ? 'lets_start'
                                                                                : blockChainInteractionState === 'confirmed'
                                                                                    ? 'task_completed'
                                                                                    : 'try_again'}`) })] })] }), _jsxs("div", { className: "md:hidden", children: [blockChainInteractionState === 'on-chain' && (_jsxs("p", { className: "text-sm text-[#FAAC00]", children: [t('step2.loading_tip'), _jsx(Link, { href: `${chainIdNameScannerMap[chainId].scanner}/${txHash}`, target: "_blank", className: "text-primary outline-none", children: t('view_transaction') })] })), blockChainInteractionState === 'confirmed' && (_jsxs("div", { className: "flex space-x-[6px]", children: [_jsx(CheckIcon, { className: "w-[18px] h-[18px] text-[#0DCC7F]" }), _jsx("span", { className: "text-[#0DCC7F] text-sm", children: t('step2.task_completed') })] }))] })] })] }))] }) }), _jsx(Divider, { className: "border-default" }), _jsx(ModalFooter, { className: "p-0 w-full block", children: _jsx(BlockChainGuruFooter, { currentStep: step, blockChainInteractionState: blockChainInteractionState, goToStep1: goToStep1, getStart: getStart, onClose: onClose, handleBtnClick: handleBtnClick }) })] })] }), wagmiErrorModalVisible && (_jsx(WagmiErrorModal, { isOpen: wagmiErrorModalVisible, onClose: handleWagmiErrorModalClose, wagmiErrorType: wagmiErrorType, chainId: task?.taskInfo?.blockchainType })), needReLoginModalVisible && (_jsx(NeedReLoginModal, { isOpen: needReLoginModalVisible, onClose: () => {
                    setNeedReLoginModalVisible(false);
                } }))] }));
}
function BlockChainGuruFooter({ currentStep, goToStep1, getStart, blockChainInteractionState, onClose, handleBtnClick }) {
    const t = useTranslations('reward_center.earn_content.blockchain_interaction_guide');
    return (_jsxs("div", { className: clsx('p-4 md:py-5 md:px-10 flex items-center w-full', {
            'justify-end': currentStep === 1,
            'justify-between': currentStep !== 1
        }), children: [currentStep === 2 && (_jsx("div", { className: "text-primary cursor-pointer text-sm md:text-base", onClick: goToStep1, children: t('prev') })), _jsxs("div", { className: "flex items-center space-x-2 md:space-x-6", children: [currentStep === 1 && (_jsxs(Button, { variant: "unstyled", className: "border border-default px-4 md:px-6 py-2 md:py-[10px] h-[36px] md:h-[44px] rounded-full text-primary flex items-center space-x-[6px] shadow-[0_1_0_0_#0000000D] text-sm md:text-base font-[600]", onClick: getStart, children: [_jsx("span", { children: t('get_start') }), _jsx(ArrowRightIcon, { className: "w-[14px] h-[14px]" })] })), _jsx("div", { className: "hidden md:block", children: blockChainInteractionState === 'confirmed' && (_jsx(Button, { variant: "unstyled", className: "px-4 md:px-6 py-2 md:py-[10px] h-9 md:h-[44px] rounded-full bg-primary text-white text-sm md:text-base flex justify-center items-center", _hover: {
                                bgColor: 'var(--primary)',
                                _disabled: {
                                    bgColor: 'var(--primray)'
                                },
                                _loading: {
                                    bgColor: 'var(--primray)'
                                }
                            }, onClick: onClose, children: t('back_to_rewards_center') })) }), _jsx("div", { className: "md:hidden", children: blockChainInteractionState === 'confirmed' ? (_jsx(Button, { variant: "unstyled", className: "px-4 md:px-6 py-2 md:py-[10px] h-9 md:h-[44px] rounded-full bg-primary text-white text-sm md:text-base flex justify-center items-center", _hover: {
                                bgColor: 'var(--primary)',
                                _disabled: {
                                    bgColor: 'var(--primray)'
                                },
                                _loading: {
                                    bgColor: 'var(--primray)'
                                }
                            }, onClick: onClose, children: t('back_to_rewards_center') })) : (currentStep === 2 && (_jsx(Button, { variant: "unstyled", className: clsx('px-6 py-2 h-9 rounded-full text-white font-[500] text-sm flex justify-center items-center', blockChainInteractionState === 'error' ? 'bg-[#E8A900]' : 'bg-[var(--primary)]'), _loading: {
                                bgColor: 'var(--primary)',
                                _hover: {
                                    bgColor: 'var(--primary)'
                                }
                            }, isLoading: blockChainInteractionState === 'acting' || blockChainInteractionState === 'on-chain', onClick: handleBtnClick, children: t(`step2.${blockChainInteractionState === 'not_start' ? 'lets_start' : 'try_again'}`) }))) })] })] }));
}
