import { MyAppTrpcClient } from '@myshell-run/biz-def';
import { AppRouter } from '@myshell-run/biz-service';
import { DbBot } from '@myshell-run/biz-def';
import { TRPCClient } from '@trpc/client';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { inject, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { type RefObject } from 'react';
import { BotListContext } from './bot-list';
@injectable()
export class BotListModel {
  initialBots: DbBot[] = [];
  @observable searchText = '';
  virtuosoRef?: RefObject<VirtuosoMessageListMethods<DbBot, BotListContext>>;

  constructor(@inject(MyAppTrpcClient) public trpc: TRPCClient<AppRouter>) {
    makeObservable(this);
  }

  getUser() {
    this.trpc.getUser.query({});
  }

  setInitialBots = (bots: DbBot[]) => {
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
    ref: RefObject<VirtuosoMessageListMethods<DbBot, BotListContext>>,
  ) => {
    this.virtuosoRef = ref;
  };
}
