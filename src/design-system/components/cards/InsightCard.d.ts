import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from '../identity/ColorForm';

/**
 * Insight card with trait-color rib and mandatory honesty label
 * (კვლევითი საფუძველი = research-based, სახალისო = just for fun).
 */
export interface InsightCardProps {
  title?: string;
  children?: ReactNode;
  trait?: TraitKey;
  /** 'კვლევითი საფუძველი' | 'სახალისო' | null to hide */
  label?: string | null;
  icon?: ReactNode;
  style?: CSSProperties;
}

export function InsightCard(props: InsightCardProps): ReactNode;
