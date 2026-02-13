import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../utils/cn";

export const sheetVariants = cva(
  "fixed z-50 transition-transform duration-300 ease-out bg-gray-800",
  {
    variants: {
      side: {
        bottom:
          "left-0 right-0 bottom-0 rounded-t-2xl max-h-[85vh] translate-y-full",
        center:
          "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md max-h-[85vh] rounded-2xl",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  },
);

export interface SheetProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetVariants> {
  open: boolean;
  onClose?: () => void;
}

export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  ({ side, open, onClose, className, children, ...props }, ref) => {
    return (
      <>
        {/* Backdrop */}
        <div
          className={cn(
            "fixed inset-0 bg-black/60 z-40 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Sheet */}
        <div
          ref={ref}
          className={cn(
            sheetVariants({ side }),
            open ? "translate-y-0" : "translate-y-full",
            className,
          )}
          {...props}
        >
          {/* Pull handle */}
          <button
            type="button"
            className="flex justify-center pt-3 pb-2 w-full"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <div className="w-10 h-1 bg-neutral-600 rounded-full" />
          </button>

          <div className="overflow-y-auto max-h-[calc(85vh-20px)] px-4 pb-6">
            {children}
          </div>
        </div>
      </>
    );
  },
);

Sheet.displayName = "Sheet";
