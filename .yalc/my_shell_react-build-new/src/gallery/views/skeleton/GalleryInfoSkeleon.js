import { jsx as _jsx } from "react/jsx-runtime";
import Spinner from '../../../common/components/ui/spinner.js';
export default function GalleryInfoSkeleon() {
    return (_jsx("div", { className: "w-full h-full flex justify-center items-center md:p-2", children: _jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsx(Spinner, { color: "brand" }) }) }));
}
