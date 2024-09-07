"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SlippageModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const dialog_1 = require("../../../../../common/components/ui/dialog.js");
const utils_1 = require("../../../../../lib/utils.js");
const react_1 = require("react");
const ModalTitle_1 = __importDefault(require("../ModalTitle.js"));
const next_intl_1 = require("next-intl");
const input_1 = require("../../../../../common/components/ui/input.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const Tag_1 = __importDefault(require("./Tag.js"));
const button_1 = require("../../../../../common/components/ui/button.js");
function SlippageModal(props) {
    const { open, slippage = '', onOpenChange, onSave, onBack } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const [tempSlippage, setTempSlippage] = (0, react_1.useState)(slippage);
    const handleSlippageChange = (e) => {
        const value = e.target.value;
        if (!Number.isFinite(Number(value))) {
            return;
        }
        if (value.includes('.') && value.split('.')[1].length > 2) {
            return;
        }
        setTempSlippage(value);
    };
    const tags = ['Auto', '5%', '10%'];
    const onTagClick = (tag) => {
        const valueMap = {
            Auto: '0',
            '5%': '5',
            '10%': '10'
        };
        setTempSlippage(valueMap[tag]);
    };
    const isSelected = (0, react_1.useCallback)((tag) => {
        if (tempSlippage === '0' && tag === 'Auto') {
            return true;
        }
        return tag === `${tempSlippage}%`;
    }, [tempSlippage]);
    return ((0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: open, onOpenChange: onOpenChange, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { overlayClassName: "z-[9999]", overlayClose: false, className: (0, utils_1.cn)('text-on-surface z-[9999] w-[380px] py-4'), children: [(0, jsx_runtime_1.jsx)(ModalTitle_1.default, { content: t('slippage_modal_title'), showBack: true, onBack: onBack }), (0, jsx_runtime_1.jsxs)("div", { className: "relative px-4 mt-3", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { value: tempSlippage, onChange: handleSlippageChange }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", color: "subtlest", className: "absolute top-1/2 right-7 translate-y-[-50%]", children: "%" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-start w-full gap-1.5 mt-1.5 px-4", children: tags.map(tag => ((0, jsx_runtime_1.jsx)(Tag_1.default, { content: tag, onClick: () => onTagClick(tag), selected: isSelected(tag) }, tag))) }), (0, jsx_runtime_1.jsx)("div", { className: "px-4 pt-4 mt-3 border-t border-default", children: (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full", onClick: () => onSave(tempSlippage), children: t('save') }) })] }) }));
}
