"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NsfwSwitcher;
const jsx_runtime_1 = require("react/jsx-runtime");
const QuestionMarkCircleIcon_1 = __importDefault(require("@heroicons/react/24/outline/QuestionMarkCircleIcon"));
const next_intl_1 = require("next-intl");
const tooltip_1 = require("../../../../common/components/ui/tooltip.js");
const apis_1 = require("../../../../forum/models/apis.js");
const store_1 = require("../../../../services/store/index.js");
const NsfwSwitch_1 = __importDefault(require("./NsfwSwitch.js"));
function NsfwSwitcher() {
    const t = (0, next_intl_1.useTranslations)();
    const setWidgetDataPush = (0, store_1.useWorkshopStore)(state => state.setWidgetDataPush);
    const setWidgetSearchList = (0, store_1.useWorkshopStore)(state => state.setWidgetSearchList);
    const setSearchList = (0, store_1.useForumStore)(state => state.setSearchList);
    const setTagFilters = (0, store_1.useForumStore)(state => state.setTagFilters);
    const setPostDetail = (0, store_1.useForumStore)(state => state.setPostDetail);
    const setLanguageList = (0, store_1.useWorkshopStore)(state => state.setLanguageList);
    const clearListParam = () => {
        setWidgetDataPush(false);
        setWidgetSearchList([]);
        setLanguageList([]);
        setSearchList([]);
        setTagFilters({ tagList: [], sortList: [] });
        setPostDetail({});
        apis_1.postDetailCacheMap$.clear();
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full md:w-[450px] h-11 flex items-center justify-between px-3 rounded-xl border border-default shadow-background-default bg-surface-search-field", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-default", children: "NSFW" }), (0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { contentClassName: "w-[360px]", description: t('workshop.nsfw_hover_tip'), children: (0, jsx_runtime_1.jsx)(QuestionMarkCircleIcon_1.default, { className: "size-[18px] cursor-pointer text-subtle" }) })] }), (0, jsx_runtime_1.jsx)(NsfwSwitch_1.default, { clearListParam: clearListParam })] }));
}
