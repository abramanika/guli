import React from 'react';

// Trait metadata shared across the system.
export const TRAITS = {
  E: { color: 'var(--trait-e)', hex: '#F2A93B', ka: 'თაფლი', poles: ['გულჩათხრობილი', 'გულღია'], en: 'Extraversion', icon: 'sun-medium' },
  A: { color: 'var(--trait-a)', hex: '#F0736A', ka: 'ატამი', poles: ['გულცივი', 'გულთბილი'], en: 'Agreeableness', icon: 'blend' },
  C: { color: 'var(--trait-c)', hex: '#35C4B5', ka: 'მინანქარი', poles: ['უდარდელი', 'გულმოდგინე'], en: 'Conscientiousness', icon: 'layers' },
  N: { color: 'var(--trait-n)', hex: '#9C7BF5', ka: 'ია', poles: ['გულფიცხი', 'გულმშვიდი'], en: 'Emotional range', icon: 'waves' },
  O: { color: 'var(--trait-o)', hex: '#4FA3F7', ka: 'ცა', poles: ['ჩვეულის ერთგული', 'მაძიებელი'], en: 'Openness', icon: 'sunrise' },
};

const BLOBS = [
  '58% 42% 55% 45% / 52% 58% 42% 48%',
  '45% 55% 60% 40% / 55% 45% 55% 45%',
  '62% 38% 48% 52% / 44% 60% 40% 56%',
  '50% 50% 42% 58% / 60% 42% 58% 40%',
  '40% 60% 52% 48% / 48% 52% 62% 38%',
];

/**
 * ColorForm — the user's avatar: an organic blob filled with their personal
 * 2-stop gradient (top trait 65%, second trait 35%). Never a photo, never a circle.
 */
export function ColorForm({ traits = ['A', 'O'], size = 44, seed = 0, empty = false, style }) {
  const [t1, t2] = traits;
  const c1 = (TRAITS[t1] || TRAITS.A).hex;
  const c2 = (TRAITS[t2] || TRAITS.O).hex;
  const blob = BLOBS[Math.abs(seed) % BLOBS.length];
  const rot = (Math.abs(seed) * 47) % 360;
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        flex: 'none',
        borderRadius: blob,
        transform: `rotate(${rot}deg)`,
        background: empty
          ? 'var(--bg-2)'
          : `radial-gradient(120% 120% at 32% 28%, ${c1} 0%, ${c1} 38%, ${c2} 100%)`,
        border: empty ? '1px solid var(--line-hairline)' : 'none',
        filter: size >= 64 && !empty ? 'blur(0.5px)' : 'none',
        boxShadow: empty ? 'none' : `0 0 ${Math.round(size / 3)}px ${c1}33`,
        ...style,
      }}
    ></div>
  );
}
