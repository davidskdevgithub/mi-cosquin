import { cva } from "class-variance-authority";

export const checkboxStyles = cva(
  "inline-flex items-center gap-2 transition-opacity duration-200 select-none",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
);

export const checkboxIndicatorStyles = cva(
  [
    // Base Layout
    "flex items-center justify-center transition-all duration-200 bg-white",
    // Borders & Radius (using variable aliases)
    "border-[length:var(--border-ds-width)] border-[style:var(--border-ds-style)] rounded-[var(--radius-sm)]",
    // Interaction States (peer-checked from the input)
    "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30",
    "peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white peer-checked:[&_svg]:opacity-100",
  ],
  {
    variants: {
      checked: {
        true: "bg-primary border-primary text-white",
        false: "border-neutral-300 bg-white",
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
    },
    defaultVariants: {
      size: "md",
      checked: false,
    },
  },
);

export const checkboxIconSizes = {
  sm: 12,
  md: 16,
  lg: 20,
};
