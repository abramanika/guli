import { ReactNode, CSSProperties } from 'react';

/**
 * Bottom-floating pill notice. Plain statements, never apologetic:
 * „კავშირი გაწყდა — პასუხები შენახულია".
 */
export interface ToastProps {
  children?: ReactNode;
  icon?: ReactNode;
  /** Fixed-position above the tab bar */
  floating?: boolean;
  style?: CSSProperties;
}

export function Toast(props: ToastProps): ReactNode;

/** Loading placeholder shape with 1.6s shimmer. Diffusion is reserved for reveals — never loading. */
export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  style?: CSSProperties;
}

export function Skeleton(props: SkeletonProps): ReactNode;
