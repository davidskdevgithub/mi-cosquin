import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../utils/cn";
import { selectStyles, selectWrapperStyles } from "./Select.styles";
import type { SelectProps } from "./Select.types";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { size, state, error, options, placeholder, value, initialValue, ...rest },
    ref,
  ) => {
    const usedState = error ? "error" : state;
    const isControlled = value !== undefined;
    const selectProps = isControlled
      ? { value }
      : { defaultValue: initialValue ?? (placeholder ? "" : undefined) };

    return (
      <div className={selectWrapperStyles()}>
        <select
          ref={ref}
          className={cn(selectStyles({ size, state: usedState }))}
          {...selectProps}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-ds-3 text-neutral-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    );
  },
);
