import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, ColorForm, Chip, Toast, TRAITS } from '../../design-system/index.js';
import useResultsStore, { FALLBACK } from '../../stores/resultsStore.js';

const SHARE_FORMATS = ['Story', 'კვადრატი', 'სტიკერი'];

function ShareCardPreview({ format, showArchetype, showTraits, traits, archetype, chips }) {
  const [t1, t2] = traits;
  const c1 = (TRAITS[t1] || TRAITS.A).hex;
  const c2 = (TRAITS[t2] || TRAITS.O).hex;
  const story = format === 0;
  const sticker = format === 2;

  return (
    <div style={{
      width: story ? 148 : 178,
      height: story ? 262 : 178,
      flex: 'none',
      margin: '0 auto',
      borderRadius: 16,
      position: 'relative',
      overflow: 'hidden',
      background: sticker ? 'transparent' : 'var(--bg-0)',
      border: sticker ? '1px dashed var(--line-hairline)' : '1px solid var(--line-hairline)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {/* Background gradient blob */}
      {!sticker && (
        <div aria-hidden="true" style={{
          position: 'absolute', width: '120%', height: '70%', top: '-20%',
          borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
          background: `radial-gradient(closest-side, ${c1}59, ${c2}1F 70%, transparent)`,
          filter: 'blur(18px)',
        }} />
      )}

      {/* Color blob avatar */}
      <ColorForm traits={traits} size={sticker ? 84 : 64} seed={0} style={{ position: 'relative' }} />

      {/* Archetype name */}
      {showArchetype && (
        <span style={{
          position: 'relative',
          font: `600 ${story ? 17 : 15}px/1.2 var(--font-ui)`,
          color: 'var(--text-primary)',
        }}>
          {archetype.name}
        </span>
      )}

      {/* Tagline for story format */}
      {story && showArchetype && (
        <span className="type-portrait" style={{
          position: 'relative', fontSize: 10, lineHeight: '15px',
          color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '80%',
        }}>
          „{archetype.tagline}"
        </span>
      )}

      {/* Trait chips */}
      {showTraits && !sticker && chips && (
        <div style={{ position: 'relative', display: 'flex', gap: 4 }}>
          {chips.slice(0, 3).map((chip, i) => {
            const chipTrait = traits[i % traits.length];
            const hex = (TRAITS[chipTrait] || TRAITS.E).hex;
            return (
              <span key={chip} style={{
                font: '500 8px/1 var(--font-ui)',
                padding: '3px 6px', borderRadius: 999,
                background: `${hex}29`,
                color: hex,
              }}>
                {chip}
              </span>
            );
          })}
        </div>
      )}

      {/* Guli watermark */}
      {!sticker && (
        <span style={{
          position: 'absolute', bottom: 8,
          font: '600 9px/1 var(--font-ui)',
          color: 'var(--text-muted)',
        }}>
          გული
        </span>
      )}

      {/* Sticker link */}
      {sticker && (
        <span style={{ position: 'relative', font: '400 8px/1 monospace', color: 'var(--text-muted)' }}>
          guli.ge/{(FALLBACK.name).toLowerCase()}
        </span>
      )}
    </div>
  );
}

function ToggleChip({ on, label, onToggle }) {
  return (
    <span
      onClick={onToggle}
      style={{
        padding: '6px 12px', borderRadius: 999,
        font: '500 12px/18px var(--font-ui)',
        cursor: 'pointer',
        background: on ? 'rgba(232,139,171,0.16)' : 'var(--bg-2)',
        color: on ? 'var(--saperavi-tint)' : 'var(--text-muted)',
        border: '1px solid ' + (on ? 'rgba(232,139,171,0.4)' : 'var(--line-hairline)'),
      }}
    >
      {label}
    </span>
  );
}

export default function SharePage() {
  const navigate = useNavigate();
  const { scores, archetype, traits } = useResultsStore();

  const [format, setFormat] = useState(0);
  const [showArchetype, setShowArchetype] = useState(true);
  const [showTraits, setShowTraits] = useState(true);
  const [lang, setLang] = useState('ka');
  const [sent, setSent] = useState(false);

  const displayArchetype = archetype ?? FALLBACK.archetype;
  const displayTraits = traits ?? FALLBACK.traits;

  const topTraits = (() => {
    if (!scores) return displayTraits;
    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    return [sorted[0][0], sorted[1][0]];
  })();

  function handleShare() {
    setSent(true);
    setTimeout(() => setSent(false), 2400);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 16px', gap: 8,
        borderBottom: '1px solid var(--line-hairline)',
        flex: 'none',
      }}>
        <span
          onClick={() => navigate('/map')}
          style={{ cursor: 'pointer', display: 'inline-flex', flex: 'none' }}
        >
          <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
        </span>
        <span className="type-h3" style={{ flex: 1, textAlign: 'center' }}>გაზიარება</span>
        <span style={{ width: 22 }} />
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Format tabs */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {SHARE_FORMATS.map((f, i) => (
            <span
              key={f}
              onClick={() => setFormat(i)}
              style={{
                padding: '6px 14px', borderRadius: 999,
                font: '500 13px/18px var(--font-ui)', cursor: 'pointer',
                background: format === i ? 'var(--saperavi)' : 'var(--bg-2)',
                color: format === i ? '#F5EDF1' : 'var(--text-secondary)',
              }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Live preview card */}
        <ShareCardPreview
          format={format}
          showArchetype={showArchetype}
          showTraits={showTraits}
          traits={topTraits}
          archetype={displayArchetype}
          chips={displayArchetype.chips}
        />

        {/* Toggle chips */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <ToggleChip on={showArchetype} label="არქეტიპი" onToggle={() => setShowArchetype(!showArchetype)} />
          <ToggleChip on={showTraits} label="თვისებები" onToggle={() => setShowTraits(!showTraits)} />
          <ToggleChip on={lang === 'en'} label="EN" onToggle={() => setLang(lang === 'ka' ? 'en' : 'ka')} />
        </div>

        {/* Format hint */}
        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
          {format === 2
            ? 'სტიკერს ბმული აქვს — მთავარ ბარათს არასდროს'
            : '1080×1920 · ბარათი ლამაზია აპლიკაციის კონტექსტის გარეშეც'}
        </span>

        <div style={{ flex: 1 }} />

        {/* Share button */}
        <Button variant="primary" onClick={handleShare}>
          გაზიარება
        </Button>
      </div>

      {/* Toast notification */}
      {sent && (
        <Toast floating icon={<Icon name="check" size={14} color="var(--trait-c)" />}>
          ბარათი მზადაა — Stories გაიხსნება
        </Toast>
      )}
    </div>
  );
}
