"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffixButtons = SuffixButtons;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const alert_dialog_1 = require("../../../../../common/components/ui/alert-dialog.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const store_provider_1 = require("../store-provider/index.js");
function SuffixButtons(props) {
    const { value } = props;
    const store = (0, store_provider_1.useStoreContext)();
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const attrs = (0, store_provider_1.useStore)(store, state => state.attrs) || {};
    const remove = (0, store_provider_1.useStore)(store, state => state.remove) || {};
    const [openDialog, setOpenDialog] = (0, react_1.useState)(false);
    const attrsEntries = Object.entries(attrs);
    const path = attrsEntries?.find(([, item]) => item.name === value)?.[0];
    const topState = attrsEntries?.find(([, item]) => item.type === 'state')?.[0];
    const onDelete = () => {
        path && remove(path);
    };
    const onClose = () => {
        setOpenDialog(false);
    };
    if (path === topState) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(button_1.Button, { variant: "outline", type: "button", onClick: () => setOpenDialog(true), disabled: path === topState, children: i18n('state.delete') }), (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialog, { open: openDialog, children: (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogContent, { style: { width: '340px' }, children: [(0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogHeader, { children: (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogTitle, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "rounded-full p-2", style: { background: '#FFE9E8' }, children: (0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: [(0, jsx_runtime_1.jsx)("path", { d: "M9.23197 8.28056C9.62932 8.26528 9.96383 8.57501 9.97911 8.97236L10.3253 17.9724C10.3405 18.3697 10.0308 18.7042 9.63347 18.7195C9.23611 18.7348 8.90161 18.4251 8.88633 18.0277L8.54017 9.0277C8.52489 8.63035 8.83462 8.29584 9.23197 8.28056Z", fill: "#EC2F0D" }), (0, jsx_runtime_1.jsx)("path", { d: "M14.7681 8.28056C15.1654 8.29584 15.4752 8.63035 15.4599 9.0277L15.1137 18.0277C15.0984 18.4251 14.7639 18.7348 14.3666 18.7195C13.9692 18.7042 13.6595 18.3697 13.6748 17.9724L14.0209 8.97236C14.0362 8.57501 14.3707 8.26528 14.7681 8.28056Z", fill: "#EC2F0D" }), (0, jsx_runtime_1.jsx)("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M16.47 4.73239V4.47822C16.47 2.92915 15.2696 1.60765 13.6836 1.55692C13.1246 1.53904 12.5634 1.53003 12 1.53003C11.4367 1.53003 10.8755 1.53904 10.3164 1.55692C8.73048 1.60765 7.53003 2.92915 7.53003 4.47822V4.73239C6.56664 4.82004 5.61131 4.93574 4.66486 5.07867C4.31774 5.13109 3.97182 5.18718 3.62713 5.24689C3.23532 5.31476 2.97272 5.6874 3.04059 6.07921C3.10846 6.47102 3.48111 6.73363 3.87292 6.66576C3.95334 6.65182 4.03384 6.6381 4.1144 6.62457L5.12234 19.7278C5.24137 21.2752 6.53166 22.47 8.08359 22.47H15.9165C17.4684 22.47 18.7587 21.2752 18.8777 19.7278L19.8856 6.62457C19.9662 6.6381 20.0467 6.65182 20.1271 6.66576C20.5189 6.73363 20.8916 6.47102 20.9595 6.07921C21.0273 5.6874 20.7647 5.31476 20.3729 5.24689C20.0282 5.18718 19.6823 5.13109 19.3352 5.07867C18.3887 4.93574 17.4334 4.82004 16.47 4.73239ZM12 2.97003C11.4521 2.97003 10.9062 2.97879 10.3625 2.99618C9.59088 3.02087 8.97003 3.66856 8.97003 4.47822V4.62274C9.97222 4.56123 10.9825 4.53003 12 4.53003C13.0175 4.53003 14.0278 4.56123 15.03 4.62274V4.47822C15.03 3.66856 14.4092 3.02087 13.6376 2.99618C13.0939 2.97879 12.548 2.97003 12 2.97003ZM18.4581 6.40733C17.545 6.28264 16.6236 6.184 15.6946 6.11221C14.4755 6.01801 13.2435 5.97003 12 5.97003C10.7566 5.97003 9.5245 6.01801 8.3055 6.11221C7.37648 6.184 6.45504 6.28264 5.54194 6.40733L6.5581 19.6174C6.61942 20.4145 7.28411 21.03 8.08359 21.03H15.9165C16.7159 21.03 17.3806 20.4145 17.4419 19.6174L18.4581 6.40733Z", fill: "#EC2F0D" })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9 absolute right-5 top-3 flex cursor-pointer justify-center items-center focus-visible:outline-0 rounded-full hover:bg-surface-hovered", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "w-6 h-6 text-icon-subtle", onClick: onClose }) })] }), (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", className: "mt-3", children: i18n('state.deletion_confirmation') })] }) }), (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogDescription, { children: i18n('state.deletion_confirmation_descrition') }), (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogFooter, { children: [(0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogCancel, { className: "flex-1", onClick: onClose, children: i18n('state.cancel') }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "flex-1", color: "error", onClick: onDelete, children: i18n('state.confirm') })] })] }) })] }));
}
