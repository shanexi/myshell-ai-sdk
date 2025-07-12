import {
  cn,
  context_type_schema,
  EdixModel,
  UppyModel,
} from '@myshell-run/common-ui';
import { Braces, LucideProps } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import {
  motion,
  useScroll,
  useTransform,
  type MotionStyle,
} from 'motion/react';
import { useEffect, useRef } from 'react';
import { useAgentChatInputModel } from '../chat-input-model-factory';
import { AgentChatInputPluginProps } from './agent-chat-input-plugin-slot';
import { IconMap } from './chat-input-context-plugin';
import { ContextMenu } from './context-menu';

export const ChatInputStructuredInputPlugin =
  observer<AgentChatInputPluginProps>(({ messageId }) => {
    const model = useAgentChatInputModel(messageId);
    return (
      <>
        <ChatInputStructuredInputWrapper
          edix={model.edix}
          uppy={model.uppy}
          onEnter={() => {
            model.sendChatInputDoc();
          }}
          className={cn(
            model.isForbidden && 'cursor-not-allowed text-Cr-text-subtlest-v2',
            model.variant === 'message' && 'cursor-pointer',
          )}
          placeholder={
            model.variant === 'message'
              ? undefined
              : model.listening
                ? 'Listening to'
                : 'Write a message'
          }
        />
        {model.edix.isContextMenuShow && model.edix.contextMenuRect && (
          <ContextMenu comingSoon={false} messageId={messageId} />
        )}
      </>
    );
  });

const ScrollFade = ({
  direction = 'bottom',
  style,
}: {
  direction?: 'top' | 'bottom';
  style?: MotionStyle;
}) => (
  <motion.div
    className={cn(
      'pointer-events-none absolute right-0 left-0 h-[30px]',
      direction === 'bottom'
        ? 'bottom-0 bg-gradient-to-t'
        : 'top-0 bg-gradient-to-b',
      'from-[var(--color-Cr-Bg-neutral-primary-default-v2)] to-[var(--color-Cr-Bg-neutral-primary-default-v2)]/0',
    )}
    style={style}
  />
);

export const ChatInputStructuredInputWrapper = observer<{
  edix: EdixModel;
  uppy: UppyModel;
  className?: string;
  /**
   * @description 有一些需要定制 作为 props 传入
   */
  onEnter: () => void;
  placeholder?: string;
}>(({ className, edix, uppy, onEnter, placeholder }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
  });

  const topFadeOpacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);
  const bottomFadeOpacity = useTransform(scrollYProgress, [0.99, 1], [1, 0]);

  useEffect(() => {
    if (!ref.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '@') {
        // 延迟获取位置，确保 @ 字符已经插入
        setTimeout(() => {
          if (edix.atSearchCriteria == null) {
            edix.setAtRect(null);
            edix.setAtContextMenuShow(false);
          } else {
            const selection = window.getSelection();
            if (selection && selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              const rect = range.getBoundingClientRect();
              edix.setAtRect(rect);
              edix.setAtContextMenuShow(true);
            }
          }
        }, 0);
      }
    };

    const element = ref.current;
    // TODO @ 搜索 context 产品还未开发 先注释
    // element.addEventListener('keydown', handleKeyDown);

    const dispose = edix.setEdixRefStructured(ref);
    return () => {
      // element.removeEventListener('keydown', handleKeyDown);
      dispose?.();
    };
  }, []);

  return (
    <>
      <div className="relative">
        <div
          ref={ref}
          className={cn(
            'x-chat-input-advanced-input-plugin',
            'text-Cr-text-default-v2',
            'text-lg-regular',
            'my-spacing-xs-v2',
            'w-full resize-none !px-spacing-md-v2 outline-none',
            'overflow-y-auto',
            'max-h-[6lh]',
            'min-h-[1lh]', // 为了解决输入框导致的 message list 动画抖动问题
            className,
          )}
          onKeyDown={(e) => {
            if (
              !e.nativeEvent.isComposing &&
              e.key === 'Enter' &&
              !e.shiftKey
            ) {
              e.preventDefault();
              if (!ref?.current) return;
              onEnter();
            }
          }}
          onPaste={(e) => {
            const files = e.clipboardData.files;
            if (files.length > 0) {
              e.preventDefault();
              for (let i = 0; i <= files.length; i++) {
                const file = files.item(i);
                if (file) {
                  uppy.uppy.addFile({
                    name: file.name,
                    type: file.type,
                    data: file,
                  });
                }
              }
            }
          }}
          aria-placeholder={placeholder}
        >
          {!edix.isChatInputDocEmpty &&
            edix.chatInputDoc.map((line, i) => (
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
                      <span key={j} className="break-words whitespace-pre-wrap">
                        {t.text}
                      </span>
                    ),
                  )
                ) : (
                  <br />
                )}
              </div>
            ))}
        </div>
        {edix.edixReadonly && (
          <>
            <ScrollFade direction="top" style={{ opacity: topFadeOpacity }} />
            <ScrollFade
              direction="bottom"
              style={{ opacity: bottomFadeOpacity }}
            />
          </>
        )}
      </div>
      <style>{`
[contenteditable]:empty:before {
content: attr(aria-placeholder) / "";
pointer-events: none;
color: gray;
}
`}</style>
    </>
  );
});

// todo: 做个 variant
export const ContextItem: React.FC<{
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

ChatInputStructuredInputPlugin.displayName = 'ChatInputStructuredInputPlugin';
