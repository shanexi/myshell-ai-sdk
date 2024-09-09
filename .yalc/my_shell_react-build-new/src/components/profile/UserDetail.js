"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserDetail;
const jsx_runtime_1 = require("react/jsx-runtime");
const InformationCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/InformationCircleIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/esm/XMarkIcon"));
const ArrowLeftIcon_1 = __importDefault(require("@heroicons/react/24/solid/esm/ArrowLeftIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const user_1 = require("../../apis/user");
const m_tooltip_1 = require("../../common/components/ui/mobile/m-tooltip");
const tooltip_1 = require("../../common/components/ui/tooltip");
const typography_1 = require("../../common/components/ui/typography");
const user_2 = require("../../common/constants/enums/user");
const usePathLocale_1 = require("../../common/hooks/usePathLocale");
const common_helper_1 = require("../../common/utils/common-helper");
const BotLogo_1 = require("../../components/workshop/bot-detail/BotLogo");
const UserGalleryList_1 = __importDefault(require("../../gallery/views/UserGalleryList"));
const FollowInfo_1 = __importDefault(require("./FollowInfo"));
const UserBotList_1 = __importDefault(require("./UserBotList"));
const UserDetailModal_1 = __importDefault(require("./UserDetailModal"));
const UserBg_1 = __importDefault(require("./edit-profile/component/UserBg"));
const UserFollowBtn_1 = require("./edit-profile/component/UserFollowBtn");
const UserLevel_1 = __importDefault(require("./edit-profile/component/UserLevel"));
const UserShareBtn_1 = require("./edit-profile/component/UserShareBtn");
const Description_1 = __importDefault(require("../chat/entity-detail/views/common/description/Description"));
const bot_widget_list_1 = __importDefault(require("../workshop/bot-detail/bot-widget-list"));
const gallery_1 = require("../../services/store/gallery");
const navigation_1 = require("next/navigation");
function UserDetail({ showInsideScroller = false, detailData, showTopActions = false, defaultTab = 'bots', onClose, followCallback }) {
    const searchParams = (0, navigation_1.useSearchParams)();
    const from = searchParams.get('from');
    const [fetchLoading, setFetchLoading] = (0, react_1.useState)(false);
    const [activeContent, setActiveContent] = (0, react_1.useState)(from === 'gallery' ? 'gallery' : defaultTab);
    const [showUserDetail, setShowUserDetail] = (0, react_1.useState)(null);
    const [widgets, setWidgets] = (0, react_1.useState)();
    const [bots, setBots] = (0, react_1.useState)();
    const t = (0, next_intl_1.useTranslations)();
    const botT = (0, next_intl_1.useTranslations)('bot');
    const workshopT = (0, next_intl_1.useTranslations)('workshop');
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const setGalleryUserList = (0, gallery_1.useGalleryStore)(state => state.setGalleryUserList);
    const queryData = (0, react_1.useCallback)(async () => {
        try {
            if (detailData?.id) {
                setFetchLoading(true);
                const [botList, widgetList] = await Promise.all([
                    (0, user_1.getBotsByUser)(detailData?.id),
                    (0, user_1.getWidgetsByUser)(detailData?.id)
                ]);
                setBots(botList.data);
                setWidgets(widgetList.data?.widgets);
                setFetchLoading(false);
            }
        }
        catch (error) {
            console.error(error);
            setFetchLoading(false);
        }
    }, [detailData?.id]);
    (0, react_1.useEffect)(() => {
        if (fetchLoading)
            return;
        queryData();
        return () => {
            setGalleryUserList([]);
        };
    }, [detailData?.id]);
    const containerRef = (0, react_1.useRef)(null);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: `UserDetail ${showInsideScroller ? 'overflow-hidden h-full md:overflow-auto' : 'h-full overflow-hidden'} flex w-full flex-col flex-nowrap bg-surface text-on-surface relative md:rounded-4xl`, children: [showTopActions && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: isMobile ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-[10px] md:top-5 flex z-10 space-x-3 left-5'), children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-full border border-[#E4E9F0] w-9 h-9 cursor-pointer shadow-button-basic flex justify-center items-center", onClick: onClose, children: (0, jsx_runtime_1.jsx)(ArrowLeftIcon_1.default, { className: "w-[22px] h-[22px] text-[#202223]" }) }) }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('absolute top-[10px] md:top-5 flex z-10 space-x-3 right-5'), children: (0, jsx_runtime_1.jsx)(UserShareBtn_1.UserShareBtn, { userName: detailData?.name, nameTag: detailData?.nameTag, userId: detailData?.id }) })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('absolute top-[10px] md:top-5 flex z-10 space-x-3', isMobile ? 'left-4' : 'right-5'), children: [(0, jsx_runtime_1.jsx)(UserShareBtn_1.UserShareBtn, { userName: detailData?.name, nameTag: detailData?.nameTag, userId: detailData?.id }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white rounded-full border border-[#E4E9F0] w-9 h-9 cursor-pointer shadow-button-basic flex justify-center items-center", onClick: onClose, children: (0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "w-[22px] h-[22px] text-[#202223]" }) })] })) })), (0, jsx_runtime_1.jsx)("div", { ref: containerRef, className: (0, clsx_1.default)('flex flex-col flex-grow items-center relative overflow-auto'), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full h-full pb-[8px] md:h-full md:pb-[12px]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full", children: [(0, jsx_runtime_1.jsx)(UserBg_1.default, { bgPhoto: (0, common_helper_1.getAssetsUrlV2)(detailData?.backgroundUrl), showUpload: false }), (0, jsx_runtime_1.jsxs)("div", { className: "relative flex space-x-3 md:space-x-5", children: [(0, jsx_runtime_1.jsx)(BotLogo_1.BotLogo, { logoUrl: (0, common_helper_1.getAssetsUrl)(detailData?.avatar) }), !isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "grow flex items-end justify-between pr-6 pb-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1.5 pr-1.5 pb-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)('text-2xl md:text-[28px] md:leading-[36px] font-semibold text-on-surface line-clamp-1 break-all'), children: detailData?.name }), (0, jsx_runtime_1.jsx)(UserLevel_1.default, { user: detailData })] }), (0, jsx_runtime_1.jsx)(FollowInfo_1.default, { user: detailData })] }), (detailData?.followStatus === user_2.FollowStatus.FOLLOWED ||
                                                            detailData?.followStatus === user_2.FollowStatus.NOT_FOLLOWED) && ((0, jsx_runtime_1.jsx)(UserFollowBtn_1.UserFollowBtn, { detailData: detailData, followCallback: followCallback }))] })), isMobile &&
                                                    (detailData?.followStatus === user_2.FollowStatus.FOLLOWED ||
                                                        detailData?.followStatus === user_2.FollowStatus.NOT_FOLLOWED) && ((0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 top-0 px-4 py-3", children: (0, jsx_runtime_1.jsx)(UserFollowBtn_1.UserFollowBtn, { detailData: detailData, size: "md", followCallback: followCallback, className: "min-w-[76px]" }) }))] })] }), isMobile && ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col px-4 mt-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-1.5 pr-1.5 pb-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, clsx_1.default)('text-2xl md:text-[28px] md:leading-[36px] font-semibold text-on-surface line-clamp-1 break-all'), children: detailData?.name }), (0, jsx_runtime_1.jsx)(UserLevel_1.default, { user: detailData })] }), (0, jsx_runtime_1.jsx)(FollowInfo_1.default, { user: detailData })] })), detailData?.description && ((0, jsx_runtime_1.jsx)("div", { className: "px-2 ml-6", children: (0, jsx_runtime_1.jsx)(Description_1.default, { desc: detailData?.description }) })), (0, jsx_runtime_1.jsxs)("div", { className: (0, clsx_1.default)('flex-1 pt-[6px] md:pb-5 flex flex-col space-y-4 mt-2 md:mt-5 ', activeContent === 'gallery' ? '' : 'md:px-6'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('sticky bg-surface top-0 z-[2] md:relative md:bg-inherit md:z-auto mx-4 md:mx-2', activeContent === 'gallery' ? 'md:px-6' : ''), children: (0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-center border-b border-default", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-6 items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('cursor-pointer relative z-[1] font-[500] text-sm md:text-base text-center', activeContent === 'bots'
                                                                        ? 'pb-[5px] border-b-[2px] border-primary text-primary'
                                                                        : 'pb-[7px] text-secondary'), onClick: () => setActiveContent('bots'), children: botT('robot') }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('cursor-pointer relative z-[1] font-[500] text-sm md:text-base text-center', activeContent === 'widgets'
                                                                        ? 'pb-[5px] border-b-[2px] border-primary text-primary'
                                                                        : 'pb-[7px] text-secondary'), onClick: () => setActiveContent('widgets'), children: workshopT('widget') }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('cursor-pointer relative z-[1] font-[500] text-sm md:text-base text-center', activeContent === 'gallery'
                                                                        ? 'pb-[5px] border-b-[2px] border-primary text-primary'
                                                                        : 'pb-[7px] text-secondary'), onClick: () => setActiveContent('gallery'), children: t('chat.gallery') })] }), detailData?.rugged &&
                                                            (isMobile ? ((0, jsx_runtime_1.jsxs)(m_tooltip_1.MTooltip, { children: [(0, jsx_runtime_1.jsx)(m_tooltip_1.MTooltipTrigger, { children: (0, jsx_runtime_1.jsxs)("div", { className: "h-[22px] px-4 flex items-center gap-1 bg-surface-accent-red-subtler rounded-full mb-[7px]", children: [(0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "w-3 h-3 text-critical" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xs", weight: "medium", color: "critical", children: botT('scam_alert') })] }) }), (0, jsx_runtime_1.jsx)(m_tooltip_1.MTooltipContent, { className: "z-[999] w-[280px]", align: "end", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xs font-medium", children: botT('scam_alert_tips') }) })] })) : ((0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: botT('scam_alert_tips'), align: "center", contentClassName: "w-[280px]", children: (0, jsx_runtime_1.jsxs)("div", { className: "h-[22px] px-3 py-2 flex items-center gap-1 bg-surface-accent-red-subtler rounded-full mb-[7px]", children: [(0, jsx_runtime_1.jsx)(InformationCircleIcon_1.default, { className: "w-3 h-3 text-critical" }), (0, jsx_runtime_1.jsx)(typography_1.Text, { className: "text-xs", weight: "medium", color: "critical", children: botT('scam_alert') })] }) })))] }) }) }), activeContent === 'bots' && ((0, jsx_runtime_1.jsx)("div", { className: "mx-4 md:mx-0", children: (0, jsx_runtime_1.jsx)(UserBotList_1.default, { bots: bots || [], onClose: onClose, loading: fetchLoading }) })), activeContent === 'widgets' && ((0, jsx_runtime_1.jsx)("div", { className: "mx-4 md:mx-0", children: (0, jsx_runtime_1.jsx)(bot_widget_list_1.default, { widgets: widgets ?? [], pinnedCallback: () => {
                                                    queryData();
                                                }, onClose: onClose, setShowUserDetail: setShowUserDetail }) })), activeContent === 'gallery' && (0, jsx_runtime_1.jsx)(UserGalleryList_1.default, { userId: detailData?.id, containerRef: containerRef })] })] }) })] }), !isMobile && !!showUserDetail?.name && ((0, jsx_runtime_1.jsx)(UserDetailModal_1.default, { isOpen: !!showUserDetail?.name, onClose: () => {
                    onClose && onClose();
                    setShowUserDetail(null);
                }, userName: showUserDetail.name, nameTag: showUserDetail.nameTag }))] }));
}
