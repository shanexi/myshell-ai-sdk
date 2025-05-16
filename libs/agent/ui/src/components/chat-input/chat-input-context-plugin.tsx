import { cn } from '@myshell-run/common-ui';
import {
  AtSign,
  File,
  FileJson2,
  FileText,
  ListCheck,
  MessagesSquare,
  X,
} from 'lucide-react';
import { PropsWithChildren } from 'react';

const IconMap = {
  file: File,
  fileText: FileText,
  fileJson: FileJson2,
  listCheck: ListCheck,
  messagesSquare: MessagesSquare,
};

export const ChatInputContextPlugin = () => {
  return (
    <div className={cn('flex flex-wrap gap-spacing-md-v2', 'p-spacing-xs-v2')}>
      <AddContext />
      <ContextItem icon="file" title="requirement.feature1" />
      <ContextItem icon="fileJson" title="canvas.state1.inputs.variable1" />
      <ContextItem icon="listCheck" title="test.test_suite1" />
      <ContextItem icon="messagesSquare" title="preview.message1" />
    </div>
  );
};

const AddContext = () => {
  return (
    <ContextWrapper>
      <AtSign
        strokeWidth={1.5}
        size={16}
        className="text-Cr-Fg-subtle-light-v2"
      />
      <div className="text-sm-medium">Add context</div>
    </ContextWrapper>
  );
};

const ContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-[6px]',
        'bg-Cr-Bg-normal-secondary-alt-light-v2',
        'border border-Cr-border-default-light-v2',
        'rounded-md-v2',
        'p-spacing-md-v2',
        'w-fit',
      )}
    >
      {children}
    </div>
  );
};

const ContextItem: React.FC<{
  title: string;
  icon: keyof typeof IconMap;
}> = ({ title, icon }) => {
  const Icon = IconMap[icon];
  return (
    <ContextWrapper>
      <Icon
        strokeWidth={1.5}
        size={16}
        className="text-Cr-Fg-subtle-light-v2"
      />
      <div className="text-sm-medium">{title}</div>
      <X strokeWidth={1.5} size={16} className="text-Cr-Fg-subtle-light-v2" />
    </ContextWrapper>
  );
};
