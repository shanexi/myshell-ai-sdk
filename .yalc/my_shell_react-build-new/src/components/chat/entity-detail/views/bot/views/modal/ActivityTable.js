"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActivityTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const apiTypes_1 = require("../../../../../../../apis/apiTypes.js");
const avatar_1 = require("../../../../../../../common/components/ui/avatar.js");
const typography_1 = require("../../../../../../../common/components/ui/typography.js");
const common_helper_1 = require("../../../../../../../common/utils/common-helper.js");
const Table_1 = __importDefault(require("../../../../../../../components/rewards-center/stake-earn/components/Table.js"));
const utils_1 = require("../../../../../../../lib/utils.js");
const dayjs_1 = __importDefault(require("dayjs"));
const flash_svg_1 = __importDefault(require("@/assets/icons/web3/flash.svg"));
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs_1.default.extend(relativeTime);
function ActivityTable({ orders }) {
    const t = (0, next_intl_1.useTranslations)('share_key.stake_earn');
    const t_table = (0, next_intl_1.useTranslations)('reward_center.aipp.table');
    function renderVolume(record) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-0.5", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", className: "block", children: record?.badgeAmount || 0 }) }));
    }
    const renderType = (record) => {
        const buy = record?.orderType === apiTypes_1.TradeOrderType.ORDER_TYPE_BUY;
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('flex items-center justify-center py-0.5 md:py-1 px-2 w-fit rounded-lg', buy ? 'bg-surface-accent-green-subtler' : 'bg-surface-accent-red-subtler'), children: (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", className: (0, utils_1.cn)('text-xs'), color: buy ? 'success' : 'critical', children: buy ? 'Buy' : 'Sell' }) }));
    };
    const renderHolder = (record) => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 max-w-[260px]", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { src: (0, common_helper_1.getAssetsUrl)(record?.userSummary?.avatar), className: "w-6 h-6 md:w-8 md:h-8 rounded-lg" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "default", className: "w-fit max-w-[92px] md:max-w-max overflow-hidden text-ellipsis", lineClamp: 1, children: record?.userSummary?.name || (0, common_helper_1.formatWalletAddress)(record?.walletAddress) })] }));
    };
    const renderTime = (record) => {
        const time = (0, dayjs_1.default)().to(dayjs_1.default.unix(record?.happenedAtUnixStamp));
        const shrinkTime = (time) => {
            if (time.indexOf('an') > -1) {
                time.replace('an', '1');
            }
            if (time.indexOf('a') > -1) {
                time.replace('a', '1');
            }
            if (time.includes('minute')) {
                if (time.includes('minutes')) {
                    return time.replace('minutes', 'm');
                }
                return time.replace('minute', 'm');
            }
            else if (time.includes('hour')) {
                if (time.includes('hours')) {
                    return time.replace('hours', 'h');
                }
                return time.replace('hour', 'h');
            }
            else {
                if (time.includes('day')) {
                    if (time.includes('days')) {
                        return time.replace('days', 'd');
                    }
                }
                return time.replace('day', 'd');
            }
        };
        return ((0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", children: shrinkTime(time) }));
    };
    const renderEmpty = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-agent-empty h-agent-empty flex flex-col items-center justify-center absolute", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: flash_svg_1.default, width: 32, height: 32, alt: "empty" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-center text-xl", weight: "semibold", color: "default", children: t('no_active_bids') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-center", size: "sm", color: "subtlest", children: t('earliest') })] }));
    };
    const colunms = [
        {
            title: t_table('type'),
            key: 'TYPE',
            render: renderType,
            mobile: true
        },
        {
            title: t_table('holder'),
            key: 'HOLDER',
            render: renderHolder,
            mobile: true
        },
        {
            title: t_table('amount'),
            key: 'AMOUNT',
            render: renderVolume,
            mobile: true
        },
        {
            title: t_table('time'),
            key: 'TIME',
            render: renderTime,
            mobile: true
        }
    ];
    return (0, jsx_runtime_1.jsx)(Table_1.default, { columns: colunms, dataSource: orders, renderEmpty: renderEmpty });
}
