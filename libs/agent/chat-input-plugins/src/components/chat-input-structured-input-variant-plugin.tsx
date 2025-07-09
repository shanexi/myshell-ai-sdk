import { cn } from '@myshell-run/common-ui';
import { observer } from 'mobx-react-lite';
import {
  AGENT_CHAT_INPUT_LANDING,
  useAgentChatInputModel,
} from '../chat-input-model-factory';
import { ChatInputStructuredInputWrapper } from './chat-input-structured-input-plugin';
import { ContextMenu } from './context-menu';

export const ChatInputStructuredInputVariantPlugin = observer(() => {
  const model = useAgentChatInputModel(AGENT_CHAT_INPUT_LANDING);
  return (
    <>
      <ChatInputStructuredInputWrapper
        edix={model.edix}
        onEnter={() => {
          model.sendChatInputDocVariant();
        }}
        className={cn(
          model.isForbidden && 'cursor-not-allowed text-Cr-text-subtlest-v2',
        )}
        placeholder={'Write something and let the magic happen...'}
      />
      {model.edix.isContextMenuShow && model.edix.contextMenuRect && (
        <ContextMenu comingSoon={false} messageId={AGENT_CHAT_INPUT_LANDING} />
      )}
    </>
  );
});

ChatInputStructuredInputVariantPlugin.displayName =
  'ChatInputStructuredInputVariantPlugin';
