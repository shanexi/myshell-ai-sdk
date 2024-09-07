"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatWidgetList;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const accordion_1 = require("../../../../common/components/ui/accordion.js");
const MenuListSkeleton_1 = __importDefault(require("../../../../components/skeleton/common/MenuListSkeleton.js"));
const store_1 = require("../../../../services/store/index.js");
const WidgetItem_1 = __importDefault(require("./WidgetItem.js"));
const NoWidgetPlaceholder = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('./NoWidgetPlaceholder.js'))));
function ChatWidgetList({ selectedType, selectedId, filterValue = '', scrollRef }) {
    const sidebarWidgetList = (0, store_1.useWorkshopStore)(state => state.sidebarWidgetList);
    const workshopListInitialized = (0, store_1.useWorkshopStore)(state => state.workshopListInitialized);
    const myWidgetList = filterValue?.length > 0
        ? (sidebarWidgetList || []).filter((item) => {
            return item?.name.toLowerCase().includes(filterValue.toLowerCase());
        })
        : sidebarWidgetList || [];
    const t = (0, next_intl_1.useTranslations)('workshop');
    return ((0, jsx_runtime_1.jsx)(accordion_1.AccordionItem, { value: "widget", label: t('widget'), count: (myWidgetList ?? []).length, headerClassName: "md:py-1.5", triggerClassName: "bg-surface-default md:bg-surface-container-default px-2 md:px-3", sticky: true, children: (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-2 pb-[6px]", children: !workshopListInitialized ? ((0, jsx_runtime_1.jsx)(MenuListSkeleton_1.default, { number: 3 })) : ((0, jsx_runtime_1.jsx)("div", { children: myWidgetList?.length ? (myWidgetList.map(widget => ((0, jsx_runtime_1.jsx)(WidgetItem_1.default, { widgetInfo: widget, selectedId: selectedId, selectedType: selectedType }, widget.id)))) : ((0, jsx_runtime_1.jsx)(NoWidgetPlaceholder, {})) })) }) }));
}
