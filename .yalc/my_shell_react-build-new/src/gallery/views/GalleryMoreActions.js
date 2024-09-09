import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrashIcon } from '@heroicons/react/24/outline';
import EllipsisHorizontalIcon from '@heroicons/react/24/outline/EllipsisHorizontalIcon';
import { useTranslations } from 'next-intl';
import { useMedia } from 'react-use';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../common/components/ui/dropdown-menu.js';
import { Icon } from '../../common/components/ui/icon.js';
import { IconButton } from '../../common/components/ui/icon-button.js';
import { Text } from '../../common/components/ui/typography.js';
export default function GalleryMoreActions({ handleDelete }) {
    const t = useTranslations('common');
    const isMd = useMedia('(min-width: 768px)');
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, tabIndex: -1, onClick: e => {
                    e.stopPropagation();
                }, children: _jsx(IconButton, { icon: EllipsisHorizontalIcon, size: isMd ? 'md' : 'sm', variant: "ghost", color: "default" }) }), _jsx(DropdownMenuContent, { side: "bottom", align: "end", onClick: e => {
                    e.stopPropagation();
                }, children: _jsx(DropdownMenuItem, { asChild: true, children: _jsxs("div", { className: "w-full space-x-1.5 cursor-pointer", onClick: handleDelete, children: [_jsx(Icon, { component: TrashIcon, size: "lg", color: "critical" }), _jsx(Text, { size: "lg", color: "critical", children: t('delete') })] }) }) })] }));
}
