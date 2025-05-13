import { cn, useRemarkable } from '@myshell-run/common-ui';
import { Check, ChevronUp, Circle } from 'lucide-react';
import { ChecklistItemModel, type Status } from './checklist-msg.model';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect } from 'react';

export const CheckList: React.FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
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
        <ChevronUp
          strokeWidth={1.5}
          className="text-colors-foreground-subtle-light-v2"
          size={20}
        />
      </div>
      {children}
      {/* <CheckListItem status="checked" title="Create initial files" />
      <CheckListItem status="pending" title="Install dependencies" />
      <CheckListItem status="unchecked" title="Update `app/page.tsx`" /> */}
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
    model.setStatus(status);
  }, []);

  return <ChecklistItemUI status={model.status} title={title} />;
});

export const ChecklistItemUI: React.FC<{ status: Status; title: string }> = ({
  status,
  title,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-spacing-md-v2',
        'border-l-1 border-colors-border-default-light-v2',
        'ml-[10px] pl-[10px]',
      )}
    >
      {status === 'checked' ? (
        <Check size={20} strokeWidth={1.5} />
      ) : status === 'pending' ? (
        <div className="loader"></div>
      ) : (
        <Circle
          size={20}
          strokeWidth={1.5}
          className="text-colors-foreground-disabled-light-v2"
        />
      )}
      {title}
    </div>
  );
};
