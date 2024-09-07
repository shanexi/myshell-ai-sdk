"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Earn;
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowLeftIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const task_1 = require("../../../apis/task.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const useBackToRewardsCenter_1 = __importDefault(require("../../../hooks/rewards-center/useBackToRewardsCenter.js"));
const useClaim_1 = __importDefault(require("../../../hooks/rewards-center/useClaim.js"));
const useGetPoints_1 = __importDefault(require("../../../hooks/rewards-center/useGetPoints.js"));
const useSeason_1 = __importDefault(require("../../../hooks/rewards-center/useSeason.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../hooks/user/useGetEnergyInfo.js"));
const store_1 = require("../../../services/store/index.js");
const NoAccessMask_1 = __importDefault(require("./NoAccessMask.js"));
const task_list_1 = __importDefault(require("./components/task-list/index.js"));
const typography_1 = require("../../../common/components/ui/typography.js");
const top_info_1 = require("../components/top-info/index.js");
const utils_1 = require("../../../lib/utils.js");
const button_1 = require("../../../common/components/ui/button.js");
const icon_button_1 = require("../../../common/components/ui/icon-button.js");
const typography_2 = require("../../../common/components/ui/typography.js");
const react_use_1 = require("react-use");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
function Earn() {
    const { seasonIndex, setSeasonIndex, querySeasons } = (0, useSeason_1.default)();
    const setTaskList = (0, store_1.useTaskStore)(state => state.setTaskList);
    const hasClaimableTask = (0, store_1.useTaskStore)(state => state.hasClaimableTask);
    const { backToProfile } = (0, useBackToRewardsCenter_1.default)();
    const isMobileDevice = (0, react_use_1.useMedia)('(max-width: 768px)');
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const [isSticky, setIsSticky] = (0, react_1.useState)(false);
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const audioRef = (0, react_1.useRef)(null);
    const containerRef = (0, react_1.useRef)(null);
    const { queryPoints } = (0, useGetPoints_1.default)();
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const { claimAll, claimingAll } = (0, useClaim_1.default)();
    const queryTaskList = (0, react_1.useCallback)(async () => {
        const { data } = await (0, task_1.getTaskList)();
        setTaskList(data);
    }, [setTaskList]);
    const handleClaimAll = () => {
        claimAll(() => {
            playClaimVoice();
            try {
                Promise.all([queryTaskList(), queryPoints(), getEnergyInfo()]);
            }
            catch (e) {
            }
        });
    };
    const playClaimVoice = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            }
            else {
                audioRef.current.currentTime = 0;
            }
        }
    };
    (0, react_1.useEffect)(() => {
        setSeasonIndex(0);
    }, []);
    (0, react_1.useEffect)(() => {
        if (isMobile) {
            querySeasons();
        }
    }, []);
    (0, react_1.useEffect)(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }
        const handleScroll = () => {
            if (container?.scrollTop) {
                setIsSticky(container?.scrollTop > 30);
            }
        };
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('h-full overflow-hidden relative'), children: [isMobileDevice || isMobile ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('sticky top-0 bg-surface-default hidden items-center justify-center px-4 h-14 border-b border-default', isSticky && 'flex'), children: (0, jsx_runtime_1.jsx)(typography_2.Display, { size: "xs", children: t('earn') }) }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: backToProfile, variant: "ghost", color: "brand", size: "md", icon: ArrowLeftIcon_1.default, className: (0, utils_1.cn)('fixed left-4 top-2.5 z-50', isSticky ? 'flex' : 'hidden') }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: backToProfile, variant: "primary", color: "default", size: "md", icon: ArrowLeftIcon_1.default, className: (0, utils_1.cn)('fixed left-4 top-4 z-50', isSticky ? 'hidden' : 'flex') })] })) : null, (0, jsx_runtime_1.jsxs)("div", { ref: containerRef, className: "flex flex-col h-full overflow-auto", children: [(0, jsx_runtime_1.jsx)(top_info_1.TopInfo, {}), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex flex-col p-4 grow relative'), children: seasonIndex === 1 ? ((0, jsx_runtime_1.jsx)(NoAccessMask_1.default, {})) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col pb-[80px] md:pb-[0] grow", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center shrink-0", children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col grow", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h3", children: t('earn_content.task_list') }), (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: !hasClaimableTask ? 'gray' : 'default', size: "md", onClick: handleClaimAll, loading: claimingAll, disabled: !hasClaimableTask, children: t('earn_content.claim_all') })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "mt-4 grow", children: (0, jsx_runtime_1.jsx)(task_list_1.default, { onPlayClaimVoice: playClaimVoice }) })] })) })] })] }), (0, jsx_runtime_1.jsx)("audio", { ref: audioRef, src: (0, common_helper_1.getAssetsUrl)('audio/claim_sound.mp3') })] }));
}
