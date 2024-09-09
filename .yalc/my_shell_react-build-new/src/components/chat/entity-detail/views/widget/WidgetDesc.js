import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { getAssetsUrlV2 } from '../../../../../common/utils/common-helper.js';
export default function WidgetDesc() {
    const t = useTranslations('workshop');
    return (_jsxs("div", { className: "flex flex-col space-y-1", children: [_jsxs("p", { className: "space-x-1", children: [_jsx(Image, { alt: "Basic Widget", src: getAssetsUrlV2('image/widget/icon/20240105/block/green.png'), width: 16, height: 16, className: "inline-block" }), _jsx("span", { children: t('basic_widget_desc') })] }), _jsxs("p", { className: "space-x-1", children: [_jsx(Image, { alt: "Composite Widget", src: getAssetsUrlV2('image/widget/icon/20240105/block/blue.png'), width: 16, height: 16, className: "inline-block" }), _jsx("span", { children: t('composite_widget_desc') })] }), _jsxs("p", { className: "space-x-1", children: [_jsx(Image, { alt: "Application (Bot)", src: getAssetsUrlV2('image/widget/icon/20240105/block/purple.png'), width: 16, height: 16, className: "inline-block" }), _jsx("span", { children: t('application_desc') })] })] }));
}
