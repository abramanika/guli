import { ReactNode, CSSProperties } from 'react';

export interface TabBarItem {
  key: string;
  label: string;
  /** Lucide icon name */
  icon: string;
}

/**
 * Bottom tab bar: დღეს · რუკა · წრე · მე. Active = saperavi-tint + droplet dot.
 */
export interface TabBarProps {
  items?: TabBarItem[];
  active?: string;
  onChange?: (key: string) => void;
  style?: CSSProperties;
}

export function TabBar(props: TabBarProps): ReactNode;
