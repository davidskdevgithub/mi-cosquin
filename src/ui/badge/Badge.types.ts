import type { VariantProps } from "class-variance-authority";
import type { badgeStyles } from "./Badge.styles";

type CvaProps = VariantProps<typeof badgeStyles>;

export interface BadgeProps extends CvaProps {
  children: React.ReactNode;
}
