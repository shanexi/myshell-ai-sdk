import { AgentChatInputHandlers } from '@myshell-run/agent-chat-input-plugins';
import { OWN_MESSAGE_TYPE } from '@myshell-run/agent-message-plugins';
import { AGENT_CHAT, ChatCommonModelFactory } from '@myshell-run/common-def';
import { ChatCommonModel, ChatInputDoc } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';

@injectable()
export class AgentChatModel implements AgentChatInputHandlers {
  constructor(
    @inject(ChatCommonModelFactory)
    public factory: (id: symbol) => ChatCommonModel,
  ) {
    makeObservable(this);
  }

  get chatCommon() {
    return this.factory(AGENT_CHAT);
  }

  get virtuosoRef() {
    return this.chatCommon.virtuosoRef;
  }

  async *sendChatInputDoc(chatInputDoc: ChatInputDoc) {
    yield;
  }

  *removeImagePreview(id: string) {
    this.chatCommon.uppyModel.removeFile(id);
    yield;
  }

  async *sendText(inputText: string) {
    const msgId = createId();
    const replyMsgId = createId();

    this.chatCommon.appendMsg({
      key: msgId,
      text: inputText,
      type: OWN_MESSAGE_TYPE,
    });

    yield;
  }
}
