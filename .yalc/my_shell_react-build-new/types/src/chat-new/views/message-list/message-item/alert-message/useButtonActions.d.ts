import { DisplayMessage } from '../../../../../chat-new/model/definitions';
import { PartialMessageDetail } from '../../../../../chat-new/services/useNewChatStore';
import { ButtonProps } from '../../../../../common/components/ui/button';
export interface IAlertInfoMap {
    [type: string]: {
        text: string;
        textClassName?: string;
        buttons?: ButtonProps[];
        variant: 'warning' | 'error' | 'info';
    };
}
export default function useButtonActions(message: DisplayMessage, clearMemory?: () => Promise<void>, partialUpdateMessage?: (messageId: string, partialDetail: PartialMessageDetail) => void): {
    onOpenLogin: () => void;
    onCreateRoom: () => void;
    onLoginAndCreateRoom: () => void;
    onMarked: () => Promise<void>;
    onRemoveAndClearMemory: () => Promise<void>;
};
ndClearMemory: () => Promise<void>;
};
