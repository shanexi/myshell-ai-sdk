"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const LogoLoading_1 = require("../../common/components/LogoLoading.js");
const store_1 = require("../../services/store/index.js");
const withAuth = (WrappedComponent, redirectRoute, loading) => {
    const WithAuth = props => {
        const router = (0, navigation_1.useRouter)();
        const isVisitor = (0, store_1.useUserStore)(state => state.isVisitor);
        const user = (0, store_1.useUserStore)(state => state.user);
        const userId = (0, store_1.useUserStore)(state => state.userId);
        (0, react_1.useEffect)(() => {
            if (isVisitor & 1 && redirectRoute) {
                router.replace(redirectRoute);
            }
        }, [isVisitor, router]);
        if (!user) {
            return !loading !== undefined && loading != null ? (loading) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full h-full flex flex-col justify-center items-center absolute top-0 left-0 z-[9999] bg-surface", children: (0, jsx_runtime_1.jsx)(LogoLoading_1.LogoLoading, {}) }));
        }
        if (isVisitor & 2 && userId) {
            return (0, jsx_runtime_1.jsx)(WrappedComponent, { ...props });
        }
        return null;
    };
    return WithAuth;
};
exports.default = withAuth;
