import { cn } from '@myshell-run/common-ui';
import { Check, ChevronUp, Circle } from 'lucide-react';

export const CheckList: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
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
      {/* <CheckListItem status="checked" title="Create initial files" />
      <CheckListItem status="pending" title="Install dependencies" />
      <CheckListItem status="unchecked" title="Update `app/page.tsx`" /> */}
    </div>
  );
};

export const CheckListItem: React.FC<{
  status: 'checked' | 'unchecked' | 'pending';
  title: string;
}> = ({ status, title }) => {
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
