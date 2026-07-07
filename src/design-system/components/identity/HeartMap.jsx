import React from 'react';
import { TRAITS } from './ColorForm.jsx';

const ORDER = ['E', 'A', 'C', 'N', 'O'];

/**
 * HeartMap — the core artifact: pentagonal five-axis radar drawn with hairlines,
 * filled with the personal gradient at 24% opacity, trait-colored droplet vertices.
 */
export function HeartMap({ scores = { E: 60, A: 70, C: 50, N: 55, O: 65 }, size = 300, secondScores, showLabels = true, style }) {
  const cx = size / 2, cy = size / 2;
  const rMax = size * 0.36;
  const pt = (i, r) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  };
  const ring = (frac) => ORDER.map((_, i) => pt(i, rMax * frac).join(',')).join(' ');
  const shape = (sc) => ORDER.map((k, i) => pt(i, rMax * ((sc[k] || 0) / 100)).join(',')).join(' ');
  const [t1, t2] = ORDER.slice().sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
  const labels = { E: 'გულღია', A: 'გულთბილი', C: 'გულმოდგინე', N: 'გულმშვიდი', O: 'მაძიებელი' };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style} role="img" aria-label="გულის რუკა">
      <defs>
        <radialGradient id="hm-fill" cx="35%" cy="30%" r="90%">
          <stop offset="0%" stopColor={TRAITS[t1].hex} stopOpacity="0.34"></stop>
          <stop offset="100%" stopColor={TRAITS[t2].hex} stopOpacity="0.18"></stop>
        </radialGradient>
      </defs>
      {[0.33, 0.66, 1].map((f) => (
        <polygon key={f} points={ring(f)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"></polygon>
      ))}
      {ORDER.map((k, i) => {
        const [x, y] = pt(i, rMax);
        return <line key={k} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1"></line>;
      })}
      <polygon points={shape(scores)} fill="url(#hm-fill)" stroke={TRAITS[t1].hex} strokeOpacity="0.6" strokeWidth="1.5"></polygon>
      {secondScores && (
        <polygon points={shape(secondScores)} fill="none" stroke="rgba(245,237,241,0.5)" strokeWidth="1.5" strokeDasharray="4 4"></polygon>
      )}
      {ORDER.map((k, i) => {
        const [x, y] = pt(i, rMax * ((scores[k] || 0) / 100));
        return (
          <g key={k} transform={`translate(${x},${y}) rotate(45)`}>
            <path d="M -5 -5 h 10 a 5 5 0 0 1 -10 10 z" transform="rotate(-45) scale(0.9)" fill={TRAITS[k].hex}></path>
          </g>
        );
      })}
      {showLabels &&
        ORDER.map((k, i) => {
          const [x, y] = pt(i, rMax + 22);
          return (
            <text key={k} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="var(--text-secondary)" style={{ font: '500 11px/1 var(--font-ui)' }}>
              {labels[k]}
            </text>
          );
        })}
    </svg>
  );
}
