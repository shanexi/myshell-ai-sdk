"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NsfwSwitch;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const bot_1 = require("../../../../apis/bot.js");
const explore_1 = require("../../../../apis/explore.js");
const workshop_1 = require("../../../../apis/workshop.js");
const NsfwConfirmationModal_1 = __importDefault(require("../../../../common/components/NsfwConfirmationModal.js"));
const spinner_1 = __importDefault(require("../../../../common/components/ui/spinner.js"));
const switch_1 = require("../../../../common/components/ui/switch.js");
const useUserSettings_1 = __importDefault(require("../../../../common/hooks/useUserSettings.js"));
const store_1 = require("../../../../services/store/index.js");
const identityService_1 = require("../../../../common/services/identityService.js");
function NsfwSwitch({ clearListParam }) {
    const showNsfw = (0, store_1.useUserStore)(state => state.showNsfw);
    const nsfwConfirmed = (0, store_1.useUserStore)(state => state.nsfwConfirmed);
    const [confirmModalVisible, setConfirmModalVisible] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { handleShowNsfw } = (0, useUserSettings_1.default)();
    const setRecommend = (0, store_1.useBotStore)(state => state.setRecommend);
    const setTagFilters = (0, store_1.useBotStore)(state => state.setTagFilters);
    const setWorkshopRecommend = (0, store_1.useWorkshopStore)(state => state.setRecommend);
    const setTagWorkshopFilters = (0, store_1.useWorkshopStore)(state => state.setTagFilters);
    const refreshRecommend = async () => {
        const res = await (0, bot_1.getTagInfos)('BOT_TAG_TYPE_SEARCH', true);
        if (res.success) {
            setTagFilters(res.data);
        }
        const recRes = await (0, explore_1.getExploreRecommend)(true);
        if (recRes.success) {
            setRecommend(recRes.data);
        }
        const workshopRes = await (0, workshop_1.getWorkshopRecommend)();
        if (workshopRes.success) {
            setWorkshopRecommend(workshopRes.data);
        }
        const workshopFilterRes = await (0, workshop_1.getWidgetFilterTags)();
        if (workshopFilterRes.success) {
            setTagWorkshopFilters(workshopFilterRes.data);
        }
        sessionStorage.setItem('scrollPos:/robot-workshop', '0');
        sessionStorage.setItem('scrollPos:/explore', '0');
        identityService_1.identityService.setPageSearch('explore-page', null);
        identityService_1.identityService.setPageSearch('widgets-page', null);
    };
    const handleShowNsfwChange = (value) => {
        setLoading(true);
        handleShowNsfw(value, () => {
            setLoading(false);
            refreshRecommend();
            clearListParam?.();
        });
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [loading && (0, jsx_runtime_1.jsx)(spinner_1.default, { color: "brand", size: "xs" }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { checked: showNsfw === 1, onClick: () => {
                            const checked = showNsfw === 1;
                            if (!nsfwConfirmed && !checked) {
                                setConfirmModalVisible(true);
                            }
                            else {
                                handleShowNsfwChange(!checked);
                            }
                        } })] }), confirmModalVisible && ((0, jsx_runtime_1.jsx)(NsfwConfirmationModal_1.default, { isOpen: confirmModalVisible, onClose: () => {
                    setConfirmModalVisible(false);
                }, onConfirmed: () => {
                    setConfirmModalVisible(false);
                    handleShowNsfwChange(true);
                } }))] }));
}
