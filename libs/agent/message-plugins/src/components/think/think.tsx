import { cn, useRemarkable } from '@myshell-run/common-ui';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ThinkModel, unescapeUnicode } from './think.model';

export const Think = observer<{ id: string; text: string }>(({ id, text }) => {
  const model = useRemarkable(ThinkModel, id);
  useEffect(() => {
    console.log('only run once');
    model.setText(text as string);
  }, []);
  return (
    <div
      style={{
        color: '#666',
        fontSize: 14,
      }}
    >
      <div
        className={cn(
          'flex items-center gap-spacing-md-v2',
          'text-lg-regular',
          'mb-[12px]',
          'cursor-pointer',
        )}
        onClick={() => model.toggle()}
      >
        Think...
        {model.isOpen ? (
          <ChevronUp
            strokeWidth={1.5}
            className="text-Cr-Fg-subtle-light-v2"
            size={20}
          />
        ) : (
          <ChevronDown
            strokeWidth={1.5}
            className="text-Cr-Fg-subtle-light-v2"
            size={20}
          />
        )}
      </div>
      {model.isOpen && (
        <div
          style={{
            borderLeft: '2px solid rgba(0, 0, 0, 0.1)',
            paddingLeft: '12px',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
        >
          {unescapeUnicode(model.text)}
        </div>
      )}
    </div>
  );
});
