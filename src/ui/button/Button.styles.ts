import { cva } from "class-variance-authority";

/**
 * Button styles defined with cva.
 *
 * All visual differences between design versions (radii, shadows, weights,
 * border-width, spacing) come from CSS custom properties set by ThemeProvider.
 * No compound variants for `version` — that's handled in CSS, not JS.
 */
export const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-md font-semibold cursor-pointer",
    "transition-all border-solid",
    "border-ds-width",
  ],
  {
    variants: {
      intent: {
        primary: "bg-primary text-white border-primary hover:opacity-90",
        secondary: "bg-secondary text-white border-secondary hover:opacity-90",
        danger: "bg-danger text-white border-danger hover:opacity-90",
        outline:
          "bg-transparent text-primary border-primary hover:bg-neutral-100",
        ghost:
          "bg-transparent text-neutral-700 border-transparent hover:bg-neutral-100",
      },
      size: {
        sm: "px-ds-3 py-ds-2 text-sm h-8",
        md: "px-ds-4 py-ds-3 text-base h-10",
        lg: "px-ds-6 py-ds-4 text-lg h-12",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);
