"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WidgetList;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const NormalCard_1 = __importDefault(require("../../../../common/components/NormalCard"));
const workshop_1 = require("../../../../common/constants/enums/workshop");
const utils_1 = require("../../../../lib/utils");
function WidgetList({ showSimplifyTags = false, widgets, pinnedCallback, onClose, setShowUserDetail }) {
    const workshopT = (0, next_intl_1.useTranslations)('workshop');
    const widgetList = widgets?.map(item => {
        return {
            title: item.name,
            description: item.description,
            logoUrl: item.logoUrl,
            id: item.id,
            clickUrl: `/robot-workshop/widget/${item.id}`,
            clickMobileUrl: `/robot-workshop/widget/${item.id}`,
            showVoice: item.chatCallerType === workshop_1.WidgetChatCallerTypeEnum.WIDGET_CHAT_CALLER_TYPE_VOICE,
            type: 'WIDGET',
            tags: item.tags
        };
    }) || [];
    return widgetList.length ? ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)('grid grid-cols-1 gap-x-4 gap-y-2', widgetList.length > 0 ? 'md:grid-cols-2' : ''), children: widgetList.map((widget, index) => {
            return (0, jsx_runtime_1.jsx)(NormalCard_1.default, { size: "sm", showTags: true, item: widget, isLine: true }, widget.id);
        }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "text-on-surface h-[120px] flex justify-center items-center", children: workshopT('no_widgets_available') }));
}
