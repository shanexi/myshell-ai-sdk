"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const StarIcon_1 = __importDefault(require("@heroicons/react/24/solid/StarIcon"));
const clsx_1 = __importDefault(require("clsx"));
const image_1 = __importDefault(require("next/image"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const avatar_1 = require("../../../../common/components/ui/avatar.js");
const link_1 = __importDefault(require("../../../../common/components/ui/link.js"));
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const WidgetDesc_1 = __importDefault(require("../../../../components/chat/entity-detail/views/widget/WidgetDesc.js"));
const utils_1 = require("../../../../lib/utils.js");
const store_1 = require("../../../../services/store/index.js");
function WidgetItem({ widgetInfo, selectedType, selectedId }) {
    const isSelected = (0, react_1.useMemo)(() => {
        return selectedType === 'widget' && selectedId === widgetInfo.id;
    }, [selectedId, selectedType, widgetInfo.id]);
    const router = (0, navigation_1.useRouter)();
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const clearWidgetDeleteChat = (0, store_1.useWorkshopStore)(state => state.clearWidgetDeleteChat);
    const setWidgetInputType = (0, store_1.useWorkshopStore)(state => state.setWidgetInputType);
    const clickHandle = () => {
        clearWidgetDeleteChat();
        setWidgetInputType('text');
    };
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/robot-workshop/widget/${widgetInfo.id}`, prefetch: true, onClick: clickHandle, children: (0, jsx_runtime_1.jsxs)("div", { id: `widget-${widgetInfo.id}`, className: (0, clsx_1.default)('w-full rounded-xl overflow-hidden p-3 flex space-x-2 cursor-pointer text-default', isSelected ? 'bg-surface-accent-blue-subtler' : 'bg-transparent hover:bg-surface-container-hovered'), onClick: () => {
                clickHandle();
            }, children: [(0, jsx_runtime_1.jsx)(avatar_1.Avatar, { size: isMobile ? '2xl' : 'xl', src: widgetInfo.logoUrl
                        ? (0, common_helper_1.getAssetsUrlV2)(widgetInfo.logoUrl)
                        : 'https://image.myshell.ai/image/bot/logo/20240106/default.png', alt: "widget avatar" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col justify-center grow overflow-hidden space-y-1.5 md:space-y-0.5", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('text-base text-default line-clamp-1'), children: widgetInfo.name }), (0, jsx_runtime_1.jsxs)("div", { className: "relative w-full overflow-hidden flex space-x-1 items-center", children: [!!widgetInfo.tags.slice(0, 1).length &&
                                    widgetInfo.tags.slice(0, 1).map(tag => {
                                        return ((0, jsx_runtime_1.jsx)("div", { className: "w-4 h-4 shrink-0", children: (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: (0, jsx_runtime_1.jsx)(WidgetDesc_1.default, {}), disabled: !tag.extra?.isShowHover, children: tag.iconUrl && ((0, jsx_runtime_1.jsx)(image_1.default, { src: tag.iconUrl, width: 16, height: 16, alt: "emoji img", className: "w-4 h-4 shrink-0" })) }) }, tag.id));
                                    }), widgetInfo.description && ((0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('truncate text-sm text-subtler', widgetInfo?.pinned && 'pr-4'), children: widgetInfo.description })), widgetInfo?.pinned && (0, jsx_runtime_1.jsx)(StarIcon_1.default, { className: "absolute right-0 top-0 w-4 h-4 text-[#FDA500]" })] })] })] }) }));
}
