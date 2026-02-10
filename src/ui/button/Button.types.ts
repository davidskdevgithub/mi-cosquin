import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { buttonStyles } from "./Button.styles";

type CvaProps = VariantProps<typeof buttonStyles>;

export interface ButtonProps extends CvaProps {
  children: React.ReactNode;
  /* Core Interaction Props */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";

  /* Form Props */
  name?: string;
  value?: string | number | readonly string[];
  id?: string;
  form?: string;
}
