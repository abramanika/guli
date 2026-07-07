import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from '../identity/ColorForm';

/**
 * Today-tab hero card for the daily question. Collapses to a checkmark row when answered.
 */
export interface DailyQuestionCardProps {
  question?: string;
  /** Inline answer control (Likert cards, slider, or this-or-that) */
  children?: ReactNode;
  answered?: boolean;
  /** e.g. 'შემდეგი კითხვა 14 საათში' */
  countdown?: string;
  traits?: TraitKey[];
  style?: CSSProperties;
}

export function DailyQuestionCard(props: DailyQuestionCardProps): ReactNode;
