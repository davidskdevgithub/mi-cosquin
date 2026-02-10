import { cva } from "class-variance-authority";

export const stackStyles = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col",
      "row-reverse": "flex-row-reverse",
      "column-reverse": "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
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
  },
  defaultVariants: {
    direction: "row",
    align: "stretch",
    justify: "start",
    wrap: false,
    gap: "none",
  },
});
