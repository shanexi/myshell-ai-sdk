"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_use_1 = require("react-use");
const workshop_1 = require("../../../apis/workshop.js");
const useGoToChat_1 = require("../../../common/hooks/useGoToChat.js");
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const UserDetailModal_1 = __importDefault(require("../../../components/profile/UserDetailModal.js"));
const BotCommonItem_1 = __importDefault(require("../BotCommonItem.js"));
const WidgetCard = ({ widgets: outWidgets, widgetIds, clickCallback, itemClickCallback }) => {
    const router = (0, navigation_1.useRouter)();
    const t = (0, next_intl_1.useTranslations)();
    const goToChat = (0, useGoToChat_1.useGoToChat)({ clickCallback, recommendationSpot: 'article_content' });
    const isMobile = (0, usePathLocale_1.useIsMobile)();
    const [showDetail, setShowDetail] = (0, react_1.useState)(null);
    const [showUserDetail, setShowUserDetail] = (0, react_1.useState)(null);
    const [widgetList, setWidgetList] = (0, react_1.useState)([]);
    const widgetsReq = (0, react_use_1.useAsync)(async () => {
        if (!outWidgets?.length && widgetIds?.length) {
            const res = await (0, workshop_1.getWidgetsInfo)(widgetIds);
            if (res.success) {
                const widgetList = res.data;
                setWidgetList((outWidgets?.length ? outWidgets : widgetList) ?? []);
            }
            return [];
        }
    }, [widgetIds]);
    const pinnedCallbackHandle = (id, isPinned) => {
        const curWidgetList = [...widgetList];
        curWidgetList?.forEach(item => {
            if (item.id === id) {
                item.pinned = isPinned;
            }
        });
        setWidgetList(curWidgetList);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col justify-center items-center py-3 space-y-[10px] rounded-[12px] text-left", children: (0, jsx_runtime_1.jsx)("ul", { className: "w-full space-y-2.5", children: widgetList.map((item, index) => {
                        if (!item)
                            return;
                        return ((0, jsx_runtime_1.jsx)(BotCommonItem_1.default, { isMobile: isMobile, showChat: true, item: item, isLine: index < widgetList.length - 1, loading: widgetsReq.loading, singleList: true, showAuthor: true, setShowUserDetail: user => {
                                if (isMobile) {
                                    const userUrl = `${window.location.origin}/explore/profile/${`${user?.name}`}/${user?.nameTag}`;
                                    router.push(userUrl);
                                }
                                else {
                                    setShowUserDetail(user);
                                }
                            }, chatType: "WIDGET" }, `WidgetCard-${item?.id}-${index}`));
                    }) }) }), !!showUserDetail?.name && !isMobile && ((0, jsx_runtime_1.jsx)(UserDetailModal_1.default, { isOpen: !!showUserDetail?.name, onClose: () => {
                    setShowUserDetail(null);
                }, userName: showUserDetail.name, nameTag: showUserDetail.nameTag }))] }));
};
exports.WidgetCard = WidgetCard;
