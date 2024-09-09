import { useTheme } from 'next-themes';
import { useClientCss } from '../../common/hooks/useClientCss.js';
export const useHljsCss = typeof window !== 'undefined'
    ? () => {
        const { resolvedTheme } = useTheme();
        useClientCss(resolvedTheme === 'dark' ? '/github-dark.css' : '/github.css');
    }
    : () => {
    };
