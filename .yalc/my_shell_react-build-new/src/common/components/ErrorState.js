import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import { useTranslations } from 'next-intl';
import { cn } from '../../lib/utils.js';
import { Button } from './ui/button.js';
function ErrorState({ className, onClick }) {
    const t = useTranslations();
    return (_jsxs("div", { className: cn('w-full h-full flex flex-col justify-start items-center p-6 !mb-[20%]', className), children: [_jsx("img", { src: "https://image.myshell.ai/image/website/error/20240603/error-state.png", alt: "error logo", className: "w-[225px] h-[180px]" }), _jsxs("p", { className: "mt-8 md:mt-12 text-[24px] font-semibold text-default", children: [t('disconnect_tip_oops'), "!!"] }), _jsx("p", { className: "mt-2 text-base text-subtler text-center md:text-left", children: t('common.error_oops') }), _jsx(Button, { variant: "outline", className: "mt-6 flex justify-center items-center", onClick: onClick, children: _jsxs("span", { className: "flex justify-center items-center space-x-1.5 text-brand", children: [_jsx(ArrowPathIcon, { className: "text-brand stroke-brand w-5 h-5" }), _jsx("span", { className: "text-base", children: `${t('profile.refresh')}` })] }) })] }));
}
export default ErrorState;
