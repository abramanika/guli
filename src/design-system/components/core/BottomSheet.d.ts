import { ReactNode, CSSProperties } from 'react';

/**
 * Modal surface: bottom sheet with grabber. All modals in Guli are sheets.
 */
export interface BottomSheetProps {
  open?: boolean;
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
  style?: CSSProperties;
}

export function BottomSheet(props: BottomSheetProps): ReactNode;
