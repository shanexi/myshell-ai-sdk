import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useContext, useMemo } from 'react';
import { useEffectOnce } from 'react-use';
import { MessageContext } from '../../../../../../chat-new/context/MessageContext.js';
import { Text } from '../../../../../../common/components/ui/typography.js';
import { useDisplayContext } from '../../display-provider/index.js';
const MdViewer = dynamic(() => import('../../../../../../common/components/MdViewer.js'), {
    loading: () => _jsx("div", { children: "loading..." }),
    ssr: false
});
export default function TranslationDisplay() {
    const { translationStatus, translate } = useContext(MessageContext);
    const { message } = useDisplayContext();
    const chatLocale = useTranslations('chat');
    const onTranslate = () => {
        translate?.(message?.id);
    };
    const quotedReference = useMemo(() => {
        let result;
        if (message?.referenceText) {
            const referenceText = message.referenceText
                .split('\n')
                .map(line => `> ${line}`)
                .join('\n');
            result = `${referenceText}\n\n`;
        }
        return result;
    }, [message?.referenceText]);
    useEffectOnce(() => {
        if (!message?.translation) {
            onTranslate();
        }
    });
    if (message?.translation) {
        return _jsx(MdViewer, { content: `${quotedReference ?? ''}${message.translation}` });
    }
    if (translationStatus === 'TRANSLATING') {
        return (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Text, { className: "leading-7", children: chatLocale('translating') }), _jsx(ArrowPathIcon, { className: "animate-spin size-[18px]" })] }));
    }
    return (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Text, { className: "leading-7", children: chatLocale('translation_failed') }), _jsx(ArrowPathIcon, { className: "size-[18px] ", onClick: onTranslate })] }));
}
