import { VariantProps } from 'class-variance-authority';
import { ClassNameValue } from 'tailwind-merge';
declare const spinnerVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "2xs" | "xs" | null | undefined;
    speed?: "default" | "slow" | "fast" | null | undefined;
    color?: "static" | "default" | "brand" | "warning" | "success" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
    className?: ClassNameValue;
}
export default function Spinner(props: SpinnerProps): import("react/jsx-runtime").JSX.Element;
export {};
