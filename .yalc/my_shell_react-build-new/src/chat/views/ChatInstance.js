"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatInstance;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_error_boundary_1 = require("react-error-boundary");
const react_use_1 = require("react-use");
const agentPump_1 = require("../../apis/agentPump.js");
const StaticContext_1 = require("../../chat-new/context/StaticContext.js");
const definitions_1 = require("../../chat-new/model/definitions.js");
const ChatEntityDetailLayout_1 = __importDefault(require("../../chat/layouts/ChatEntityDetailLayout.js"));
const ChatBody_1 = __importDefault(require("../../chat/views/chat-body/ChatBody.js"));
const user_1 = require("../../common/constants/enums/user.js");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const BotDetail_1 = __importDefault(require("../../components/chat/entity-detail/views/bot/views/BotDetail.js"));
const BotMoreActions_1 = __importDefault(require("../../components/chat/entity-detail/views/bot/views/bot-more-actions/BotMoreActions.js"));
const ShowDetailBtn_1 = __importDefault(require("../../components/chat/entity-detail/views/common/ShowDetailBtn.js"));
const ShareBtn_1 = __importDefault(require("../../components/chat/entity-detail/views/common/share/views/ShareBtn.js"));
const launch_trade_1 = __importDefault(require("../../components/rewards-center/curve-detail/components/launch-trade/index.js"));
const RoomManagement_1 = __importDefault(require("../../components/room-management/RoomManagement.js"));
const TopActions_1 = __importDefault(require("../../components/room-management/views/top-actions/TopActions.js"));
const useCalcGetChatListFn_1 = __importDefault(require("../../entity/hooks/useCalcGetChatListFn.js"));
const sensors_1 = require("../../lib/sensors/index.js");
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const entity_1 = require("../../services/store/entity.js");
const ChatStaticContext_1 = __importDefault(require("../ChatStaticContext.js"));
const Fallback_1 = __importDefault(require("./Fallback.js"));
const opaqueBg = 'linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), ';
function ChatInstance({ id, botInfo, className }) {
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const [imageLoaded, setImageLoaded] = (0, react_1.useState)(false);
    const handleImageLoad = () => {
        setImageLoaded(true);
    };
    const inputType = (0, store_1.useChatStore)(state => state.inputType);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const partialUpdateDetail = (0, entity_1.useEntityStore)(state => state.partialUpdateDetail);
    const sensors = (0, sensors_1.useSensors)();
    const [curve, setCurve] = (0, react_1.useState)();
    const [getCurveLoading, setGetCurveLoading] = (0, react_1.useState)(false);
    const logErrorToService = (0, react_1.useCallback)((error, info) => {
        console.error(error, info);
    }, []);
    const getChatList = (0, useCalcGetChatListFn_1.default)('bot');
    const partialUpdate = (0, react_1.useCallback)((partialDetail) => {
        partialUpdateDetail('bot', id, partialDetail);
    }, [id, partialUpdateDetail]);
    const getCurve = async (botId) => {
        try {
            setGetCurveLoading(true);
            const curveResponse = await (0, agentPump_1.get_curve)({ botId });
            if (curveResponse.success) {
                setCurve(curveResponse.data);
            }
            else {
                throw new Error();
            }
        }
        catch (e) {
            throw new Error();
        }
        finally {
            setGetCurveLoading(false);
        }
    };
    const bgUrl = botInfo?.backgroundImageUrl;
    const isShareOrDelete = inputType === 'share' || inputType === 'delete';
    const bgStyle = {
        backgroundImage: `${isShareOrDelete ? opaqueBg : ''} url('${bgUrl}')`
    };
    const imgLoaded = !!bgUrl && imageLoaded;
    const showMoreActions = !botInfo?.isOfficial && isVisitor === user_1.VisitorEnum.NO;
    const shareTracker = () => {
        sensors?.track('ShareItem', {
            item_type: 'bot',
            item_id: botInfo?.id,
            item_name: botInfo?.name
        });
    };
    (0, react_use_1.useEffectOnce)(() => {
        getCurve(id);
    });
    const chatStaticContextParams = (0, react_1.useMemo)(() => ({
        entityType: 'bot',
        id,
        name: botInfo?.name,
        logoUrl: botInfo?.logoUrl
    }), [botInfo?.logoUrl, botInfo?.name, id]);
    const staticContextParams = (0, react_1.useMemo)(() => ({
        type: 'bot',
        entityInfo: {
            id,
            name: botInfo?.name,
            pinned: botInfo?.pinned
        },
        chatSettingDisabled: false,
        menuFunctions: [{ menuFunction: definitions_1.MenuFunctionEnum.REMOVE_FROM_LIST }],
        getList: getChatList,
        partialUpdateDetail: partialUpdate
    }), [botInfo?.name, botInfo?.pinned, getChatList, id, partialUpdate]);
    return ((0, jsx_runtime_1.jsxs)(react_error_boundary_1.ErrorBoundary, { FallbackComponent: Fallback_1.default, onError: logErrorToService, children: [(0, jsx_runtime_1.jsx)("div", { id: "chat-instance-client", className: (0, utils_1.cn)('relative w-full h-full flex flex-col flex-nowrap overflow-hidden bg-surface-default md:rounded-3xl', className), children: (0, jsx_runtime_1.jsx)(ChatStaticContext_1.default.Provider, { value: chatStaticContextParams, children: (0, jsx_runtime_1.jsx)(ChatEntityDetailLayout_1.default, { chat: botInfo?.isChannelEntry ? ((0, jsx_runtime_1.jsx)(StaticContext_1.StaticContext.Provider, { value: staticContextParams, children: (0, jsx_runtime_1.jsx)(RoomManagement_1.default, { topActionsSlot: (0, jsx_runtime_1.jsx)(TopActions_1.default, {}) }) })) : ((0, jsx_runtime_1.jsx)(ChatBody_1.default, { imgLoaded: imgLoaded, bodyBgStyle: bgUrl && imageLoaded ? bgStyle : undefined, botInfo: botInfo, id: id })), entityDetail: (0, jsx_runtime_1.jsx)(BotDetail_1.default, { type: "bot", id: id, author: botInfo?.author, logoUrl: botInfo?.logoUrl, name: botInfo?.name, curve: curve, tags: botInfo?.tagList, isOfficial: botInfo?.isOfficial, description: botInfo?.description, photos: botInfo?.photos, widgets: botInfo?.widgets, tgName: botInfo?.tgName, model: botInfo?.llmModel?.model, githubUrl: botInfo?.imComponent?.githubUrl, buttonSlot: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!isMobile ? (0, jsx_runtime_1.jsx)(launch_trade_1.default, { curve: curve, botInfo: botInfo }) : null, (0, jsx_runtime_1.jsx)(ShowDetailBtn_1.default, {}), (0, jsx_runtime_1.jsx)(ShareBtn_1.default, { type: "bot", id: id, trackerFn: shareTracker }), showMoreActions && (0, jsx_runtime_1.jsx)(BotMoreActions_1.default, { id: id })] }), tradeSlot: isMobile ? (0, jsx_runtime_1.jsx)(launch_trade_1.default, { isBlock: true, curve: curve, botInfo: botInfo }) : null }) }) }) }), bgUrl && ((0, jsx_runtime_1.jsx)("img", { src: bgUrl, width: 1, height: 1, className: "hidden", alt: "Large Image", fetchPriority: "high", onLoad: handleImageLoad }))] }));
}
