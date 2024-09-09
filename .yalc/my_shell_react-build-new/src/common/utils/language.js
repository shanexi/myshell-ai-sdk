import { notFound } from 'next/navigation';
import { COOKIE_LOCALE_NAME } from '../../../middlewares/constants.js';
export async function getMessages(locale) {
    try {
        return (await import(`/messages/${locale}.json`)).default;
    }
    catch (error) {
        notFound();
    }
}
export const setLocaleCookie = (locale) => {
    document.cookie = `${COOKIE_LOCALE_NAME}=${locale}; max-age=31536000; path=/`;
};
export const clearLocaleCookie = () => {
    document.cookie = `${COOKIE_LOCALE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
