"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonSwitcher = SeasonSwitcher;
const jsx_runtime_1 = require("react/jsx-runtime");
const CheckIcon_1 = __importDefault(require("@heroicons/react/24/outline/CheckIcon"));
const ChevronDownIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronDownIcon"));
const ChevronUpIcon_1 = __importDefault(require("@heroicons/react/24/outline/ChevronUpIcon"));
const react_select_1 = __importStar(require("react-select"));
const common_helper_1 = require("../../../../common/utils/common-helper.js");
const useSeason_1 = __importDefault(require("../../../../hooks/rewards-center/useSeason.js"));
const icon_1 = require("../../../../common/components/ui/icon.js");
const usePathLocale_1 = require("../../../../common/hooks/usePathLocale.js");
const react_use_1 = require("react-use");
;
function Option(props) {
    const { isSelected, innerProps, innerRef, data } = props;
    return ((0, jsx_runtime_1.jsx)(react_select_1.components.Option, { ...props, children: (0, jsx_runtime_1.jsxs)("div", { ref: innerRef, ...innerProps, className: "flex items-center justify-between space-x-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium", children: data.label }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-medium text-default", children: data.value })] }), isSelected ? (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: CheckIcon_1.default, color: "brand", size: "sm" }) : null] }) }));
}
function SeasonSwitcher() {
    const { seasons, setSeasonIndex, seasonIndex } = (0, useSeason_1.default)();
    const isMobileDevice = (0, react_use_1.useMedia)('(max-width: 768px)');
    const { isMobile } = (0, usePathLocale_1.usePathLocale)();
    const options = (seasons || []).map((e, i) => ({
        label: e.text,
        value: e.name,
        id: e.id,
        index: i,
    }));
    const onChange = (option) => {
        setSeasonIndex(option.index);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center z-0", children: (0, jsx_runtime_1.jsx)(react_select_1.default, { options: options, value: options[seasonIndex], onChange: options => onChange(options), menuPlacement: "auto", isSearchable: false, menuPortalTarget: (0, common_helper_1.isClient)() ? document.body : undefined, menuPosition: "fixed", components: {
                Option: Option,
                SingleValue: (props) => {
                    if (isMobile || isMobileDevice) {
                        return ((0, jsx_runtime_1.jsx)("div", { style: {
                                gridArea: '1 / 1 / 2 / 3',
                                maxWidth: '100%',
                                color: 'var(--text-static-black)',
                                boxSizing: 'border-box',
                                display: 'block'
                            }, children: props.selectProps.menuIsOpen ? ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-5", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" }) })) : ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "size-5", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" }) })) }));
                    }
                    return ((0, jsx_runtime_1.jsxs)("div", { style: {
                            gridArea: '1 / 1 / 2 / 3',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'var(--text-static-black)',
                            marginLeft: '2px',
                            marginRight: '2px',
                            boxSizing: 'border-box',
                            display: 'block'
                        }, children: [props.children, (0, jsx_runtime_1.jsx)(icon_1.Icon, { component: props.selectProps.menuIsOpen ? ChevronUpIcon_1.default : ChevronDownIcon_1.default, className: "text-static-black ml-2", size: "lg" })] }));
                }
            }, styles: {
                menuPortal: base => ({ ...base, zIndex: 9999, width: 'auto' }),
                control(base) {
                    return {
                        ...base,
                        zIndex: 50,
                        borderRadius: '9999px',
                        paddingLeft: isMobile || isMobileDevice ? '0.25rem' : '1rem',
                        paddingRight: isMobile || isMobileDevice ? '0.25rem' : '1rem',
                        borderWidth: '0',
                        borderColor: 'transparent',
                        boxShadow: 'none',
                        backgroundColor: 'var(--surface-static)',
                        width: isMobile || isMobileDevice ? '28px' : 'auto',
                        height: isMobile || isMobileDevice ? '28px' : '36px',
                        minHeight: isMobile || isMobileDevice ? '28px' : '36px',
                        fontWeight: 500,
                        backdropFilter: 'blur(12px)',
                        cursor: 'pointer',
                        opacity: '0.8',
                        ':hover': {
                            borderColor: 'transparent'
                        },
                        ':focus': {
                            borderColor: 'transparent',
                        }
                    };
                },
                menu(base) {
                    return {
                        ...base,
                        width: 'max-content',
                        minWidth: '100%',
                        borderRadius: '0.75rem',
                        overflow: 'hidden',
                        backgroundColor: 'var(--surface-default)',
                        marginBottom: 0,
                        zIndex: 50,
                        padding: '0.5rem',
                        transform: isMobile || isMobileDevice ? 'translateX(-30%)' : 'none'
                    };
                },
                menuList(base) {
                    return {
                        ...base,
                        zIndex: 50,
                        padding: 0,
                        gap: '0.25rem'
                    };
                },
                valueContainer(base) {
                    return {
                        ...base,
                        paddingLeft: 0,
                        paddingRight: 0,
                    };
                },
                option(base) {
                    return {
                        ...base,
                        zIndex: 50,
                        cursor: 'pointer',
                        borderRadius: '0.5rem',
                        padding: '0.25rem 0.5rem',
                        marginTop: '0.25rem',
                        backgroundColor: 'var(--surface-default)',
                        color: 'var(--text-brand)',
                        opacity: '0.8',
                        ':hover': {
                            backgroundColor: 'var(--surface-container-selected-default)',
                        },
                        ':first-of-type': {
                            marginTop: 0,
                            color: 'var(--text-warning)',
                        }
                    };
                },
                indicatorSeparator(base) {
                    return { ...base, display: 'none' };
                },
                dropdownIndicator(base) {
                    return { ...base, display: 'none' };
                },
                placeholder(base) {
                    return { ...base, color: 'var(--text-static-black)', display: isMobile || isMobileDevice ? 'none' : 'block' };
                },
            } }) }));
}
