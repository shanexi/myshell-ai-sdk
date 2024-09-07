"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const XMarkIcon_1 = __importDefault(require("@heroicons/react/24/outline/XMarkIcon"));
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const usehooks_ts_1 = require("usehooks-ts");
const LUIFormModal_1 = __importDefault(require("../../../../common/components/lui/button/LUIFormModal.js"));
const user_1 = require("../../../../common/constants/enums/user.js");
const useLUIClick_1 = __importDefault(require("../../../../common/hooks/useLUIClick.js"));
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const store_1 = require("../../../../services/store/index.js");
const useFlagStore_1 = require("../../../../services/store/useFlagStore.js");
const popover_1 = require("../../ui/popover.js");
const luiContext_1 = require("../luiContext.js");
const ButtonNeedDoubleConfirmation_1 = __importDefault(require("./ButtonNeedDoubleConfirmation.js"));
const Display_1 = __importDefault(require("./Display.js"));
function Button({ buttonProps, index, rowIndex, latest, disabled }) {
    const { buttonId, actions, doubleCheck } = buttonProps;
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const { value: formModalVisible, setTrue, setValue } = (0, usehooks_ts_1.useBoolean)(false);
    const [params, setParams] = (0, react_1.useState)();
    const [formAction, setFormAction] = (0, react_1.useState)();
    const toggleLoginModal = (0, store_1.useGlobalStore)(state => state.toggleLoginModal);
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const luiButtonGuideClicked = (0, useFlagStore_1.useFlagStore)(state => state.luiButtonGuideClicked);
    const setLuiButtonGuideClicked = (0, useFlagStore_1.useFlagStore)(state => state.setLuiButtonGuideClicked);
    const visitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const [clickLoading, setClickLoading] = (0, react_1.useState)(false);
    const energy = (0, store_1.useUserStore)(state => state.energy);
    const chatLocale = (0, next_intl_1.useTranslations)('chat');
    const containerEle = document.getElementById('message_box');
    const boundaryEle = document.getElementById('containerRef');
    const { clickFn, msgId, selectedBot, widgetInfo } = (0, react_1.useContext)(luiContext_1.LUIButtonInteractionContext);
    const handleOpenFormModal = (action) => {
        setFormAction(action);
        setParams(action.componentInput);
        setTrue();
    };
    const { loading, handleClick, handleFormSubmit, formInteracting, formSubmitError, setFormSubmitError } = (0, useLUIClick_1.default)(actions, buttonId, msgId, clickFn, handleOpenFormModal, selectedBot, widgetInfo, buttonProps.content);
    const formSubmitionHandler = (0, react_1.useCallback)((params) => {
        handleFormSubmit(formAction, params);
    }, [formAction, handleFormSubmit]);
    const onClickWithAuth = async () => {
        setClickLoading(true);
        if (visitor === user_1.VisitorEnum.NO) {
            await handleClick();
        }
        else {
            toggleLoginModal(true);
        }
        setClickLoading(false);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(popover_1.Popover, { variant: "message", content: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 relative", children: [(0, jsx_runtime_1.jsx)(XMarkIcon_1.default, { onClick: () => setLuiButtonGuideClicked(true), className: "absolute top-0 right-0 size-[18px] text-[var(--white-70)] cursor-pointer" }), (0, jsx_runtime_1.jsx)("p", { className: "text-base", children: chatLocale('guidance.title') }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm", children: chatLocale('guidance.content') })] }), open: !luiButtonGuideClicked, showArrow: true, side: "bottom", align: "start", className: "mx-0 w-[320px]", container: containerEle, collisionBoundary: [boundaryEle], disabled: !(!luiButtonGuideClicked && latest && index === 0 && rowIndex === 0 && isVisitor === user_1.VisitorEnum.NO), children: doubleCheck.isNeedDoubleCheck ? ((0, jsx_runtime_1.jsx)(ButtonNeedDoubleConfirmation_1.default, { onConfirm: onClickWithAuth, title: doubleCheck.title, description: doubleCheck.description, clicked: () => setLuiButtonGuideClicked(true), children: (0, jsx_runtime_1.jsx)(Display_1.default, { content: buttonProps.content, style: buttonProps.style, disabled: disabled || buttonProps.disabled, loading: loading || clickLoading, energy: energy }) })) : ((0, jsx_runtime_1.jsx)(Display_1.default, { content: buttonProps.content, style: buttonProps.style, disabled: disabled || buttonProps.disabled, onClick: () => {
                        setLuiButtonGuideClicked(true);
                        onClickWithAuth();
                    }, loading: loading || clickLoading, energy: energy })) }), formModalVisible && params && ((0, jsx_runtime_1.jsx)(LUIFormModal_1.default, { isOpen: formModalVisible, setOpen: setValue, params: params, isMobile: isMobile, onSubmit: formSubmitionHandler, loading: formInteracting, formSubmitError: formSubmitError, setFormSubmitError: setFormSubmitError }))] }));
}
exports.default = Button;
