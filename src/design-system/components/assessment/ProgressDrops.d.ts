import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from '../identity/ColorForm';

/**
 * Chapter/streak progress as a row of droplets. Quiet — no fire, no guilt.
 */
export interface ProgressDropsProps {
  total?: number;
  /** Completed count — these drops fill with their chapter's trait color */
  done?: number;
  /** Index of the pulsing current drop (defaults to `done`) */
  current?: number | null;
  /** Trait per drop; defaults to the 7-chapter sequence */
  traits?: TraitKey[];
  size?: number;
  style?: CSSProperties;
}

export function ProgressDrops(props: ProgressDropsProps): ReactNode;
