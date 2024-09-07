"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NoAccessMask;
const jsx_runtime_1 = require("react/jsx-runtime");
const dayjs_1 = __importDefault(require("dayjs"));
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const image_1 = __importDefault(require("next/image"));
const navigation_1 = require("next/navigation");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const task_1 = require("../../../apis/task.js");
const button_1 = require("../../../common/components/ui/button.js");
const typography_1 = require("../../../common/components/ui/typography.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const common_helper_1 = require("../../../common/utils/common-helper.js");
const useGetPoints_1 = __importDefault(require("../../../hooks/rewards-center/useGetPoints.js"));
const useSeason_1 = __importDefault(require("../../../hooks/rewards-center/useSeason.js"));
const shell_point_1 = require("../components/shell-point/index.js");
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
function NoAccessMask() {
    const isMobile = (0, common_helper_1.isMobileDevice)();
    const router = (0, navigation_1.useRouter)();
    const { locale } = (0, usePathLocale_1.usePathLocale)();
    const { isBate, seasonName, isInClaimablePeriod, claimableStartDate, seasons } = (0, useSeason_1.default)();
    const { unclaimedPoints, setUnclaimedPoints, queryPoints, queryUnclaimedPoints } = (0, useGetPoints_1.default)();
    const t = (0, next_intl_1.useTranslations)('reward_center');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const claimAllPoints = async () => {
        setLoading(true);
        (0, task_1.claimAllLastSeasonPoints)()
            .then(() => {
            setUnclaimedPoints([]);
            queryPoints();
        })
            .finally(() => {
            setLoading(false);
        });
    };
    const go2Redemption = () => {
        const url = isMobile ? `/rewards-center/reward-redemption` : `/rewards-center/reward-redemption`;
        router.push(url);
    };
    (0, react_1.useEffect)(() => {
        if (!unclaimedPoints) {
            queryUnclaimedPoints();
        }
    }, []);
    if (!unclaimedPoints) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col items-center justify-center w-full h-full relative", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center space-y-6 px-4", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: "https://image.myshell.ai/image/season/ui/bot-playing.png", width: 145, height: 166, alt: "bot playing image" }), unclaimedPoints.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 flex flex-col items-center justify-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center font-semibold flex-wrap text-center", children: t.rich(isBate ? 'earn_content.remain_points_beta' : 'earn_content.remain_points', {
                                rich: () => ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center space-x-0 mx-1", children: unclaimedPoints.map(({ type, text }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { size: 32, type: type }), (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "semibold", children: text })] }))) })),
                                name: seasonName
                            }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", onClick: () => claimAllPoints(), loading: loading, children: t('mask.claim_now') })] })) : isInClaimablePeriod ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 flex flex-col items-center justify-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "semibold", children: t(isBate ? 'earn_content.no_remain_points_beta' : 'earn_content.no_remain_points', {
                                name: seasonName
                            }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "semibold", color: "warning", children: t(seasons?.[0].isBate ? 'earn_content.no_remain_points_tip_beta' : 'earn_content.no_remain_points_tip', {
                                name: seasons?.[0].name
                            }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", onClick: () => go2Redemption(), children: t('reward_redemption') })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 flex flex-col items-center justify-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "semibold", children: t.rich(isBate ? 'earn_content.no_remain_points_slient_beta' : 'earn_content.no_remain_points_slient', {
                                time: chunks => (0, jsx_runtime_1.jsx)("span", { className: "text-brand", children: chunks }),
                                name: seasonName,
                                date: claimableStartDate ? (0, dayjs_1.default)(claimableStartDate).format('YYYY.MM.DD HH:mm [UTC](Z)') : ''
                            }) }), (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "semibold", children: t(seasons?.[0].isBate
                                ? 'earn_content.no_remain_points_tip_slient_beta'
                                : 'earn_content.no_remain_points_tip_slient', {
                                name: seasons?.[0].name
                            }) })] }))] }) }));
}
