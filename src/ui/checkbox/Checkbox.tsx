import { Check } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../utils/cn";
import {
  checkboxIconSizes,
  checkboxIndicatorStyles,
  checkboxStyles,
} from "./Checkbox.styles";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      label,
      disabled,
      checked,
      onChange,
      error,
      indeterminate,
      ...props
    },
    ref,
  ) => {
    // Using a "CSS-controlled" approach where the sibling div reacts to the input state
    // This maintains semantic HTML (<input type="checkbox">) while allowing full styling
    return (
      <label className={cn(checkboxStyles({ disabled }))}>
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className="peer sr-only"
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            {...props}
          />
          <div
            className={cn(
              // Base styles mapping
              checkboxIndicatorStyles({ size, checked: false }),
            )}
          >
            <Check
              size={checkboxIconSizes[size || "md"]}
              className="transition-opacity opacity-0"
              strokeWidth={3}
            />
          </div>
        </div>
        {label && (
          <span className="text-sm font-normal text-neutral-700">{label}</span>
        )}
      </label>
    );
  },
);
