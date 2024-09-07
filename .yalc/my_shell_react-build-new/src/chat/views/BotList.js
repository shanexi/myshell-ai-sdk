"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const MenuListSkeleton_1 = __importDefault(require("../../components/skeleton/common/MenuListSkeleton.js"));
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const BotListCard_1 = __importDefault(require("./BotListCard.js"));
function BotList({ loading }) {
    const updatingBotList = (0, store_1.useBotStore)(state => state.updatingBotList);
    const botList = (0, store_1.useBotStore)(state => state.botList);
    const botLastMessageMap = (0, store_1.useBotStore)(state => state.botLastMessageMap);
    const params = (0, navigation_1.useParams)();
    const botId = params?.botId;
    const renderBotList = (0, react_1.useMemo)(() => {
        return botList.map(bot => {
            return {
                ...bot,
                lastMessage: botLastMessageMap.get(String(bot.id))
            };
        });
    }, [botList, botLastMessageMap]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: updatingBotList || (loading && renderBotList.length === 0) ? ((0, jsx_runtime_1.jsx)(MenuListSkeleton_1.default, {})) : ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('BotList m-0 p-0'), id: "botlist", children: renderBotList.map((bot, index) => ((0, jsx_runtime_1.jsx)(BotListCard_1.default, { bot: bot, listIndex: index, selectedBotId: botId }, bot.id))) })) }));
}
exports.default = (0, react_1.memo)(BotList);
