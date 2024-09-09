'use client';
import { useRouter } from 'next/navigation';
export const useRoute = () => {
    const router = useRouter();
    const openUrl = (url) => {
        if (!(url.startsWith('https') || url.startsWith('http'))) {
            router.push(url);
        }
        else {
            window.open(url);
        }
    };
    return {
        ...router,
        openUrl
    };
};
