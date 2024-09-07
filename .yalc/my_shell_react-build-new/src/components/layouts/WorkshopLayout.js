"use strict";
'use client';
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
const jsx_runtime_1 = require("react/jsx-runtime");
const dynamic_1 = __importDefault(require("next/dynamic"));
const react_1 = require("react");
const MenuContainerSkeleton_1 = __importDefault(require("../../components/skeleton/common/MenuContainerSkeleton.js"));
const useGetListWidgets_1 = __importDefault(require("../../hooks/workshop/useGetListWidgets.js"));
const useGetWorkshopBots_1 = __importDefault(require("../../hooks/workshop/useGetWorkshopBots.js"));
const store_1 = require("../../services/store/index.js");
const user_1 = require("../../common/constants/enums/user.js");
const lodash_es_1 = require("lodash-es");
const WorkshopList = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../components/workshop/workshop-list/index.js'))), {
    ssr: false,
    loading: () => (0, jsx_runtime_1.jsx)(MenuContainerSkeleton_1.default, { number: 3, listNumber: 3 })
});
const LoginBtn = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../common/components/auth/login-modal/LoginBtn.js'))), {
    ssr: false
});
function WorkshopLayout({ children }) {
    const sidebarWidgetList = (0, store_1.useWorkshopStore)(state => state.sidebarWidgetList);
    const sidebarMyBotList = (0, store_1.useWorkshopStore)(state => state.sidebarMyBotList);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const { getListWidgets } = (0, useGetListWidgets_1.default)();
    const { getMyBotList } = (0, useGetWorkshopBots_1.default)();
    (0, react_1.useEffect)(() => {
        if (isVisitor !== user_1.VisitorEnum.INIT) {
            if ((0, lodash_es_1.isEmpty)(sidebarWidgetList)) {
                getListWidgets();
            }
            if ((0, lodash_es_1.isEmpty)(sidebarMyBotList)) {
                getMyBotList();
            }
        }
    }, [isVisitor]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex-1 h-full flex flex-row flex-nowrap justify-start overflow-hidden", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-[280px] lg:w-[320px] large:w-[360px] h-full flex-shrink-0 flex-col relative overflow-hidden", children: [(0, jsx_runtime_1.jsx)(WorkshopList, {}), (0, jsx_runtime_1.jsx)(LoginBtn, {})] }), (0, jsx_runtime_1.jsx)("div", { className: "m-2 flex-1 bg-surface-default md:rounded-4xl overflow-hidden", children: children })] }));
}
exports.default = (0, react_1.memo)(WorkshopLayout);
