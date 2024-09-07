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
exports.default = TaskList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/InformationCircleIcon"));
const LockClosedIcon_1 = __importDefault(require("@heroicons/react/24/solid/LockClosedIcon"));
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const framer_motion_1 = require("framer-motion");
const dynamic_1 = __importDefault(require("next/dynamic"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const next_themes_1 = require("next-themes");
const react_2 = require("react");
const task_1 = require("../../../../../apis/task.js");
const avatar_1 = require("../../../../../common/components/ui/avatar.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const icon_1 = require("../../../../../common/components/ui/icon.js");
const link_1 = require("../../../../../common/components/ui/link.js");
const tooltip_1 = require("../../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const task_2 = require("../../../../../common/constants/enums/task.js");
const useUserSettings_1 = __importDefault(require("../../../../../common/hooks/useUserSettings.js"));
const identityService_1 = require("../../../../../common/services/identityService.js");
const common_helper_1 = require("../../../../../common/utils/common-helper.js");
const runtime_config_1 = require("../../../../../common/utils/runtime-config.js");
const useClaim_1 = __importDefault(require("../../../../../hooks/rewards-center/useClaim.js"));
const useGetPoints_1 = __importDefault(require("../../../../../hooks/rewards-center/useGetPoints.js"));
const useOnChainInteraction_1 = __importStar(require("../../../../../hooks/rewards-center/useOnChainInteraction.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../../../hooks/user/useGetEnergyInfo.js"));
const sensors_1 = require("../../../../../lib/sensors/index.js");
const utils_1 = require("../../../../../lib/utils.js");
const store_1 = require("../../../../../services/store/index.js");
const Skeleton_1 = require("./Skeleton.js");
const hot_svg_1 = __importDefault(require("./images/hot.svg"));
const shell_point_1 = require("../../../components/shell-point/index.js");
const BotList_1 = require("../BotList.js");
const ClaimedModal_1 = require("../ClaimedModal.js");
const RecordList_1 = __importDefault(require("../manage-social-modal/RecordList.js"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
const ClaimedTaskListModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../ClaimedTaskListModal.js'))), {
    loading: () => null,
    ssr: false
});
const BlockChainGuruModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../BlockChainGuruModal.js'))), {
    loading: () => null,
    ssr: false
});
const WagmiErrorModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../blockchain/WagmiErrorModal.js'))), {
    loading: () => null,
    ssr: false
});
const NeedReLoginModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../blockchain/NeedReLoginModal.js'))), {
    loading: () => null,
    ssr: false
});
const BindTweetModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../bind-tweet-modal/index.js'))), {
    loading: () => null,
    ssr: false
});
const CheckTweetModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../check-tweet-modal/index.js'))), {
    loading: () => null,
    ssr: false
});
const CheckSocialModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../check-social-modal/index.js'))), {
    loading: () => null,
    ssr: false
});
const ManageSocialModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../manage-social-modal/index.js'))), {
    loading: () => null,
    ssr: false
});
const CheckPlModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../check-pl-modal/index.js'))), {
    loading: () => null,
    ssr: false
});
const SelectAIppModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../select-aipp/index.js'))), {
    loading: () => null,
    ssr: false
});
const ChevronRightIcon = (props) => ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", ...props, children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z", clipRule: "evenodd" }) }));
function TaskList({ onPlayClaimVoice }) {
    const isMobile = (0, common_helper_1.isMobileDevice)();
    const router = (0, navigation_1.useRouter)();
    const [initialing, setInitialing] = (0, react_2.useState)(true);
    const userId = (0, store_1.useUserStore)(state => state.userId);
    const blockChainGuruTaskOnceCompleted = (0, store_1.useUserStore)(state => state.blockChainGuruTaskOnceCompleted);
    const taskList = (0, store_1.useTaskStore)(state => state.taskList);
    const setTaskList = (0, store_1.useTaskStore)(state => state.setTaskList);
    const points = (0, store_1.useTaskStore)(state => state.points);
    const claimableEndDate = (0, store_1.useTaskStore)(state => state.claimableEndDate);
    const [showClaimedModal, setShowClaimedModal] = (0, react_2.useState)(false);
    const [dailyInfo, setDailyInfo] = (0, react_2.useState)(null);
    const [claimingSet, setClaimingSet] = (0, react_2.useState)([]);
    const [claimedSet, setClaimedSet] = (0, react_2.useState)([]);
    const [claimedModalVisible, setClaimedModalVisible] = (0, react_2.useState)(false);
    const [blockChainGuruModalVisible, setBlockChainGuruModalVisible] = (0, react_2.useState)(false);
    const txHash = (0, store_1.useTaskStore)(state => state.txHash);
    const setTxHash = (0, store_1.useTaskStore)(state => state.setTxHash);
    const blockChainInteractionState = (0, store_1.useTaskStore)(state => state.blockChainInteractionState);
    const setBlockChainInteractionState = (0, store_1.useTaskStore)(state => state.setBlockChainInteractionState);
    const [isOpenTweetBindModal, setOpenTweetBindModal] = (0, react_2.useState)(false);
    const [isOpenTweetCheckModal, setOpenTweetCheckModal] = (0, react_2.useState)(false);
    const [isOpenSocialCheckModal, setOpenSocialCheckModal] = (0, react_2.useState)(false);
    const [isOpenSubmissions, setOpenSubmissions] = (0, react_2.useState)(false);
    const [isOpenPl, setOpenPl] = (0, react_2.useState)(false);
    const [isOpenSelectAIpp, setOpenSelectAIpp] = (0, react_2.useState)(false);
    const [tweetText, setTweetText] = (0, react_2.useState)('');
    const blockChainInteractionStateInterval = (0, react_2.useRef)();
    const { resolvedTheme } = (0, next_themes_1.useTheme)();
    const sensors = (0, sensors_1.useSensors)();
    const t = (0, next_intl_1.useTranslations)('reward_center.earn_content');
    const blockChainT = (0, next_intl_1.useTranslations)('reward_center.earn_content.blockchain_interaction_guide');
    const { queryPoints } = (0, useGetPoints_1.default)();
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const { claimOne } = (0, useClaim_1.default)();
    const { handleBlockChainGuruTaskOnceCompleted } = (0, useUserSettings_1.default)();
    const isAfterClaimableEndDate = (0, dayjs_1.default)().isAfter((0, dayjs_1.default)(claimableEndDate));
    const isDark = resolvedTheme === 'dark';
    const setChatBodyType = (0, store_1.useChatStore)(state => state.setChatBodyType);
    const isOneInThreeType = (task) => !!task.taskInfo?.botList?.length;
    const goToChat = async (botId, botName, botUid, callback) => {
        setChatBodyType('');
        callback?.();
    };
    const blockChainGuruTask = (0, react_2.useMemo)(() => {
        return taskList.find(task => task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION &&
            (task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_CLAIMABLE ||
                task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_IN_PROGRESS));
    }, [taskList]);
    const { onCallContractFunction, getInteractionState, wagmiErrorModalVisible, handleWagmiErrorModalClose, wagmiErrorType, needReLoginModalVisible, setNeedReLoginModalVisible } = (0, useOnChainInteraction_1.default)(blockChainGuruTask?.taskInfo?.blockchainType, blockChainGuruTask?.taskInfo?.contractAddress);
    const queryTaskList = (0, react_2.useCallback)(async () => {
        try {
            const { data } = await (0, task_1.getTaskList)();
            setTaskList(data);
            return data;
        }
        catch (error) {
        }
        finally {
            setInitialing(false);
        }
    }, [setTaskList]);
    const handleCollectGems = (0, react_2.useCallback)((task) => {
        setClaimingSet(Array.from(new Set([...claimingSet, task.taskType])));
        claimOne(task.id, () => {
            onPlayClaimVoice();
            setClaimingSet(prevClaimingSet => prevClaimingSet.filter(taskType => taskType !== task.taskType));
            setClaimedSet(prevClaimedSet => Array.from(new Set([...prevClaimedSet, task.taskType])));
            try {
                Promise.all([
                    queryTaskList().then(data => {
                        const completedTask = data?.find(e => e.id === task.id);
                        if (completedTask?.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_DAILY_MESSAGE ||
                            completedTask?.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION) {
                            setDailyInfo({
                                points: completedTask.gemCount ?? 0,
                                dailyTaskCompletedCount: completedTask.taskInfo.dailyTaskCompletedCount,
                                dailyTaskPoints: completedTask.taskInfo.dailyTaskPoints,
                                showBtn: true
                            });
                            setShowClaimedModal(true);
                        }
                    }),
                    queryPoints(),
                    getEnergyInfo()
                ]);
            }
            catch (e) {
            }
            if (task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION) {
                !blockChainGuruTaskOnceCompleted && handleBlockChainGuruTaskOnceCompleted();
            }
            setClaimedSet([...claimedSet.filter(taskType => taskType !== task.taskType)]);
        }, () => {
            setClaimingSet([...claimingSet.filter(taskType => taskType !== task.taskType)]);
        });
    }, [claimedSet, claimingSet, onPlayClaimVoice, queryPoints, queryTaskList, points]);
    const openDcOauthLink = () => {
        window.open(`https://discord.com/oauth2/authorize?response_type=code&client_id=${runtime_config_1.DISCORD_CLIENT_ID}&scope=identify&state=15773059ghq9183habn&redirect_uri=${encodeURIComponent(runtime_config_1.DISCORD_REDIRECT_URL)}&prompt=none`);
    };
    const handleGo = async (task) => {
        switch (task.taskType) {
            case task_2.TaskTypeEnum.SEASON_TASK_TALK_TO_BOT_WITH_TAG:
                router.push('/explore?filter=1719340497564078080');
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_DAILY_MESSAGE:
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_USE_AUTO_PROMPT:
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_TALK_TO_BOTS:
                router.push('/explore');
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_USE_VOICE_CLONE:
                if (isMobile) {
                    router.push('/robot-workshop/widgets?filter=1742195260089438208%24%241742972311058780160');
                }
                else {
                    router.push('/robot-workshop?filter=1742195260089438208%24%241742972311058780160');
                }
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_DC_INTERACTION:
                sensors?.track('EnterDC', {
                    click_area: 'Reward Center'
                });
                window.open(t('discord_url'));
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION:
                if (blockChainGuruTaskOnceCompleted) {
                    onCallContractFunction(setBlockChainInteractionState, setTxHash);
                }
                else {
                    setBlockChainGuruModalVisible(true);
                }
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_USE_VOICE_VIDEO:
                router.push('/explore?filter=1719340497564078080');
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_CREATE_BOT:
                router.push('/robot-workshop');
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_INVITEE_MESSAGE_LV1:
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_INVITEE_MESSAGE_LV2:
                router.push('/rewards-center/dashboard');
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_EXPERIENCE_IMAGE_BOTS:
                router.push('/explore?filter=1719340513187860480');
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_STAKING_EXPERIENCE:
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_PATRON_BADGE:
                router.push('/rewards-center/rewards-aipp-store');
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_BIND_DC_ACCOUNT:
                openDcOauthLink();
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_PUBLIC_VOICE_INCOME:
                if (isMobile) {
                    router.push('/robot-workshop/widgets');
                }
                else {
                    router.push('/robot-workshop');
                }
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_TWEET_SHARE:
                if (task.taskInfo?.preConditionFulfilled) {
                    setOpenTweetCheckModal(true);
                    setTweetText(task.taskInfo?.tweetRichTextContent || '');
                }
                else {
                    setOpenTweetBindModal(true);
                }
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE:
                if (task.taskInfo?.preConditionFulfilled) {
                    setOpenSocialCheckModal(true);
                }
                else {
                    setOpenTweetBindModal(true);
                }
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_CURVE_PROFIT_SHARE:
                if (task.taskInfo?.preConditionFulfilled) {
                    setOpenPl(true);
                }
                else {
                    setOpenTweetBindModal(true);
                }
                break;
            case task_2.TaskTypeEnum.SEASON_TASK_TOP_CURVE_HOLDERS_DAILY_INCOME:
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_LUCKY_STAR:
            case task_2.TaskTypeEnum.SEASON_TASK_TYPE_JACKPOT:
                router.push('/rewards-center/rewards-aipp-store');
                break;
            default:
                break;
        }
    };
    const getTransactionState = (0, react_2.useCallback)(() => {
        const hashMapData = identityService_1.identityService.getBlockChainGuruHash();
        if (hashMapData) {
            const hash = JSON.parse(hashMapData)[`${userId}`];
            if (hash) {
                getInteractionState(hash, setBlockChainInteractionState);
            }
        }
    }, [getInteractionState, userId]);
    const clearStoragedTransactionData = (0, react_2.useCallback)(() => {
        identityService_1.identityService.clearBlockChainTransactionCalled(userId);
        identityService_1.identityService.clearBlockChainGuruHash(userId);
    }, [userId]);
    (0, react_2.useEffect)(() => {
        if (blockChainInteractionState === 'on-chain') {
            getTransactionState();
            blockChainInteractionStateInterval.current = setInterval(() => {
                getTransactionState();
            }, 60000);
        }
        else if (blockChainInteractionStateInterval.current) {
            clearInterval(blockChainInteractionStateInterval.current);
            if (blockChainInteractionState === 'confirmed') {
                queryTaskList();
                clearStoragedTransactionData();
            }
        }
        return () => {
            clearInterval(blockChainInteractionStateInterval.current);
        };
    }, [blockChainInteractionState, clearStoragedTransactionData, getTransactionState, queryTaskList, userId]);
    (0, react_2.useEffect)(() => {
        queryTaskList();
    }, []);
    const getBlockChainTransactionCalledStep = (0, react_2.useCallback)(() => {
        const blockChainTransactionCalledData = identityService_1.identityService.getBlockChainTransactionCalled();
        if (blockChainTransactionCalledData) {
            const userBlockChainTransactionStep = JSON.parse(blockChainTransactionCalledData)[`${userId}`];
            if (userBlockChainTransactionStep) {
                if ((0, dayjs_1.default)().isAfter((0, dayjs_1.default)(userBlockChainTransactionStep.expireTimeStamp))) {
                    clearStoragedTransactionData();
                }
                else {
                    setBlockChainInteractionState(userBlockChainTransactionStep.step);
                    const hashMapData = identityService_1.identityService.getBlockChainGuruHash();
                    if (hashMapData) {
                        const userHash = JSON.parse(hashMapData)[`${userId}`];
                        if (userHash) {
                            setTxHash(userHash);
                        }
                    }
                }
            }
        }
    }, [clearStoragedTransactionData, userId]);
    (0, react_2.useEffect)(() => {
        if (blockChainGuruTask?.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_IN_PROGRESS) {
            getBlockChainTransactionCalledStep();
        }
        if (blockChainGuruTask?.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_CLAIMABLE) {
            clearStoragedTransactionData();
        }
    }, [blockChainGuruTask?.status, clearStoragedTransactionData, getBlockChainTransactionCalledStep]);
    const renderTaskLock = (task) => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex md:flex-col justify-center items-center w-full md:w-[126px] pt-3.5 pb-1.5 md:py-0 pl-[60px] md:pl-0 space-x-1.5 md:space-x-0", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "2xl", component: LockClosedIcon_1.default, className: "text-surface-lemon-bold hidden md:block" }), (0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "md", component: LockClosedIcon_1.default, className: "text-surface-lemon-bold block md:hidden" }), (0, jsx_runtime_1.jsx)("div", { className: "text-sm text-surface-lemon-bold font-medium md:font-regular", children: t('task_level_requirement', {
                        level: task.requiredUserLevel
                    }) })] }));
    };
    const renderShellPont = (task) => {
        return task.taskType !== task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE ? ((0, jsx_runtime_1.jsx)("div", { className: "shrink-0 flex", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row md:flex-col justify-center items-center space-x-0.5 md:space-y-0.5", children: [(0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { type: task.pointType, size: 22, className: "block md:hidden" }), (0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { type: task.pointType, size: 36, className: "hidden md:block" }), (0, jsx_runtime_1.jsxs)("div", { className: "text-base md:text-xs text-brand font-medium", children: ["+", ' ', task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_JACKPOT &&
                                task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_IN_PROGRESS
                                ? '??'
                                : (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_CLAIMABLE
                                    ? task.claimableGemCount || task.nextSeasonClaimableGemCount
                                    : task.gemCount)] })] }) })) : null;
    };
    const renderProgress = (task) => {
        if (task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE) {
            return task.taskInfo?.notClaimableMediaShareRecordsCount &&
                task.taskInfo?.notClaimableMediaShareRecordsCount > 0 ? ((0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", color: "brand", className: "cursor-pointer hidden md:inline", onClick: () => setOpenSubmissions(true), children: t('task.season_task_type_social_media_share.manage_submissions') })) : null;
        }
        return !((task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_DAILY_MESSAGE ||
            task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION) &&
            task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_UNAVAILABLE) ? ((0, jsx_runtime_1.jsxs)(typography_1.Description, { size: "lg", color: "subtler", className: "hidden md:inline", children: [!isAfterClaimableEndDate
                    ? task.currentTaskProgress
                    : task.claimableCount
                        ? task.currentTaskProgress
                        : task.nextSeasonProgress, "/", !isAfterClaimableEndDate
                    ? task.requiredCount
                    : task.claimableCount
                        ? task.requiredCount
                        : task.nextSeasonRequiredCount] })) : null;
    };
    const renderButton = (task) => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center items-center space-y-0.5 w-[110px] md:w-[126px]", children: [task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_CLAIMABLE &&
                    task.taskType !== task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE ? ((0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", size: "md", icon: CheckIcon_1.default, loading: claimingSet.includes(task.taskType), disabled: claimedSet.includes(task.taskType), isBlock: true, onClick: () => handleCollectGems(task), children: claimedSet.includes(task.taskType) ? t('claimed') : t('claim') })) : task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION &&
                    blockChainInteractionState === 'on-chain' ? ((0, jsx_runtime_1.jsxs)(react_1.Popover, { placement: "top-end", trigger: isMobile ? 'click' : 'hover', offset: [0, 5], closeOnBlur: true, children: [(0, jsx_runtime_1.jsx)(react_1.PopoverTrigger, { children: (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "gray", disabled: true, isBlock: true, children: blockChainT('confirming') }) }), (0, jsx_runtime_1.jsx)(react_1.PopoverContent, { className: "rounded-lg px-3 py-2 border-none shadow-[0_0_40px_0_#0000001A] w-fit bg-white dark:bg-[#27282C] text-[#414345] dark:text-[#B8BCCF]", children: (0, jsx_runtime_1.jsxs)(react_1.PopoverBody, { className: "p-0 text-xs font-[500]", children: [blockChainT('pending_for_confirmation_tip'), blockChainGuruTask?.taskInfo?.blockchainType && ((0, jsx_runtime_1.jsx)(link_1.Link, { href: `${useOnChainInteraction_1.chainIdNameScannerMap[blockChainGuruTask?.taskInfo?.blockchainType].scanner}/${txHash}`, target: "_blank", className: "text-primary outline-none", children: blockChainT('view_transaction') }))] }) })] })) : task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_DAILY_MESSAGE ||
                    (task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION &&
                        task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_UNAVAILABLE) ? ((0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "default", isBlock: true, onClick: () => {
                        setDailyInfo({
                            points: task.gemCount ?? 0,
                            dailyTaskCompletedCount: task.taskInfo.dailyTaskCompletedCount,
                            dailyTaskPoints: task.taskInfo.dailyTaskPoints,
                            showBtn: false
                        });
                        setShowClaimedModal(true);
                    }, children: t('view_details') })) : task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE &&
                    task.taskInfo?.verifyingMediaShareRecordsCount &&
                    task.taskInfo?.verifyingMediaShareRecordsCount >= 3 ? ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('task.season_task_type_social_media_share.task_disable_tip'), triggerClassName: "w-full", children: (0, jsx_runtime_1.jsx)(button_1.Button, { color: "gray", disabled: true, size: "md", isBlock: true, children: t('go') }) })) : ((0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_UNAVAILABLE ||
                        task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_MONTHLY_LIMIT_REACHED ||
                        task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BOT_MASTER ||
                        isOneInThreeType(task)
                        ? 'gray'
                        : 'default', disabled: task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_UNAVAILABLE ||
                        task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_MONTHLY_LIMIT_REACHED ||
                        task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BOT_MASTER ||
                        isOneInThreeType(task), onClick: () => handleGo(task), isBlock: true, children: task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BOT_MASTER || isOneInThreeType(task)
                        ? t('claim')
                        : t('go') })), renderProgress(task)] }));
    };
    const renderMobileProgress = (task) => {
        if (task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE) {
            return task.taskInfo?.notClaimableMediaShareRecordsCount &&
                task.taskInfo?.notClaimableMediaShareRecordsCount > 0 ? ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "brand", className: "cursor-pointer line-clamp-1", onClick: () => setOpenSubmissions(true), children: t('task.season_task_type_social_media_share.manage_submissions') })) : null;
        }
        return !((task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_DAILY_MESSAGE ||
            task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION) &&
            task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_UNAVAILABLE) ? ((0, jsx_runtime_1.jsxs)(typography_1.Text, { size: "sm", color: "subtler", children: ["(", !isAfterClaimableEndDate
                    ? task.currentTaskProgress
                    : task.claimableCount
                        ? task.currentTaskProgress
                        : task.nextSeasonProgress, "/", !isAfterClaimableEndDate
                    ? task.requiredCount
                    : task.claimableCount
                        ? task.requiredCount
                        : task.nextSeasonRequiredCount, ")"] })) : null;
    };
    const renderAction = (task) => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex justify-between space-x-3 w-full md:w-auto pl-[60px] md:pl-0 pt-2 md:pt-0", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center blokc md:hidden", children: renderMobileProgress(task) }), (0, jsx_runtime_1.jsxs)("div", { className: "shrink-0 flex space-x-3", children: [renderShellPont(task), renderButton(task)] })] }));
    };
    if (initialing) {
        return (0, jsx_runtime_1.jsx)(Skeleton_1.Skeleton, {});
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full", children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.ul, { className: "space-y-3", children: taskList
                            .filter(t => t.status !== task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_CLAIMED)
                            .map(task => ((0, jsx_runtime_1.jsxs)(framer_motion_1.motion.li, { className: "list-none", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('relative w-full p-3 rounded-xl border bg-surface-default shadow-background-default', task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_CLAIMABLE &&
                                        !(task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE)
                                        ? 'border-brand hover:bg-surface-hovered bg-gradient-to-t from-[#3e5cfa1a] via-[#3e5cfa00] to-[transparent]'
                                        : 'border-default hover:border-hovered hover:bg-surface-hovered'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start md:items-center flex-col md:flex-row md:space-x-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grow flex overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "shrink-0 flex items-start md:items-center relative", children: (0, jsx_runtime_1.jsx)("img", { alt: `task-${task.taskType}`, src: isDark ? task.taskIconDark : task.taskIconLight, className: "w-12 h-12 md:w-13 md:h-13 rounded-xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "grow flex flex-col justify-center space-y-1 ml-3 overflow-hidden pb-2 md:pb-0 border-b border-default md:border-0", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "regular", className: "truncate", children: task.taskName }), (task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_DAILY_MESSAGE ||
                                                                            task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_DC_INTERACTION ||
                                                                            task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_BLOCKCHAIN_INTERACTION ||
                                                                            task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TOP_CURVE_HOLDERS_DAILY_INCOME) && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('daily_message_tip', {
                                                                                time: (0, dayjs_1.default)(task.taskInfo?.date).format('HH:mmA [UTC](Z)')
                                                                            }), children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: InformationCircleIcon_1.default, className: "ml-1" }) })), task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('task.season_task_type_social_media_share.task_tip'), children: (0, jsx_runtime_1.jsx)("img", { src: hot_svg_1.default.src, className: "ml-1 w-4.5 h-4.5" }) })), task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_JACKPOT && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: t('task.season_task_type_jackpot.task_tip', {
                                                                                taskEndDate: (0, dayjs_1.default)(Number(task.taskInfo?.jackPotTaskEndDateUnix)).format('YYYY-MM-DD HH:mmA [UTC](Z)'),
                                                                                seasonEndDate: (0, dayjs_1.default)(Number(task.taskInfo?.jackPotClaimableEndDateUnix)).format('YYYY-MM-DD HH:mmA [UTC](Z)')
                                                                            }), children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: InformationCircleIcon_1.default, className: "ml-1" }) })), task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_LUCKY_STAR && ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-1.5", children: [(0, jsx_runtime_1.jsxs)(typography_1.Description, { size: "lg", color: "subtler", children: ["*", t('lucky_daily_message_tip', {
                                                                                                time: (0, dayjs_1.default)(task.taskInfo?.date).format('HH:mmA [UTC](Z)')
                                                                                            })] }), task.taskInfo?.luckyCurve && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(typography_1.SubHeading, { size: "lg", color: "subtler", children: t('today_s_lucky_star') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1.5 max-w-36", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: task.taskInfo?.luckyCurve?.botSummary.logoUrl, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsxs)(typography_1.Description, { size: "lg", weight: "medium", color: "subtlest", className: "line-clamp-1", children: ["$", task.taskInfo?.luckyCurve?.symbol] }), (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "default", className: "line-clamp-1", children: task.taskInfo?.luckyCurve?.botSummary?.name })] })] })] }))] }), children: (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: InformationCircleIcon_1.default, className: "ml-1" }) }))] }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: task.taskDescription, children: (0, jsx_runtime_1.jsx)("div", { className: "w-full", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "regular", color: "subtler", className: "line-clamp-2 md:line-clamp-1 text-left", children: task.taskDescription }) }) })] })] }), task.userLevelValid ? renderAction(task) : renderTaskLock(task)] }), task.taskInfo?.botList?.length ? ((0, jsx_runtime_1.jsx)("div", { className: "ml-16 pt-3 mt-3 border-t border-default hidden md:block", children: (0, jsx_runtime_1.jsx)(BotList_1.BotList, { isMobile: false, bots: task.taskInfo.botList, goToChat: goToChat }) })) : null, task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE &&
                                            task.taskInfo?.claimableMediaShareRecords?.length ? ((0, jsx_runtime_1.jsx)("div", { className: "ml-16 pt-3 mt-3 border-t border-default hidden md:block", children: (0, jsx_runtime_1.jsx)(RecordList_1.default, { records: task.taskInfo?.claimableMediaShareRecords, isClaimed: true, onClaimed: async () => {
                                                    onPlayClaimVoice();
                                                    await Promise.all([queryTaskList(), queryPoints(), getEnergyInfo()]);
                                                } }) })) : null] }), task.taskInfo?.botList?.length ? ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('p-2 pt-4 -mt-2 bg-surface-subtle rounded-b-xl border border-t-0 md:hidden', task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_CLAIMABLE
                                        ? 'border-brand'
                                        : 'border-default'), children: (0, jsx_runtime_1.jsx)(BotList_1.BotList, { isMobile: false, bots: task.taskInfo.botList, goToChat: goToChat }) })) : null, task.taskType === task_2.TaskTypeEnum.SEASON_TASK_TYPE_SOCIAL_MEDIA_SHARE &&
                                    task.taskInfo?.claimableMediaShareRecords?.length ? ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('p-2 pt-4 -mt-2 bg-surface-subtle rounded-b-xl border border-default border-t-0 md:hidden'), children: (0, jsx_runtime_1.jsx)(RecordList_1.default, { records: task.taskInfo?.claimableMediaShareRecords, isClaimed: true, onClaimed: () => {
                                            Promise.all([queryTaskList(), queryPoints(), getEnergyInfo()]);
                                        } }) })) : null] }, `${task.id}-${task.status}`))) }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center mt-4", children: (0, jsx_runtime_1.jsx)(button_1.Button, { color: "gray", onClick: () => {
                                setClaimedModalVisible(true);
                            }, icon: ChevronRightIcon, iconDirection: "right", children: t('claimed_records') }) })] }), claimedModalVisible && ((0, jsx_runtime_1.jsx)(ClaimedTaskListModal, { claimedTasks: taskList.filter(task => task.status === task_2.GolangUserTaskStatusEnum.SEASON_TASK_ITEM_STATUS_CLAIMED), onClose: () => {
                    setClaimedModalVisible(false);
                } })), blockChainGuruModalVisible && ((0, jsx_runtime_1.jsx)(BlockChainGuruModal, { isOpen: blockChainGuruModalVisible, onClose: () => setBlockChainGuruModalVisible(false), blockChainInteractionState: blockChainInteractionState, setBlockChainInteractionState: setBlockChainInteractionState, task: blockChainGuruTask, txHash: txHash, setTxHash: setTxHash })), wagmiErrorModalVisible && ((0, jsx_runtime_1.jsx)(WagmiErrorModal, { isOpen: wagmiErrorModalVisible, onClose: handleWagmiErrorModalClose, wagmiErrorType: wagmiErrorType, chainId: blockChainGuruTask?.taskInfo?.blockchainType })), needReLoginModalVisible && ((0, jsx_runtime_1.jsx)(NeedReLoginModal, { isOpen: needReLoginModalVisible, onClose: () => {
                    setNeedReLoginModalVisible(false);
                } })), showClaimedModal && dailyInfo && ((0, jsx_runtime_1.jsx)(ClaimedModal_1.ClaimedModal, { claimedPoints: dailyInfo.points, points: dailyInfo.dailyTaskCompletedCount, data: dailyInfo.dailyTaskPoints ?? [], isOpen: showClaimedModal, showBtn: dailyInfo.showBtn, onClose: () => {
                    setShowClaimedModal(false);
                } })), isOpenTweetBindModal && ((0, jsx_runtime_1.jsx)(BindTweetModal, { isOpen: isOpenTweetBindModal, onClose: () => {
                    setOpenTweetBindModal(false);
                } })), isOpenTweetCheckModal && ((0, jsx_runtime_1.jsx)(CheckTweetModal, { isOpen: isOpenTweetCheckModal, text: tweetText, onClose: (success, isOpenTweetBind) => {
                    setOpenTweetCheckModal(false);
                    if (success) {
                        queryTaskList();
                    }
                    else if (isOpenTweetBind) {
                        setTimeout(() => {
                            setOpenTweetBindModal(true);
                        }, 500);
                    }
                } })), (0, jsx_runtime_1.jsx)(CheckSocialModal, { isOpen: isOpenSocialCheckModal, onClose: (success, isOpenTweetBind) => {
                    setOpenSocialCheckModal(false);
                    if (isOpenTweetBind) {
                        setTimeout(() => {
                            setOpenTweetBindModal(true);
                        }, 500);
                    }
                } }), isOpenSubmissions && (0, jsx_runtime_1.jsx)(ManageSocialModal, { isOpen: isOpenSubmissions, onClose: () => setOpenSubmissions(false) }), isOpenPl && ((0, jsx_runtime_1.jsx)(CheckPlModal, { isOpen: isOpenPl, onClose: (success, isOpenTweetBind) => {
                    setOpenPl(false);
                    if (success) {
                        queryTaskList();
                    }
                    else if (isOpenTweetBind) {
                        setTimeout(() => {
                            setOpenTweetBindModal(true);
                        }, 500);
                    }
                }, onSelect: () => {
                    setOpenPl(false);
                    setOpenSelectAIpp(true);
                } })), isOpenSelectAIpp && ((0, jsx_runtime_1.jsx)(SelectAIppModal, { isOpen: isOpenSelectAIpp, onClose: () => setOpenSelectAIpp(false), onBack: () => {
                    setOpenSelectAIpp(false);
                    setOpenPl(true);
                } }))] }));
}
