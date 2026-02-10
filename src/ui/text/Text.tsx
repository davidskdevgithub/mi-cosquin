import React from "react";
import { cn } from "../utils/cn";
import { textStyles } from "./Text.styles";
import type { TextProps } from "./Text.types";

const defaultElementMap: Record<string, keyof React.JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  caption: "p",
  label: "span",
};

export const Text = ({
  variant = "body",
  as,
  children,
  ...props
}: TextProps) => {
  const v = variant ?? "body";
  const Component = as || defaultElementMap[v] || "p";

  return React.createElement(
    Component,
    {
      className: cn(textStyles({ variant: v })),
      ...props,
    },
    children,
  );
};
