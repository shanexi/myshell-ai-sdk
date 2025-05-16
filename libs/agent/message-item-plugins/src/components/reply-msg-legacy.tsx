import { Message } from '@myshell-run/common-def';
import { cn } from '@myshell-run/common-ui';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * @deprecated 非 MDC 写法，同时 LUI button 在消息底部
 * 如果作为 chat input plugin 应该放在 chat input 上方，但是也保留放在 message 下方的产品设计的支持, 所以暂时加个 legacy 标记
 */
export const ReplyMsgLegacy: React.FC<Message> = ({ text, user }) => {
  return (
    <div className="flex px-spacing-xl-v2 py-spacing-lg-v2">
      <div className="w-[80%]">
        <div className={cn('text-lg-regular', 'text-Cr-text-default-light-v2')}>
          <article className="prose dark:prose-invert">
            <Markdown
              children={text}
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, node, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </article>
        </div>
        <div className="mt-[8px]">
          <div className="flex gap-spacing-xs-v2">
            <LuiButton>🪄 Upscale (Subtle)</LuiButton>
            <LuiButton>💥 Upscale (Creative)</LuiButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LuiButton = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <button
      className={cn(
        'text-sm-medium',
        'h-[36px]',
        'border border-CCr-button-tertiary-border-light-v2',
        'bg-CCr-button-tertiary-bg_default-light-v2',
        'rounded-C-button-md-radius-v2',
        'px-C-button-md-padding-v2',
      )}
    >
      {children}
    </button>
  );
};
