import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { isEmpty } from 'radash';
import { useEffect, useRef } from 'react';
import { IconMap } from './chat-input-context-plugin';
import { ChatInputModel } from './chat-input.model';
import { MentionDropdown, users } from './at-context-menu';

export const ChatInputStructuredInputPlugin = observer(() => {
  const ref = useRef<HTMLDivElement>(null);
  const model = useInjection(ChatInputModel);

  useEffect(() => {
    if (!ref.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '@') {
        // 延迟获取位置，确保 @ 字符已经插入
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            model.chatCommon.edixModel.setAtRect(rect);
            model.chatCommon.edixModel.setAtContextMenuShow(true);
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
          value.map((line, i) => (
            <div key={i}>
              {line.length ? (
                line.map((t, j) =>
                  t.type === 'context' ? (
                    <ContextItem key={j} content={t.data.content} />
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
      {model.chatCommon.edixModel.isAtContextMenuShow &&
        model.chatCommon.edixModel.atContextMenuRect && (
          <MentionDropdown
            users={users}
            onSelect={(user) => {
              model.chatCommon.edixModel.insertContext(user.name);
            }}
            onClose={() => {
              model.chatCommon.edixModel.setAtRect(null);
              model.chatCommon.edixModel.setAtContextMenuShow(false);
            }}
            anchorRect={model.chatCommon.edixModel.atContextMenuRect}
          />
        )}
    </>
  );
});

// todo: 做个 variant
const ContextItem: React.FC<{
  content: string;
}> = ({ content }) => {
  const Icon = IconMap['todo'];
  return (
    <span
      contentEditable={false}
      className={cn(
        'relative top-[2.5px]',
        'group',
        'inline-flex items-center gap-[6px]',
        'bg-Cr-Bg-normal-secondary-alt-light-v2',
        'hover:bg-Cr-Bg-normal-tertiary-active-light-v2',
        'border border-Cr-border-default-light-v2',
        'rounded-md-v2',
        'px-spacing-md-v2',
        'w-fit min-w-C-button-sm-height-v2',
      )}
    >
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
      <div className="text-sm-medium">{content}</div>
    </span>
  );
};
