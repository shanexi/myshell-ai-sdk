import { cn } from '@myshell-run/common-ui';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'text-lg-medium h-components-button-lg-height-v1 min-w-components-button-lg-min-width-v1 rounded-components-button-lg-radius-v1 border border-border-default-light-v1  px-components-button-lg-padding-v1 shadow-button-basic',
  {
    variants: {
      variant: {
        default: 'bg-surface-searchfield-light-v1 text-text-subtle-light-v1',
        primary:
          'bg-surface-primary-default-light-v1 text-text-static-white-light-v1',
        warning:
          'bg-surface-warning-default-light-v1 text-text-static-white-light-v1',
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
