import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { textStyles } from "./Text.styles";

type CvaProps = VariantProps<typeof textStyles>;
// type HtmlElementProps = React.HTMLAttributes<HTMLElement>;
type AsProp = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "label";

export interface TextProps extends CvaProps {
  children: React.ReactNode;
  as?: AsProp;
  className?: string;

  /* Accessibility & Identification */
  id?: string;
  htmlFor?: string;
}
