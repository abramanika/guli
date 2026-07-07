import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from '../identity/ColorForm';

/**
 * Two large forced-choice cards, each with a mini color-form.
 * Stacks vertically for long Georgian strings.
 */
export interface ThisOrThatPairProps {
  optionA?: string;
  optionB?: string;
  traitsA?: [TraitKey, TraitKey];
  traitsB?: [TraitKey, TraitKey];
  selected?: 'a' | 'b' | null;
  onSelect?: (key: 'a' | 'b') => void;
  /** 2×1 vertical stack for long strings */
  stacked?: boolean;
  style?: CSSProperties;
}

export function ThisOrThatPair(props: ThisOrThatPairProps): ReactNode;
