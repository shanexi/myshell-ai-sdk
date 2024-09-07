"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useGetListWidgets_1 = __importDefault(require("../../hooks/workshop/useGetListWidgets.js"));
const useGetWorkshopBots_1 = __importDefault(require("../../hooks/workshop/useGetWorkshopBots.js"));
const store_1 = require("../../services/store/index.js");
const user_1 = require("../../common/constants/enums/user.js");
const lodash_es_1 = require("lodash-es");
function MobileWorkshopLayout({ children }) {
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
    return (0, jsx_runtime_1.jsx)("div", { className: "flex-1 h-full flex flex-row flex-nowrap justify-start overflow-hidden", children: children });
}
exports.default = MobileWorkshopLayout;
