import React, { createElement } from 'react';
import { icons } from 'lucide-react';

/**
 * Converts a kebab-case icon name (e.g. "circle-user") to PascalCase ("CircleUser")
 * to match lucide-react's named exports.
 */
function toPascalCase(name) {
  return name
    .split('-')
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1))
    .join('');
}

/**
 * Icon — renders a Lucide icon by name using lucide-react, with strokeWidth 1.75
 * to match Guli's icon spec (rounded joins, slightly lighter than default).
 * Accepts kebab-case icon names (same convention as Lucide's file names).
 * Replaces the previous fetch-from-CDN approach.
 */
export function Icon({ name = 'droplet', size = 24, color = 'currentColor', style }) {
  const IconComponent = icons[toPascalCase(name)] ?? icons['Droplet'];
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, display: 'inline-flex', color, flex: 'none', ...style }}
    >
      {createElement(IconComponent, { size, strokeWidth: 1.75, color })}
    </span>
  );
}
