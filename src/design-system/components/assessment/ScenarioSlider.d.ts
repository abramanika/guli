import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from '../identity/ColorForm';

/**
 * Continuous scenario slider: hairline track, droplet thumb in the chapter trait color.
 */
export interface ScenarioSliderProps {
  poleLeft?: string;
  poleRight?: string;
  /** 0–100 */
  value?: number;
  onChange?: (value: number) => void;
  trait?: TraitKey;
  style?: CSSProperties;
}

export function ScenarioSlider(props: ScenarioSliderProps): ReactNode;
