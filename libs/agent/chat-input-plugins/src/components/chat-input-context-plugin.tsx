import {
  cn,
  context_schema,
  context_type_schema,
  ContextType,
} from '@myshell-run/common-ui';
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
import { useAgentChatInputModel } from '../chat-input-model-factory';
import { AgentChatInputPluginProps } from './agent-chat-input-plugin-slot';

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

export const ChatInputContextPlugin = observer<AgentChatInputPluginProps>(
  ({ messageId }) => {
    const model = useAgentChatInputModel(messageId);

    return (
      <div
        className={cn('flex flex-wrap gap-spacing-md-v2', 'p-spacing-xs-v2')}
      >
        <AddContext messageId={messageId} />
        {model.edix.addedContextItems.map((item) => (
          <ContextItem
            key={item.content.name}
            name={item.content.name}
            type={item.type}
            messageId={messageId}
          />
        ))}
      </div>
    );
  },
);

const AddContext = observer<AgentChatInputPluginProps>(({ messageId }) => {
  const model = useAgentChatInputModel(messageId);
  return (
    <div className="tooltip" data-tip="Coming soon">
      <ContextWrapper>
        <AtSign strokeWidth={1.5} size={16} className="text-Cr-Fg-subtle-v2" />
        {model.isContextItemsEmpty && (
          <div className="text-sm-medium">Add context</div>
        )}
      </ContextWrapper>
    </div>
  );
});

const ContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        'inline-block',
        'group',
        'flex items-center gap-[6px]',
        'bg-Cr-Bg-normal-secondary-alt-v2',
        'hover:bg-Cr-Bg-normal-tertiary-active-v2',
        'border border-Cr-border-default-v2',
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
  name: string;
  type?: string;
  messageId?: string;
}> = ({ name, type, messageId }) => {
  const typeRes = context_type_schema.safeParse(type);
  let Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  // 兜底
  if (typeRes.success === false) {
    Icon = Braces;
  } else {
    Icon = IconMap[typeRes.data];
  }

  const model = useAgentChatInputModel(messageId);

  return (
    <ContextWrapper>
      <Icon
        strokeWidth={1.5}
        size={16}
        className={cn('text-Cr-Fg-subtle-v2', 'block group-hover:hidden')}
      />
      <X
        onClick={() => {
          model.edix.removeAddedContext(
            context_schema.parse({
              type,
              content: {
                name: name,
              },
            }),
          );
        }}
        strokeWidth={1.5}
        size={16}
        className={cn(
          'text-Cr-Fg-subtle-v2',
          'cursor-pointer',
          'hidden group-hover:block',
        )}
      />
      <div className="text-sm-medium">{name}</div>
    </ContextWrapper>
  );
};
