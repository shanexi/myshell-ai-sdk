import { Bot } from '@myshell-run/simple-prisma';
import { VirtuosoMessageListMethods } from '@virtuoso.dev/message-list';
import { decorate, injectable } from 'inversify';
import { action, makeObservable, observable } from 'mobx';
import { type RefObject } from 'react';
import { BotListContext } from './bot-list';

export class BotListModel {
  initialBots: Bot[] = [];
  searchText = '';
  virtuosoRef?: RefObject<VirtuosoMessageListMethods<Bot, BotListContext>>;

  constructor() {
    makeObservable(this, {
      searchText: observable,
      setSearchText: action,
    });
  }

  setInitialBots = (bots: Bot[]) => {
    this.initialBots = bots;
  };

  setSearchText = (text: string) => {
    this.searchText = text;
    const bots = this.initialBots.filter((bot) =>
      bot.name.toLowerCase().includes(text.toLowerCase()),
    );
    this.virtuosoRef?.current?.data.replace(bots);
  };

  setVirtuosoRef = (
    ref: RefObject<VirtuosoMessageListMethods<Bot, BotListContext>>,
  ) => {
    this.virtuosoRef = ref;
  };
}

decorate(injectable(), BotListModel);
