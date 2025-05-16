import { cn, RemarkMsg, useRemarkable } from '@myshell-run/common-ui';
import { Check, ChevronUp, ChevronDown, Circle } from 'lucide-react';
import { ChecklistItemModel, type Status } from './checklist-msg.model';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useState } from 'react';
import { autorun } from 'mobx';

export const CheckList: React.FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-spacing-md-v2',
          'text-lg-regular',
          'mb-[12px]',
        )}
      >
        <Circle
          size={20}
          strokeWidth={1.5}
          className="text-Cr-foreground-disabled-light-v2"
        />
        {title}
        {isOpen ? (
          <ChevronUp
            onClick={() => setIsOpen(!isOpen)}
            strokeWidth={1.5}
            className="text-Cr-foreground-subtle-light-v2"
            size={20}
          />
        ) : (
          <ChevronDown
            onClick={() => setIsOpen(!isOpen)}
            strokeWidth={1.5}
            className="text-Cr-foreground-subtle-light-v2"
            size={20}
          />
        )}
      </div>
      {isOpen && children}
    </div>
  );
};

export const CheckListItem = observer<
  PropsWithChildren<{
    id?: string;
    status: Status;
    text: string;
  }>
>(({ id, status, text, children }) => {
  const model = useRemarkable(ChecklistItemModel, id);

  useEffect(() => {
    const disposer = autorun(() => {
      model.setStatus(status);
      model.setText(text);
    });
    return disposer;
  }, []);

  return (
    <div
      className={cn(
        'flex items-center gap-spacing-md-v2',
        'border-Cr-border-default-light-v2 border-l-1',
        'ml-[10px] pl-[10px]',
        model.hidden && 'hidden',
      )}
    >
      {model.status === 'checked' ? (
        <Check size={20} strokeWidth={1.5} />
      ) : model.status === 'pending' ? (
        <div className="loader"></div>
      ) : (
        <Circle
          size={20}
          strokeWidth={1.5}
          className="text-Cr-foreground-disabled-light-v2"
        />
      )}
      <RemarkMsg text={model.text} />
    </div>
  );
});

export const ChecklistCode: React.FC<
  PropsWithChildren<{
    scheme: string;
  }>
> = ({ scheme, children }) => {
  return (
    <code
      className="border-Cr-border-default-light-v2 bg-Cr-background-normal-secondary-default-light-v2 rounded-default-v2 border px-[6px] pt-[1px] pb-[3px]"
      onClick={() => {
        console.log('clicked', scheme);
      }}
    >
      {children}
    </code>
  );
};
