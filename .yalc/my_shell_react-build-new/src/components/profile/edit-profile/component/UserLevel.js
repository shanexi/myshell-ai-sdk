import { jsx as _jsx } from "react/jsx-runtime";
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
export default function UserLevel({ user }) {
    const t = useTranslations('profile');
    return (_jsx("span", { className: clsx('flex-shrink-0 h-6 leading-6 px-[10px] bg-[#EBE1FF] rounded-lg text-xs text-[#391C79] font-bold', user && (user.isGenesisPasscard || user?.isPasscard)
            ? 'bg-[#FFF2E2] text-[#FDA500] dark:bg-[#4F3E2C] dark:text-[#FFC453]'
            : user?.level === 2
                ? 'bg-[#E0E5FF] text-[#3E5CFA] dark:bg-[#2C334F] dark:text-[#5974FF]'
                : 'bg-[#EDEEEF] text-[#414345] dark:bg-[#42434A] dark:text-[#B8BCCF]'), children: user && (user.isGenesisPasscard || user?.isPasscard)
            ? t('genesis')
            : user?.level === 2
                ? t('standard')
                : t('basic') }));
}
