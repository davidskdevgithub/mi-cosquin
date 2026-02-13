import type { VariantProps } from "class-variance-authority";
import type { sheetVariants } from "./Sheet";

type CvaProps = VariantProps<typeof sheetVariants>;

export interface SheetProps extends CvaProps {
  open: boolean;
  onClose?: () => void;
}
