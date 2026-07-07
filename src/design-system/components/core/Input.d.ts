import { ReactNode, CSSProperties, ChangeEvent } from 'react';

/**
 * Text input: bg-2 fill, saperavi hairline on focus, caption label above.
 */
export interface InputProps {
  label?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** Error message; renders error hairline + caption */
  error?: string;
  /** Display-size text for onboarding name/birthday screens */
  big?: boolean;
  type?: string;
  style?: CSSProperties;
}

export function Input(props: InputProps): ReactNode;
