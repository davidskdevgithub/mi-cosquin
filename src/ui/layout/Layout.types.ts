import type { VariantProps } from "class-variance-authority";
import type React from "react";
import type { gridStyles } from "./Grid.styles";
import type { layoutVariants } from "./layout.styles";
import type { stackStyles } from "./Stack.styles";

/* --- Base Layout Traits --- */
export type LayoutBaseVariants = VariantProps<typeof layoutVariants>;

/**
 * Base props for all layout components.
 * Intentionally excludes 'className' to enforce closed system.
 */
export interface LayoutProps extends LayoutBaseVariants {
  children?: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  /* Accessibility & Identification */
  id?: string;
  role?: React.AriaRole;
}

/* --- Box --- */
export interface BoxProps extends LayoutProps {}

/* --- Stack (Flex) --- */
export type StackVariants = VariantProps<typeof stackStyles>;

export interface StackProps extends LayoutProps, StackVariants {}

export interface HStackProps extends Omit<StackProps, "direction"> {}
export interface VStackProps extends Omit<StackProps, "direction"> {}

/* --- Grid --- */
export type GridVariants = VariantProps<typeof gridStyles>;

export interface GridProps extends LayoutProps, GridVariants {
  templateColumns?: string;
  templateRows?: string;
}
