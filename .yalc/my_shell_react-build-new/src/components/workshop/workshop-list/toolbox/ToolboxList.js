"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToolboxList;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const accordion_1 = require("../../../../common/components/ui/accordion.js");
const link_1 = __importDefault(require("../../../../common/components/ui/link.js"));
const MenuListSkeleton_1 = __importDefault(require("../../../../components/skeleton/common/MenuListSkeleton.js"));
const store_1 = require("../../../../services/store/index.js");
const ListItem_1 = __importDefault(require("./ListItem.js"));
function ToolboxList({ selectedType, selectedId, scrollRef, filterValue }) {
    const t = (0, next_intl_1.useTranslations)('workshop');
    const sidebarToolboxList = (0, store_1.useWorkshopStore)(state => state.sidebarToolboxList);
    const workshopListInitialized = (0, store_1.useWorkshopStore)(state => state.workshopListInitialized);
    const myBotList = filterValue
        ? (sidebarToolboxList || []).filter((item) => {
            return item?.name.toLowerCase().includes(filterValue.toLowerCase());
        })
        : sidebarToolboxList || [];
    const toolboxCount = (myBotList ?? []).length;
    return ((0, jsx_runtime_1.jsx)(accordion_1.AccordionItem, { value: "toolbox", label: t('toolbox'), count: toolboxCount, headerClassName: "md:py-1.5", triggerClassName: "bg-surface-default md:bg-surface-container-default px-2 md:px-3", sticky: true, children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-2 py-[6px]", children: !workshopListInitialized ? ((0, jsx_runtime_1.jsx)(MenuListSkeleton_1.default, { number: 3 })) : (myBotList?.map(bot => ((0, jsx_runtime_1.jsx)(link_1.default, { href: `/robot-workshop/toolbox/${bot.id}/chat`, prefetch: true, children: (0, jsx_runtime_1.jsx)(ListItem_1.default, { selectedId: selectedId, selectedType: selectedType, botInfo: bot }) }, bot.id)))) }) }));
}
