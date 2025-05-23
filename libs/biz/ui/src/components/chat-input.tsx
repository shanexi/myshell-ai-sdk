import { cn, ImageState } from '@myshell-run/common-ui';
import { useInjection } from 'inversify-react';
import {
  Button,
  Menu,
  MenuItem,
} from '@myshell-run/react-aria-tailwind-starter';
import toArray from '@uppy/utils/lib/toArray';
import { AlignJustify, CirclePlus, X } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { MenuTrigger } from 'react-aria-components';
import TextareaAutosize from 'react-textarea-autosize';
import { ReactComponent as Audio } from './audio.svg';
import { ChatModel } from './chat.model';
import { ReactComponent as Clear } from './clear.svg';
import { ReactComponent as Send } from './send.svg';
import { ReactComponent as Trash } from './trash.svg';

export const ChatInputMenu = (props: { className?: string }) => {
  const { className } = props;
  return (
    <MenuTrigger>
      <Button
        variant="icon"
        className={cn(
          'x-custom-react-aria-Button z-10 data-hovered:bg-transparent',
          className,
        )}
        // 指定 id 否则 hydrate 会报错
        id={'chat-input-menu-btn'}
      >
        <AlignJustify strokeWidth={1.5} className="text-text-brand-light-v1" />
      </Button>
      <Menu>
        <MenuItem id="clear">
          <Clear className="h-5 w-5" />
          Clear Memory
        </MenuItem>
        <MenuItem id="delete">
          <Trash className="h-5 w-5" />
          Delete Chat History
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

export const ChatTextarea = observer(() => {
  const model = useInjection(ChatModel);
  // TextareaAutosize 有 bug，SSR 传 value 会报错（其实是 warning 但是 react 通过 error 抛出了）
  // Use the `defaultValue` or `value` props instead of setting children on <textarea>.
  // 先通过 two-pass rendering 规避
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <TextareaAutosize
      className={cn(
        'text-sm-regular w-full rounded-t-4xl-v1 px-[16px] pt-spacing-md-v1',
        'resize-none outline-none',
        'border-border-default-light-v1 bg-surface-container-special-subtle-light-v1',
      )}
      maxRows={8}
      placeholder="Write a message"
      {...(isClient
        ? {
            value: model.inputText,
            onChange: (e) => model.setInputText(e.target.value),
            onKeyDown: (e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                model.sendText();
              }
            },
          }
        : {})}
    />
  );
});

export const ChatUploadArea = observer(() => {
  const model = useInjection(ChatModel);
  return (
    <div
      className={cn(
        'flex flex-nowrap gap-spacing-md-v1 overflow-x-auto px-spacing-lg-v1 py-spacing-sm-v1',
        'bg-surface-container-special-subtle-light-v1',
      )}
    >
      {/* TODO 去掉 type cast 开发 file 类型上传支持 */}
      {Array.from(model.uppyStateMap as Map<string, ImageState>).map(
        ([id, file]) =>
          file.preview ? <Image key={id} fileState={file} id={id} /> : null,
      )}
    </div>
  );
});

export const Image: React.FC<{ fileState: ImageState; id: string }> = ({
  fileState,
  id,
}) => {
  const model = useInjection(ChatModel);
  return (
    <div className="relative flex-none">
      <img
        className={cn('h-[64px] w-[64px] rounded-xl-v1')}
        alt=""
        src={fileState.preview}
      />
      <div
        onClick={() => model.removeFile(id)}
        className={cn(
          'absolute top-[-6px] right-[-6px]',
          'h-[20px] w-[20px] rounded-full-v1',
          'bg-text-subtler-light-v1',
          'flex items-center justify-center',
        )}
      >
        {fileState.uploadComplete ? (
          <X color="#fff" size={16} />
        ) : (
          <span className="loading loading-xs loading-spinner text-white"></span>
        )}
      </div>
    </div>
  );
};

export const ChatInput = observer(() => {
  const model = useInjection(ChatModel);
  const dropTargetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (dropTargetRef.current) {
      model.setupUppy(dropTargetRef.current);
    }
    return () => {
      model.uppy.destroy();
    };
  }, []);
  return (
    <div
      ref={dropTargetRef}
      className="mx-[8px] my-spacing-md-v1 flex flex-col"
    >
      <ChatTextarea />
      <ChatUploadArea />
      <div
        className={cn(
          'flex items-center rounded-b-4xl-v1 pb-spacing-md-v1',
          'border-border-default-light-v1 bg-surface-container-special-subtle-light-v1',
        )}
      >
        <div className="relative flex min-h-[36px] flex-1 items-center">
          <ChatInputMenu />
          <ChatInputFile />
        </div>
        {model.notHaveInputText ? <ChatInputAudio /> : <ChatInputSend />}
      </div>
    </div>
  );
});

export const ChatInputFile = () => {
  const model = useInjection(ChatModel);
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
      className="flex h-[24px] w-[24px] flex-none items-center justify-center"
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        name="files[]"
        multiple={model.maxNumberOfFiles}
        accept={model.accept}
        onChange={(e) => {
          model.uppy.log('[FileInput] Something selected through input...');
          const files = toArray(e.target.files || []);

          const descriptors = files.map((file) => ({
            source: 'FileInput',
            name: file.name,
            type: file.type,
            data: file,
          }));

          try {
            model.uppy.addFiles(descriptors);
          } catch (err) {
            model.uppy.log(err);
          }
        }}
        style={hiddenInputStyle}
      />
      <CirclePlus
        strokeWidth={1.5}
        className="text-text-brand-light-v1"
        size={24}
      />
    </div>
  );
};

export function ChatInputAudio() {
  return (
    <div className="flex h-[22px] w-[22px] flex-none items-center justify-center">
      <Audio className="h-full w-full" />
    </div>
  );
}

export function ChatInputSend() {
  return (
    <div className="flex h-[28px] w-[28px] flex-none items-center justify-center rounded-full-v1 bg-icon-brand-light-v1">
      <Send />
    </div>
  );
}
