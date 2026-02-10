import { cva } from "class-variance-authority";

export const badgeStyles = cva(
  "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        success: "bg-success text-white",
        warning: "bg-warning text-white",
        danger: "bg-danger text-white",
        neutral: "bg-neutral-200 text-neutral-700",
      },
      size: {
        sm: "px-ds-2 py-ds-1 text-xs",
        md: "px-ds-3 py-ds-1 text-sm",
        lg: "px-ds-4 py-ds-2 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
