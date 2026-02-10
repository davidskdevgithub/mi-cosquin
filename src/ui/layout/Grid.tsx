import { createElement, forwardRef } from "react";
import { cn } from "../utils/cn";
import { gridStyles } from "./Grid.styles";
import type { GridProps } from "./Layout.types";
import { layoutVariants } from "./layout.styles";

export const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      as = "div",
      columns,
      gap,
      gapX,
      gapY,
      align,
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
      templateColumns,
      templateRows,
      children,
      ...props
    },
    ref,
  ) => {
    // Support for arbitrary grid templates (Chakra UI style)
    const computedStyle = {
      ...(templateColumns && { gridTemplateColumns: templateColumns }),
      ...(templateRows && { gridTemplateRows: templateRows }),
    };

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
          gridStyles({ columns, gap, gapX, gapY, align }),
        ),
        style:
          Object.keys(computedStyle).length > 0 ? computedStyle : undefined,
        ...props,
      },
      children,
    );
  },
);
