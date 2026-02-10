import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { switchTrackStyles } from "./Switch.styles";

type CvaProps = VariantProps<typeof switchTrackStyles>;

export interface SwitchProps extends CvaProps {
  /* Design System Props */
  label?: string;

  /* Data Props */
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string | number | readonly string[];
  name?: string;
  id?: string;

  /* Interaction Props */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /* Configuration Props */
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
}
