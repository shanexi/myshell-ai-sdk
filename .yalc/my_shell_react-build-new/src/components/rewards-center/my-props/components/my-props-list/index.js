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
exports.default = MyPropsList;
const jsx_runtime_1 = require("react/jsx-runtime");
const dayjs_1 = __importDefault(require("dayjs"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const task_1 = require("../../../../../common/constants/enums/task.js");
const useGetProps_1 = __importDefault(require("../../../../../hooks/rewards-center/useGetProps.js"));
const useGetEnergyInfo_1 = __importDefault(require("../../../../../hooks/user/useGetEnergyInfo.js"));
const useUpdateUserProfile_1 = __importDefault(require("../../../../../hooks/user/useUpdateUserProfile.js"));
const media_1 = require("../../../components/media/index.js");
const not_found_1 = require("../not-found/index.js");
const SuccessTipModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../SuccessTipModal.js'))), { ssr: false });
const PropDetailModal = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../PropDetailModal.js'))), { ssr: false });
function MyPropsList() {
    const [rewardDetailModalVisible, setRewardDetailModalVisible] = (0, react_1.useState)(false);
    const [successModalVisible, setSuccessModalVisible] = (0, react_1.useState)(false);
    const [selectedReward, setSelectedReward] = (0, react_1.useState)();
    const [usedCount, setUsedCount] = (0, react_1.useState)();
    const commonT = (0, next_intl_1.useTranslations)('common');
    const { myProps } = (0, useGetProps_1.default)();
    const { getEnergyInfo } = (0, useGetEnergyInfo_1.default)();
    const { queryUserProfile } = (0, useUpdateUserProfile_1.default)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [!myProps.length ? ((0, jsx_runtime_1.jsx)(not_found_1.NotFound, {})) : ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4", children: myProps.map(r => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col border border-default shadow-background-default bg-surface-default cursor-pointer relative h-fit rounded-xl overflow-hidden transition-transform duration-300 delay-0\tease-in hover:border-hovered hover:-translate-y-1", onClick: () => {
                        setSelectedReward(r);
                        setRewardDetailModalVisible(true);
                    }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "aspect-square w-full relative", children: [(0, jsx_runtime_1.jsx)(media_1.Media, { src: r.media }), r.endDate && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute top-3 right-3 rounded-full bg-[#FFF1D9] text-[#FAAC00] py-1 px-3", children: [commonT('valid_until'), (0, dayjs_1.default)(r.endDate).format('YYYY/MM/DD')] })), (0, jsx_runtime_1.jsx)("div", { className: "absolute bottom-3 right-3 rounded-md border border-[rgba(0,0,0,0.08)] px-1.5 py-0.5 bg-[rgba(255,255,255,.4)]", children: (0, jsx_runtime_1.jsxs)(typography_1.Text, { weight: "medium", size: "sm", color: "static-black", children: ["x", r.count] }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col p-4 space-y-3", children: (0, jsx_runtime_1.jsx)(typography_1.Text, { weight: "medium", size: "lg", children: r.name }) })] }, r.id))) })), rewardDetailModalVisible && ((0, jsx_runtime_1.jsx)(PropDetailModal, { isOpen: rewardDetailModalVisible, onClose: () => {
                    setRewardDetailModalVisible(false);
                }, propInfo: selectedReward, onSuccess: (count) => {
                    setRewardDetailModalVisible(false);
                    setSuccessModalVisible(true);
                    setUsedCount(count);
                    selectedReward?.propType === task_1.PropTypeEnum.energyPack && getEnergyInfo();
                    if (selectedReward?.propType === task_1.PropTypeEnum.standardBattlePass) {
                        queryUserProfile();
                        getEnergyInfo();
                    }
                } })), successModalVisible && ((0, jsx_runtime_1.jsx)(SuccessTipModal, { isOpen: successModalVisible, onClose: () => {
                    setSuccessModalVisible(false);
                    setUsedCount(undefined);
                }, rewardInfo: selectedReward, count: usedCount }))] }));
}
