import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { isEmpty } from 'radash';
import { useEffect, useRef } from 'react';
import { ChatInputModel } from './chat-input.model';

export const ChatInputStructuredInputPlugin = observer(() => {
  const ref = useRef<HTMLDivElement>(null);
  const model = useInjection(ChatInputModel);

  useEffect(() => {
    if (!ref.current) return;
    return model.chatCommon.edixModel.setEdixRefStructured(ref);
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
            model.sendText();
          }
        }}
        aria-placeholder="Write a message"
      >
        {value.map((line, i) => (
          <div key={i}>
            {line.length ? (
              line.map((t, j) =>
                t.type === 'context' ? (
                  <Tag key={j} content={t.data.content} />
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
    </>
  );
});

const Tag: React.FC<{ content: string }> = ({ content }) => {
  return (
    <span
      contentEditable={false}
      style={{
        background: 'slategray',
        color: 'white',
        fontSize: 12,
        padding: 4,
        borderRadius: 8,
      }}
    >
      {content}
    </span>
  );
};
