"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShellRecord;
const jsx_runtime_1 = require("react/jsx-runtime");
const Record_1 = __importDefault(require("./Record.js"));
const react_1 = require("react");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const react_infinite_scroll_component_1 = __importDefault(require("react-infinite-scroll-component"));
const use_intl_1 = require("use-intl");
const useNotification_1 = require("../../../../common/hooks/useNotification.js");
const react_use_1 = require("react-use");
const useSeason_1 = __importDefault(require("../../../../hooks/rewards-center/useSeason.js"));
const task_1 = require("../../../../common/constants/enums/task.js");
const button_1 = require("../../../../common/components/ui/button.js");
const modal_1 = require("../../../../common/components/ui/modal.js");
const shell_coin_1 = require("../shell-coin/index.js");
const shell_point_1 = require("../shell-point/index.js");
const Skeleton_1 = __importDefault(require("./Skeleton.js"));
const useGetPoints_1 = __importDefault(require("../../../../hooks/rewards-center/useGetPoints.js"));
const useShellCoin_1 = __importDefault(require("../../../../hooks/user/useShellCoin.js"));
const typography_1 = require("../../../../common/components/ui/typography.js");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const utils_1 = require("../../../../lib/utils.js");
const ShelllMap = {
    ['SHELL_COIN']: {
        title: 'Shell Coin',
        type: 'SHELL_COIN',
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_GENERAL]: {
        i18n: 'general_points',
        type: task_1.PointTypeEnum.USER_POINT_TYPE_GENERAL,
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_CREATOR]: {
        i18n: 'creator_points',
        type: task_1.PointTypeEnum.USER_POINT_TYPE_CREATOR,
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_ADVOCATOR]: {
        i18n: 'advocator_points',
        type: task_1.PointTypeEnum.USER_POINT_TYPE_ADVOCATOR,
    },
    [task_1.PointTypeEnum.USER_POINT_TYPE_INVESTOR]: {
        i18n: 'investor_points',
        type: task_1.PointTypeEnum.USER_POINT_TYPE_INVESTOR
    },
};
const ChevronRightIcon = (props) => ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", ...props, children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z", clipRule: "evenodd" }) }));
const ChevronLeftIcon = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: (0, utils_1.cn)('rotate-180', className), ...props, children: (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", d: "M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z", clipRule: "evenodd" }) }));
function ShellRecord({ isOpen, onClose }) {
    const t = (0, use_intl_1.useTranslations)('reward_center');
    const { warning } = (0, useNotification_1.useNotification)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [records, setRecords] = (0, react_1.useState)([]);
    const { seasonId } = (0, useSeason_1.default)();
    const { getPointRecords } = (0, useGetPoints_1.default)();
    const { getCoinRecords } = (0, useShellCoin_1.default)();
    const nextRef = (0, react_1.useRef)('0');
    const hasRef = (0, react_1.useRef)(true);
    const typeRef = (0, react_1.useRef)('SHELL_COIN');
    const scrollContainer = (0, react_1.useRef)(null);
    const [showSide, setShowSide] = (0, react_1.useState)('none');
    const getRecords = async () => {
        try {
            if (typeRef.current === 'SHELL_COIN') {
                const { success, msg, data } = await getCoinRecords(nextRef.current, 50);
                if (!success) {
                    warning({
                        content: msg ?? ''
                    });
                    return;
                }
                const list = data.accountOrders.map((item) => {
                    return {
                        id: item.id,
                        desc: item.sourceDesc,
                        type: 'SHELL_COIN',
                        isIncome: item.isIncome,
                        createdDateUnix: item.createdAt,
                        balance: (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(item.balanceAfter),
                        text: (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(item.amount),
                    };
                });
                nextRef.current = data.listResponse.nextPageToken;
                hasRef.current = data.listResponse.hasMore;
                return list;
            }
            else if (seasonId) {
                const { success, msg, data } = await getPointRecords(nextRef.current, 50, seasonId, typeRef.current);
                if (!success) {
                    warning({
                        content: msg ?? ''
                    });
                    return;
                }
                const list = data.records.map((item) => {
                    return {
                        id: item.id,
                        desc: item.sourceDesc,
                        type: item.pointType,
                        createdDateUnix: item.createdDateUnix,
                        balance: (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(item.balanceAfter),
                        isIncome: item.point > 0,
                        text: (0, common_helper_1.formatFloatNumberToOneDecimalAndRemoveDecimalZero)(Math.abs(item.point)),
                    };
                });
                nextRef.current = data.listResponse.nextPageToken;
                hasRef.current = data.listResponse.hasMore;
                return list;
            }
        }
        catch (e) {
            console.log(e);
        }
    };
    const load = async () => {
        setLoading(true);
        setRecords([]);
        const list = await getRecords();
        if (Array.isArray(list)) {
            setRecords(list);
        }
        setLoading(false);
    };
    const loadMore = async () => {
        const list = await getRecords();
        if (Array.isArray(list)) {
            setRecords(prev => [...prev, ...list]);
        }
    };
    const onChange = (type) => {
        nextRef.current = '0';
        hasRef.current = true;
        typeRef.current = type;
        load();
    };
    (0, react_use_1.useEffectOnce)(() => {
        load();
    });
    (0, react_use_1.useEffectOnce)(() => {
        if (scrollContainer.current) {
            const cb = () => {
                if (scrollContainer.current?.offsetWidth === scrollContainer.current?.scrollWidth) {
                    setShowSide('none');
                }
                else {
                    if (Number(scrollContainer.current?.scrollLeft) === 0) {
                        setShowSide('right');
                    }
                    if (Number(scrollContainer.current?.scrollLeft) > 0) {
                        setShowSide('left');
                    }
                }
            };
            cb();
            scrollContainer.current.addEventListener('scroll', cb);
        }
    });
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: onClose, title: t('records.title'), modalOnly: false, children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: "pt-1 relative", children: [(0, jsx_runtime_1.jsx)("div", { ref: scrollContainer, className: "flex space-x-4 overflow-auto no-scrollbar py-2 mx-4", children: Object.keys(ShelllMap).map((key) => {
                        const { i18n, type, title } = ShelllMap[key];
                        return ((0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", variant: "outline", color: typeRef.current === type ? 'brand' : 'default', onClick: () => onChange(type), children: type === 'SHELL_COIN' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(shell_coin_1.ShellCoin, { size: 16, className: "mr-1.5" }), title] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(shell_point_1.ShellPoint, { size: 16, type: type, className: "mr-1.5" }), i18n ? t(i18n) : null] })) }));
                    }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('absolute top-3 right-4 hidden w-14 h-9 items-center justify-end bg-gradient-to-l from-[var(--surface-default)] to-[transparent]', showSide === 'right' && 'flex'), children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", size: "sm", color: "default", icon: ChevronRightIcon, onClick: () => {
                            scrollContainer.current?.scrollTo(scrollContainer.current.scrollWidth, 0);
                        } }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('absolute top-3 left-4 hidden w-14 h-9 items-center justify-start bg-gradient-to-r from-[var(--surface-default)] to-[transparent]', showSide === 'left' && 'flex'), children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", size: "sm", color: "default", icon: ChevronLeftIcon, onClick: () => {
                            scrollContainer.current?.scrollTo(0, 0);
                        } }) }), loading ? ((0, jsx_runtime_1.jsx)("div", { className: "space-y-2 overflow-hidden px-4 h-[480px]", children: (0, jsx_runtime_1.jsx)(Skeleton_1.default, { num: 9 }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "px-1", children: records.length ? ((0, jsx_runtime_1.jsx)(react_infinite_scroll_component_1.default, { className: "space-y-2 px-3", dataLength: records.length, next: loadMore, hasMore: hasRef.current, loader: (0, jsx_runtime_1.jsx)(Skeleton_1.default, { num: 3 }), height: 480, children: records.map(record => ((0, jsx_runtime_1.jsx)(Record_1.default, { record: record }, record.id))) })) : ((0, jsx_runtime_1.jsx)("div", { className: "relative h-[480px] px-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full h-full flex flex-col justify-center items-center space-y-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "sm", children: t('detail_no_data.title') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtlest", children: t('detail_no_data.desc') })] }) })) }))] }) }));
}
