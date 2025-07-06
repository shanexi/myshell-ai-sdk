import { cn } from '@myshell-run/common-ui';
import { observer } from 'mobx-react-lite';
import { isEmpty } from 'radash';
import { useEffect, useRef } from 'react';
import { useAgentChatInputModel } from '../chat-input-model-factory';
import { AgentChatInputPluginProps } from './agent-chat-input-plugin-slot';

export const ChatInputAdvancedInputPlugin = observer<AgentChatInputPluginProps>(
  (props) => {
    const ref = useRef<HTMLDivElement>(null);
    const model = useAgentChatInputModel(props.messageId);

    useEffect(() => {
      if (!ref.current) return;
      return model.edix.setEdixRef(ref);
    }, []);

    const value = model.edix.inputText;

    return (
      <>
        <div
          ref={ref}
          className={cn(
            'x-chat-input-advanced-input-plugin',
            'text-lg-regular',
            'my-spacing-xs-v2 w-full resize-none !px-spacing-sm-v2 outline-none',
            'max-h-[6lh] overflow-y-auto',
            model.edix.edixReadonly &&
              'cursor-not-allowed text-Cr-text-subtlest-v2',
          )}
          onKeyDown={(e) => {
            if (
              !e.nativeEvent.isComposing &&
              e.key === 'Enter' &&
              !e.shiftKey
            ) {
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
            value
              .split('\n')
              .map((r, i) => <div key={i}>{r ? r : <br />}</div>)}
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
  },
);
