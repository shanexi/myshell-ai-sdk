import { ChatCommonModel } from '@myshell-run/common-ui';
import { createId } from '@paralleldrive/cuid2';
import { inject, injectable } from 'inversify';
import { makeObservable } from 'mobx';
import {
  ChatInputTextareaPluginHandler,
  ChatInputUploadPluginHandler,
} from '@myshell-run/agent-chat-input-plugins';

@injectable()
export class AgentChatModel
  implements ChatInputTextareaPluginHandler, ChatInputUploadPluginHandler
{
  constructor(@inject(ChatCommonModel) public chatCommon: ChatCommonModel) {
    makeObservable(this);
  }

  get virtuosoRef() {
    return this.chatCommon.virtuosoRef;
  }

  *removeImagePreview(id: string) {
    this.chatCommon.removeFile(id);
    yield;
  }

  async *sendText(inputText: string) {
    const msgId = createId();
    const replyMsgId = createId();

    this.chatCommon.appendMsg({
      key: msgId,
      text: inputText,
      user: 'me',
    });

    yield;
  }
}
