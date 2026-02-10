import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { checkboxIndicatorStyles } from "./Checkbox.styles";

type CvaProps = VariantProps<typeof checkboxIndicatorStyles>;

export interface CheckboxProps extends Omit<CvaProps, "checked"> {
  /* Design System Props */
  label?: string;
  error?: boolean;
  indeterminate?: boolean;

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
