import { jsx as _jsx } from "react/jsx-runtime";
import { useTranslations } from 'next-intl';
import NormalCard from '../../../../common/components/NormalCard.js';
import { WidgetChatCallerTypeEnum } from '../../../../common/constants/enums/workshop.js';
import { cn } from '../../../../lib/utils.js';
export default function WidgetList({ showSimplifyTags = false, widgets, pinnedCallback, onClose, setShowUserDetail }) {
    const workshopT = useTranslations('workshop');
    const widgetList = widgets?.map(item => {
        return {
            title: item.name,
            description: item.description,
            logoUrl: item.logoUrl,
            id: item.id,
            clickUrl: `/robot-workshop/widget/${item.id}`,
            clickMobileUrl: `/robot-workshop/widget/${item.id}`,
            showVoice: item.chatCallerType === WidgetChatCallerTypeEnum.WIDGET_CHAT_CALLER_TYPE_VOICE,
            type: 'WIDGET',
            tags: item.tags
        };
    }) || [];
    return widgetList.length ? (_jsx("div", { className: cn('grid grid-cols-1 gap-x-4 gap-y-2', widgetList.length > 0 ? 'md:grid-cols-2' : ''), children: widgetList.map((widget, index) => {
            return _jsx(NormalCard, { size: "sm", showTags: true, item: widget, isLine: true }, widget.id);
        }) })) : (_jsx("div", { className: "text-on-surface h-[120px] flex justify-center items-center", children: workshopT('no_widgets_available') }));
}
