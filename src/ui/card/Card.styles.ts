import { cva } from "class-variance-authority";

export const cardStyles = cva("rounded-lg transition-all", {
  variants: {
    variant: {
      elevated: "bg-white shadow-lg border-none",
      outlined:
        "bg-white shadow-none border-solid border-neutral-200 [border-width:var(--ds-border-width)]",
      filled: "bg-neutral-50 shadow-none border-none",
    },
    padding: {
      none: "p-0",
      sm: "p-ds-4",
      md: "p-ds-6",
      lg: "p-ds-8",
    },
  },
  defaultVariants: {
    variant: "elevated",
    padding: "md",
  },
});
