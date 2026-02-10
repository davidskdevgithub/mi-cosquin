import { cn } from "../utils/cn";
import { cardStyles } from "./Card.styles";
import type { CardProps } from "./Card.types";

export const Card = ({ variant, padding, children }: CardProps) => {
  return <div className={cn(cardStyles({ variant, padding }))}>{children}</div>;
};
