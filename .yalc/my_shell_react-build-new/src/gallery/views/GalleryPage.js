"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalleryPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const react_error_boundary_1 = require("react-error-boundary");
const react_use_1 = require("react-use");
const Fallback_1 = __importDefault(require("../../chat/views/Fallback.js"));
const MobileTopActions_1 = __importDefault(require("../../chat/views/chat-body/top-actions/MobileTopActions.js"));
const TopActions_1 = __importDefault(require("../../chat/views/chat-body/top-actions/TopActions.js"));
const useUserSettings_1 = __importDefault(require("../../common/hooks/useUserSettings.js"));
const sensors_1 = require("../../lib/sensors/index.js");
const utils_1 = require("../../lib/utils.js");
const store_1 = require("../../services/store/index.js");
const gallery_1 = require("../../services/store/gallery.js");
const GalleryList_1 = __importDefault(require("./GalleryList.js"));
const GalleryPageSkeleton_1 = __importDefault(require("./skeleton/GalleryPageSkeleton.js"));
const api_1 = require("../modal/api.js");
function GalleryPage({ botId, botInfo, className }) {
    const t = (0, next_intl_1.useTranslations)();
    const user = (0, store_1.useUserStore)(state => state.user);
    const isMobile = (0, react_use_1.useMedia)('(max-width: 768px)');
    const setGalleryList = (0, gallery_1.useGalleryStore)(state => state.setGalleryList);
    const flagUserFirstVisitGallery = (0, store_1.useUserStore)(state => state.flagUserFirstVisitGallery);
    const { handleUpdateFirstVisitGallery } = (0, useUserSettings_1.default)();
    const logErrorToService = (0, react_1.useCallback)((error, info) => {
        console.error(error, info);
    }, []);
    const setGalleryVisitTimeHandle = async () => {
        await (0, api_1.setGalleryVisitTime)(botId);
    };
    const sensors = (0, sensors_1.useSensors)();
    (0, react_1.useEffect)(() => {
        setGalleryVisitTimeHandle();
        return () => {
            setGalleryList([]);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (!botInfo)
            return;
        sensors.track('GalleryEntranceClick', {
            bot_id: botId,
            bot_name: botInfo?.name
        });
    }, [botInfo]);
    (0, react_1.useEffect)(() => {
        flagUserFirstVisitGallery !== '1' && handleUpdateFirstVisitGallery();
    }, [flagUserFirstVisitGallery]);
    return ((0, jsx_runtime_1.jsx)(react_error_boundary_1.ErrorBoundary, { FallbackComponent: GalleryPageSkeleton_1.default, onError: logErrorToService, children: (0, jsx_runtime_1.jsx)("div", { id: "gallery-client", className: (0, utils_1.cn)('w-full h-screen md:h-full flex flex-col flex-nowrap overflow-hidden bg-surface-default md:rounded-3xl bg-cover bg-no-repeat bg-center bg-origin-border', className), children: botInfo ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "w-full flex-shrink-0", children: isMobile ? ((0, jsx_runtime_1.jsx)(MobileTopActions_1.default, { botId: botId, botInfo: botInfo })) : ((0, jsx_runtime_1.jsx)(TopActions_1.default, { botId: botId, botInfo: botInfo })) }), (0, jsx_runtime_1.jsx)("div", { className: "pl-0 md:pl-1 h-full", children: (0, jsx_runtime_1.jsx)(GalleryList_1.default, { botId: botId, className: (0, utils_1.cn)('flex-1') }) })] })) : ((0, jsx_runtime_1.jsx)(Fallback_1.default, {})) }) }));
}
