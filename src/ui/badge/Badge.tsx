import { cn } from "../utils/cn";
import { badgeStyles } from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

export const Badge = ({ variant, size, children }: BadgeProps) => {
  return <span className={cn(badgeStyles({ variant, size }))}>{children}</span>;
};
