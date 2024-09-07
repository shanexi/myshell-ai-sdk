"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MyCollectionTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const agentPump_1 = require("../../../../apis/agentPump.js");
const apiTypes_1 = require("../../../../apis/apiTypes.js");
const flash_svg_1 = __importDefault(require("@/assets/icons/web3/flash.svg"));
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const button_1 = require("../../../../common/components/ui/button.js");
const icon_1 = require("../../../../common/components/ui/icon.js");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const caret_down_1 = require("../../../../common/components/ui/icons/solid/caret-down.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const user_1 = require("../../../../common/constants/enums/user.js");
const store_1 = require("../../../../services/store/index.js");
const Table_1 = __importDefault(require("../../stake-earn/components/Table.js"));
const ShareIcon = (props) => ((0, jsx_runtime_1.jsxs)("svg", { ...props, width: "22", height: "22", viewBox: "0 0 22 22", fill: "currentColor", stroke: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M10.5139 1.57636C10.7823 1.30788 11.2177 1.30788 11.4861 1.57636L14.2361 4.32636C14.5046 4.59485 14.5046 5.03015 14.2361 5.29864C13.9677 5.56712 13.5323 5.56712 13.2639 5.29864L11.6875 3.72227L11.6875 13.75C11.6875 14.1297 11.3797 14.4375 11 14.4375C10.6203 14.4375 10.3125 14.1297 10.3125 13.75L10.3125 3.72227L8.73614 5.29864C8.46765 5.56712 8.03235 5.56712 7.76386 5.29864C7.49538 5.03015 7.49538 4.59485 7.76386 4.32636L10.5139 1.57636Z" }), (0, jsx_runtime_1.jsx)("path", { d: "M6.875 8.25C6.11561 8.25 5.5 8.86561 5.5 9.625V17.875C5.5 18.6344 6.11561 19.25 6.875 19.25H15.125C15.8844 19.25 16.5 18.6344 16.5 17.875V9.625C16.5 8.86561 15.8844 8.25 15.125 8.25H13.75C13.3703 8.25 13.0625 7.9422 13.0625 7.5625C13.0625 7.1828 13.3703 6.875 13.75 6.875H15.125C16.6438 6.875 17.875 8.10622 17.875 9.625V17.875C17.875 19.3938 16.6438 20.625 15.125 20.625H6.875C5.35622 20.625 4.125 19.3938 4.125 17.875V9.625C4.125 8.10622 5.35622 6.875 6.875 6.875H8.25C8.6297 6.875 8.9375 7.1828 8.9375 7.5625C8.9375 7.9422 8.6297 8.25 8.25 8.25H6.875Z" })] }));
const Coin = () => ((0, jsx_runtime_1.jsx)("svg", { width: "21", height: "20", viewBox: "0 0 21 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("path", { d: "M20.3656 12.4191C19.03 17.7763 13.604 21.0366 8.24619 19.7007C2.8906 18.3651 -0.369681 12.9388 0.966478 7.58203C2.30146 2.22425 7.72743 -1.03628 13.0836 0.299295C18.441 1.63487 21.7011 7.06177 20.3654 12.4192L20.3655 12.4191H20.3656Z", fill: "#F3BA2F" }), (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.6668 6.34677L8.07736 8.93621L8.07741 8.9361L6.5708 7.42943L10.6668 3.33344L14.7641 7.43066L13.2575 8.93733L10.6668 6.34677ZM5.50672 8.49319L4 10.0001L5.50661 11.5065L7.01333 9.99981L5.50672 8.49319ZM8.07705 11.0642L10.6665 13.6534L13.2571 11.0629L14.7646 12.5688L14.7638 12.5696L10.6665 16.6668L6.57049 12.5708L6.56836 12.5686L8.07705 11.0642ZM15.8265 8.49403L14.3198 10.0008L15.8265 11.5074L17.3332 10.0006L15.8265 8.49403Z", fill: "white" }), (0, jsx_runtime_1.jsx)("path", { d: "M12.1955 9.99931H12.1961L10.6673 8.47046L9.53738 9.60011L9.40756 9.72998L9.13983 9.99777L9.1377 9.99985L9.13983 10.002L10.6673 11.5298L12.1962 10.0009L12.1969 10.0001L12.1956 9.99931", fill: "white" })] }) }));
function MyCollectionTable(props) {
    const { openBotModal, openTradeModal, openShareModal } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const tProfile = (0, next_intl_1.useTranslations)('profile');
    const user = (0, store_1.useUserStore)(state => state.user);
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [records, setRecords] = (0, react_1.useState)([]);
    const initData = async () => {
        try {
            setLoading(true);
            const response = await (0, agentPump_1.get_my_collection)();
            if (response.success) {
                setRecords(response.data.curvesWithEarningStats);
            }
        }
        catch (error) {
        }
        finally {
            setLoading(false);
        }
    };
    (0, react_1.useEffect)(() => {
        initData();
    }, []);
    function renderBot(record) {
        const isPass = record?.curve?.creator?.membershipInfo?.type === apiTypes_1.MembershipInfoType.TYPE_GENESIS_WITH_GENESIS_CARD ||
            record?.curve?.creator?.membershipInfo?.type === apiTypes_1.MembershipInfoType.TYPE_GENESIS_WITH_PASS_CARD;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2.5 min-w-[220px]", children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: "xl", src: record?.curve?.botSummary?.logoUrl, rootStyle: isPass
                        ? {
                            border: '2px solid transparent',
                            backgroundImage: 'linear-gradient(white, white), linear-gradient(to bottom, #FDA500, #f7e0ce)',
                            backgroundOrigin: 'border-box',
                            backgroundClip: 'content-box, border-box'
                        }
                        : {} }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-grow space-y-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: "subtlest", lineClamp: 1, className: "break-all", children: `$${record?.curve?.symbol}` }), record.curve?.curveTags?.[0]?.label && ((0, jsx_runtime_1.jsx)("div", { className: "px-1 py-0.5 bg-surface-accent-gray-subtlest rounded-md h-5 flex flex-row justify-center items-center", children: (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "default", children: record.curve?.curveTags?.[0]?.label || '' }) }))] }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", lineClamp: 1, children: record?.curve?.botSummary?.name || 'Unknown Bot' })] })] }));
    }
    function renderAmount(record) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-0.5", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", className: "block", children: record?.curve?.holdInfo?.holdCount }), (0, jsx_runtime_1.jsx)(typography_1.Description, { size: "lg", weight: "medium", color: "subtler", className: "block", children: `≈$${record?.curve?.holdInfo?.holdValueInU}` })] }));
    }
    function renderAction(record) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-end space-x-1.5", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "default", variant: "primary", className: "w-[120px]", onClick: e => {
                        e.stopPropagation();
                        openTradeModal?.(record);
                    }, children: t('trade') }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { variant: "primary", size: "md", icon: ShareIcon, color: "default", onClick: e => {
                        e.stopPropagation();
                        openShareModal?.(record);
                    } })] }));
    }
    function renderPrice(record) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "lg", children: (0, jsx_runtime_1.jsx)(Coin, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", children: record?.curve?.price }) })] }));
    }
    function renderCost(record) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "lg", children: (0, jsx_runtime_1.jsx)(Coin, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", children: record?.earningStats?.buyCost || 0 }) })] }));
    }
    function renderRate(record) {
        const rate = record?.earningStats?.earningRate ? Number(record?.earningStats?.earningRate) : 0;
        const isPositive = rate >= 0;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(caret_down_1.CaretDown, { size: "2xs", color: isPositive ? 'success' : 'critical', rotate: isPositive ? '180' : undefined }), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "lg", weight: "medium", color: isPositive ? 'success' : 'critical', children: `${record?.earningStats?.earningRate ? record?.earningStats?.earningRate : 0}%` }) })] }));
    }
    function renderExpandedRow(record) {
        const rate = record?.earningStats?.earningRate ? Number(record?.earningStats?.earningRate) : 0;
        const isPositive = rate >= 0;
        return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtlest", children: t('table.price') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "md", children: (0, jsx_runtime_1.jsx)(Coin, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", children: record?.curve?.price }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtlest", children: t('table.cost') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(icon_1.Icon, { size: "md", children: (0, jsx_runtime_1.jsx)(Coin, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", children: record?.earningStats?.buyCost || 0 }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtlest", children: t('table.total_p&l') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1", children: [(0, jsx_runtime_1.jsx)(caret_down_1.CaretDown, { size: "2xs", color: isPositive ? 'success' : 'critical', rotate: isPositive ? '180' : undefined }), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", weight: "medium", color: isPositive ? 'success' : 'critical', children: `${record?.earningStats?.earningRate ? record?.earningStats?.earningRate : 0}%` }) })] })] }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", color: "default", variant: "primary", isBlock: true, icon: ShareIcon, onClick: e => {
                        e.stopPropagation();
                        openShareModal?.(record);
                    }, children: t('table.share') })] }));
    }
    const handleRowClick = (record) => {
        openBotModal?.(record?.curve?.symbol ?? '');
    };
    const colunms = [
        {
            title: t('table.aipp_name'),
            key: 'AIPP NAME',
            render: renderBot,
            mobile: true
        },
        {
            title: t('table.price'),
            key: 'PRICE',
            render: renderPrice
        },
        {
            title: t('table.cost'),
            key: 'COST',
            render: renderCost
        },
        {
            title: t('table.total_p&l'),
            key: 'Total P&L',
            render: renderRate
        },
        {
            title: t('table.amount'),
            key: 'AMOUNT',
            render: renderAmount,
            mobile: true
        },
        {
            title: t('table.action'),
            key: 'ACTION',
            render: renderAction
        }
    ];
    const renderEmpty = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-agent-empty h-agent-empty flex flex-col items-center justify-center absolute border border-default rounded-xl", children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: flash_svg_1.default, width: 32, height: 32, alt: "empty" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-center text-xl", weight: "semibold", color: "default", children: t('my_portfolio_empty') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-center", size: "sm", color: "subtlest", children: t('my_portfolio_empty_tip') })] }));
    };
    const renderLogin = () => {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "w-agent-empty h-agent-empty flex flex-col items-center justify-center absolute border border-default rounded-xl gap-3", children: [(0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-lg", weight: "medium", children: tProfile('login_sign_up_desc') }), (0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => toggleLoginModal(true), children: tProfile('login_sign_up') })] }));
    };
    if (visitor !== user_1.VisitorEnum.NO) {
        return (0, jsx_runtime_1.jsx)("div", { className: "pt-2 px-4 md:px-6 pb-6 md:grow overflow-hidden", children: renderLogin() });
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "pt-0 px-4 md:px-6 pb-6 md:grow overflow-hidden", children: (0, jsx_runtime_1.jsx)(Table_1.default, { columns: colunms, dataSource: records, rowClickable: true, loading: loading, renderEmpty: renderEmpty, onRowClick: handleRowClick, defaultSort: apiTypes_1.OrderSort.ORDER_SORT_DESC, defaultField: apiTypes_1.OrderByFields.ORDER_BY_FIELDS_PRICE, isRowHighlight: record => record?.curve?.botSummary?.author?.id === user?.id, expandedRowRender: renderExpandedRow }) }));
}
