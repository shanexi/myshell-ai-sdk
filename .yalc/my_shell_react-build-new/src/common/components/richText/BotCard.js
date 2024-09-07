"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_use_1 = require("react-use");
const rxjs_1 = require("rxjs");
const bot_1 = require("../../../apis/bot.js");
const BotCommonItem_1 = __importDefault(require("../../../common/components/BotCommonItem.js"));
const usePathLocale_1 = require("../../../common/hooks/usePathLocale.js");
const UserDetailModal_1 = __importDefault(require("../../../components/profile/UserDetailModal.js"));
const BotCard = ({ bots: outBots, botIds, clickCallback, itemClickCallback }) => {
    const router = (0, navigation_1.useRouter)();
    const isMobile = (0, usePathLocale_1.useIsMobile)();
    const [showUserDetail, setShowUserDetail] = (0, react_1.useState)(null);
    const botsReq = (0, react_use_1.useAsync)(async () => {
        if (!outBots?.length && botIds?.length) {
            const botDetail = await (0, rxjs_1.lastValueFrom)((0, bot_1.getBotInfo)(botIds));
            return botIds.map(id => botDetail?.bots?.[id]?.summary);
        }
    }, [botIds]);
    const bots = (outBots?.length ? outBots : botsReq.value) ?? [];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-col justify-center items-center py-3 space-y-[10px] rounded-[12px] text-left", children: (0, jsx_runtime_1.jsx)("ul", { className: "w-full space-y-2.5", children: bots.map((item, index) => {
                        if (!item)
                            return;
                        return ((0, jsx_runtime_1.jsx)(BotCommonItem_1.default, { isMobile: isMobile, showChat: true, item: item, isLine: index < bots.length - 1, loading: botsReq.loading, singleList: true, showAuthor: true, setShowUserDetail: user => {
                                if (isMobile) {
                                    const userUrl = `${window.location.origin}/explore/profile/${`${user?.name}`}/${user?.nameTag}`;
                                    router.push(userUrl);
                                }
                                else {
                                    setShowUserDetail(user);
                                }
                            } }, `botcard-${item?.id}-${index}`));
                    }) }) }), !!showUserDetail?.name && !isMobile && ((0, jsx_runtime_1.jsx)(UserDetailModal_1.default, { isOpen: !!showUserDetail?.name, onClose: () => {
                    setShowUserDetail(null);
                }, userName: showUserDetail.name, nameTag: showUserDetail.nameTag }))] }));
};
exports.BotCard = BotCard;
