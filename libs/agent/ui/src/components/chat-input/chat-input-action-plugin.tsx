import { CirclePlus, Mic } from 'lucide-react';

export const ChatInputActionPlugin = () => {
  return (
    <div className="my-spacing-xs-v2 flex items-center justify-between">
      <CirclePlus strokeWidth={1.5} size={36} className="p-[7px]" />
      <Mic strokeWidth={1.5} size={36} className="p-[7px]" />
    </div>
  );
};
