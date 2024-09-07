"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LaunchModal;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const modal_1 = require("../../../../../common/components/ui/modal.js");
const utils_1 = require("../../../../../lib/utils.js");
const Actions_1 = __importDefault(require("./Actions.js"));
const BadgeName_1 = __importDefault(require("./BadgeName.js"));
const ModalTitle_1 = __importDefault(require("../ModalTitle.js"));
function LaunchModal(props) {
    const { open, ticker = '', onTickerChange, onOpenChange, onConfirm, loading } = props;
    const t = (0, next_intl_1.useTranslations)('reward_center.aipp');
    const [helpText, setHelpText] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (ticker.length > 9) {
            setHelpText(t('ticker_naming_tip'));
        }
        else {
            setHelpText('');
        }
    }, [ticker]);
    return ((0, jsx_runtime_1.jsx)(modal_1.Modal, { size: "sm", open: open, onOpenChange: onOpenChange, hideClose: loading, overlayClose: false, modalOnly: false, children: (0, jsx_runtime_1.jsxs)(modal_1.ModalBody, { className: (0, utils_1.cn)('text-on-surface py-4'), children: [(0, jsx_runtime_1.jsx)(ModalTitle_1.default, { content: t('launch_modal_title'), subtitle: t('launch_modal_desc') }), (0, jsx_runtime_1.jsx)(BadgeName_1.default, { ticker: ticker, onTickerChange: onTickerChange, helpText: helpText, loading: loading }), (0, jsx_runtime_1.jsx)(Actions_1.default, { disabled: !ticker || ticker.length > 9, onCancel: () => onOpenChange(false), onConfirm: onConfirm, loading: loading })] }) }));
}
