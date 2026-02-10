import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { inputStyles } from "./Input.styles";

type CvaProps = VariantProps<typeof inputStyles>;

export interface InputProps extends CvaProps {
  /* Design System Props */
  error?: boolean;
  success?: boolean;

  /* Data Props */
  value?: string | number | readonly string[];
  defaultValue?: string | number | readonly string[];
  name?: string;
  id?: string;

  /* Interaction Props */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

  /* Configuration Props */
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  pattern?: string;
  maxLength?: number;
  min?: number | string;
  max?: number | string;

  /* Type Variant */
  type?: React.HTMLInputTypeAttribute;
}
