import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import clsx from 'clsx';
import { throttle } from 'lodash-es';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { useMedia, useToggle } from 'react-use';
import { Text } from '../../../../../../common/components/ui/typography.js';
function trimNewlines(str) {
    return str.replace(/^\n+|\n+$/g, '');
}
export default function Description({ showMore = true, desc = '' }) {
    const trimmedDesc = trimNewlines(desc);
    const t = useTranslations('common');
    const [show, setShow] = useToggle(false);
    const textRef = useRef(null);
    const [hasMore, setHasMore] = useState(false);
    const isMd = useMedia('(min-width: 768px)');
    useEffect(() => {
        const handleCalcActualSize = () => {
            setShow(false);
            if (textRef.current) {
                const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
                const maxHeight = isMd ? lineHeight * 2 : lineHeight * 3;
                setHasMore(textRef.current.scrollHeight > maxHeight);
            }
        };
        handleCalcActualSize();
        window.addEventListener('resize', throttle(handleCalcActualSize, 500));
        return () => {
            window.removeEventListener('resize', handleCalcActualSize);
        };
    }, [isMd, trimmedDesc]);
    const handleToggle = () => setShow(!show);
    if (!trimmedDesc)
        return null;
    return (_jsx("div", { className: "text-sm flex flex-col w-full whitespace-pre-line", children: _jsxs("div", { className: "relative w-full flex flex-col gap-1", children: [_jsx("p", { ref: textRef, className: clsx('text-subtler leading-[1.5]', hasMore && !show && 'line-clamp-3 md:line-clamp-2'), style: {
                        maxHeight: show ? 'none' : isMd ? '3rem' : '4.5rem'
                    }, children: trimmedDesc }), hasMore && showMore && (_jsx(Text, { className: "px-0.5 text-surface-primary-default cursor-pointer", weight: "medium", size: "sm", onClick: handleToggle, children: t(show ? 'show_less' : 'show_more') }))] }) }));
}
