import { Message } from '@myshell-run/common-def';
import { cn } from '@myshell-run/common-ui';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const ReplyMsg = (props: Message) => {
  const { user, text } = props;
  return (
    <div className="flex px-spacing-xl-v2 py-spacing-lg-v2">
      <div className="w-[80%]">
        <div
          className={cn('text-lg-regular', 'text-colors-text-default-light-v2')}
        >
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
        'border border-component-colors-button-tertiary-border-light-v2',
        'bg-component-colors-button-tertiary-bg_default-light-v2',
        'rounded-components-button-md-radius-v2',
        'px-components-button-md-padding-v2',
      )}
    >
      {children}
    </button>
  );
};
