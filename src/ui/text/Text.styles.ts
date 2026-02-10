import { cva } from "class-variance-authority";

export const textStyles = cva("m-0", {
  variants: {
    variant: {
      h1: "text-4xl font-bold leading-tight",
      h2: "text-3xl font-bold leading-tight",
      h3: "text-2xl font-semibold leading-tight",
      body: "text-base font-normal leading-normal",
      caption: "text-sm font-normal leading-normal text-neutral-500",
      label: "text-sm font-medium leading-normal",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});
