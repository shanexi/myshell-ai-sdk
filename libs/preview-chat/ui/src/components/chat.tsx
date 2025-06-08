import { useEffect, useRef } from 'react';
import { ChatInput } from './chat-input';
import { ChatMessageList, cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { PreviewChatModel } from './preview-chat-model';
import { observer } from 'mobx-react-lite';
import { ReactComponent as Dragging } from './dragging.svg';
import { Drawer } from 'vaul';
import { LuiForm } from './lui-form/lui-form';

export const LuiFormDrawer = observer(() => {
  const model = useInjection(PreviewChatModel);
  return (
    <Drawer.Root open={model.isLuiFormOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 mt-24 flex h-[80%] flex-col rounded-t-[10px] bg-gray-100 outline-none lg:h-[320px]">
          <div className="flex-1 overflow-y-auto rounded-t-[10px]">
            <LuiForm jsonschema={model.jsonschema} uischema={model.uischema} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
});

export const Chat = observer(() => {
  const model = useInjection(PreviewChatModel);
  const dropTargetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dropTargetRef.current) {
      model.chatCommon.setupUppy(dropTargetRef.current);
    }
  }, []);
  return (
    <div className="h-full">
      <div ref={dropTargetRef} className="flex h-full flex-col">
        <ChatMessageList
          chatCommonModel={model.chatCommon}
          className="flex flex-grow flex-col overflow-auto px-[8px]"
          initialMessages={[]}
        />
        <ChatInput />
        {model.chatCommon.isDragging && <Mask />}
      </div>
      <LuiFormDrawer />
    </div>
  );
});

// TODO: 这些暂时先不下沉到 common-ui
// 实际上 UI 的 extract 一般价值不大（逻辑都被 model 吃掉了）
const Mask = () => {
  return (
    <div
      className={cn(
        'absolute h-full w-full',
        'bg-white/90',
        'flex flex-col items-center justify-center',
      )}
    >
      <Dragging />
      <div className="display-md-emphasized mt-[12px] text-center text-Cr-text-default-light-v2">
        Add any content
      </div>
      <div className="text-sm-regular mt-[4px] text-center">
        Drag and drop any file here to add it to the conversation.
      </div>
    </div>
  );
};
