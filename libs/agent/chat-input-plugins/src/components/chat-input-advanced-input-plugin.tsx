import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { isEmpty } from 'radash';
import { useEffect, useRef } from 'react';
import { ChatInputModel } from './chat-input.model';

export const ChatInputAdvancedInputPlugin = observer(() => {
  const ref = useRef<HTMLDivElement>(null);
  const model = useInjection(ChatInputModel);

  useEffect(() => {
    if (!ref.current) return;
    return model.chatCommon.setEdixRef(ref);
  }, []);

  const value = model.chatCommon.inputText;

  return (
    <>
      <div
        ref={ref}
        className={cn(
          'x-chat-input-advanced-input-plugin',
          'text-lg-regular',
          'my-spacing-xs-v2 w-full resize-none !px-spacing-sm-v2 outline-none',
          'max-h-[6lh] overflow-y-auto',
          model.chatCommon.edixReadonly &&
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
        {/*
           why isEmpty?
           value = '' split - [''] [contenteditable]:empty 不是 empty
           */}
        {!isEmpty(value) &&
          value.split('\n').map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
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
