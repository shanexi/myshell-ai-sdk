"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlertMessage;
const jsx_runtime_1 = require("react/jsx-runtime");
const next_intl_1 = require("next-intl");
const react_1 = require("react");
const MessageContext_1 = require("../../../../../chat-new/context/MessageContext.js");
const display_provider_1 = require("../../../../../chat-new/views/message-list/components/display-provider/index.js");
const alert_1 = require("../../../../../common/components/ui/alert.js");
const button_1 = require("../../../../../common/components/ui/button.js");
const typography_1 = require("../../../../../common/components/ui/typography.js");
const user_1 = require("../../../../../common/constants/enums/user.js");
const store_1 = require("../../../../../services/store/index.js");
const useButtonActions_1 = __importDefault(require("./useButtonActions.js"));
function AlertMessage() {
    const { clearMemory, partialUpdateMessage } = (0, react_1.useContext)(MessageContext_1.MessageContext);
    const { message } = (0, display_provider_1.useDisplayContext)();
    const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
    const t = (0, next_intl_1.useTranslations)('chat');
    const { onOpenLogin, onCreateRoom, onLoginAndCreateRoom, onMarked, onRemoveAndClearMemory } = (0, useButtonActions_1.default)(message, clearMemory, partialUpdateMessage);
    console.log('alert: ', message);
    const alertMap = {
        ROOM_CLOSED: {
            text: t('room.room_close'),
            variant: 'warning',
            textClassName: 'w-full text-center'
        },
        OTHER_SIDE_LEFT: {
            text: t('room.other_side_left', {
                user: message?.text
            }),
            buttons: [
                {
                    children: isVisitor !== user_1.VisitorEnum.NO ? t('room.login_to_create') : t('room.create'),
                    color: 'brand',
                    onClick: isVisitor !== user_1.VisitorEnum.NO ? onLoginAndCreateRoom : onCreateRoom
                }
            ],
            variant: 'info'
        },
        OTHER_SIDE_NO_ENOUGH_ENERGY: {
            text: t('room.other_side_no_enough_energy'),
            buttons: [
                {
                    children: t('login_register'),
                    color: 'warning',
                    onClick: onOpenLogin
                }
            ],
            variant: 'warning'
        },
        PROMPT_UPDATED: {
            text: t('prompt_updated_tip'),
            buttons: [
                {
                    children: t('clear'),
                    color: 'warning',
                    onClick: onMarked
                },
                {
                    children: t('ignore'),
                    color: 'warning',
                    variant: 'outline',
                    onClick: onRemoveAndClearMemory
                }
            ],
            variant: 'warning'
        },
        RESET: {
            text: t('memory_cleared_tip'),
            variant: 'info'
        }
    };
    const alertData = alertMap[message?.type];
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full px-0 md:px-[38px]", children: message?.msgDisplayType === 'INFO' ? ((0, jsx_runtime_1.jsx)(typography_1.Text, { className: "block w-full text-center", color: "subtle", size: "sm", children: message?.text || alertData.text })) : ((0, jsx_runtime_1.jsxs)(alert_1.Alert, { variant: alertData?.variant, children: [(0, jsx_runtime_1.jsx)(alert_1.AlertDescription, { className: alertData?.textClassName, children: alertData?.text }), alertData?.buttons?.length ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full gap-x-2 md:w-auto flex justify-center", children: alertData.buttons.map((item, index) => ((0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-full px-4 flex-1 md:w-full", color: item.color, size: "md", variant: item.variant, onClick: item?.onClick, children: item?.children }, index))) })) : null] })) }));
}
