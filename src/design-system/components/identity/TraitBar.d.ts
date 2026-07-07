import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from './ColorForm';

/**
 * Pole-to-pole trait band with a droplet marker. Used on the Heart Map,
 * trait deep-dives, and pair comparisons (second marker = ring shape).
 */
export interface TraitBarProps {
  trait?: TraitKey;
  /** 0–100 position between the two poles */
  value?: number;
  /** e.g. "78-ე პერცენტილი" — rendered in tabular numerals below the bar */
  percentileLabel?: string;
  /** Second person's position for pair comparison (ring marker, not droplet) */
  secondValue?: number;
  style?: CSSProperties;
}

export function TraitBar(props: TraitBarProps): ReactNode;
