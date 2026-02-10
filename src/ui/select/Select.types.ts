import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { selectStyles } from "./Select.styles";

type CvaProps = VariantProps<typeof selectStyles>;

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends CvaProps {
  options: SelectOption[];

  /* Design System Props */
  error?: boolean;
  placeholder?: string;

  /* Data Props */
  value?: string | number | readonly string[];
  initialValue?: string | number | readonly string[];
  name?: string;
  id?: string;

  /* Interaction Props */
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onFocus?: React.FocusEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;

  /* Configuration Props */
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
}
