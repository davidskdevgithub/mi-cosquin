import { createElement, forwardRef } from "react";
import { cn } from "../utils/cn";
import type { BoxProps } from "./Layout.types";
import { layoutVariants } from "./layout.styles";

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as = "div",
      children,
      padding,
      paddingX,
      paddingY,
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      bg,
      minHeight,
      width,
      ...props
    },
    ref,
  ) => {
    return createElement(
      as,
      {
        ref,
        className: cn(
          layoutVariants({
            padding,
            paddingX,
            paddingY,
            margin,
            marginX,
            marginY,
            marginTop,
            marginBottom,
            marginLeft,
            marginRight,
            bg,
            minHeight,
            width,
          }),
        ),
        ...props,
      },
      children,
    );
  },
);
