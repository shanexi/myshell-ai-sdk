"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const ArrowPathIcon_1 = __importDefault(require("@heroicons/react/24/outline/ArrowPathIcon"));
const MagnifyingGlassIcon_1 = __importDefault(require("@heroicons/react/24/outline/MagnifyingGlassIcon"));
const next_intl_1 = require("next-intl");
const Loading_1 = __importDefault(require("../../components/skeleton/Loading.js"));
const SearchListSkeleton_1 = require("../../components/skeleton/common/SearchListSkeleton.js");
const NormalCard_1 = __importDefault(require("./NormalCard.js"));
function SearchList({ loading, fetchError, hasMore, fetchEmpty, setShowUserDetail, searchList, getSearchList }) {
    const t = (0, next_intl_1.useTranslations)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-start h-screen !my-2 md:!my-4", children: [loading && searchList.length === 0 && (0, jsx_runtime_1.jsx)(SearchListSkeleton_1.SearchListSkeleton, {}), (0, jsx_runtime_1.jsx)("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 px-4 md:px-3.5 gap-y-2 !mt-0", style: {
                    gridAutoRows: 'minmax(0, max-content)'
                }, children: searchList?.map((item, index) => {
                    return ((0, jsx_runtime_1.jsx)(NormalCard_1.default, { item: item, isLine: true, setShowUserDetail: setShowUserDetail, className: "flex-grow" }, `searchList-common-item-${index}`));
                }) }), hasMore && !fetchError && searchList.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "h-[80px] w-full flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(Loading_1.default, {}) })), (!hasMore || fetchError) && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: searchList.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "h-[88px] w-full py-3 px-4 text-center text-[14px] text-subtlerest flex justify-center items-center", children: fetchError ? ((0, jsx_runtime_1.jsx)("p", { className: "cursor-pointer w-full flex justify-center items-center", onClick: getSearchList, children: (0, jsx_runtime_1.jsx)(ArrowPathIcon_1.default, { className: "w-6 h-6 stroke-icon" }) })) : (loading && ((0, jsx_runtime_1.jsx)("div", { className: "h-[80px] w-full flex justify-center items-center", children: (0, jsx_runtime_1.jsx)(Loading_1.default, {}) }))) })) : ((0, jsx_runtime_1.jsxs)("div", { className: "px-4 w-full flex flex-col justify-start items-center py-3 text-center h-screen mt-[20%]", children: [(0, jsx_runtime_1.jsx)(MagnifyingGlassIcon_1.default, { className: "w-8 h-8 stroke-icon" }), (0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-default text-xl", children: t('workshop.nothing_found') }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1.5 text-sm text-subtlest", children: t('workshop.nothing_found_tips') })] })) }))] }));
}
exports.default = SearchList;
