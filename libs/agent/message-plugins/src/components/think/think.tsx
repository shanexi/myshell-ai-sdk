import { cn, useRemarkable } from '@myshell-run/common-ui';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { ThinkModel } from './think.model';

export const Think = observer<{ id: string; chunk_id: string; text: string }>(
  ({ id, chunk_id, text }) => {
    const model = useRemarkable(ThinkModel, id);
    useEffect(() => {
      // console.log('only run once');
      model.setText(chunk_id as string, text as string);
      // FIXME: 除了用 deps 还有其他方法吗？
      // 这里用 chunk_id 是为了支持 cause（整体消息替换）而不是更新
    }, [chunk_id]);
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
          Generating...
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
            {model.text}
          </div>
        )}
      </div>
    );
  },
);
