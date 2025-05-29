import { cn } from '@myshell-run/common-ui';
import { Delete, editable, EditableHandle, plainSchema } from 'edix';
import { isEmpty } from 'radash';
import { useEffect, useRef, useState } from 'react';

export const ChatInputAdvancedInputPlugin = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  const handle = useRef<EditableHandle | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    return (handle.current = editable(ref.current, {
      schema: plainSchema({ multiline: true }),
      onChange: setValue,
    })).dispose;
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={cn(
          'text-lg-regular',
          'my-spacing-xs-v2 w-full resize-none !px-spacing-sm-v2 outline-none',
        )}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!ref.current) return;
            // todo: 这种方式会有选中，而且不会清空 history，如果不满足需求，需要进一步 patch
            // 核心是不能通过外部 setValue(更新) value，而应该是 edix -> setValue -> value(render) 这样，所有 modification 都必须从 edix
            ref.current.focus();
            window.getSelection()?.selectAllChildren(ref.current);
            handle.current?.syncSelection();
            setTimeout(() => handle.current?.command(Delete));
            // model.sendChatInputDoc();
          }
        }}
        // 使用 tailwindcss 代替了
        // style={{
        //   // backgroundColor: 'white',
        //   // border: 'solid 1px darkgray',
        //   // padding: 8,
        // }}
        aria-placeholder="Write a message"
      >
        {!isEmpty(
          value,
        ) /* value = '' split -> ['']  [contenteditable]:empty 不是 empty */ &&
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
};
