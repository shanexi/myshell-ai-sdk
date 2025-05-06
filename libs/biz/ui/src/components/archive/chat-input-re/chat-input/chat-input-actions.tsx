import { useInjection } from '@myshell-run/ui-primitives';
import { AlignJustify, CirclePlus } from 'lucide-react';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { ReactComponent as Audio } from '../../../audio.svg';
import { ChatModel } from '../../../chat.model';

export const ChatInputActions = observer<{ placeholder?: string }>(
  ({ placeholder }) => {
    const model = useInjection(ChatModel);
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
      const disposer = reaction(
        () => model.isInputFocus,
        (isInputFocus) => {
          if (isInputFocus) {
            ref.current?.blur();
          }
        },
      );
      return () => disposer();
    }, []);
    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center">
          <AlignJustify
            strokeWidth={1.5}
            className="m-[2px] text-text-brand-light"
          />
          <CirclePlus
            strokeWidth={1.5}
            className="m-[2px] text-text-brand-light"
            size={24}
          />
          <input
            ref={ref}
            className="text-sm-regular mx-spacing-sm w-full caret-transparent outline-none"
            readOnly
            value={model.isInputFocus ? '' : model.inputText}
            placeholder={model.isInputFocus ? '' : placeholder}
            onClick={(e) => {
              model.setInputFocus(true);
            }}
          ></input>
        </div>
        <Audio className="" />
      </div>
    );
  },
);
