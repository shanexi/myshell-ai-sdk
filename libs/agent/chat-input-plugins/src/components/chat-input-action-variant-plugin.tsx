import { observer } from 'mobx-react-lite';
import {
  AGENT_CHAT_INPUT_LANDING,
  useAgentChatInputModel,
} from '../chat-input-model-factory';
import {
  NotAllowedSendButton,
  SendButton,
  UploadPlus,
  Wrapper,
} from './chat-input-action-plugin';

/**
 * todo 暂时没想好这种 variant 怎么写
 * 先这样
 */
export const ChatInputActionVariantPlugin = observer(() => {
  const model = useAgentChatInputModel(AGENT_CHAT_INPUT_LANDING);
  return (
    <Wrapper>
      <UploadPlus uppy={model.uppy} />
      {model.loading ? (
        <div className="loader"></div>
      ) : model.canSend ? (
        <SendButton onClick={() => model.sendChatInputDocVariant()} />
      ) : (
        <NotAllowedSendButton />
      )}
    </Wrapper>
  );
});

ChatInputActionVariantPlugin.displayName = 'ChatInputActionVariantPlugin';
