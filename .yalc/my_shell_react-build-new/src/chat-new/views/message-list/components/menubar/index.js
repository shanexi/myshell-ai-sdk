import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../../../../lib/utils.js';
import Actions from '../actions/index.js';
export default function Menubar(props) {
    const { className } = props;
    return (_jsx("div", { className: cn('mt-2.5 mx-0.5', className), children: _jsx(Actions, { source: "menubar" }) }));
}
