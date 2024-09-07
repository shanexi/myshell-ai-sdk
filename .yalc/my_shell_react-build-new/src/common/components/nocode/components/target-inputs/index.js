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
exports.TargetInputs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lodash_1 = require("lodash");
const next_intl_1 = require("next-intl");
const React = __importStar(require("react"));
const react_1 = require("react");
const react_hook_form_1 = require("react-hook-form");
const react_hot_toast_1 = require("react-hot-toast");
const views_1 = __importDefault(require("../../../../../common/components/file-uploader/views/index.js"));
const form_engine_1 = require("../../../../../common/components/form-engine/index.js");
const provider_1 = require("../../../../../common/components/form-engine/components/provider/index.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const dialog_1 = require("../../../../../common/components/ui/dialog.js");
const config_1 = require("../../../../../common/components/ui/icons/outline/config.js");
const separator_1 = require("../../../../../common/components/ui/separator.js");
const tooltip_1 = require("../../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const getData_1 = require("../../utils/getData.js");
const getSchemaByInputs_1 = require("../../utils/getSchemaByInputs.js");
const exp_input_1 = require("../exp-input/index.js");
const store_provider_1 = require("../store-provider/index.js");
const TargetInputs = (props) => {
    const { name } = props;
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const { getValues, setValue } = (0, react_hook_form_1.useFormContext)();
    const { fields } = (0, provider_1.useFormEngineContext)();
    const { parent } = fields[name] || {};
    const parentData = getValues(parent);
    const store = (0, store_provider_1.useStoreContext)();
    const tree = (0, store_provider_1.useStore)(store, state => state.tree);
    const attrs = (0, store_provider_1.useStore)(store, state => state.attrs);
    const nodes = (0, store_provider_1.useStore)(store, state => state.nodes);
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [formData, setFormData] = (0, react_1.useState)({});
    if (!(attrs && nodes && tree)) {
        return null;
    }
    let inputs = (0, getData_1.getDataByNodeName)(parentData.target, { tree, attrs, nodes })?.inputs;
    inputs = (0, lodash_1.pickBy)(inputs, item => item.type !== 'IM');
    const schema = (0, react_1.useMemo)(() => {
        return (0, getSchemaByInputs_1.getSchemaByInputs)(inputs, name);
    }, [inputs, name]);
    const onEditModeChange = React.useCallback(() => {
        if (!parentData.target) {
            react_hot_toast_1.toast.error(`Please select state.`);
        }
        else {
            setFormData((0, lodash_1.set)({}, name, parentData?.target_inputs));
            setIsOpen(true);
        }
    }, [inputs, parentData.target]);
    const onClose = () => {
        setIsOpen(false);
    };
    const onConfirm = () => {
        setValue(name, (0, lodash_1.get)(formData, name));
        setIsOpen(false);
    };
    const onFormChange = (values) => {
        setFormData(values);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: "Target Input", children: (0, jsx_runtime_1.jsx)(config_1.Config, { onClick: onEditModeChange, className: "w-6 h-6 flex items-center justify-center cursor-pointer" }) }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-[620px] min-h-[304px] max-h-[508px]", onClose: onClose, maskClosable: false, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { className: "min-h-[68px] flex justify-center", children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { children: (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: "Target Input" }) }) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { className: "px-3 pt-1 pb-3 grid gap-y-1.5 min-h-[160px] max-h-[364px] overflow-y-auto", children: (0, lodash_1.isEmpty)(inputs) ? ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-center text-base", style: { color: '#8C9196' }, children: "No Input" })) : ((0, jsx_runtime_1.jsx)(form_engine_1.MemoizedFormEngine, { mode: "onChange", values: formData, schema: schema, components: {
                                    FileUpload: views_1.default,
                                    ExpInput: exp_input_1.ExpInput
                                }, onChange: onFormChange }, parentData.target)) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, { className: "gap-x-4 min-h-[76px]", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "min-w-[92px] px-[24px]", variant: "outline", onClick: onClose, children: i18n('state.cancel') }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "min-w-[92px] px-[24px]", onClick: onConfirm, disabled: (0, lodash_1.isEmpty)(inputs), children: i18n('state.confirm') })] })] }) })] }));
};
exports.TargetInputs = TargetInputs;
