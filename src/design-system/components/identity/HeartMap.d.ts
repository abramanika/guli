import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from './ColorForm';

/**
 * The Heart Map: pentagonal radar of the five dimensions, hairline grid,
 * personal-gradient fill, droplet vertices, native-lexicon axis labels.
 * @startingPoint section="Identity" subtitle="Five-axis Heart Map radar" viewport="360x360"
 */
export interface HeartMapProps {
  /** 0–100 per trait key */
  scores?: Record<TraitKey, number>;
  /** Rendered width/height in px */
  size?: number;
  /** Second person / group mean, drawn as a dashed hairline shape */
  secondScores?: Record<TraitKey, number>;
  showLabels?: boolean;
  style?: CSSProperties;
}

export function HeartMap(props: HeartMapProps): ReactNode;
