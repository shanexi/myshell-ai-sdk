import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import { useContext } from 'react';
import { MessageContext } from '../../../../../chat-new/context/MessageContext.js';
import { useDisplayContext } from '../../../../../chat-new/views/message-list/components/display-provider/index.js';
import { Alert, AlertDescription } from '../../../../../common/components/ui/alert.js';
import { Button } from '../../../../../common/components/ui/button.js';
import { Text } from '../../../../../common/components/ui/typography.js';
import { VisitorEnum } from '../../../../../common/constants/enums/user.js';
import { useUserStore } from '../../../../../services/store/index.js';
import useButtonActions from './useButtonActions.js';
export default function AlertMessage() {
    const { clearMemory, partialUpdateMessage } = useContext(MessageContext);
    const { message } = useDisplayContext();
    const isVisitor = useUserStore(state => state.isVisitor);
    const t = useTranslations('chat');
    const { onOpenLogin, onCreateRoom, onLoginAndCreateRoom, onMarked, onRemoveAndClearMemory } = useButtonActions(message, clearMemory, partialUpdateMessage);
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
                    children: isVisitor !== VisitorEnum.NO ? t('room.login_to_create') : t('room.create'),
                    color: 'brand',
                    onClick: isVisitor !== VisitorEnum.NO ? onLoginAndCreateRoom : onCreateRoom
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
    return (_jsx("div", { className: "w-full px-0 md:px-[38px]", children: message?.msgDisplayType === 'INFO' ? (_jsx(Text, { className: "block w-full text-center", color: "subtle", size: "sm", children: message?.text || alertData.text })) : (_jsxs(Alert, { variant: alertData?.variant, children: [_jsx(AlertDescription, { className: alertData?.textClassName, children: alertData?.text }), alertData?.buttons?.length ? (_jsx("div", { className: "w-full gap-x-2 md:w-auto flex justify-center", children: alertData.buttons.map((item, index) => (_jsx(Button, { className: "w-full px-4 flex-1 md:w-full", color: item.color, size: "md", variant: item.variant, onClick: item?.onClick, children: item?.children }, index))) })) : null] })) }));
}
