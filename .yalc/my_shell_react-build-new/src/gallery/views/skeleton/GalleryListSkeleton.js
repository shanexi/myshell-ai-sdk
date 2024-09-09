import { jsx as _jsx } from "react/jsx-runtime";
import Spinner from '../../../common/components/ui/spinner.js';
export default function GalleryListSkeleton({ isMobile }) {
    return (_jsx("div", { className: "h-screen flex-1 flex items-center justify-center", children: _jsx(Spinner, { color: "brand" }) }));
}
