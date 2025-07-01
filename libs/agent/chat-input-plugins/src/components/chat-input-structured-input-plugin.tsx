import { cn, context_type_schema } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { isEmpty } from 'radash';
import { useEffect, useRef } from 'react';
import { AgentChatInputModel } from './agent-chat-input.model';
import { IconMap } from './chat-input-context-plugin';
import { ContextMenu } from './context-menu';
import { Braces, LucideProps } from 'lucide-react';
import React from 'react';

export const ChatInputStructuredInputPlugin = observer(() => {
  const ref = useRef<HTMLDivElement>(null);
  const model = useInjection(AgentChatInputModel);

  useEffect(() => {
    if (!ref.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '@') {
        // 延迟获取位置，确保 @ 字符已经插入
        setTimeout(() => {
          if (model.chatCommon.edixModel.atSearchCriteria == null) {
            model.chatCommon.edixModel.setAtRect(null);
            model.chatCommon.edixModel.setAtContextMenuShow(false);
          } else {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const rect = range.getBoundingClientRect();
              model.chatCommon.edixModel.setAtRect(rect);
              model.chatCommon.edixModel.setAtContextMenuShow(true);
            }
          }
        }, 0);
      }
    };

    const element = ref.current;
    element.addEventListener('keydown', handleKeyDown);

    const dispose = model.chatCommon.edixModel.setEdixRefStructured(ref);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      dispose?.();
    };
  }, []);

  const value = model.chatCommon.edixModel.chatInputDoc;

  return (
    <>
      <div
        ref={ref}
        className={cn(
          'x-chat-input-advanced-input-plugin',
          'text-lg-regular',
          'my-spacing-xs-v2 w-full resize-none !px-spacing-sm-v2 outline-none',
          'max-h-[6lh] overflow-y-auto',
          model.chatCommon.edixModel.edixReadonly &&
            'cursor-not-allowed text-Cr-text-subtlest-light-v2',
        )}
        onKeyDown={(e) => {
          if (!e.nativeEvent.isComposing && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!ref.current) return;
            model.sendChatInputDoc();
          }
        }}
        aria-placeholder="Write a message"
      >
        {!isEmpty(value) &&
          value.map((line, i) => {
            return (
              <React.Fragment key={i}>
                {line.length ? (
                  line.map((t, j) => {
                    if (t.type === 'context') {
                      return (
                        <ContextItem
                          key={j}
                          content={t.data.content}
                          type={t.data.type}
                        />
                      );
                    } else {
                      if (isEmpty(t.text)) return null;
                      return <span key={j}>{t.text}</span>;
                    }
                  })
                ) : (
                  <br />
                )}
              </React.Fragment>
            );
          })}
      </div>
      <style>{`
[contenteditable]:empty:before {
  content: attr(aria-placeholder) / "";
  pointer-events: none;
  color: gray;
}
`}</style>
      {model.chatCommon.edixModel.isContextMenuShow &&
        model.chatCommon.edixModel.contextMenuRect && (
          <ContextMenu commingSoon={true} />
        )}
    </>
  );
});

// todo: 做个 variant
const ContextItem: React.FC<{
  content: string;
  type?: string;
}> = ({ content, type }) => {
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
  return (
    <span
      contentEditable={false}
      className={cn(
        'relative top-[2.5px]',
        'inline-flex items-center gap-[6px]',
        'bg-Cr-Bg-normal-secondary-alt-light-v2',
        'hover:bg-Cr-Bg-normal-tertiary-active-light-v2',
        'border border-Cr-border-default-light-v2',
        'rounded-md-v2',
        'px-spacing-md-v2',
        'w-fit min-w-C-button-sm-height-v2',
      )}
      data-type={type}
    >
      <Icon
        strokeWidth={1.5}
        size={16}
        className={cn('text-Cr-Fg-subtle-light-v2')}
      />
      <div className="text-sm-medium">{content}</div>
    </span>
  );
};
