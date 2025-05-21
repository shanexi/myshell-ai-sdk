import { cn } from '@myshell-run/common-ui';
import {
  AtSign,
  File,
  FileJson2,
  FileText,
  ListCheck,
  type LucideProps,
  MessagesSquare,
  X,
} from 'lucide-react';
import { PropsWithChildren } from 'react';
import {
  ChatInputContextPluginModel,
  ContextType,
} from './chat-input-context-plugin.model';
import { observer } from 'mobx-react-lite';
import { useInjection } from 'inversify-react';

const IconMap: Record<
  ContextType,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
> = {
  file: File,
  text: FileText,
  json: FileJson2,
  todo: ListCheck,
  message: MessagesSquare,
};

export const ChatInputContextPlugin = observer(() => {
  const model = useInjection(ChatInputContextPluginModel);

  return (
    <div className={cn('flex flex-wrap gap-spacing-md-v2', 'p-spacing-xs-v2')}>
      <AddContext />
      {model.contextItems.map((item) => (
        <ContextItem key={item.name} title={item.name} icon={item.type} />
      ))}
    </div>
  );
});

const AddContext = observer(() => {
  const model = useInjection(ChatInputContextPluginModel);
  return (
    <ContextWrapper>
      <AtSign
        strokeWidth={1.5}
        size={16}
        className="text-Cr-Fg-subtle-light-v2"
      />
      {model.isEmpty && <div className="text-sm-medium">Add context</div>}
    </ContextWrapper>
  );
});

const ContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
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
  icon: ContextType;
}> = ({ title, icon }) => {
  const Icon = IconMap[icon];
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
