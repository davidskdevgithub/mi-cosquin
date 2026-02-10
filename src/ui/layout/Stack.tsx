import { createElement, forwardRef } from "react";
import { cn } from "../utils/cn";
import type { HStackProps, StackProps, VStackProps } from "./Layout.types";
import { layoutVariants } from "./layout.styles";
import { stackStyles } from "./Stack.styles";

export const Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      as = "div",
      direction,
      align,
      justify,
      wrap,
      gap,
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
      children,
      ...props
    },
    ref,
  ) => {
    // We compose the classes manually here instead of using <Box> to avoid
    // circular dependency or prop-drilling issues if Box interface becomes stricter.
    // Also ensuring no 'className' prop leaks into the API.

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
          stackStyles({ direction, align, justify, wrap, gap }),
        ),
        ...props,
      },
      children,
    );
  },
);

export const HStack = forwardRef<HTMLElement, HStackProps>((props, ref) => (
  <Stack ref={ref} direction="row" align="center" {...props} />
));

export const VStack = forwardRef<HTMLElement, VStackProps>((props, ref) => (
  <Stack ref={ref} direction="column" align="stretch" {...props} />
));
