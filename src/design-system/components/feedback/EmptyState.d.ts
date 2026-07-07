import { ReactNode, CSSProperties } from 'react';

/**
 * One-line invitation + faint unfilled color-form + one primary action.
 */
export interface EmptyStateProps {
  text?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: CSSProperties;
}

export function EmptyState(props: EmptyStateProps): ReactNode;
