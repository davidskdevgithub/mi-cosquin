import { forwardRef } from "react";
import { cn } from "../utils/cn";
import { buttonStyles } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ intent, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ intent, size }))}
        type={props.type ?? "button"}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
