import { cva } from "class-variance-authority";

export const paddingVariants = {
  padding: {
    none: "p-0",
    "2xs": "p-ds-1", // 4px
    xs: "p-ds-2", // 8px
    sm: "p-ds-3", // 12px
    md: "p-ds-4", // 16px
    lg: "p-ds-6", // 24px
    xl: "p-ds-8", // 32px
    "2xl": "p-ds-12", // 48px
  },
  paddingX: {
    none: "px-0",
    "2xs": "px-ds-1",
    xs: "px-ds-2",
    sm: "px-ds-3",
    md: "px-ds-4",
    lg: "px-ds-6",
    xl: "px-ds-8",
    "2xl": "px-ds-12",
  },
  paddingY: {
    none: "py-0",
    "2xs": "py-ds-1",
    xs: "py-ds-2",
    sm: "py-ds-3",
    md: "py-ds-4",
    lg: "py-ds-6",
    xl: "py-ds-8",
    "2xl": "py-ds-12",
  },
};

export const marginVariants = {
  margin: {
    none: "m-0",
    "2xs": "m-ds-1",
    xs: "m-ds-2",
    sm: "m-ds-3",
    md: "m-ds-4",
    lg: "m-ds-6",
    xl: "m-ds-8",
    "2xl": "m-ds-12",
    auto: "m-auto",
  },
  marginX: {
    none: "mx-0",
    "2xs": "mx-ds-1",
    xs: "mx-ds-2",
    sm: "mx-ds-3",
    md: "mx-ds-4",
    lg: "mx-ds-6",
    xl: "mx-ds-8",
    "2xl": "mx-ds-12",
    auto: "mx-auto",
  },
  marginY: {
    none: "my-0",
    "2xs": "my-ds-1",
    xs: "my-ds-2",
    sm: "my-ds-3",
    md: "my-ds-4",
    lg: "my-ds-6",
    xl: "my-ds-8",
    "2xl": "my-ds-12",
    auto: "my-auto",
  },
  marginTop: {
    none: "mt-0",
    "2xs": "mt-ds-1",
    xs: "mt-ds-2",
    sm: "mt-ds-3",
    md: "mt-ds-4",
    lg: "mt-ds-6",
    xl: "mt-ds-8",
    "2xl": "mt-ds-12",
    auto: "mt-auto",
  },
  marginBottom: {
    none: "mb-0",
    "2xs": "mb-ds-1",
    xs: "mb-ds-2",
    sm: "mb-ds-3",
    md: "mb-ds-4",
    lg: "mb-ds-6",
    xl: "mb-ds-8",
    "2xl": "mb-ds-12",
    auto: "mb-auto",
  },
  marginLeft: {
    none: "ml-0",
    "2xs": "ml-ds-1",
    xs: "ml-ds-2",
    sm: "ml-ds-3",
    md: "ml-ds-4",
    lg: "ml-ds-6",
    xl: "ml-ds-8",
    "2xl": "ml-ds-12",
    auto: "ml-auto",
  },
  marginRight: {
    none: "mr-0",
    "2xs": "mr-ds-1",
    xs: "mr-ds-2",
    sm: "mr-ds-3",
    md: "mr-ds-4",
    lg: "mr-ds-6",
    xl: "mr-ds-8",
    "2xl": "mr-ds-12",
    auto: "mr-auto",
  },
};

export const layoutVariants = cva("", {
  variants: {
    ...paddingVariants,
    ...marginVariants,
    bg: {
      transparent: "bg-transparent",
      white: "bg-white",
      "neutral-50": "bg-neutral-50",
      "neutral-100": "bg-neutral-100",
    },
    minHeight: {
      auto: "min-h-auto",
      screen: "min-h-screen",
      full: "min-h-full",
    },
    width: {
      auto: "w-auto",
      full: "w-full",
      screen: "w-screen",
    },
  },
});
