import { cva } from "class-variance-authority";

export const gridStyles = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      none: "gap-0",
      "2xs": "gap-ds-1",
      xs: "gap-ds-2",
      sm: "gap-ds-3",
      md: "gap-ds-4",
      lg: "gap-ds-6",
      xl: "gap-ds-8",
      "2xl": "gap-ds-12",
    },
    gapX: {
      none: "gap-x-0",
      "2xs": "gap-x-ds-1",
      xs: "gap-x-ds-2",
      sm: "gap-x-ds-3",
      md: "gap-x-ds-4",
      lg: "gap-x-ds-6",
      xl: "gap-x-ds-8",
      "2xl": "gap-x-ds-12",
    },
    gapY: {
      none: "gap-y-0",
      "2xs": "gap-y-ds-1",
      xs: "gap-y-ds-2",
      sm: "gap-y-ds-3",
      md: "gap-y-ds-4",
      lg: "gap-y-ds-6",
      xl: "gap-y-ds-8",
      "2xl": "gap-y-ds-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    columns: 1,
    gap: "none",
  },
});
