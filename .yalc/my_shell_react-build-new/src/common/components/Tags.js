import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import Tag from './Tag.js';
export function Tags({ tagList, showCount, className }) {
    return (_jsx(_Fragment, { children: (tagList ?? []).slice(0, showCount ?? (tagList ?? []).length).map((tag, index) => {
            return _jsx(Tag, { tag: tag, index: index, className: className }, tag.id);
        }) }));
}
