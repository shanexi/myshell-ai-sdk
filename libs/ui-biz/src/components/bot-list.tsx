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

export const BotListItem: VirtuosoMessageListProps<
  Bot,
  BotListContext
>['ItemContent'] = (props) => {
  const { data } = props;
  const { name, description } = data;
  return (
    <div className="flex px-spacing-xl py-spacing-lg">
      <img
        className="mr-spacing-md h-[56px] w-[56px] rounded-xl"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      />
      <div className="flex flex-col justify-center">
        <div className="text-lg-regular text-text-default-light">{name}</div>
        <div className="text-sm-regular text-text-subtler-light">
          {description}
        </div>
      </div>
    </div>
  );
};
