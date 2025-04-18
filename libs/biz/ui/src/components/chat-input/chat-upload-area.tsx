import { PropsWithChildren, useEffect, useRef } from 'react';
import { MyMotion, MyMotionRef } from './my-motion';
import { observer } from 'mobx-react-lite';
import { useInjection } from '@myshell-run/ui-primitives';
import { ChatModel } from '../chat.model';
import { reaction } from 'mobx';
import { BgClz } from '../chat-input-re';
import * as Slot from '@radix-ui/react-slot';

export const ChatUploadArea = observer(() => {
  const model = useInjection(ChatModel);
  const myMotionRef = useRef<MyMotionRef>(null);
  useEffect(() => {
    const disposer = reaction(
      () => model.isShowUploadArea,
      (isShowUploadArea) => {
        if (isShowUploadArea) {
          myMotionRef.current?.toggle(true);
        } else {
          myMotionRef.current?.toggle(false);
        }
      },
    );
    return disposer;
  }, []);
  return (
    <MotionClz>
      <MyMotion
        className="absolute top-0"
        ref={myMotionRef}
        from="opacity-0"
        to={`-translate-y-[calc(100%+80px)]`}
      >
        <BgClz>
          <div className="text-sm-regular h-[40px] px-spacing-lg">
            ChatUploadArea
          </div>
        </BgClz>
      </MyMotion>
    </MotionClz>
  );
});

export const MotionClz: React.FC<PropsWithChildren> = ({ children }) => (
  <Slot.Root className="w-full px-2 transition-[translate,opacity] ease-in-out">
    <Slot.Slottable>{children}</Slot.Slottable>
  </Slot.Root>
);
