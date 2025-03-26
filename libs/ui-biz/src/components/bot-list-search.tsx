import { Search } from 'lucide-react';
export function BotListSearch() {
  return (
    <div className="mx-spacing-xl my-spacing-lg flex h-[36px] items-center rounded-full border border-border-default-light px-spacing-lg py-spacing-xs">
      <Search className="mr-spacing-lg text-text-subtler-light" size={20} />
      <input
        className="text-sm-regular text-text-default-light outline-none"
        type="text"
        placeholder="Search MyShell"
      />
    </div>
  );
}
