import { cva } from "class-variance-authority";

// Select often shares styles with Input, but might have specific overrides (like padding for chevron)
export const selectWrapperStyles = cva("relative w-full", {
  variants: {
    // Add wrapper variants if needed
  },
});

export const selectStyles = cva(
  // Base - largely similar to Input but with appearance-none for custom chevron
  [
    "appearance-none block w-full outline-none transition-all",
    "rounded-[var(--radius-md)]",
    "border-[length:var(--border-ds-width)] border-[style:var(--border-ds-style)]",
    "bg-white text-neutral-900",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "pr-ds-10", // Extra padding for chevron
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
          "border-danger focus:border-danger focus:ring-1 focus:ring-danger text-danger",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);
