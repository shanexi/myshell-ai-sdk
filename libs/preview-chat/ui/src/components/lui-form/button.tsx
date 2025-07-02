import { cn } from '@myshell-run/common-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

const buttonVariants = cva(
  cn(
    'h-C-button-lg-height-v2 min-w-C-button-lg-min-width-v2',
    'rounded-C-button-lg-radius-v2',
    'px-C-button-lg-padding-v2',
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-CCr-button-tertiary-bg_default-v2',
          'text-CCr-button-brand-fg_default-v2',
        ),
        primary: cn(
          'bg-CCr-button-primary-bg_default-v2',
          'text-CCr-button-primary-fg_default-v2',
        ),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = (props: ButtonProps) => {
  const { children, variant, className, ...rest } = props;
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...rest}>
      {children}
    </button>
  );
};
