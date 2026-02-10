import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { cardStyles } from "./Card.styles";

type CvaProps = VariantProps<typeof cardStyles>;
// type HtmlDivProps = React.HTMLAttributes<HTMLDivElement>;

export interface CardProps extends CvaProps {
  children: React.ReactNode;
}
