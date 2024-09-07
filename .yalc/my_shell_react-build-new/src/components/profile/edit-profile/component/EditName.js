"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@chakra-ui/react");
const next_intl_1 = require("next-intl");
const store_1 = require("../../../../services/store/index.js");
function EditName(props) {
    const user = (0, store_1.useUserStore)(state => state.user);
    const { isNameAvailable, isChangingText, textName, handleChangInput } = props;
    const t = (0, next_intl_1.useTranslations)('profile');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex space-y-2", children: [(0, jsx_runtime_1.jsx)(react_1.Input, { h: "36px", borderRadius: "4px", border: "1px solid var(--border)", boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)", _hover: { border: '1px solid var(--outline-variant)' }, _focus: {
                    outline: 'var(--primary) solid 2px',
                    outlineOffset: '0px',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)'
                }, focusBorderColor: "var(--outline-variant)", placeholder: t('write_name_placeholder'), value: textName, onChange: (e) => handleChangInput(e.target.value), maxLength: 32, className: "w-full caret-primary mb-1 text-on-surface" }), user &&
                !isChangingText &&
                !isNameAvailable &&
                textName !== '' &&
                (textName !== user.name ? (0, jsx_runtime_1.jsx)("div", { className: "ml-2 text-red-500 text-xs", children: t('edit_tip_error') }) : null)] }));
}
exports.default = EditName;
