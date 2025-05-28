import { basicSchema, cn } from '@myshell-run/common-ui';
import { editable } from 'edix';
import { useInjection } from 'inversify-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { ChatInputModel } from './chat-input.model';

export const ChatInputAdvancedInputPlugin = observer(() => {
  const model = useInjection(ChatInputModel);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return editable(ref.current, {
      schema: basicSchema,
      onChange: model.chatCommon.setChatInputDoc,
    }).dispose;
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'my-spacing-xs-v2 w-full resize-none !px-spacing-sm-v2 outline-none',
        'border-CCr-input-border-light-v2',
        'p-[8px]',
      )}
    >
      {model.chatCommon.chatInputDoc?.map((r, i) => (
        <div key={i}>
          {r.length ? r.map((n, j) => <span key={j}>{n.text}</span>) : <br />}
        </div>
      ))}
    </div>
  );
});
