import { useInjection } from '@myshell-run/ui-primitives';
import * as Slot from '@radix-ui/react-slot';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { BgClz } from '../chat-input-re';
import { ChatModel } from '../../../chat.model';
import { MyMotion, MyMotionRef } from './my-motion';
import { useFirstChildHeight } from './use-first-child-height';

export const ChatUploadArea = observer(() => {
  const model = useInjection(ChatModel);
  const myMotionRef = useRef<MyMotionRef>(null);
  const ref = useRef<HTMLDivElement>(null);

  useFirstChildHeight(ref, (height) => {
    model.layers.upload.height = height;
  });

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
    <div ref={ref}>
      <MotionClz>
        <MyMotion
          className="absolute top-0"
          ref={myMotionRef}
          from="opacity-0"
          to={`-translate-y-[calc(100%+${model.layers.textarea.height}px)]`}
        >
          <BgClz>
            <div className="text-sm-regular h-[40px] px-spacing-lg-v1">
              ChatUploadArea
            </div>
          </BgClz>
        </MyMotion>
      </MotionClz>
    </div>
  );
});

export const MotionClz: React.FC<PropsWithChildren> = ({ children }) => (
  <Slot.Root className="w-full px-2 transition-[translate,opacity] ease-in-out">
    <Slot.Slottable>{children}</Slot.Slottable>
  </Slot.Root>
);
