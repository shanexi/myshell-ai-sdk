"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const next_intl_1 = require("next-intl");
const button_1 = require("../../../../../common/components/ui/button.js");
const store_provider_1 = require("../store-provider/index.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const icon_button_1 = require("../../../../../common/components/ui/icon-button.js");
const arrow_left_1 = require("../../../../../common/components/ui/icons/outline/arrow-left.js");
const Header = ({ loading, onSave, onClose, onChange }) => {
    const i18n = (0, next_intl_1.useTranslations)('nocode');
    const store = (0, store_provider_1.useStoreContext)();
    const tree = (0, store_provider_1.useStore)(store, state => state.tree);
    const nodes = (0, store_provider_1.useStore)(store, state => state.nodes);
    const attrs = (0, store_provider_1.useStore)(store, state => state.attrs);
    const handleSave = () => {
        if (tree && nodes && attrs && onSave) {
            const automata = (0, store_provider_1.stringify)({ tree, nodes, attrs });
            if (automata) {
                onSave(automata);
            }
        }
    };
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };
    (0, react_1.useEffect)(() => {
        const unsubscribe = store.subscribe(({ tree, nodes, attrs }) => {
            if (tree && nodes && attrs && onChange) {
                const automata = (0, store_provider_1.stringify)({ tree, nodes, attrs });
                if (automata) {
                    onChange(automata);
                }
            }
        });
        return () => unsubscribe();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center py-3 px-2 border-default border-b space-x-1", children: [(0, jsx_runtime_1.jsx)(icon_button_1.IconButton, { onClick: handleClose, variant: "ghost", size: "md", children: (0, jsx_runtime_1.jsx)(arrow_left_1.ArrowLeft, { color: "brand" }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(typography_1.Heading, { size: "h2", color: "default", children: "NoCode" }) }), (0, jsx_runtime_1.jsx)(button_1.Button, { size: "sm", onClick: handleSave, loading: loading, children: i18n('widget.validate') })] }));
};
exports.Header = Header;
Header.displayName = 'Header';
