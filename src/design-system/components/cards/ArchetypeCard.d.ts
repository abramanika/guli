import { ReactNode, CSSProperties } from 'react';
import { TraitKey } from '../identity/ColorForm';

/**
 * Portrait-format archetype card: poetic Georgian name + serif tagline +
 * trait chips over the personal gradient color-form.
 * @startingPoint section="Cards" subtitle="Archetype result card" viewport="340x420"
 */
export interface ArchetypeCardProps {
  /** e.g. მასპინძელი, მთის ტბა, ხიდი */
  name?: string;
  /** Serif literary tagline, rendered in quotes */
  tagline?: string;
  /** Top traits — set the gradient + chip colors */
  traits?: TraitKey[];
  /** Chip labels, e.g. ['გულღია','გულთბილი','მაძიებელი'] */
  chips?: string[];
  /** Small teaser variant for list rows */
  compact?: boolean;
  style?: CSSProperties;
}

export function ArchetypeCard(props: ArchetypeCardProps): ReactNode;
