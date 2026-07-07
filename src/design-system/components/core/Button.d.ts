import { ReactNode, CSSProperties } from 'react';

/**
 * Pill button. Saperavi = action; trait colors never appear on buttons.
 * Mtavruli allowed only for labels of ≤2 words. Width grows with the string.
 * @startingPoint section="Core" subtitle="Primary / secondary / ghost / destructive" viewport="360x80"
 */
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  /** lg = 52px main CTAs, md = 44px */
  size?: 'lg' | 'md';
  disabled?: boolean;
  /** Droplet spinner replaces the label */
  loading?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Button(props: ButtonProps): ReactNode;
