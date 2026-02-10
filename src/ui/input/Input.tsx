import { forwardRef } from "react";
import { cn } from "../utils/cn";
import { inputStyles } from "./Input.styles";
import type { InputProps } from "./Input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size, state, error, success, ...props }, ref) => {
    // Prioritize specific error/success props over state variant
    const usedState = error ? "error" : success ? "success" : state;

    return (
      <input
        ref={ref}
        className={cn(inputStyles({ size, state: usedState }))}
        {...props}
      />
    );
  },
);
