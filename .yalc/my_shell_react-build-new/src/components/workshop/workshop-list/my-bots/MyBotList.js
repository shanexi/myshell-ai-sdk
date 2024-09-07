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
exports.default = MyBotList;
const jsx_runtime_1 = require("react/jsx-runtime");
const PlusIcon_1 = __importDefault(require("@heroicons/react/24/outline/PlusIcon"));
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const clsx_1 = __importDefault(require("clsx"));
const next_intl_1 = require("next-intl");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const accordion_1 = require("../../../../common/components/ui/accordion.js");
const link_1 = __importDefault(require("../../../../common/components/ui/link.js"));
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const identityService_1 = require("../../../../common/services/identityService.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const MenuListSkeleton_1 = __importDefault(require("../../../../components/skeleton/common/MenuListSkeleton.js"));
const useCheckBeforeCreate_1 = __importDefault(require("../../../../hooks/workshop/useCheckBeforeCreate.js"));
const store_1 = require("../../../../services/store/index.js");
const ListItem_1 = __importDefault(require("./ListItem.js"));
const NoAccessToCreateNotificationModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../create/components/NoAccessToCreateNotificationModal.js'))), {
    ssr: false
});
function MyBotList({ selectedType, selectedId, filterValue = '', scrollRef }) {
    const sidebarMyBotList = (0, store_1.useWorkshopStore)(state => state.sidebarMyBotList);
    const draftBotIds = (0, store_1.useWorkshopStore)(state => state.draftBotIds);
    const workshopListInitialized = (0, store_1.useWorkshopStore)(state => state.workshopListInitialized);
    const setCurrentForm = (0, store_1.useWorkshopStore)(state => state.setCurrentForm);
    const setOriForm = (0, store_1.useWorkshopStore)(state => state.setOriForm);
    const t = (0, next_intl_1.useTranslations)('workshop');
    const chatT = (0, next_intl_1.useTranslations)('chat');
    const pathLocale = (0, usePathLocale_1.usePathLocale)();
    const isBotCreationPage = (0, react_1.useMemo)(() => {
        return pathLocale.pathname === '/robot-workshop/create';
    }, [pathLocale.pathname]);
    const [createDraft, setCreateDraft] = (0, react_1.useState)((0, common_helper_1.isClient)() ? identityService_1.identityService.getCreateDraft() : null);
    const { noAccessModalVisible, setFalse, checkBeforeCreate } = (0, useCheckBeforeCreate_1.default)();
    const deleteDraft = (e) => {
        e.preventDefault();
        identityService_1.identityService.setCreateDraft(null);
        setCreateDraft(null);
        setOriForm(null);
        setCurrentForm(null);
    };
    (0, react_1.useEffect)(() => {
        if ((0, common_helper_1.isClient)()) {
            setCreateDraft(identityService_1.identityService.getCreateDraft());
        }
    }, [pathLocale.pathname]);
    const myBotList = filterValue?.length > 0
        ? (sidebarMyBotList || []).filter((item) => {
            return item?.name.toLowerCase().includes(filterValue.toLowerCase());
        })
        : sidebarMyBotList || [];
    const myBotCount = createDraft ? (myBotList ?? []).length + 1 : (myBotList ?? []).length;
    return ((0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, { value: "my_bots", label: t('my_bots'), count: myBotCount, headerClassName: "md:py-1.5", triggerClassName: "bg-surface-default md:bg-surface-container-default px-2 md:px-3", sticky: true, children: [(0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [createDraft && ((0, jsx_runtime_1.jsx)(link_1.default, { href: "/robot-workshop/create", prefetch: true, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", className: (0, clsx_1.default)('relative w-full rounded-xl overflow-hidden p-3 flex items-center h-[72px]', isBotCreationPage ? 'bg-primary text-on-primary dark:text-on-surface' : 'bg-surface text-on-surface'), children: [!isBotCreationPage && ((0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { className: "absolute top-1 right-1 w-5 h-5 bg-surface cursor-pointer text-secondary", onClick: deleteDraft })), (0, jsx_runtime_1.jsx)("img", { src: createDraft?.logoUrl
                                        ? (0, common_helper_1.getAssetsUrlV2)(createDraft?.logoUrl)
                                        : 'https://image.myshell.ai/image/bot/logo/20240106/default.png', alt: "bot avatar", className: "object-cover w-12 h-12 rounded-full shrink-0" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col grow overflow-hidden ml-3 space-y-1 md:space-y-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [!isBotCreationPage && (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-[#EC2F0D] mr-1", children: chatT('draft') }), (0, jsx_runtime_1.jsx)("span", { className: "w-full line-clamp-1 text-left", children: createDraft?.name })] }), (0, jsx_runtime_1.jsx)("div", { className: (0, clsx_1.default)('w-full h-[20px] truncate text-left text-sm line-clamp-1', isBotCreationPage ? 'text-white' : 'text-secondary'), children: createDraft?.description })] })] }) })), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col space-y-2 pb-[6px]", children: !workshopListInitialized ? ((0, jsx_runtime_1.jsx)(MenuListSkeleton_1.default, { number: 3 })) : ((myBotList ?? []).map(bot => {
                            const hasDraft = draftBotIds.has(bot.id);
                            const link = hasDraft ? `/robot-workshop/bot/${bot.id}/setting` : `/robot-workshop/bot/${bot.id}/chat`;
                            return ((0, jsx_runtime_1.jsx)(link_1.default, { href: link, prefetch: true, children: (0, jsx_runtime_1.jsx)(ListItem_1.default, { selectedId: selectedId, selectedType: selectedType, botInfo: bot }) }, bot.id));
                        })) }), (0, jsx_runtime_1.jsxs)("button", { disabled: !workshopListInitialized, type: "button", className: (0, clsx_1.default)('text-primary bg-white dark:bg-outline border border-default shadow-button-basic w-full rounded-full flex justify-center items-center space-x-[6px] h-11 mb-[6px]', workshopListInitialized ? '' : 'text-disabled cursor-not-allowed'), onClick: checkBeforeCreate, children: [(0, jsx_runtime_1.jsx)(PlusIcon_1.default, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { children: t('create_a_robot') })] })] }), noAccessModalVisible && (0, jsx_runtime_1.jsx)(NoAccessToCreateNotificationModal, { isOpen: noAccessModalVisible, onClose: setFalse })] }));
}
