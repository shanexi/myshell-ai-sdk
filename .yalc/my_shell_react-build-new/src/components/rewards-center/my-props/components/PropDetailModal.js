"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PropDetailModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const react_1 = require("react");
const dayjs_1 = __importDefault(require("dayjs"));
const outline_1 = require("@heroicons/react/24/outline");
const task_1 = require("../../../../common/constants/enums/task.js");
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const reward_center_1 = require("../../../../common/utils/reward-center/index.js");
const useUseProp_1 = __importDefault(require("../../../../hooks/rewards-center/useUseProp.js"));
const store_1 = require("../../../../services/store/index.js");
const media_1 = require("../../components/media/index.js");
const modal_1 = require("../../../../common/components/ui/modal.js");
const typography_1 = require("../../../../common/components/ui/typography.js");
const icon_button_1 = require("../../../../common/components/ui/icon-button.js");
const input_1 = require("../../../../common/components/ui/input.js");
const button_1 = require("../../../../common/components/ui/button.js");
function PropDetailModal({ isOpen, onClose, propInfo, onSuccess }) {
    const user = (0, store_1.useUserStore)(state => state.user);
    const [count, setCount] = (0, react_1.useState)(1);
    const maxAvailable = (0, react_1.useMemo)(() => {
        return propInfo.count;
    }, [propInfo]);
    const commonT = (0, next_intl_1.useTranslations)('common');
    const rT = (0, next_intl_1.useTranslations)('reward_center');
    const t = (0, next_intl_1.useTranslations)('reward_center.reward_redemption_content.rewards');
    const expired = propInfo.endDate ? (0, dayjs_1.default)(propInfo.endDate).isBefore((0, dayjs_1.default)()) : false;
    const { acting, handleUseProp } = (0, useUseProp_1.default)();
    const usePropHandler = (0, react_1.useCallback)(() => {
        handleUseProp(propInfo.id, propInfo, count, () => {
            onSuccess(count);
        });
    }, [count, handleUseProp, onSuccess, propInfo]);
    const useDisabled = !(propInfo.status === task_1.PropStatusEnum.BACKPACK_ITEM_STATUS_UNSPECIFIED &&
        !expired &&
        !(propInfo.propType === task_1.PropTypeEnum.standardBattlePass &&
            user &&
            (user.isGenesisPasscard || user.isPasscard))) || count <= 0;
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { open: isOpen, onClose: () => {
            onClose();
        }, hideClose: true, modalOnly: false, children: (0, jsx_runtime_1.jsx)(modal_1.ModalBody, { className: "p-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex justify-center items-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full aspect-[4/3] md:w-[400px] md:aspect-square shrink-0 overflow-hidden", children: [(0, jsx_runtime_1.jsx)(media_1.Media, { src: propInfo.media }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-4 top-4 md:hidden", children: (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { icon: XMarkIcon_1.default, size: "md", variant: "primary", color: "gray", onClick: () => onClose && onClose() }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex p-4 w-full flex-col justify-between overflow-hidden space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col w-full overflow-hidden space-y-3", children: [(0, jsx_runtime_1.jsx)(typography_1.Display, { size: "md", children: propInfo.name }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtler", weight: "regular", children: (propInfo.propType === task_1.PropTypeEnum.standardBattlePass && propInfo.subType.includes('m')) ||
                                            (propInfo.propType === task_1.PropTypeEnum.energyPack && propInfo.subType.includes('bonus'))
                                            ? t(`${(0, common_helper_1.camelToSnake)(propInfo.subType)}.usage_tip`, {
                                                endDate: (0, dayjs_1.default)(propInfo.endDate).format('YYYY-MM-DD')
                                            })
                                            : t(`${(0, common_helper_1.camelToSnake)(propInfo.propType)}.usage_tip`, {
                                                season: (0, reward_center_1.getValueFromSubType)(propInfo.subType),
                                                energy: (0, reward_center_1.getValueFromSubType)(propInfo.subType)
                                            }) }), (0, jsx_runtime_1.jsxs)(typography_1.Text, { size: "sm", color: "brand", weight: "regular", children: [rT('available'), " ", maxAvailable] })] }), propInfo.status !== task_1.PropStatusEnum.BACKPACK_ITEM_STATUS_DISABLED && ((0, jsx_runtime_1.jsxs)("div", { className: "w-full flex flex-col space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", color: "default", variant: "primary", icon: outline_1.MinusIcon, disabled: propInfo.status !== task_1.PropStatusEnum.BACKPACK_ITEM_STATUS_UNSPECIFIED || count <= 0, onClick: () => setCount(count - 1) }), (0, jsx_runtime_1.jsx)(input_1.Input, { size: "xs", rounded: "full", value: count, className: "text-center", disabled: propInfo.status !== task_1.PropStatusEnum.BACKPACK_ITEM_STATUS_UNSPECIFIED, onChange: (e) => {
                                                    const val = Number(e.target.value);
                                                    if (val < 0 || isNaN(val)) {
                                                        setCount(0);
                                                        return;
                                                    }
                                                    if (val > maxAvailable) {
                                                        setCount(maxAvailable);
                                                        return;
                                                    }
                                                    setCount(val);
                                                } }), (0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { size: "md", color: "default", variant: "primary", icon: outline_1.PlusIcon, disabled: propInfo.status !== task_1.PropStatusEnum.BACKPACK_ITEM_STATUS_UNSPECIFIED || count === maxAvailable, onClick: () => setCount(count + 1) }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "md", variant: "primary", color: "default", disabled: propInfo.status !== task_1.PropStatusEnum.BACKPACK_ITEM_STATUS_UNSPECIFIED || count === maxAvailable, onClick: () => {
                                                    setCount(maxAvailable);
                                                }, children: commonT('max') })] }), (0, jsx_runtime_1.jsx)("div", { className: "block md:hidden border-t border-default -mx-4" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-1", children: (0, jsx_runtime_1.jsx)(button_1.Button, { variant: "primary", color: useDisabled ? 'gray' : 'brand', disabled: useDisabled, className: "w-full", loading: acting, onClick: usePropHandler, children: commonT('use') }) })] }))] })] }) }) }));
}
