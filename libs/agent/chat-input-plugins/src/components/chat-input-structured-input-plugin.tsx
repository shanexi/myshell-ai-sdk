import { cn, context_type_schema } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { Braces, LucideProps } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { AgentChatInputModel } from './agent-chat-input.model';
import { IconMap } from './chat-input-context-plugin';
import { ContextMenu } from './context-menu';

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
          'my-spacing-xs-v2',
          'w-full resize-none !px-spacing-sm-v2 outline-none',
          'overflow-y-auto',
          'max-h-[6lh]',
          'min-h-[1lh]', // 为了解决输入框导致的 message list 动画抖动问题
          model.chatCommon.edixModel.edixReadonly &&
            'cursor-not-allowed text-Cr-text-subtlest-v2',
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
        {!model.chatCommon.edixModel.isChatInputDocEmpty &&
          value.map((line, i) => (
            <div key={i}>
              {line.length ? (
                line.map((t, j) =>
                  t.type === 'context' ? (
                    <ContextItem
                      key={j}
                      content={t.data.content}
                      type={t.data.type}
                    />
                  ) : (
                    <span key={j}>{t.text}</span>
                  ),
                )
              ) : (
                <br />
              )}
            </div>
          ))}
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
          <ContextMenu comingSoon={false} />
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
        'bg-Cr-Bg-normal-secondary-alt-v2',
        'hover:bg-Cr-Bg-normal-tertiary-active-v2',
        'border border-Cr-border-default-v2',
        'rounded-md-v2',
        'px-spacing-md-v2',
        'w-fit min-w-C-button-sm-height-v2',
      )}
      data-type={type}
    >
      <Icon
        strokeWidth={1.5}
        size={16}
        className={cn('text-Cr-Fg-subtle-v2')}
      />
      <div className="text-sm-medium">{content}</div>
    </span>
  );
};
