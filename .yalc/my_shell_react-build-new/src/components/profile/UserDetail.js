import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getBotsByUser, getWidgetsByUser } from '../../apis/user.js';
import { MTooltip, MTooltipContent, MTooltipTrigger } from '../../common/components/ui/mobile/m-tooltip.js';
import { Tooltip } from '../../common/components/ui/tooltip.js';
import { Text } from '../../common/components/ui/typography.js';
import { FollowStatus } from '../../common/constants/enums/user.js';
import { usePathLocale } from '../../common/hooks/usePathLocale.js';
import { getAssetsUrl, getAssetsUrlV2 } from '../../common/utils/common-helper.js';
import { BotLogo } from '../../components/workshop/bot-detail/BotLogo.js';
import UserGalleryList from '../../gallery/views/UserGalleryList.js';
import FollowInfo from './FollowInfo.js';
import UserBotList from './UserBotList.js';
import UserDetailModal from './UserDetailModal.js';
import UserBg from './edit-profile/component/UserBg.js';
import { UserFollowBtn } from './edit-profile/component/UserFollowBtn.js';
import UserLevel from './edit-profile/component/UserLevel.js';
import { UserShareBtn } from './edit-profile/component/UserShareBtn.js';
import Description from '../chat/entity-detail/views/common/description/Description.js';
import WidgetList from '../workshop/bot-detail/bot-widget-list/index.js';
import { useGalleryStore } from '../../services/store/gallery.js';
import { useSearchParams } from 'next/navigation';
export default function UserDetail({ showInsideScroller = false, detailData, showTopActions = false, defaultTab = 'bots', onClose, followCallback }) {
    const searchParams = useSearchParams();
    const from = searchParams.get('from');
    const [fetchLoading, setFetchLoading] = useState(false);
    const [activeContent, setActiveContent] = useState(from === 'gallery' ? 'gallery' : defaultTab);
    const [showUserDetail, setShowUserDetail] = useState(null);
    const [widgets, setWidgets] = useState();
    const [bots, setBots] = useState();
    const t = useTranslations();
    const botT = useTranslations('bot');
    const workshopT = useTranslations('workshop');
    const { isMobile } = usePathLocale();
    const setGalleryUserList = useGalleryStore(state => state.setGalleryUserList);
    const queryData = useCallback(async () => {
        try {
            if (detailData?.id) {
                setFetchLoading(true);
                const [botList, widgetList] = await Promise.all([
                    getBotsByUser(detailData?.id),
                    getWidgetsByUser(detailData?.id)
                ]);
                setBots(botList.data);
                setWidgets(widgetList.data?.widgets);
                setFetchLoading(false);
            }
        }
        catch (error) {
            console.error(error);
            setFetchLoading(false);
        }
    }, [detailData?.id]);
    useEffect(() => {
        if (fetchLoading)
            return;
        queryData();
        return () => {
            setGalleryUserList([]);
        };
    }, [detailData?.id]);
    const containerRef = useRef(null);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: `UserDetail ${showInsideScroller ? 'overflow-hidden h-full md:overflow-auto' : 'h-full overflow-hidden'} flex w-full flex-col flex-nowrap bg-surface text-on-surface relative md:rounded-4xl`, children: [showTopActions && (_jsx(_Fragment, { children: isMobile ? (_jsxs(_Fragment, { children: [_jsx("div", { className: clsx('absolute top-[10px] md:top-5 flex z-10 space-x-3 left-5'), children: _jsx("div", { className: "bg-white rounded-full border border-[#E4E9F0] w-9 h-9 cursor-pointer shadow-button-basic flex justify-center items-center", onClick: onClose, children: _jsx(ArrowLeftIcon, { className: "w-[22px] h-[22px] text-[#202223]" }) }) }), _jsx("div", { className: clsx('absolute top-[10px] md:top-5 flex z-10 space-x-3 right-5'), children: _jsx(UserShareBtn, { userName: detailData?.name, nameTag: detailData?.nameTag, userId: detailData?.id }) })] })) : (_jsxs("div", { className: clsx('absolute top-[10px] md:top-5 flex z-10 space-x-3', isMobile ? 'left-4' : 'right-5'), children: [_jsx(UserShareBtn, { userName: detailData?.name, nameTag: detailData?.nameTag, userId: detailData?.id }), _jsx("div", { className: "bg-white rounded-full border border-[#E4E9F0] w-9 h-9 cursor-pointer shadow-button-basic flex justify-center items-center", onClick: onClose, children: _jsx(XMarkIcon, { className: "w-[22px] h-[22px] text-[#202223]" }) })] })) })), _jsx("div", { ref: containerRef, className: clsx('flex flex-col flex-grow items-center relative overflow-auto'), children: _jsxs("div", { className: "flex flex-col w-full h-full pb-[8px] md:h-full md:pb-[12px]", children: [_jsxs("div", { className: "w-full", children: [_jsx(UserBg, { bgPhoto: getAssetsUrlV2(detailData?.backgroundUrl), showUpload: false }), _jsxs("div", { className: "relative flex space-x-3 md:space-x-5", children: [_jsx(BotLogo, { logoUrl: getAssetsUrl(detailData?.avatar) }), !isMobile && (_jsxs("div", { className: "grow flex items-end justify-between pr-6 pb-1", children: [_jsxs("div", { className: "flex flex-col", children: [_jsxs("div", { className: "flex items-center space-x-1.5 pr-1.5 pb-1", children: [_jsx("span", { className: clsx('text-2xl md:text-[28px] md:leading-[36px] font-semibold text-on-surface line-clamp-1 break-all'), children: detailData?.name }), _jsx(UserLevel, { user: detailData })] }), _jsx(FollowInfo, { user: detailData })] }), (detailData?.followStatus === FollowStatus.FOLLOWED ||
                                                            detailData?.followStatus === FollowStatus.NOT_FOLLOWED) && (_jsx(UserFollowBtn, { detailData: detailData, followCallback: followCallback }))] })), isMobile &&
                                                    (detailData?.followStatus === FollowStatus.FOLLOWED ||
                                                        detailData?.followStatus === FollowStatus.NOT_FOLLOWED) && (_jsx("div", { className: "absolute right-0 top-0 px-4 py-3", children: _jsx(UserFollowBtn, { detailData: detailData, size: "md", followCallback: followCallback, className: "min-w-[76px]" }) }))] })] }), isMobile && (_jsxs("div", { className: "flex flex-col px-4 mt-2", children: [_jsxs("div", { className: "flex items-center space-x-1.5 pr-1.5 pb-1", children: [_jsx("span", { className: clsx('text-2xl md:text-[28px] md:leading-[36px] font-semibold text-on-surface line-clamp-1 break-all'), children: detailData?.name }), _jsx(UserLevel, { user: detailData })] }), _jsx(FollowInfo, { user: detailData })] })), detailData?.description && (_jsx("div", { className: "px-2 ml-6", children: _jsx(Description, { desc: detailData?.description }) })), _jsxs("div", { className: clsx('flex-1 pt-[6px] md:pb-5 flex flex-col space-y-4 mt-2 md:mt-5 ', activeContent === 'gallery' ? '' : 'md:px-6'), children: [_jsx("div", { className: clsx('sticky bg-surface top-0 z-[2] md:relative md:bg-inherit md:z-auto mx-4 md:mx-2', activeContent === 'gallery' ? 'md:px-6' : ''), children: _jsx("div", { className: "flex justify-between items-center border-b border-default", children: _jsxs("div", { className: "flex space-x-2 items-center", children: [_jsxs("div", { className: "flex space-x-6 items-center", children: [_jsx("div", { className: clsx('cursor-pointer relative z-[1] font-[500] text-sm md:text-base text-center', activeContent === 'bots'
                                                                        ? 'pb-[5px] border-b-[2px] border-primary text-primary'
                                                                        : 'pb-[7px] text-secondary'), onClick: () => setActiveContent('bots'), children: botT('robot') }), _jsx("div", { className: clsx('cursor-pointer relative z-[1] font-[500] text-sm md:text-base text-center', activeContent === 'widgets'
                                                                        ? 'pb-[5px] border-b-[2px] border-primary text-primary'
                                                                        : 'pb-[7px] text-secondary'), onClick: () => setActiveContent('widgets'), children: workshopT('widget') }), _jsx("div", { className: clsx('cursor-pointer relative z-[1] font-[500] text-sm md:text-base text-center', activeContent === 'gallery'
                                                                        ? 'pb-[5px] border-b-[2px] border-primary text-primary'
                                                                        : 'pb-[7px] text-secondary'), onClick: () => setActiveContent('gallery'), children: t('chat.gallery') })] }), detailData?.rugged &&
                                                            (isMobile ? (_jsxs(MTooltip, { children: [_jsx(MTooltipTrigger, { children: _jsxs("div", { className: "h-[22px] px-4 flex items-center gap-1 bg-surface-accent-red-subtler rounded-full mb-[7px]", children: [_jsx(InformationCircleIcon, { className: "w-3 h-3 text-critical" }), _jsx(Text, { className: "text-xs", weight: "medium", color: "critical", children: botT('scam_alert') })] }) }), _jsx(MTooltipContent, { className: "z-[999] w-[280px]", align: "end", children: _jsx(Text, { className: "text-xs font-medium", children: botT('scam_alert_tips') }) })] })) : (_jsx(Tooltip, { description: botT('scam_alert_tips'), align: "center", contentClassName: "w-[280px]", children: _jsxs("div", { className: "h-[22px] px-3 py-2 flex items-center gap-1 bg-surface-accent-red-subtler rounded-full mb-[7px]", children: [_jsx(InformationCircleIcon, { className: "w-3 h-3 text-critical" }), _jsx(Text, { className: "text-xs", weight: "medium", color: "critical", children: botT('scam_alert') })] }) })))] }) }) }), activeContent === 'bots' && (_jsx("div", { className: "mx-4 md:mx-0", children: _jsx(UserBotList, { bots: bots || [], onClose: onClose, loading: fetchLoading }) })), activeContent === 'widgets' && (_jsx("div", { className: "mx-4 md:mx-0", children: _jsx(WidgetList, { widgets: widgets ?? [], pinnedCallback: () => {
                                                    queryData();
                                                }, onClose: onClose, setShowUserDetail: setShowUserDetail }) })), activeContent === 'gallery' && _jsx(UserGalleryList, { userId: detailData?.id, containerRef: containerRef })] })] }) })] }), !isMobile && !!showUserDetail?.name && (_jsx(UserDetailModal, { isOpen: !!showUserDetail?.name, onClose: () => {
                    onClose && onClose();
                    setShowUserDetail(null);
                }, userName: showUserDetail.name, nameTag: showUserDetail.nameTag }))] }));
}
