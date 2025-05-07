import { Search } from 'lucide-react';
import { BotListModel } from './bot-list.model';
import { useInjection } from '@myshell-run/ui-primitives';
import { observer } from 'mobx-react-lite';

export const BotListSearch = observer(() => {
  const model = useInjection(BotListModel);
  return (
    <div className="mx-spacing-xl-v1 my-spacing-lg-v1 flex h-[36px] items-center rounded-full-v1 border border-border-default-light-v1 bg-surface-accent-gray-subtlest-light-v1 px-spacing-lg-v1 py-spacing-xs-v1">
      <Search
        className="mr-spacing-lg-v1 text-text-subtler-light-v1"
        size={20}
      />
      <input
        className="text-sm-regular text-text-default-light-v1 outline-none"
        type="text"
        value={model.searchText}
        onChange={(e) => model.setSearchText(e.target.value)}
        placeholder="Search MyShell"
      />
    </div>
  );
});
