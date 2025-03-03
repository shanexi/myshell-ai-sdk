import { ReactComponent as CheckBadge } from './check-badge.svg';
import { ReactComponent as Company } from './company.svg';
import { ReactComponent as Up } from './up.svg';
import { ReactComponent as Share } from './share.svg';

export function BotInfo() {
  return (
    <div className="x-bot-info flex items-center justify-between">
      <div className="flex items-center">
        <img
          className="mr-[8px] h-[36px] w-[36px] rounded-lg"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
        <div>
          <div className="flex items-center">
            <label className="heading-h4 text-text-default-light">
              Arcane Generator
            </label>
            <CheckBadge className="ml-spacing-xs" />
            <Company className="ml-spacing-xs" />
          </div>
          <div className="text-sm-medium text-text-brand-light">@Sam</div>
        </div>
      </div>
      <div className="flex">
        <div className="mr-spacing-xs p-[7px]">
          <Up />
        </div>
        <div className="p-[7px]">
          <Share />
        </div>
      </div>
    </div>
  );
}
