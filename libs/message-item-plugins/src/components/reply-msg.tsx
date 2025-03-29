import { DEFAULT_AVATAR, Message } from '@myshell-run/biz-def';
import { ReplyMsgFrame } from '@myshell-run/ui-primitives';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const ReplyMsg = (props: Message) => {
  const { avatar = DEFAULT_AVATAR, user, text } = props;
  return (
    <ReplyMsgFrame
      avatar={
        <img
          className="mr-[8px] h-[32px] w-[32px] rounded-lg"
          src={avatar}
          alt={`${user} avatar`}
        />
      }
      // button={
      //   // button 布局收敛
      //   <div className="-mx-spacing-xs flex justify-between">
      //     <LuiButton>🪄 Upscale (Subtle)</LuiButton>
      //     <LuiButton>💥 Upscale (Creative)</LuiButton>
      //   </div>
      // }
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
    </ReplyMsgFrame>
  );
};

export const LuiButton = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <button className="text-sm-medium mx-spacing-xs flex h-components-button-lg-height flex-auto items-center justify-center rounded-lg border border-border-default-light bg-surface-default-light p-spacing-lg">
      {children}
    </button>
  );
};
