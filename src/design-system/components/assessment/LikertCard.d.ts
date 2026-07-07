import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from '../identity/ColorForm';

/**
 * Full-width tappable answer card — the core input of the assessment.
 * Stack 5 with 8px gap using LIKERT_LABELS.
 * @startingPoint section="Assessment" subtitle="Likert answer card set" viewport="360x400"
 */
export interface LikertCardProps {
  label?: string;
  selected?: boolean;
  /** Chapter's trait — colors the selected hairline + glow */
  trait?: TraitKey;
  onClick?: () => void;
  style?: CSSProperties;
}

export function LikertCard(props: LikertCardProps): ReactNode;

/** ['სრულიად არა','უფრო არა','შუაში','უფრო კი','სრულიად კი'] */
export const LIKERT_LABELS: string[];
