import {
  type VirtuosoMessageListMethods,
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  VirtuosoMessageListProps,
} from '@virtuoso.dev/message-list';
import { CSSProperties, useEffect, useRef } from 'react';
import { DbBot } from '@myshell-run/biz-def';
import { cn, useInjection } from '@myshell-run/common-ui';
import { ReactComponent as CheckBadge } from './check-badge.svg';
import { Energy } from './energy';
import { observer } from 'mobx-react-lite';
import { BotListModel } from './bot-list.model';
import { DEFAULT_AVATAR } from '@myshell-run/common-def';
import { ReactComponent as Avatar } from './avatar.svg';

export type BotListContext = {
  //
};

export const BotList = observer(
  (props: {
    initialBots: DbBot[];
    className?: string;
    licenseKey?: string;
    style?: CSSProperties;
  }) => {
    const { initialBots, className, licenseKey, style } = props;
    const model = useInjection(BotListModel);
    const virtuoso =
      useRef<VirtuosoMessageListMethods<DbBot, BotListContext>>(null);
    useEffect(() => {
      model.setInitialBots(initialBots);
      model.setVirtuosoRef(virtuoso);
      model.getUser();
    }, []);

    return (
      <div className={cn('flex flex-col', className)} style={style}>
        <VirtuosoMessageListLicense licenseKey={licenseKey || ''}>
          <VirtuosoMessageList<DbBot, BotListContext>
            ref={virtuoso}
            context={{}}
            computeItemKey={({ data }) => data.id}
            // TODO 设置为 index: 'LAST' 会导致白屏（有 initialData 但是却没有渲染任何 message）正好语义上也是 index: 0
            initialLocation={{ index: 0, align: 'start' }}
            initialData={initialBots}
            ItemContent={BotListItem}
          />
        </VirtuosoMessageListLicense>
      </div>
    );
  },
);

export const BotListItem: VirtuosoMessageListProps<
  DbBot,
  BotListContext
>['ItemContent'] = (props) => {
  const { data } = props;
  const { name, description, avatar = DEFAULT_AVATAR, isOfficial } = data;
  return (
    <a
      className="flex px-spacing-xl-v1 py-spacing-lg-v1"
      href={`/chat?botId=${data.id}`}
    >
      <img
        className="mr-spacing-md-v1 h-[56px] w-[56px] rounded-xl-v1"
        src={avatar}
        alt={name}
      />
      {/* 在右侧容器添加了 min-w-0 类 - 这是一个关键修改，它允许 flex 子项在必要时缩小到比其内容更小的尺寸 */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="flex items-center">
          <div className="text-lg-regular truncate text-text-default-light-v1">
            {name}
          </div>
          {isOfficial && <CheckBadge className="ml-spacing-xs-v1" />}
        </div>
        <div className="text-sm-regular truncate text-text-subtler-light-v1">
          {description}
        </div>
      </div>
    </a>
  );
};

export function BotListRoot(props: { children?: React.ReactNode }) {
  const { children } = props;
  return <div className="flex h-full flex-col">{children}</div>;
}

export function BotListHeader(props: { avatar?: string | null }) {
  const { avatar } = props;
  return (
    <div className="mx-spacing-xl-v1 mt-spacing-lg-v1 mb-spacing-xs-v1 flex items-center justify-between">
      <div className="flex items-center">
        <div className="broder mr-[12px] h-[32px] w-[32px] rounded-lg-v1 border-border-default-light-v1 bg-[#F6F6F7]">
          {avatar ? (
            <img className="rounded-lg-v1" src={avatar} alt="avatar" />
          ) : (
            <Avatar />
          )}
        </div>
        <div className="display-md-emphasized text-text-default-light-v1">
          Chat
        </div>
      </div>
      <Energy />
    </div>
  );
}
