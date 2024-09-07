"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navigation_1 = require("next/navigation");
const usePathLocale_1 = require("../../common/hooks/usePathLocale.js");
const useBackToProfile = () => {
    const isMobile = (0, usePathLocale_1.useIsMobile)();
    const router = (0, navigation_1.useRouter)();
    const backToProfile = () => {
        if (isMobile) {
            router.back();
        }
    };
    return {
        backToProfile,
        isMobile
    };
};
exports.default = useBackToProfile;
