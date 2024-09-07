"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBackToHome = void 0;
const navigation_1 = require("next/navigation");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useBackToHome = () => {
    const isMobile = (0, usePathLocale_1.useIsMobile)();
    const router = (0, navigation_1.useRouter)();
    const back = () => {
        router.push(`${isMobile ? '/m' : ''}/explore`);
    };
    return back;
};
exports.useBackToHome = useBackToHome;
