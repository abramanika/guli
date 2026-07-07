import React, { useEffect, useState } from 'react';

const CACHE = {};

/**
 * Icon — inlines a Lucide SVG (stroke ~1.75, rounded joins — matches Guli's
 * icon spec) recolored via currentColor. SUBSTITUTE for the future custom set.
 */
export function Icon({ name = 'droplet', size = 24, color = 'currentColor', style }) {
  const [svg, setSvg] = useState(CACHE[name] || null);
  useEffect(() => {
    let live = true;
    if (CACHE[name]) { setSvg(CACHE[name]); return; }
    fetch(`https://unpkg.com/lucide-static@0.462.0/icons/${name}.svg`)
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((t) => { CACHE[name] = t; if (live) setSvg(t); })
      .catch(() => {});
    return () => { live = false; };
  }, [name]);
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, display: 'inline-flex', color, flex: 'none', ...style }}
      dangerouslySetInnerHTML={svg ? { __html: svg.replace('width="24"', `width="${size}"`).replace('height="24"', `height="${size}"`).replace('stroke-width="2"', 'stroke-width="1.75"') } : undefined}
    ></span>
  );
}
