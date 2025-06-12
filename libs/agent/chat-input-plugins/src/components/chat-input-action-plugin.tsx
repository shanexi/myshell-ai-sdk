import { cn } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import { ArrowUp, CirclePlus, Mic } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { ChatInputModel } from './chat-input.model';
import { useRef } from 'react';
import toArray from '@uppy/utils/lib/toArray';

export const ChatInputActionPlugin = observer(() => {
  const model = useInjection(ChatInputModel);
  return (
    <div className={cn('flex items-center justify-between')}>
      <ChatInputFile />
      {model.showSendButton ? (
        <div
          onClick={() => model.sendText()}
          className={cn(
            'h-[28px] w-[28px]',
            'bg-CCr-button-primary-bg_default-light-v2',
            'rounded-C-button-md-radius-v2',
            'flex items-center justify-center',
            'cursor-pointer',
          )}
        >
          <ArrowUp strokeWidth={1.5} className="text-Cr-Fg-bolder-light-v2" />
        </div>
      ) : (
        <Mic
          strokeWidth={1.5}
          size={28}
          className="cursor-pointer p-[3px] text-CCr-icon-button-plain-fg_default-light-v2"
        />
      )}
    </div>
  );
});

export const ChatInputFile = () => {
  const model = useInjection(ChatInputModel);
  const inputRef = useRef<HTMLInputElement>(null);
  const hiddenInputStyle = {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
  } satisfies React.CSSProperties;

  return (
    <div
      className="flex h-[28px] w-[28px] flex-none items-center justify-center"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        name="files[]"
        multiple={model.chatCommon.uppyModel.multiple}
        accept={model.chatCommon.uppyModel.accept}
        onChange={(e) => {
          model.chatCommon.uppyModel.uppy.log(
            '[FileInput] Something selected through input...',
          );
          const files = toArray(e.target.files || []);

          const descriptors = files.map((file) => ({
            source: 'FileInput',
            name: file.name,
            type: file.type,
            data: file,
          }));

          try {
            model.chatCommon.uppyModel.uppy.addFiles(descriptors);
          } catch (err) {
            model.chatCommon.uppyModel.uppy.log(err);
          }
        }}
        style={hiddenInputStyle}
      />
      <CirclePlus
        strokeWidth={1.5}
        size={22}
        className="cursor-pointer text-CCr-icon-button-plain-fg_default-light-v2"
      />
    </div>
  );
};
