import { cn, context_type_schema } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import {
  AtSign,
  Braces,
  FileJson2,
  FileText,
  ListCheck,
  type LucideProps,
  MessagesSquare,
  X,
} from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import { AgentChatInputModel, ContextType } from './agent-chat-input.model';

export const IconMap: Record<
  ContextType,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
> = {
  requirement: FileText,
  preview: MessagesSquare,
  canvas: FileJson2,
  test: ListCheck,
};

export const ChatInputContextPlugin = observer(() => {
  const model = useInjection(AgentChatInputModel);

  return (
    <div className={cn('flex flex-wrap gap-spacing-md-v2', 'p-spacing-xs-v2')}>
      <AddContext />
      {model.selectedContextItems.map((item) => (
        <ContextItem key={item.name} title={item.name} type={item.type} />
      ))}
    </div>
  );
});

const AddContext = observer(() => {
  const model = useInjection(AgentChatInputModel);
  return (
    <ContextWrapper>
      <AtSign
        strokeWidth={1.5}
        size={16}
        className="text-Cr-Fg-subtle-light-v2"
      />
      {model.isContextItemsEmpty && (
        <div className="text-sm-medium">Add context</div>
      )}
    </ContextWrapper>
  );
});

const ContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        'inline-block',
        'group',
        'flex items-center gap-[6px]',
        'bg-Cr-Bg-normal-secondary-alt-light-v2',
        'hover:bg-Cr-Bg-normal-tertiary-active-light-v2',
        'border border-Cr-border-default-light-v2',
        'rounded-md-v2',
        'p-spacing-md-v2',
        'h-C-button-sm-height-v2 w-fit min-w-C-button-sm-height-v2',
      )}
    >
      {children}
    </div>
  );
};

const ContextItem: React.FC<{
  title: string;
  type?: string;
}> = ({ title, type }) => {
  const typeRes = context_type_schema.safeParse(type);
  let Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  // 兜底
  if (typeRes.success === false) {
    Icon = Braces;
  } else {
    Icon = IconMap[context_type_schema.parse(type)];
  }

  const model = useInjection(AgentChatInputModel);

  return (
    <ContextWrapper>
      <Icon
        strokeWidth={1.5}
        size={16}
        className={cn('text-Cr-Fg-subtle-light-v2', 'block group-hover:hidden')}
      />
      <X
        strokeWidth={1.5}
        size={16}
        className={cn(
          'text-Cr-Fg-subtle-light-v2',
          'cursor-pointer',
          'hidden group-hover:block',
        )}
      />
      <div className="text-sm-medium">{title}</div>
    </ContextWrapper>
  );
};
