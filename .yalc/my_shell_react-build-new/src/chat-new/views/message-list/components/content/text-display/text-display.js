import { jsx as _jsx } from "react/jsx-runtime";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useDisplayContext } from '../../display-provider/index.js';
import TranslationDisplay from './translation-display.js';
const MdViewer = dynamic(() => import('../../../../../../common/components/MdViewer.js'), {
    loading: () => _jsx("div", { children: "loading..." }),
    ssr: false
});
export default function TextDisplay() {
    const { message, displayMode } = useDisplayContext();
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
    if (displayMode === 'TRANSLATION') {
        return _jsx(TranslationDisplay, {});
    }
    return (message?.text && (_jsx(MdViewer, { content: `${quotedReference ?? ''}${message?.text ?? ''}`, status: message.status })));
}
