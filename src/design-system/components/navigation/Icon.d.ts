import { ReactNode, CSSProperties } from 'react';

/**
 * Lucide icon wrapper (1.75 stroke, rounded joins — nearest match to Guli's
 * planned custom set). Trait glyphs: E=sun-medium, A=blend, C=layers, N=waves, O=sunrise.
 */
export interface IconProps {
  /** Lucide icon name, e.g. 'droplet', 'map', 'users' */
  name?: string;
  size?: number;
  /** CSS color; defaults to currentColor */
  color?: string;
  style?: CSSProperties;
}

export function Icon(props: IconProps): ReactNode;
