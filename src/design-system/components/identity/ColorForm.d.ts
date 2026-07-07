import { ReactNode, CSSProperties } from 'react';

export type TraitKey = 'E' | 'A' | 'C' | 'N' | 'O';

/**
 * The user's avatar everywhere in Guli: an organic blob filled with a personal
 * gradient derived from their top-2 trait colors. Identity = color, not photo.
 * @startingPoint section="Identity" subtitle="Personal color-form avatar" viewport="200x120"
 */
export interface ColorFormProps {
  /** Top two trait keys, highest first — sets the gradient stops */
  traits?: [TraitKey, TraitKey];
  /** Pixel size: 28 (row), 44 (list), 88 (profile hero) */
  size?: number;
  /** Rotates/picks one of 5 preset blob shapes for per-user variety */
  seed?: number;
  /** Neutral bg-2 blob with hairline — user hasn't completed the assessment */
  empty?: boolean;
  style?: CSSProperties;
}

export function ColorForm(props: ColorFormProps): ReactNode;
