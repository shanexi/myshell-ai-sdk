import { cn } from '@myshell-run/ui-primitives';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'text-lg-medium h-components-button-lg-height min-w-components-button-lg-min-width rounded-components-button-lg-radius border border-border-default-light  px-components-button-lg-padding shadow-button-basic',
  {
    variants: {
      variant: {
        default: 'bg-surface-searchfield-light text-text-subtle-light',
        primary:
          'bg-surface-primary-default-light text-text-static-white-light',
        warning:
          'bg-surface-warning-default-light text-text-static-white-light',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof buttonVariants>;

export const Button = (props: ButtonProps) => {
  const { children, variant, className } = props;
  return (
    <button className={cn(buttonVariants({ variant }), className)}>
      {children}
    </button>
  );
};
