import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { Fragment, cloneElement, useContext } from 'react';
import { useMedia, useToggle } from 'react-use';
import { StaticContext } from '../../../../../chat-new/context/StaticContext.js';
import { MenuFunctionEnum } from '../../../../../chat-new/model/definitions.js';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../../../../../common/components/ui/dropdown-menu.js';
import { IconButton } from '../../../../../common/components/ui/icon-button.js';
import ClearHistory from './clear-history/views/ClearHistory.js';
import ClearMemory from './clear-memory/views/ClearMemory.js';
import RemoveFromList from './remove-from-list/views/RemoveFromList.js';
export default function MenuList() {
    const isDesktop = useMedia('(min-width: 768px)');
    const [open, setOpen] = useToggle(false);
    const { type, entityInfo, menuDisabled, menuFunctions, customMenuFunction } = useContext(StaticContext);
    const { id } = entityInfo;
    const closeMenu = () => {
        setOpen(false);
    };
    return (_jsxs(DropdownMenu, { open: open, children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(IconButton, { variant: "ghost", color: "brand", size: "md", icon: open ? XMarkIcon : Bars3Icon, className: "data-[state=open]:bg-surface-hovered", onClick: () => setOpen(!open), disabled: menuDisabled || (!menuFunctions.length && !customMenuFunction?.length) }) }), _jsxs(DropdownMenuContent, { className: "w-[calc(100vw-32px)] md:w-fit", side: "top", align: "start", sideOffset: isDesktop ? 8 : 56, collisionPadding: { left: 16, right: 16 }, onInteractOutside: () => setOpen(false), onCloseAutoFocus: e => e.preventDefault(), children: [menuFunctions.map(fn => (_jsxs(Fragment, { children: [fn.menuFunction === MenuFunctionEnum.REMOVE_FROM_LIST && (_jsx(RemoveFromList, { type: type, id: id, onSuccess: closeMenu })), fn.menuFunction === MenuFunctionEnum.CLEAR_MEMORY && (_jsx(ClearMemory, { type: type, id: id, onSuccess: closeMenu })), fn.menuFunction === MenuFunctionEnum.CLEAR_HISTORY && (_jsx(ClearHistory, { type: type, id: id, onSuccess: closeMenu }))] }, fn.menuFunction))), (customMenuFunction ?? []).map((menu, index) => {
                        const Ele = cloneElement(menu, {
                            onSuccess: closeMenu
                        });
                        return _jsx(Fragment, { children: Ele }, index);
                    })] })] }));
}
