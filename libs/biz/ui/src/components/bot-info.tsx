import { ReactComponent as CheckBadge } from './check-badge.svg';
// import { ReactComponent as Company } from './company.svg';
import { ChevronsUp, Share } from 'lucide-react';
import { DEFAULT_AVATAR } from '@myshell-run/biz-def';
import { DbBot } from '@myshell-run/biz-def';

export function BotInfo(props: { bot: DbBot }) {
  const { bot } = props;
  const { avatar = DEFAULT_AVATAR, name = 'Bot', isOfficial } = bot;
  return (
    <div className="x-bot-info flex items-center justify-between px-[8px] py-[4px]">
      <div className="flex items-center">
        <img className="mr-[8px] h-[36px] w-[36px] rounded-lg" src={avatar} />
        <div>
          <div className="flex items-center">
            <label className="heading-h4 text-text-default-light">{name}</label>
            {isOfficial && <CheckBadge className="ml-spacing-xs" />}
            {/* <Company className="ml-spacing-xs" /> */}
          </div>
          {/* <div className="text-sm-medium text-text-brand-light">@Sam</div> */}
        </div>
      </div>
      <div className="flex">
        <div className="mr-spacing-xs p-[7px]">
          <ChevronsUp className="text-text-brand-light" />
        </div>
        <div className="p-[7px]">
          <Share className="text-text-brand-light" />
        </div>
      </div>
    </div>
  );
}
