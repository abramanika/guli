import React, { useRef, useState } from 'react';
import { TRAITS } from '../identity/ColorForm.jsx';

/**
 * ScenarioSlider — continuous slider; hairline track, 28px droplet thumb
 * in the chapter's trait color, caption pole labels at both ends.
 */
export function ScenarioSlider({ poleLeft, poleRight, value = 50, onChange, trait = 'N', style }) {
  const hex = (TRAITS[trait] || TRAITS.N).hex;
  const trackRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const setFromEvent = (e) => {
    const r = trackRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    onChange && onChange(Math.round(Math.max(0, Math.min(100, (x / r.width) * 100))));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      <div
        ref={trackRef}
        onPointerDown={(e) => { setDrag(true); e.currentTarget.setPointerCapture(e.pointerId); setFromEvent(e); }}
        onPointerMove={(e) => drag && setFromEvent(e)}
        onPointerUp={() => setDrag(false)}
        style={{ position: 'relative', height: 44, cursor: 'pointer', touchAction: 'none' }}
        role="slider" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}
      >
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.16)' }}></div>
        <div
          style={{
            position: 'absolute', left: `${value}%`, top: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            width: 28, height: 28, borderRadius: '50% 50% 50% 5px',
            background: hex, boxShadow: `0 0 24px ${hex}55`,
            transition: drag ? 'none' : 'left 120ms var(--ease-standard)',
          }}
        ></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="type-caption" style={{ color: 'var(--text-secondary)' }}>{poleLeft}</span>
        <span className="type-caption" style={{ color: 'var(--text-secondary)' }}>{poleRight}</span>
      </div>
    </div>
  );
}
