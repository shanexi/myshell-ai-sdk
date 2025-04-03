import { Search } from 'lucide-react';
import { BotListModel } from './bot-list.model';
import { useInjection } from '@myshell-run/ui-primitives';
import { observer } from 'mobx-react-lite';

export const BotListSearch = observer(() => {
  const model = useInjection(BotListModel);
  return (
    <div className="mx-spacing-xl my-spacing-lg flex h-[36px] items-center rounded-full border border-border-default-light bg-surface-accent-gray-subtlest-light px-spacing-lg py-spacing-xs">
      <Search className="mr-spacing-lg text-text-subtler-light" size={20} />
      <input
        className="text-sm-regular text-text-default-light outline-none"
        type="text"
        value={model.searchText}
        onChange={(e) => model.setSearchText(e.target.value)}
        placeholder="Search MyShell"
      />
    </div>
  );
});
