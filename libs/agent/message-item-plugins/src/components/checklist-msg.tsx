import { cn, useRemarkable } from '@myshell-run/common-ui';
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
          className="text-colors-foreground-disabled-light-v2"
        />
        {title}
        {isOpen ? (
          <ChevronUp
            onClick={() => setIsOpen(!isOpen)}
            strokeWidth={1.5}
            className="text-colors-foreground-subtle-light-v2"
            size={20}
          />
        ) : (
          <ChevronDown
            onClick={() => setIsOpen(!isOpen)}
            strokeWidth={1.5}
            className="text-colors-foreground-subtle-light-v2"
            size={20}
          />
        )}
      </div>
      {isOpen && children}
    </div>
  );
};

export const CheckListItem = observer<{
  id?: string;
  status: Status;
  title: string;
}>(({ id, status, title }) => {
  const model = useRemarkable(ChecklistItemModel, id);

  useEffect(() => {
    const disposer = autorun(() => {
      model.setStatus(status);
      model.setTitle(title);
    });
    return disposer;
  }, []);

  return (
    <div
      className={cn(
        'flex items-center gap-spacing-md-v2',
        'border-l-1 border-colors-border-default-light-v2',
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
          className="text-colors-foreground-disabled-light-v2"
        />
      )}
      {model.title}
    </div>
  );
});
