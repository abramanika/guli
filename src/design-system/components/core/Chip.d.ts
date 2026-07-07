import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from '../identity/ColorForm';

/**
 * Pill tag/chip. Trait chips on archetype and share cards use the trait's color when active.
 */
export interface ChipProps {
  children?: ReactNode;
  active?: boolean;
  /** Colors the active state with that trait's minankari hue */
  trait?: TraitKey;
  onClick?: () => void;
  style?: CSSProperties;
}

export function Chip(props: ChipProps): ReactNode;
