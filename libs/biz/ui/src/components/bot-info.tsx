import { ReactComponent as CheckBadge } from './check-badge.svg';
// import { ReactComponent as Company } from './company.svg';
import { ChevronsUp, Share } from 'lucide-react';
import { DEFAULT_AVATAR } from '@myshell-run/def';
import { DbBot } from '@myshell-run/biz-def';

export function BotInfo(props: { bot: DbBot }) {
  const { bot } = props;
  const { avatar = DEFAULT_AVATAR, name = 'Bot', isOfficial } = bot;
  return (
    <div className="x-bot-info flex items-center justify-between px-[8px] py-[4px]">
      <div className="flex items-center">
        <img
          className="mr-[8px] h-[36px] w-[36px] rounded-lg-v1"
          src={avatar}
        />
        <div>
          <div className="flex items-center">
            <label className="heading-h4 text-text-default-light-v1">
              {name}
            </label>
            {isOfficial && <CheckBadge className="ml-spacing-xs-v1" />}
            {/* <Company className="ml-spacing-xs-v1" /> */}
          </div>
          {/* <div className="text-sm-medium text-text-brand-light-v1">@Sam</div> */}
        </div>
      </div>
      <div className="flex">
        <div className="mr-spacing-xs-v1 p-[7px]">
          <ChevronsUp className="text-text-brand-light-v1" />
        </div>
        <div className="p-[7px]">
          <Share className="text-text-brand-light-v1" />
        </div>
      </div>
    </div>
  );
}
