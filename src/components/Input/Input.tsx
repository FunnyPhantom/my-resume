import { VariantProps, cva } from 'class-variance-authority';
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const inputVariants = cva(
  'px-3 py-1 w-full text-sm shadow-sm flex h-9 rounded-md border-2 border-input border-accent-7 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {},
    defaultVariants: {},
  },
);

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  VariantProps<typeof inputVariants>;

const Input = forwardRef<HTMLInputElement | null, InputProps>(
  ({ className, ...inputProps }: InputProps, ref) => {
    const classes = twMerge(inputVariants({}), className);

    return <input className={classes} {...inputProps} ref={ref} />;
  },
);
Input.displayName = 'Input';

export { Input };
