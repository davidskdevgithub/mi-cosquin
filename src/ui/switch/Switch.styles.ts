import { cva } from "class-variance-authority";

export const switchTrackStyles = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "bg-neutral-200 peer-checked:bg-primary peer-checked:[&>div]:translate-x-full",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export const switchThumbStyles = cva(
  [
    "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform",
    "translate-x-0",
  ],
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);
