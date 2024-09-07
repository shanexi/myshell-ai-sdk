import * as React from 'react';
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export type SearchBarProps = {
    className?: string;
    inputClassName?: string;
    searchValue?: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    size?: 'md' | 'sm';
} & InputProps;
declare function SearchBar({ className, inputClassName, placeholder, type, size, readOnly, searchValue, onSearchChange, ...props }: SearchBarProps): import("react/jsx-runtime").JSX.Element;
declare namespace SearchBar {
    var displayName: string;
}
export { SearchBar };
