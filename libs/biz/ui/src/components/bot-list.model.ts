import { Bot } from '@myshell-run/simple-prisma';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { type RefObject } from 'react';
import { BotListContext } from './bot-list';
import { MyAppTrpcClient } from '@myshell-run/biz-def';
import { TRPCClient } from '@trpc/client';
import { AppRouter } from '@myshell-run/biz-service';
import { AuthModel } from './auth.model';
@injectable()
export class BotListModel {
  initialBots: Bot[] = [];
  @observable searchText = '';
  virtuosoRef?: RefObject<VirtuosoMessageListMethods<Bot, BotListContext>>;

  constructor(
    @inject(MyAppTrpcClient) public trpc: TRPCClient<AppRouter>,
    @inject(AuthModel) public auth: AuthModel,
  ) {
    makeObservable(this);
  }

  getUser() {
    if (this.auth.userId) {
      this.trpc.getUser.query({ userId: this.auth.userId });
    }
  }

  setInitialBots = (bots: Bot[]) => {
    this.initialBots = bots;
  };

  @action.bound
  setSearchText(text: string) {
    this.searchText = text;
    const bots = this.initialBots.filter((bot) =>
      bot.name.toLowerCase().includes(text.toLowerCase()),
    );
    this.virtuosoRef?.current?.data.replace(bots);
  }

  setVirtuosoRef = (
    ref: RefObject<VirtuosoMessageListMethods<Bot, BotListContext>>,
  ) => {
    this.virtuosoRef = ref;
  };
}
