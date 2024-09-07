import { VariantProps } from 'class-variance-authority';
import { ClassNameValue } from 'tailwind-merge';
declare const badgeVariants: (props?: ({
    status?: "hidden" | "default" | "new" | "unRead" | "cardUnRead" | "public" | "private" | null | undefined;
} & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
interface BadgeProps extends VariantProps<typeof badgeVariants> {
    className?: ClassNameValue;
    status?: 'default' | 'unRead' | 'cardUnRead' | 'public' | 'private' | 'hidden' | 'new';
    count?: number;
}
export default function Badge(props: BadgeProps): import("react/jsx-runtime").JSX.Element;
export {};
