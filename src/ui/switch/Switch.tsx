import { forwardRef } from "react";
import { cn } from "../utils/cn";
import { switchThumbStyles, switchTrackStyles } from "./Switch.styles";
import type { SwitchProps } from "./Switch.types";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ size, checked, onChange, disabled, label, ...props }, ref) => {
    return (
      <label
        className={cn(
          "inline-flex items-center gap-2 relative",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
      >
        <div className="relative inline-flex items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            ref={ref}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            {...props}
          />
          <div className={switchTrackStyles({ size })}>
            <div className={switchThumbStyles({ size })} />
          </div>
        </div>
        {label && (
          <span className="text-sm font-medium select-none text-neutral-900">
            {label}
          </span>
        )}
      </label>
    );
  },
);
