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
exports.JsonEditor = JsonEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
const ExclamationTriangleIcon_1 = __importDefault(require("@heroicons/react/24/outline/ExclamationTriangleIcon"));
const json5_1 = __importDefault(require("json5"));
const lodash_es_1 = require("lodash-es");
const dynamic_1 = __importDefault(require("next/dynamic"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const bot_1 = require("../../../../../apis/bot.js");
const pro2nocode_1 = require("../../../../../common/components/nocode/utils/pro2nocode.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const dialog_1 = require("../../../../../common/components/ui/dialog.js");
const separator_1 = require("../../../../../common/components/ui/separator.js");
const tooltip_1 = require("../../../../../common/components/ui/tooltip.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const useNotification_1 = require("../../../../../common/hooks/useNotification.js");
const workshop_1 = require("../../../../../services/store/workshop.js");
const state_provider_1 = require("../state-provider/index.js");
const store_provider_1 = require("../store-provider/index.js");
const CodeEditor = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('../../../../../common/components/code-editor/index.js'))), {
    ssr: false
});
function JsonEditor() {
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const store = (0, store_provider_1.useStoreContext)();
    const { success, error } = (0, useNotification_1.useNotification)();
    const nocodeState = (0, state_provider_1.useStateContext)();
    const setNoCodeCheckPassed = (0, workshop_1.useWorkshopStore)(state => state.setNoCodeCheckPassed);
    const [codeChecking, setCodeChecking] = (0, react_1.useState)(false);
    const [canSave, setCanSave] = (0, react_1.useState)(false);
    const [value, setValue] = (0, react_1.useState)('');
    const [reconfirm, setReconfirm] = (0, react_1.useState)(false);
    const [foldField, setFoldField] = (0, react_1.useState)('');
    const [hasChanged, setHasChanged] = (0, react_1.useState)(false);
    const [errorPath, setErrorPath] = (0, react_1.useState)('');
    const [errorMsg, setErrorMsg] = (0, react_1.useState)({
        reason: '',
        msg: ''
    });
    const tree = (0, store_provider_1.useStore)(store, state => state.tree);
    const nodes = (0, store_provider_1.useStore)(store, state => state.nodes);
    const attrs = (0, store_provider_1.useStore)(store, state => state.attrs);
    const active = (0, store_provider_1.useStore)(store, state => state.active);
    const setActive = (0, store_provider_1.useStore)(store, state => state.setActive);
    const init = (0, store_provider_1.useStore)(store, state => state.init);
    const isOpen = (0, state_provider_1.useStore)(nocodeState, state => state.jsonMode);
    const setIsOpen = (0, state_provider_1.useStore)(nocodeState, state => state.setJsonMode);
    const setKey = (0, state_provider_1.useStore)(nocodeState, state => state.setKey);
    const initialValue = (0, react_1.useRef)();
    if (!(tree && nodes && attrs && active)) {
        return null;
    }
    const type = nodes?.[active || '']?.type;
    const automata = (0, store_provider_1.stringify)({ tree, nodes, attrs });
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            const newValue = (0, pro2nocode_1.nodecodeData2proconfigData)(automata, type, active);
            initialValue.current = newValue;
            setValue(JSON.stringify(newValue, null, 2));
            if (type === 'automata') {
                setFoldField('states');
            }
            else if (type === 'state') {
                setFoldField('tasks');
            }
        }
    }, [isOpen]);
    const validateValue = (0, react_1.useMemo)(() => {
        try {
            const newAttrs = json5_1.default.parse(value || '{}');
            const newAutomata = (0, pro2nocode_1.proconfigData2nodecodeData)({
                data: newAttrs,
                type,
                tree,
                nodes,
                attrs,
                active
            });
            return JSON.stringify(newAutomata);
        }
        catch {
            return '{}';
        }
    }, [value, type, tree, nodes, attrs, active]);
    const handleSave = (0, react_1.useCallback)(() => {
        try {
            const newAutomata = json5_1.default.parse(validateValue || '{}');
            init(newAutomata);
        }
        catch {
        }
        finally {
            setIsOpen(false);
            setCanSave(false);
            if (type !== 'automata') {
                setActive(active);
            }
            setKey();
        }
    }, [validateValue, active, type]);
    const handleChange = (data) => {
        if (canSave) {
            setCanSave(false);
        }
        setValue(data || '');
        try {
            if ((0, lodash_es_1.isEqual)(initialValue.current, json5_1.default.parse(data || '{}'))) {
                setHasChanged(false);
                setNoCodeCheckPassed(false);
            }
            else {
                setHasChanged(true);
            }
        }
        catch { }
    };
    const handleValidate = (0, react_1.useCallback)(async () => {
        try {
            setCodeChecking(true);
            const { success: apiSuccess, msg, metadata, reason } = await (0, bot_1.checkBotJointConfig)(validateValue);
            if (apiSuccess) {
                success({
                    content: i18n('automata.json_validate_success')
                });
                setCanSave(true);
                setErrorPath('');
                setErrorMsg({
                    msg: '',
                    reason: ''
                });
                setNoCodeCheckPassed(true);
            }
            else {
                error({
                    content: msg || ''
                });
                setErrorPath(metadata?.paths || '');
                setErrorMsg({
                    msg,
                    reason
                });
            }
        }
        catch (e) {
        }
        finally {
            setCodeChecking(false);
        }
    }, [automata, validateValue]);
    const handleClose = () => {
        if (hasChanged) {
            setReconfirm(true);
        }
        else {
            setIsOpen(false);
        }
    };
    const handleConfirmClose = () => {
        setReconfirm(false);
        setIsOpen(true);
    };
    const handleDiscard = () => {
        setReconfirm(false);
        setIsOpen(false);
        setCanSave(false);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(tooltip_1.Tooltip, { description: i18n('automata.json_mode_info'), children: (0, jsx_runtime_1.jsxs)(button_1.Button, { className: "flex justify-center items-center gap-1.5 text-brand font-medium", variant: "primary", color: "default", size: "sm", onClick: () => setIsOpen(true), children: [(0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 18 18", fill: "none", children: [(0, jsx_runtime_1.jsx)("path", { d: "M4.61253 5.2875C4.79893 5.03897 5.1515 4.9886 5.40003 5.175L7.65003 6.8625C7.79167 6.96873 7.87503 7.13545 7.87503 7.3125C7.87503 7.48955 7.79167 7.65627 7.65003 7.7625L5.40003 9.45C5.1515 9.6364 4.79893 9.58603 4.61253 9.3375C4.42613 9.08897 4.4765 8.7364 4.72503 8.55L6.37503 7.3125L4.72503 6.075C4.4765 5.8886 4.42613 5.53603 4.61253 5.2875Z", fill: "#3E5CFA" }), (0, jsx_runtime_1.jsx)("path", { d: "M7.87503 9C7.87503 8.68934 8.12687 8.4375 8.43753 8.4375H10.6875C10.9982 8.4375 11.25 8.68934 11.25 9C11.25 9.31066 10.9982 9.5625 10.6875 9.5625H8.43753C8.12687 9.5625 7.87503 9.31066 7.87503 9Z", fill: "#3E5CFA" }), (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.68753 4.5C1.68753 3.25736 2.69489 2.25 3.93753 2.25H14.0625C15.3052 2.25 16.3125 3.25736 16.3125 4.5V13.5C16.3125 14.7426 15.3052 15.75 14.0625 15.75H3.93753C2.69489 15.75 1.68753 14.7426 1.68753 13.5V4.5ZM3.93753 3.375C3.31621 3.375 2.81253 3.87868 2.81253 4.5V13.5C2.81253 14.1213 3.31621 14.625 3.93753 14.625H14.0625C14.6839 14.625 15.1875 14.1213 15.1875 13.5V4.5C15.1875 3.87868 14.6839 3.375 14.0625 3.375H3.93753Z", fill: "#3E5CFA" })] }), i18n('automata.json_mode')] }) }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: isOpen, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { className: "max-w-[736px] min-h-[568px]", onClose: handleClose, maskClosable: true, hideClose: true, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { className: "h-[60px] flex justify-center", children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h4", children: i18n('automata.json_mode') }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-auto space-x-3", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { loading: codeChecking, variant: "outline", size: "sm", onClick: handleValidate, children: i18n('automata.json_verification') }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", disabled: codeChecking || !canSave, onClick: handleSave, children: i18n('automata.json_save') })] })] }) }), (0, jsx_runtime_1.jsx)(separator_1.Separator, {}), (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, { children: (0, jsx_runtime_1.jsx)("div", { className: "w-full h-full", children: (0, jsx_runtime_1.jsx)(CodeEditor, { errorMsg: errorMsg, jsonPath: errorPath, disabled: codeChecking, foldField: foldField, value: value, onValueChange: handleChange, language: "json" }) }) })] }) }), (0, jsx_runtime_1.jsx)(dialog_1.Dialog, { open: reconfirm, children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, { maskClosable: false, className: "max-w-[380px] min-h-[210px]", onClose: handleConfirmClose, children: [(0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, { className: "p-5 pb-4 flex justify-center", children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, { className: "flex items-center", children: (0, jsx_runtime_1.jsx)("div", { className: "w-[40px] h-[40px] p-2 bg-orange-100 rounded-full", children: (0, jsx_runtime_1.jsx)(ExclamationTriangleIcon_1.default, { className: "w-[24px] h-[24px] text-warning" }) }) }) }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, { className: "flex flex-col gap-1.5 p-5 py-0", children: [(0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", children: i18n('automata.json_reconfirm_title') }), (0, jsx_runtime_1.jsx)(typography_1.Text, { size: "sm", style: { color: '#414345' }, children: i18n('automata.json_reconfirm_desc') })] }), (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, { className: "p-5 gap-x-4", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", variant: "outline", onClick: handleConfirmClose, children: i18n('state.cancel') }), (0, jsx_runtime_1.jsx)(button_1.Button, { color: "warning", className: "flex-1", onClick: handleDiscard, children: i18n('state.confirm') })] })] }) })] }));
}
