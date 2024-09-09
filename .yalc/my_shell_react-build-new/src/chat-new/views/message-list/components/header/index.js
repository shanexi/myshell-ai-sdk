import { jsx as _jsx } from "react/jsx-runtime";
import Spinner from '../../../../../common/components/ui/spinner.js';
const Header = ({ loading }) => {
    if (loading) {
        return (_jsx("div", { className: "w-full flex justify-center", children: _jsx(Spinner, { color: "brand" }) }));
    }
    return null;
};
export default Header;
