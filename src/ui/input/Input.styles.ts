import { cva } from "class-variance-authority";

export const inputStyles = cva(
  [
    "block w-full outline-none transition-all",
    "rounded-[var(--radius-md)]",
    "border-[length:var(--border-ds-width)] border-[style:var(--border-ds-style)]", // Using new portable logic
    "bg-white text-neutral-900 placeholder:text-neutral-400",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "px-ds-3 py-ds-1 text-sm h-8",
        md: "px-ds-4 py-ds-2 text-base h-10",
        lg: "px-ds-4 py-ds-3 text-lg h-12",
      },
      state: {
        default:
          "border-neutral-200 focus:border-primary focus:ring-1 focus:ring-primary",
        error:
          "border-danger focus:border-danger focus:ring-1 focus:ring-danger text-danger placeholder:text-danger/50",
        success:
          "border-success focus:border-success focus:ring-1 focus:ring-success text-success",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);
