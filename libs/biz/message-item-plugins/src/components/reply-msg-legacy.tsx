import { DEFAULT_AVATAR, Message } from '@myshell-run/common-def';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * @deprecated
 */
export const ReplyMsgLegacy = (props: Message) => {
  const { avatar = DEFAULT_AVATAR, user, text } = props;
  return (
    <div className="flex pb-8 pl-[8px]">
      <img
        className="mr-[8px] h-[32px] w-[32px] rounded-lg-v1"
        src={avatar}
        alt={`${user} avatar`}
      />
      <div className="w-[80%]">
        <div className="rounded-tl-[2px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] bg-surface-container-default-light-v1 p-4 text-text-default-light-v1">
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
        <div className="gap-spacing-xs mt-[8px] flex justify-between">
          <LuiButton>🪄 Upscale (Subtle)</LuiButton>
          <LuiButton>💥 Upscale (Creative)</LuiButton>
        </div>
      </div>
    </div>
  );
};

export const LuiButton = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <button className="text-sm-medium mx-spacing-xs-v1 flex h-components-button-lg-height-v1 flex-auto items-center justify-center rounded-lg-v1 border border-border-default-light-v1 bg-surface-default-light-v1 p-spacing-lg-v1">
      {children}
    </button>
  );
};
