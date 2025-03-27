import { inject, injectable } from 'inversify';
import { action, computed, makeObservable, observable } from 'mobx';
import { AuthModel } from './auth.model';
import { MyAppTrpcClient } from '@myshell-run/def';
import { type CreateTRPCProxyClient } from '@trpc/client';
import { type AppRouter } from '@myshell-run/simple-services';

@injectable()
export class ChatModel {
  @observable inputText = '';
  @observable isInputFocus = false;
  @computed get isNotInputFocus() {
    return !this.isInputFocus;
  }
  @computed get notHaveInputText() {
    return this.inputText.length < 1;
  }
  constructor(
    @inject(AuthModel) public auth: AuthModel,
    @inject(MyAppTrpcClient) public trpc: CreateTRPCProxyClient<AppRouter>,
  ) {
    makeObservable(this);
  }

  @action.bound
  setInputFocus(focus: boolean) {
    this.isInputFocus = focus;
  }

  @action.bound
  setInputText(text: string) {
    this.inputText = text;
    // this.trpc.hello.query({
    //   message: text,
    // });
  }
}
