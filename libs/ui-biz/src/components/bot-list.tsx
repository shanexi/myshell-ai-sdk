import {
  type VirtuosoMessageListMethods,
  VirtuosoMessageList,
  VirtuosoMessageListLicense,
  VirtuosoMessageListProps,
} from '@virtuoso.dev/message-list';
import { CSSProperties, useRef } from 'react';
import { Bot } from '@myshell-run/simple-prisma';
import { cn } from '@myshell-run/ui-primitives';

export type BotListContext = {
  //
};

export function BotList(props: {
  initialBots: Bot[];
  className?: string;
  licenseKey?: string;
  style?: CSSProperties;
}) {
  const { initialBots, className, licenseKey, style } = props;
  const virtuoso =
    useRef<VirtuosoMessageListMethods<Bot, BotListContext>>(null);

  return (
    <div className={cn('flex flex-col', className)} style={style}>
      <VirtuosoMessageListLicense licenseKey={licenseKey || ''}>
        <VirtuosoMessageList<Bot, BotListContext>
          ref={virtuoso}
          context={{}}
          style={{ flex: 1, scrollbarWidth: 'none' }}
          computeItemKey={({ data }) => data.id}
          initialLocation={{ index: 'LAST', align: 'end' }}
          initialData={initialBots}
          ItemContent={BotListItem}
        />
      </VirtuosoMessageListLicense>
    </div>
  );
}
const DEFAULT_AVATAR =
  'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';

export const BotListItem: VirtuosoMessageListProps<
  Bot,
  BotListContext
>['ItemContent'] = (props) => {
  const { data } = props;
  const { name, description, avatar = DEFAULT_AVATAR } = data;
  return (
    <div className="flex px-spacing-xl py-spacing-lg">
      <img
        className="mr-spacing-md h-[56px] w-[56px] rounded-xl"
        src={avatar}
      />
      {/* 在右侧容器添加了 min-w-0 类 - 这是一个关键修改，它允许 flex 子项在必要时缩小到比其内容更小的尺寸 */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="text-lg-regular truncate text-text-default-light">
          {name}
        </div>
        <div className="text-sm-regular truncate text-text-subtler-light">
          {description}
        </div>
      </div>
    </div>
  );
};
