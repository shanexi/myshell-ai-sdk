"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoute = void 0;
const navigation_1 = require("next/navigation");
const useRoute = () => {
    const router = (0, navigation_1.useRouter)();
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
exports.useRoute = useRoute;
