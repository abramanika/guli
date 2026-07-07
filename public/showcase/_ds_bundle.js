/* @ds-bundle: {"format":4,"namespace":"GuliDesignSystem_a2088d","components":[{"name":"LikertCard","sourcePath":"components/assessment/LikertCard.jsx"},{"name":"LIKERT_LABELS","sourcePath":"components/assessment/LikertCard.jsx"},{"name":"ProgressDrops","sourcePath":"components/assessment/ProgressDrops.jsx"},{"name":"ScenarioSlider","sourcePath":"components/assessment/ScenarioSlider.jsx"},{"name":"ThisOrThatPair","sourcePath":"components/assessment/ThisOrThatPair.jsx"},{"name":"ArchetypeCard","sourcePath":"components/cards/ArchetypeCard.jsx"},{"name":"DailyQuestionCard","sourcePath":"components/cards/DailyQuestionCard.jsx"},{"name":"InsightCard","sourcePath":"components/cards/InsightCard.jsx"},{"name":"BottomSheet","sourcePath":"components/core/BottomSheet.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Toast.jsx"},{"name":"TRAITS","sourcePath":"components/identity/ColorForm.jsx"},{"name":"ColorForm","sourcePath":"components/identity/ColorForm.jsx"},{"name":"HeartMap","sourcePath":"components/identity/HeartMap.jsx"},{"name":"TraitBar","sourcePath":"components/identity/TraitBar.jsx"},{"name":"Icon","sourcePath":"components/navigation/Icon.jsx"},{"name":"TabBar","sourcePath":"components/navigation/TabBar.jsx"}],"sourceHashes":{"components/assessment/LikertCard.jsx":"aa22fa1e3442","components/assessment/ProgressDrops.jsx":"e1b7ad9f410c","components/assessment/ScenarioSlider.jsx":"6c29429afb9d","components/assessment/ThisOrThatPair.jsx":"2076b9a23794","components/cards/ArchetypeCard.jsx":"1de97d1ce3f5","components/cards/DailyQuestionCard.jsx":"b3fdaa1bbde7","components/cards/InsightCard.jsx":"fd0b6e92a284","components/core/BottomSheet.jsx":"e0bca3875d52","components/core/Button.jsx":"c00767921365","components/core/Chip.jsx":"a5f33faca67d","components/core/Input.jsx":"f78e8e294c2c","components/feedback/EmptyState.jsx":"16a9d984539a","components/feedback/Toast.jsx":"ab19bf907e65","components/identity/ColorForm.jsx":"77d88cd43b0d","components/identity/HeartMap.jsx":"aff337a0c8f4","components/identity/TraitBar.jsx":"fff4facad451","components/navigation/Icon.jsx":"1d3f758d5955","components/navigation/TabBar.jsx":"be1b901f6cde","ui_kits/app/Assessment.jsx":"64199f0312af","ui_kits/app/Circle.jsx":"0854f8a5ad11","ui_kits/app/MeExtra.jsx":"75581b3f06de","ui_kits/app/Onboarding.jsx":"412966c5d0de","ui_kits/app/Results.jsx":"a9fb90557c32","ui_kits/app/TodayMap.jsx":"3d1ad440d050","ui_kits/app/shared.jsx":"1441fbf82b7e","ui_kits/app/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GuliDesignSystem_a2088d = window.GuliDesignSystem_a2088d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/BottomSheet.jsx
try { (() => {
/**
 * BottomSheet — bg-1, lg radius top corners, 36×4 grabber. Rendered inline
 * (absolutely positioned within the app frame) for prototyping.
 */
function BottomSheet({
  open = true,
  title,
  children,
  onClose,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(18,11,16,0.6)',
      backdropFilter: 'blur(2px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--bg-1)',
      borderRadius: '24px 24px 0 0',
      border: '1px solid var(--line-hairline)',
      borderBottom: 'none',
      padding: '8px 20px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 4,
      borderRadius: 999,
      background: 'var(--grabber)',
      margin: '4px auto 0'
    }
  }), title && /*#__PURE__*/React.createElement("h3", {
    className: "type-h2",
    style: {
      margin: '8px 0 0'
    }
  }, title), children));
}
Object.assign(__ds_scope, { BottomSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/BottomSheet.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
const VARIANTS = {
  primary: {
    background: 'var(--saperavi)',
    color: '#F5EDF1',
    border: 'none'
  },
  secondary: {
    background: 'var(--bg-2)',
    color: 'var(--text-primary)',
    border: '1px solid var(--line-hairline)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--saperavi-tint)',
    border: 'none'
  },
  destructive: {
    background: '#FF5470',
    color: '#F5EDF1',
    border: 'none'
  }
};

/**
 * Button — pill radius, flexible width (Georgian strings never truncate).
 * Pressed = deep color + scale 0.98. Loading = droplet spinner replaces label.
 */
function Button({
  variant = 'primary',
  size = 'lg',
  disabled = false,
  loading = false,
  children,
  onClick,
  style
}) {
  const [pressed, setPressed] = useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const pressedBg = variant === 'primary' ? 'var(--saperavi-deep)' : variant === 'secondary' ? 'var(--bg-1)' : v.background;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    onPointerDown: () => setPressed(true),
    onPointerUp: () => setPressed(false),
    onPointerLeave: () => setPressed(false),
    style: {
      height: size === 'lg' ? 52 : 44,
      padding: '0 24px',
      borderRadius: 999,
      font: '500 16px/1 var(--font-ui)',
      letterSpacing: 0,
      whiteSpace: 'nowrap',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: pressed && !disabled ? 'scale(0.98)' : 'scale(1)',
      transition: 'transform 120ms var(--ease-standard), background 120ms',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      ...v,
      background: pressed && !disabled ? pressedBg : v.background,
      ...style
    }
  }, loading ? /*#__PURE__*/React.createElement("span", {
    "aria-label": "\u10D8\u10E2\u10D5\u10D8\u10E0\u10D7\u10D4\u10D1\u10D0",
    style: {
      width: 16,
      height: 16,
      borderRadius: '50% 50% 50% 4px',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      transform: 'rotate(45deg)',
      animation: 'guli-spin 0.9s linear infinite',
      display: 'inline-block'
    }
  }) : children, /*#__PURE__*/React.createElement("style", null, '@keyframes guli-spin { to { transform: rotate(405deg); } }'));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
const {
  useState
} = React;
/**
 * Input — bg-2 fill, no border until focus (saperavi hairline), floating caption label.
 */
function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
  big = false,
  type = 'text',
  style
}) {
  const [focus, setFocus] = useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: error ? 'var(--error)' : focus ? 'var(--saperavi-tint)' : 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: big ? 64 : 52,
      padding: '0 16px',
      borderRadius: 10,
      background: 'var(--bg-2)',
      color: 'var(--text-primary)',
      border: '1px solid ' + (error ? 'var(--error)' : focus ? 'var(--saperavi)' : 'transparent'),
      outline: 'none',
      font: big ? '600 28px/1 var(--font-ui)' : '400 16px/1 var(--font-ui)',
      letterSpacing: 0,
      width: '100%',
      boxSizing: 'border-box'
    }
  }), error && /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--error)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * Toast — bottom-floating pill, bg-2, caption text, icon left. Auto-dismiss 2.4s (caller-managed).
 */
function Toast({
  children,
  icon,
  floating = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      borderRadius: 999,
      background: 'var(--bg-2)',
      border: '1px solid var(--line-hairline)',
      font: '500 12px/18px var(--font-ui)',
      color: 'var(--text-primary)',
      ...(floating ? {
        position: 'fixed',
        bottom: 76,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60
      } : {}),
      ...style
    }
  }, icon, /*#__PURE__*/React.createElement("span", null, children));
}

/**
 * Skeleton — bg-2 shape with slow 1.6s shimmer at 6% white. Never used for reveals.
 */
function Skeleton({
  width = '100%',
  height = 16,
  radius = 10,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      width,
      height,
      borderRadius: radius,
      background: 'var(--bg-2)',
      position: 'relative',
      overflow: 'hidden',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
      animation: 'guli-shimmer 1.6s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("style", null, '@keyframes guli-shimmer { from { transform: translateX(-100%); } to { transform: translateX(100%); } }'));
}
Object.assign(__ds_scope, { Toast, Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/identity/ColorForm.jsx
try { (() => {
// Trait metadata shared across the system.
const TRAITS = {
  E: {
    color: 'var(--trait-e)',
    hex: '#F2A93B',
    ka: 'თაფლი',
    poles: ['გულჩათხრობილი', 'გულღია'],
    en: 'Extraversion',
    icon: 'sun-medium'
  },
  A: {
    color: 'var(--trait-a)',
    hex: '#F0736A',
    ka: 'ატამი',
    poles: ['გულცივი', 'გულთბილი'],
    en: 'Agreeableness',
    icon: 'blend'
  },
  C: {
    color: 'var(--trait-c)',
    hex: '#35C4B5',
    ka: 'მინანქარი',
    poles: ['უდარდელი', 'გულმოდგინე'],
    en: 'Conscientiousness',
    icon: 'layers'
  },
  N: {
    color: 'var(--trait-n)',
    hex: '#9C7BF5',
    ka: 'ია',
    poles: ['გულფიცხი', 'გულმშვიდი'],
    en: 'Emotional range',
    icon: 'waves'
  },
  O: {
    color: 'var(--trait-o)',
    hex: '#4FA3F7',
    ka: 'ცა',
    poles: ['ჩვეულის ერთგული', 'მაძიებელი'],
    en: 'Openness',
    icon: 'sunrise'
  }
};
const BLOBS = ['58% 42% 55% 45% / 52% 58% 42% 48%', '45% 55% 60% 40% / 55% 45% 55% 45%', '62% 38% 48% 52% / 44% 60% 40% 56%', '50% 50% 42% 58% / 60% 42% 58% 40%', '40% 60% 52% 48% / 48% 52% 62% 38%'];

/**
 * ColorForm — the user's avatar: an organic blob filled with their personal
 * 2-stop gradient (top trait 65%, second trait 35%). Never a photo, never a circle.
 */
function ColorForm({
  traits = ['A', 'O'],
  size = 44,
  seed = 0,
  empty = false,
  style
}) {
  const [t1, t2] = traits;
  const c1 = (TRAITS[t1] || TRAITS.A).hex;
  const c2 = (TRAITS[t2] || TRAITS.O).hex;
  const blob = BLOBS[Math.abs(seed) % BLOBS.length];
  const rot = Math.abs(seed) * 47 % 360;
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      width: size,
      height: size,
      flex: 'none',
      borderRadius: blob,
      transform: `rotate(${rot}deg)`,
      background: empty ? 'var(--bg-2)' : `radial-gradient(120% 120% at 32% 28%, ${c1} 0%, ${c1} 38%, ${c2} 100%)`,
      border: empty ? '1px solid var(--line-hairline)' : 'none',
      filter: size >= 64 && !empty ? 'blur(0.5px)' : 'none',
      boxShadow: empty ? 'none' : `0 0 ${Math.round(size / 3)}px ${c1}33`,
      ...style
    }
  });
}
Object.assign(__ds_scope, { TRAITS, ColorForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/identity/ColorForm.jsx", error: String((e && e.message) || e) }); }

// components/assessment/LikertCard.jsx
try { (() => {
/**
 * LikertCard — the core input of the product. Full-width tappable answer card.
 * Selected: hairline takes the chapter's trait color + 12% glow + check-drop.
 */
function LikertCard({
  label,
  selected = false,
  trait = 'E',
  onClick,
  style
}) {
  const hex = (__ds_scope.TRAITS[trait] || __ds_scope.TRAITS.E).hex;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: '100%',
      minHeight: 64,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      padding: '0 20px',
      textAlign: 'left',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid ' + (selected ? hex : 'var(--line-hairline)'),
      boxShadow: selected ? `0 0 24px ${hex}1F` : 'none',
      color: 'var(--text-primary)',
      font: '400 16px/25px var(--font-ui)',
      letterSpacing: 0,
      cursor: 'pointer',
      transition: 'border-color 160ms, box-shadow 160ms',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", null, label), selected && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 18,
      height: 18,
      flex: 'none',
      transform: 'rotate(45deg)',
      borderRadius: '50% 50% 50% 4px',
      background: hex,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 10 10",
    style: {
      transform: 'rotate(-45deg)'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 5.2 4.2 7.4 8 3",
    fill: "none",
    stroke: "#120B10",
    strokeWidth: "1.75",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}

/** The canonical 5-point Likert answer set. */
const LIKERT_LABELS = ['სრულიად არა', 'უფრო არა', 'შუაში', 'უფრო კი', 'სრულიად კი'];
Object.assign(__ds_scope, { LikertCard, LIKERT_LABELS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/assessment/LikertCard.jsx", error: String((e && e.message) || e) }); }

// components/assessment/ProgressDrops.jsx
try { (() => {
const CHAPTER_TRAITS = ['E', 'A', 'C', 'N', 'O', 'E', 'A'];

/**
 * ProgressDrops — chapters as a row of drops; filled drops take their chapter's
 * trait color, the current drop pulses gently.
 */
function ProgressDrops({
  total = 7,
  done = 0,
  current = null,
  traits,
  size = 12,
  style
}) {
  const ts = traits || CHAPTER_TRAITS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      ...style
    }
  }, Array.from({
    length: total
  }).map((_, i) => {
    const hex = (__ds_scope.TRAITS[ts[i % ts.length]] || __ds_scope.TRAITS.E).hex;
    const filled = i < done;
    const isCurrent = current != null ? i === current : i === done;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        width: size,
        height: size,
        transform: 'rotate(45deg)',
        borderRadius: '50% 50% 50% 3px',
        background: filled ? hex : isCurrent ? `${hex}66` : 'var(--bg-2)',
        border: filled || isCurrent ? 'none' : '1px solid var(--line-hairline)',
        boxShadow: filled ? `0 0 8px ${hex}44` : 'none',
        animation: isCurrent ? 'guli-pulse 1.8s ease-in-out infinite' : 'none'
      }
    });
  }), /*#__PURE__*/React.createElement("style", null, '@keyframes guli-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }'));
}
Object.assign(__ds_scope, { ProgressDrops });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/assessment/ProgressDrops.jsx", error: String((e && e.message) || e) }); }

// components/assessment/ScenarioSlider.jsx
try { (() => {
const {
  useRef,
  useState
} = React;
/**
 * ScenarioSlider — continuous slider; hairline track, 28px droplet thumb
 * in the chapter's trait color, caption pole labels at both ends.
 */
function ScenarioSlider({
  poleLeft,
  poleRight,
  value = 50,
  onChange,
  trait = 'N',
  style
}) {
  const hex = (__ds_scope.TRAITS[trait] || __ds_scope.TRAITS.N).hex;
  const trackRef = useRef(null);
  const [drag, setDrag] = useState(false);
  const setFromEvent = e => {
    const r = trackRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    onChange && onChange(Math.round(Math.max(0, Math.min(100, x / r.width * 100))));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onPointerDown: e => {
      setDrag(true);
      e.currentTarget.setPointerCapture(e.pointerId);
      setFromEvent(e);
    },
    onPointerMove: e => drag && setFromEvent(e),
    onPointerUp: () => setDrag(false),
    style: {
      position: 'relative',
      height: 44,
      cursor: 'pointer',
      touchAction: 'none'
    },
    role: "slider",
    "aria-valuenow": value,
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: 0,
      right: 0,
      height: 1,
      background: 'rgba(255,255,255,0.16)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${value}%`,
      top: '50%',
      transform: 'translate(-50%, -50%) rotate(45deg)',
      width: 28,
      height: 28,
      borderRadius: '50% 50% 50% 5px',
      background: hex,
      boxShadow: `0 0 24px ${hex}55`,
      transition: drag ? 'none' : 'left 120ms var(--ease-standard)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-secondary)'
    }
  }, poleLeft), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-secondary)'
    }
  }, poleRight)));
}
Object.assign(__ds_scope, { ScenarioSlider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/assessment/ScenarioSlider.jsx", error: String((e && e.message) || e) }); }

// components/assessment/ThisOrThatPair.jsx
try { (() => {
/**
 * ThisOrThatPair — two large cards, each carrying a mini color-form. Tap = select.
 */
function ThisOrThatPair({
  optionA,
  optionB,
  traitsA = ['E', 'A'],
  traitsB = ['N', 'O'],
  selected = null,
  onSelect,
  stacked = false,
  style
}) {
  const card = (label, traits, key) => {
    const sel = selected === key;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      onClick: () => onSelect && onSelect(key),
      style: {
        flex: 1,
        minHeight: 156,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: 20,
        textAlign: 'left',
        background: 'var(--bg-1)',
        borderRadius: 24,
        border: '1px solid ' + (sel ? 'var(--saperavi)' : 'var(--line-hairline)'),
        boxShadow: sel ? 'var(--glow-saperavi)' : 'none',
        color: 'var(--text-primary)',
        font: '500 17px/24px var(--font-ui)',
        letterSpacing: 0,
        cursor: 'pointer',
        transition: 'border-color 160ms, box-shadow 160ms'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.ColorForm, {
      traits: traits,
      size: 36,
      seed: key === 'a' ? 1 : 4,
      style: {
        opacity: sel ? 1 : 0.7
      }
    }), /*#__PURE__*/React.createElement("span", null, label));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: stacked ? 'column' : 'row',
      gap: 12,
      ...style
    }
  }, card(optionA, traitsA, 'a'), card(optionB, traitsB, 'b'));
}
Object.assign(__ds_scope, { ThisOrThatPair });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/assessment/ThisOrThatPair.jsx", error: String((e && e.message) || e) }); }

// components/cards/DailyQuestionCard.jsx
try { (() => {
/**
 * DailyQuestionCard — the Today-tab hero: lg radius, faint color-form background,
 * „დღის კითხვა" eyebrow. Children = the inline answer control.
 */
function DailyQuestionCard({
  question,
  children,
  answered = false,
  countdown,
  traits = ['N', 'O'],
  style
}) {
  const c1 = (__ds_scope.TRAITS[traits[0]] || __ds_scope.TRAITS.N).hex;
  const c2 = (__ds_scope.TRAITS[traits[1]] || __ds_scope.TRAITS.O).hex;
  if (answered) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px 20px',
        background: 'var(--bg-1)',
        borderRadius: 16,
        border: '1px solid var(--line-hairline)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: 18,
        height: 18,
        transform: 'rotate(45deg)',
        borderRadius: '50% 50% 50% 4px',
        background: 'var(--trait-c)',
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "type-body-sm"
    }, "\u10D3\u10E6\u10D8\u10E1 \u10D9\u10D8\u10D7\u10EE\u10D5\u10D0\u10E1 \u10E3\u10DE\u10D0\u10E1\u10E3\u10EE\u10D4"), countdown && /*#__PURE__*/React.createElement("span", {
      className: "type-caption",
      style: {
        color: 'var(--text-muted)'
      }
    }, countdown)));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg-1)',
      borderRadius: 24,
      border: '1px solid var(--line-hairline)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: '-40%',
      right: '-20%',
      width: '80%',
      height: '90%',
      borderRadius: '45% 55% 60% 40% / 55% 45% 55% 45%',
      background: `radial-gradient(closest-side, ${c1}33, ${c2}14 70%, transparent)`,
      filter: 'blur(20px)',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      position: 'relative',
      color: 'var(--saperavi-tint)'
    }
  }, "\u10D3\u10E6\u10D8\u10E1 \u10D9\u10D8\u10D7\u10EE\u10D5\u10D0"), /*#__PURE__*/React.createElement("h2", {
    className: "type-h2",
    style: {
      position: 'relative',
      margin: 0
    }
  }, question), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, children));
}
Object.assign(__ds_scope, { DailyQuestionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/DailyQuestionCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
/**
 * Chip — pill tag. Active state takes its trait's color at 16% fill + colored text.
 */
function Chip({
  children,
  active = false,
  trait,
  onClick,
  style
}) {
  const hex = trait ? (__ds_scope.TRAITS[trait] || {}).hex : '#A62A54';
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 12px',
      borderRadius: 999,
      font: '500 12px/18px var(--font-ui)',
      background: active ? `${hex}29` : 'var(--bg-2)',
      color: active ? hex : 'var(--text-secondary)',
      border: '1px solid ' + (active ? `${hex}55` : 'var(--line-hairline)'),
      cursor: onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/cards/ArchetypeCard.jsx
try { (() => {
/**
 * ArchetypeCard — portrait-format card: personal gradient background,
 * serif tagline, poetic Georgian archetype name, 3 trait chips.
 */
function ArchetypeCard({
  name,
  tagline,
  traits = ['E', 'A', 'O'],
  chips,
  compact = false,
  style
}) {
  const [t1, t2] = traits;
  const c1 = (__ds_scope.TRAITS[t1] || __ds_scope.TRAITS.E).hex;
  const c2 = (__ds_scope.TRAITS[t2] || __ds_scope.TRAITS.A).hex;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 24,
      border: '1px solid var(--line-hairline)',
      background: 'var(--bg-1)',
      padding: compact ? 20 : '48px 24px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: compact ? 6 : 14,
      minHeight: compact ? 0 : 320,
      justifyContent: 'flex-end',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: '-30%',
      left: '-10%',
      width: '90%',
      height: '80%',
      borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
      background: `radial-gradient(closest-side at 40% 40%, ${c1}66, ${c2}22 70%, transparent)`,
      filter: 'blur(24px)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      position: 'relative',
      color: 'var(--text-muted)'
    }
  }, "\u10E8\u10D4\u10DC\u10D8 \u10D0\u10E0\u10E5\u10D4\u10E2\u10D8\u10DE\u10D8"), /*#__PURE__*/React.createElement("h2", {
    className: compact ? 'type-h3' : 'type-title',
    style: {
      position: 'relative',
      margin: 0
    }
  }, name), tagline && /*#__PURE__*/React.createElement("p", {
    className: "type-portrait",
    style: {
      position: 'relative',
      margin: 0,
      color: 'var(--text-secondary)',
      fontSize: compact ? 15 : 18
    }
  }, "\u201E", tagline, "\""), chips && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginTop: 6
    }
  }, chips.map((c, i) => /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    key: c,
    trait: traits[i % traits.length],
    active: true
  }, c))));
}
Object.assign(__ds_scope, { ArchetypeCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ArchetypeCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/InsightCard.jsx
try { (() => {
/**
 * InsightCard — bg-1 card with a 3px trait-color left rib, h3 title + body-sm.
 * Every insight is honesty-labeled: კვლევითი საფუძველი or სახალისო.
 */
function InsightCard({
  title,
  children,
  trait = 'O',
  label = 'კვლევითი საფუძველი',
  icon,
  style
}) {
  const hex = (__ds_scope.TRAITS[trait] || __ds_scope.TRAITS.O).hex;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)',
      borderLeft: `3px solid ${hex}`,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "type-h3",
    style: {
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, icon, title)), /*#__PURE__*/React.createElement("p", {
    className: "type-body-sm",
    style: {
      margin: 0,
      color: 'var(--text-secondary)'
    }
  }, children), label && /*#__PURE__*/React.createElement(__ds_scope.Chip, {
    style: {
      alignSelf: 'flex-start',
      marginTop: 4
    }
  }, label));
}
Object.assign(__ds_scope, { InsightCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/InsightCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/**
 * EmptyState — one-line body + faint unfilled color-form + one primary action.
 * Empty states invite, never apologize.
 */
function EmptyState({
  text,
  actionLabel,
  onAction,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20,
      padding: '40px 20px',
      textAlign: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ColorForm, {
    empty: true,
    size: 88,
    seed: 2
  }), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      color: 'var(--text-secondary)',
      margin: 0,
      maxWidth: '28ch'
    }
  }, text), actionLabel && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "md",
    onClick: onAction
  }, actionLabel));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/identity/HeartMap.jsx
try { (() => {
const ORDER = ['E', 'A', 'C', 'N', 'O'];

/**
 * HeartMap — the core artifact: pentagonal five-axis radar drawn with hairlines,
 * filled with the personal gradient at 24% opacity, trait-colored droplet vertices.
 */
function HeartMap({
  scores = {
    E: 60,
    A: 70,
    C: 50,
    N: 55,
    O: 65
  },
  size = 300,
  secondScores,
  showLabels = true,
  style
}) {
  const cx = size / 2,
    cy = size / 2;
  const rMax = size * 0.36;
  const pt = (i, r) => {
    const ang = -Math.PI / 2 + i * 2 * Math.PI / 5;
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  };
  const ring = frac => ORDER.map((_, i) => pt(i, rMax * frac).join(',')).join(' ');
  const shape = sc => ORDER.map((k, i) => pt(i, rMax * ((sc[k] || 0) / 100)).join(',')).join(' ');
  const [t1, t2] = ORDER.slice().sort((a, b) => (scores[b] || 0) - (scores[a] || 0));
  const labels = {
    E: 'გულღია',
    A: 'გულთბილი',
    C: 'გულმოდგინე',
    N: 'გულმშვიდი',
    O: 'მაძიებელი'
  };
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: style,
    role: "img",
    "aria-label": "\u10D2\u10E3\u10DA\u10D8\u10E1 \u10E0\u10E3\u10D9\u10D0"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "hm-fill",
    cx: "35%",
    cy: "30%",
    r: "90%"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: __ds_scope.TRAITS[t1].hex,
    stopOpacity: "0.34"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: __ds_scope.TRAITS[t2].hex,
    stopOpacity: "0.18"
  }))), [0.33, 0.66, 1].map(f => /*#__PURE__*/React.createElement("polygon", {
    key: f,
    points: ring(f),
    fill: "none",
    stroke: "rgba(255,255,255,0.08)",
    strokeWidth: "1"
  })), ORDER.map((k, i) => {
    const [x, y] = pt(i, rMax);
    return /*#__PURE__*/React.createElement("line", {
      key: k,
      x1: cx,
      y1: cy,
      x2: x,
      y2: y,
      stroke: "rgba(255,255,255,0.08)",
      strokeWidth: "1"
    });
  }), /*#__PURE__*/React.createElement("polygon", {
    points: shape(scores),
    fill: "url(#hm-fill)",
    stroke: __ds_scope.TRAITS[t1].hex,
    strokeOpacity: "0.6",
    strokeWidth: "1.5"
  }), secondScores && /*#__PURE__*/React.createElement("polygon", {
    points: shape(secondScores),
    fill: "none",
    stroke: "rgba(245,237,241,0.5)",
    strokeWidth: "1.5",
    strokeDasharray: "4 4"
  }), ORDER.map((k, i) => {
    const [x, y] = pt(i, rMax * ((scores[k] || 0) / 100));
    return /*#__PURE__*/React.createElement("g", {
      key: k,
      transform: `translate(${x},${y}) rotate(45)`
    }, /*#__PURE__*/React.createElement("path", {
      d: "M -5 -5 h 10 a 5 5 0 0 1 -10 10 z",
      transform: "rotate(-45) scale(0.9)",
      fill: __ds_scope.TRAITS[k].hex
    }));
  }), showLabels && ORDER.map((k, i) => {
    const [x, y] = pt(i, rMax + 22);
    return /*#__PURE__*/React.createElement("text", {
      key: k,
      x: x,
      y: y,
      textAnchor: "middle",
      dominantBaseline: "middle",
      fill: "var(--text-secondary)",
      style: {
        font: '500 11px/1 var(--font-ui)'
      }
    }, labels[k]);
  }));
}
Object.assign(__ds_scope, { HeartMap });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/identity/HeartMap.jsx", error: String((e && e.message) || e) }); }

// components/identity/TraitBar.jsx
try { (() => {
/**
 * TraitBar — horizontal band showing where a person sits between two poles
 * of one dimension. Both poles are legitimate; the UI never scores a pole as better.
 */
function TraitBar({
  trait = 'E',
  value = 50,
  percentileLabel,
  secondValue,
  style
}) {
  const t = __ds_scope.TRAITS[trait] || __ds_scope.TRAITS.E;
  const drop = (val, ring) => /*#__PURE__*/React.createElement("div", {
    key: ring ? 'ring' : 'drop',
    style: {
      position: 'absolute',
      left: `${val}%`,
      top: '50%',
      transform: 'translate(-50%, -50%) rotate(45deg)',
      width: 14,
      height: 14,
      borderRadius: '50% 50% 50% 4px',
      background: ring ? 'transparent' : t.hex,
      border: ring ? `2px solid ${t.hex}` : 'none',
      boxShadow: `0 0 12px ${t.hex}44`
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-secondary)'
    }
  }, t.poles[0]), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-secondary)'
    }
  }, t.poles[1])), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '4px 0',
      borderRadius: 999,
      background: 'var(--bg-2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 4,
      bottom: 4,
      left: 0,
      width: `${value}%`,
      borderRadius: 999,
      background: `linear-gradient(90deg, transparent, ${t.hex}55 40%, ${t.hex})`
    }
  }), drop(value, false), secondValue != null && drop(secondValue, true)), percentileLabel && /*#__PURE__*/React.createElement("span", {
    className: "type-caption type-numeral",
    style: {
      color: 'var(--text-muted)'
    }
  }, percentileLabel));
}
Object.assign(__ds_scope, { TraitBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/identity/TraitBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Icon.jsx
try { (() => {
const {
  useEffect,
  useState
} = React;
const CACHE = {};

/**
 * Icon — inlines a Lucide SVG (stroke ~1.75, rounded joins — matches Guli's
 * icon spec) recolored via currentColor. SUBSTITUTE for the future custom set.
 */
function Icon({
  name = 'droplet',
  size = 24,
  color = 'currentColor',
  style
}) {
  const [svg, setSvg] = useState(CACHE[name] || null);
  useEffect(() => {
    let live = true;
    if (CACHE[name]) {
      setSvg(CACHE[name]);
      return;
    }
    fetch(`https://unpkg.com/lucide-static@0.462.0/icons/${name}.svg`).then(r => r.ok ? r.text() : Promise.reject(r.status)).then(t => {
      CACHE[name] = t;
      if (live) setSvg(t);
    }).catch(() => {});
    return () => {
      live = false;
    };
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      color,
      flex: 'none',
      ...style
    },
    dangerouslySetInnerHTML: svg ? {
      __html: svg.replace('width="24"', `width="${size}"`).replace('height="24"', `height="${size}"`).replace('stroke-width="2"', 'stroke-width="1.75"')
    } : undefined
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Icon.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TabBar.jsx
try { (() => {
const DEFAULT_ITEMS = [{
  key: 'today',
  label: 'დღეს',
  icon: 'sun'
}, {
  key: 'map',
  label: 'რუკა',
  icon: 'map'
}, {
  key: 'circle',
  label: 'წრე',
  icon: 'users'
}, {
  key: 'me',
  label: 'მე',
  icon: 'circle-user'
}];

/**
 * TabBar — 4 items, 24px icons + 11px captions; active item is saperavi-tint
 * with a 6px droplet indicator above.
 */
function TabBar({
  items = DEFAULT_ITEMS,
  active = 'today',
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'stretch',
      background: 'var(--bg-1)',
      borderTop: '1px solid var(--line-hairline)',
      ...style
    }
  }, items.map(it => {
    const on = it.key === active;
    const color = on ? 'var(--saperavi-tint)' : 'var(--text-muted)';
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      onClick: () => onChange && onChange(it.key),
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 4,
        width: 6,
        height: 6,
        transform: 'rotate(45deg)',
        borderRadius: '50% 50% 50% 2px',
        background: on ? 'var(--saperavi-tint)' : 'transparent'
      }
    }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 24,
      color: color
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 11px/14px var(--font-ui)',
        color,
        letterSpacing: 0
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { TabBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TabBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Assessment.jsx
try { (() => {
// Assessment: chapter home (შენი წიგნი), question flow (3 formats), chapter reveal. Plus Me screen.
const {
  G: G3,
  ME: ME3,
  CHAPTERS: CH3,
  TopBar: TopBar3,
  Scroll: Scroll3,
  Row: Row3,
  Screen: Screen3
} = window.GuliKit;
const {
  LikertCard,
  LIKERT_LABELS,
  ThisOrThatPair,
  ScenarioSlider,
  ProgressDrops,
  Button,
  ColorForm,
  TraitBar,
  Icon,
  Chip,
  BottomSheet,
  TRAITS
} = G3;
function ChapterHome({
  onStart,
  onBack
}) {
  return /*#__PURE__*/React.createElement(Screen3, {
    label: "Chapter home"
  }, /*#__PURE__*/React.createElement(TopBar3, {
    title: "\u10E8\u10D4\u10DC\u10D8 \u10EC\u10D8\u10D2\u10DC\u10D8",
    left: /*#__PURE__*/React.createElement("span", {
      onClick: onBack,
      style: {
        cursor: 'pointer',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 22,
      color: "var(--text-secondary)"
    }))
  }), /*#__PURE__*/React.createElement(Scroll3, {
    style: {
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(ProgressDrops, {
    total: 7,
    done: 2,
    current: 2,
    style: {
      margin: '4px 0 12px'
    }
  }), CH3.map(c => {
    const hex = TRAITS[c.trait].hex;
    const locked = c.state === 'locked';
    const current = c.state === 'current';
    return /*#__PURE__*/React.createElement("div", {
      key: c.n,
      onClick: current ? onStart : undefined,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px',
        background: 'var(--bg-1)',
        borderRadius: 16,
        border: '1px solid ' + (current ? hex : 'var(--line-hairline)'),
        boxShadow: current ? `0 0 24px ${hex}1F` : 'none',
        opacity: locked ? 0.4 : 1,
        cursor: current ? 'pointer' : 'default'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        transform: 'rotate(45deg)',
        borderRadius: '50% 50% 50% 4px',
        flex: 'none',
        background: c.state === 'done' ? hex : current ? `${hex}66` : 'var(--bg-2)',
        border: c.state === 'done' ? 'none' : `1px solid ${current ? hex : 'var(--line-hairline)'}`,
        animation: current ? 'guli-pulse 1.8s ease-in-out infinite' : 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "type-h3"
    }, "\u10D7\u10D0\u10D5\u10D8 ", c.n, " \xB7 ", c.title), /*#__PURE__*/React.createElement("span", {
      className: "type-caption",
      style: {
        color: 'var(--text-muted)'
      }
    }, c.count, " \u10D9\u10D8\u10D7\u10EE\u10D5\u10D0", c.fun ? ' · სახალისო' : '')), c.state === 'done' && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 18,
      color: hex
    }), current && /*#__PURE__*/React.createElement("span", {
      className: "type-caption",
      style: {
        color: hex
      }
    }, "\u10D2\u10D0\u10D2\u10E0\u10EB\u10D4\u10DA\u10D4\u10D1\u10D0"), locked && /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 16,
      color: "var(--text-muted)"
    }));
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginTop: 8
    }
  }, "\u10E1\u10D0\u10E4\u10E3\u10EB\u10D5\u10D4\u10DA\u10D8: \u10D5\u10D0\u10DA\u10D8\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8 \u10DE\u10D8\u10E0\u10DD\u10D5\u10DC\u10D4\u10D1\u10D8\u10E1 \u10D9\u10D8\u10D7\u10EE\u10D5\u10D0\u10E0\u10D8")));
}
const QUESTIONS = [{
  kind: 'likert',
  trait: 'C',
  text: 'გეგმა მირჩევნია იმპროვიზაციას.'
}, {
  kind: 'tt',
  trait: 'E',
  text: 'შაბათი საღამო:',
  a: 'დიდი ხმაურიანი სუფრა',
  b: 'ორი ძველი მეგობარი'
}, {
  kind: 'slider',
  trait: 'O',
  text: 'უცხო ქალაქში გზის დაკარგვა…',
  poles: ['მაღიზიანებს', 'მსიამოვნებს']
}];
function AssessmentFlow({
  startAt = 0,
  onDone,
  onExit
}) {
  const [i, setI] = React.useState(startAt);
  const [likert, setLikert] = React.useState(null);
  const [tt, setTt] = React.useState(null);
  const [v, setV] = React.useState(50);
  React.useEffect(() => setI(startAt), [startAt]);
  const q = QUESTIONS[i];
  const answered = q.kind === 'likert' ? likert != null : q.kind === 'tt' ? tt != null : true;
  const next = () => i < QUESTIONS.length - 1 ? setI(i + 1) : onDone();
  const labels = {
    likert: 'Question likert',
    tt: 'Question this-or-that',
    slider: 'Question slider'
  };
  return /*#__PURE__*/React.createElement(Screen3, {
    label: labels[q.kind]
  }, /*#__PURE__*/React.createElement(TopBar3, {
    title: /*#__PURE__*/React.createElement(ProgressDrops, {
      total: 7,
      done: 2,
      current: 2,
      size: 10
    }),
    left: /*#__PURE__*/React.createElement("span", {
      onClick: onExit,
      style: {
        cursor: 'pointer',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x",
      size: 20,
      color: "var(--text-muted)"
    }))
  }), /*#__PURE__*/React.createElement(Scroll3, {
    style: {
      gap: 20,
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u10D9\u10D8\u10D7\u10EE\u10D5\u10D0 ", i + 4, " / 10"), /*#__PURE__*/React.createElement("h2", {
    className: "type-h2",
    style: {
      margin: 0,
      maxWidth: '30ch'
    }
  }, q.text), q.kind === 'likert' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, LIKERT_LABELS.map((l, k) => /*#__PURE__*/React.createElement(LikertCard, {
    key: l,
    label: l,
    trait: q.trait,
    selected: likert === k,
    onClick: () => setLikert(k)
  }))), q.kind === 'tt' && /*#__PURE__*/React.createElement(ThisOrThatPair, {
    optionA: q.a,
    optionB: q.b,
    selected: tt,
    onSelect: setTt,
    stacked: true
  }), q.kind === 'slider' && /*#__PURE__*/React.createElement(ScenarioSlider, {
    poleLeft: q.poles[0],
    poleRight: q.poles[1],
    value: v,
    onChange: setV,
    trait: q.trait,
    style: {
      marginTop: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    disabled: !answered,
    onClick: next
  }, "\u10D2\u10D0\u10D2\u10E0\u10EB\u10D4\u10DA\u10D4\u10D1\u10D0")));
}
function ChapterReveal({
  onDone,
  onShare
}) {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setShown(true), 150);
    return () => clearTimeout(t);
  }, []);
  const hex = TRAITS.C.hex;
  return /*#__PURE__*/React.createElement(Screen3, {
    label: "Chapter reveal",
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      padding: 28,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      width: 340,
      height: 340,
      top: '6%',
      borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
      background: `radial-gradient(closest-side, ${hex}80, ${hex}14 70%, transparent)`,
      filter: shown ? 'blur(30px)' : 'blur(80px)',
      transform: shown ? 'scale(1)' : 'scale(0.1)',
      opacity: shown ? 1 : 0,
      transition: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      alignItems: 'center',
      opacity: shown ? 1 : 0,
      transition: 'opacity 500ms 300ms'
    }
  }, /*#__PURE__*/React.createElement(TraitBar, {
    trait: "C",
    value: 47,
    style: {
      width: '100%'
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "type-portrait",
    style: {
      margin: 0,
      textAlign: 'center',
      maxWidth: '26ch'
    }
  }, "\u10D2\u10D4\u10D2\u10DB\u10D0 \u10E8\u10D4\u10DC\u10D7\u10D5\u10D8\u10E1 \u10DB\u10DD\u10DC\u10D0\u10EE\u10D0\u10D6\u10D8\u10D0 \u2014 \u10D3\u10D0 \u10E1\u10EC\u10DD\u10E0\u10D4\u10D3 \u10D4\u10E1 \u10D2\u10EE\u10D3\u10D8\u10E1 \u10D9\u10D0\u10E0\u10D2 \u10D7\u10D0\u10DC\u10D0\u10DB\u10D2\u10D6\u10D0\u10D5\u10E0\u10D0\u10D3."), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u10D7\u10D0\u10D5\u10D8 \u10D3\u10D0\u10E1\u10E0\u10E3\u10DA\u10D3\u10D0"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onDone,
    style: {
      alignSelf: 'stretch'
    }
  }, "\u10D2\u10D0\u10D2\u10E0\u10EB\u10D4\u10DA\u10D4\u10D1\u10D0"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md",
    onClick: onShare
  }, "\u10D2\u10D0\u10D6\u10D8\u10D0\u10E0\u10D4\u10D1\u10D0")));
}
function MeScreen({
  onSettings
}) {
  const [preview, setPreview] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [vis, setVis] = React.useState(1);
  return /*#__PURE__*/React.createElement(Screen3, {
    label: "Me"
  }, /*#__PURE__*/React.createElement(TopBar3, {
    title: "\u10DB\u10D4",
    right: /*#__PURE__*/React.createElement("span", {
      onClick: onSettings,
      style: {
        cursor: 'pointer',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "settings",
      size: 20,
      color: "var(--text-secondary)"
    }))
  }), /*#__PURE__*/React.createElement(Scroll3, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      padding: '8px 0 4px'
    }
  }, /*#__PURE__*/React.createElement(ColorForm, {
    traits: ME3.traits,
    size: 88,
    seed: 0
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-title"
  }, ME3.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    trait: "A",
    active: true
  }, ME3.archetype), /*#__PURE__*/React.createElement(Chip, {
    trait: "O",
    active: true
  }, ME3.colorName))), /*#__PURE__*/React.createElement(Row3, {
    onClick: () => setPreview(!preview)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye",
    size: 20,
    color: preview ? 'var(--saperavi-tint)' : 'var(--text-secondary)'
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body",
    style: {
      flex: 1
    }
  }, "\u10D0\u10E1\u10D4 \u10D2\u10EE\u10D4\u10D3\u10D0\u10D5\u10D4\u10DC \u10E1\u10EE\u10D5\u10D4\u10D1\u10D8"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: preview ? 'var(--saperavi-tint)' : 'var(--text-muted)'
    }
  }, preview ? 'ჩართულია' : 'ნახვა')), preview && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      background: 'var(--bg-0)',
      borderRadius: 16,
      border: '1px dashed var(--line-hairline)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(ColorForm, {
    traits: ME3.traits,
    size: 44,
    seed: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-h3"
  }, ME3.name), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, ME3.archetype, " \xB7 ", ME3.colorName, " \u2014 \u10E5\u10E3\u10DA\u10D4\u10D1\u10D8 \u10D0\u10E0 \u10E9\u10D0\u10DC\u10E1"))), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, "\u10D5\u10D8\u10DC \u10EE\u10D4\u10D3\u10D0\u10D5\u10E1 \u10E8\u10D4\u10DC\u10E1 \u10E0\u10E3\u10D9\u10D0\u10E1"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, ['მხოლოდ მე', 'მეგობრები', 'ბმულით'].map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l,
    onClick: () => setVis(i),
    style: {
      flex: 1,
      textAlign: 'center',
      padding: '12px 4px',
      borderRadius: 12,
      background: 'var(--bg-1)',
      font: '500 13px/18px var(--font-ui)',
      border: '1px solid ' + (i === vis ? 'var(--saperavi)' : 'var(--line-hairline)'),
      boxShadow: i === vis ? 'var(--glow-saperavi)' : 'none',
      color: i === vis ? 'var(--text-primary)' : 'var(--text-secondary)',
      cursor: 'pointer'
    }
  }, l))), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, "\u10DB\u10DD\u10DC\u10D0\u10EA\u10D4\u10DB\u10D4\u10D1\u10D8"), /*#__PURE__*/React.createElement(Row3, {
    onClick: () => {}
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 20,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body",
    style: {
      flex: 1
    }
  }, "\u10DB\u10DD\u10DC\u10D0\u10EA\u10D4\u10DB\u10D4\u10D1\u10D8\u10E1 \u10D2\u10D0\u10D3\u10DB\u10DD\u10EC\u10D4\u10E0\u10D0")), /*#__PURE__*/React.createElement(Row3, {
    onClick: () => setConfirm(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2",
    size: 20,
    color: "var(--error)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body",
    style: {
      flex: 1,
      color: 'var(--error)'
    }
  }, "\u10EC\u10D0\u10E8\u10D0\u10DA\u10D4 \u10E9\u10D4\u10DB\u10D8 \u10DB\u10DD\u10DC\u10D0\u10EA\u10D4\u10DB\u10D4\u10D1\u10D8")), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginTop: 8
    }
  }, "\u10D2\u10E3\u10DA\u10D8 \u10D0\u10E0 \u10E7\u10D8\u10D3\u10D8\u10E1 \u10E8\u10D4\u10DC\u10E1 \u10E7\u10E3\u10E0\u10D0\u10D3\u10E6\u10D4\u10D1\u10D0\u10E1.")), /*#__PURE__*/React.createElement(BottomSheet, {
    open: confirm,
    title: "\u10EC\u10D0\u10D8\u10E8\u10D0\u10DA\u10DD\u10E1 \u10E7\u10D5\u10D4\u10DA\u10D0\u10E4\u10D4\u10E0\u10D8?",
    onClose: () => setConfirm(false)
  }, /*#__PURE__*/React.createElement("p", {
    className: "type-body-sm",
    style: {
      margin: 0,
      color: 'var(--text-secondary)'
    }
  }, "\u10E0\u10E3\u10D9\u10D0, \u10DE\u10D0\u10E1\u10E3\u10EE\u10D4\u10D1\u10D8, \u10D9\u10D0\u10D5\u10E8\u10D8\u10E0\u10D4\u10D1\u10D8 \u2014 \u10E7\u10D5\u10D4\u10DA\u10D0\u10E4\u10D4\u10E0\u10D8 \u10EC\u10D0\u10D8\u10E8\u10DA\u10D4\u10D1\u10D0 \u10E1\u10E0\u10E3\u10DA\u10D0\u10D3 \u10D3\u10D0 \u10D3\u10D0\u10E3\u10D1\u10E0\u10E3\u10DC\u10D4\u10D1\u10DA\u10D0\u10D3. \u10D4\u10E1 \u10D4\u10E0\u10D7\u10D8 \u10E8\u10D4\u10EE\u10D4\u10D1\u10D8\u10D7 \u10E1\u10E0\u10E3\u10DA\u10D3\u10D4\u10D1\u10D0."), /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    onClick: () => setConfirm(false)
  }, "\u10D3\u10D8\u10D0\u10EE, \u10EC\u10D0\u10E8\u10D0\u10DA\u10D4"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md",
    onClick: () => setConfirm(false)
  }, "\u10D2\u10D0\u10D3\u10D0\u10D5\u10D8\u10E4\u10D8\u10E5\u10E0\u10D4")));
}
Object.assign(window, {
  ChapterHome,
  AssessmentFlow,
  ChapterReveal,
  MeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Assessment.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Circle.jsx
try { (() => {
// Circle: friends list, add friend sheet, pair comparison, group map, first-open trust sheet.
const {
  G: G2,
  ME: ME2,
  FRIENDS: FRIENDS2,
  GROUP: GROUP2,
  TopBar: TopBar2,
  Scroll: Scroll2,
  Row: Row2,
  Screen: Screen2
} = window.GuliKit;
const {
  ColorForm,
  TraitBar,
  InsightCard,
  Icon,
  Button,
  HeartMap,
  BottomSheet,
  Toast,
  TRAITS
} = G2;
function CircleScreen({
  onOpenPair,
  onGroup,
  introSeen,
  onIntroSeen
}) {
  const [add, setAdd] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  return /*#__PURE__*/React.createElement(Screen2, {
    label: "Circle list"
  }, /*#__PURE__*/React.createElement(TopBar2, {
    title: "\u10EC\u10E0\u10D4"
  }), /*#__PURE__*/React.createElement(Scroll2, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    style: {
      flex: 1
    },
    onClick: () => {
      setTab(0);
      setAdd(true);
    }
  }, "\u10DB\u10DD\u10EC\u10D5\u10D4\u10D5\u10D0"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    style: {
      width: 64
    },
    onClick: () => {
      setTab(1);
      setAdd(true);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "qr-code",
    size: 20,
    color: "var(--text-secondary)"
  }))), FRIENDS2.map(f => /*#__PURE__*/React.createElement(Row2, {
    key: f.name,
    onClick: () => onOpenPair(f)
  }, /*#__PURE__*/React.createElement(ColorForm, {
    traits: f.traits,
    size: 44,
    seed: f.seed
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-h3"
  }, f.name), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, f.archetype)), /*#__PURE__*/React.createElement("span", {
    className: "type-numeral",
    style: {
      fontSize: 17,
      color: 'var(--saperavi-tint)'
    }
  }, f.match, "%"))), /*#__PURE__*/React.createElement(Row2, {
    onClick: onGroup
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, FRIENDS2.slice(0, 3).map((f, i) => /*#__PURE__*/React.createElement(ColorForm, {
    key: f.name,
    traits: f.traits,
    size: 30,
    seed: f.seed,
    style: {
      marginLeft: i ? -10 : 0
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-h3"
  }, GROUP2.name), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u10EF\u10D2\u10E3\u10E4\u10E3\u10E0\u10D8 \u10E0\u10E3\u10D9\u10D0 \xB7 4 \u10EC\u10D4\u10D5\u10E0\u10D8")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginTop: 8
    }
  }, "\u10EF\u10D2\u10E3\u10E4\u10E3\u10E0\u10D8 \u10EE\u10D4\u10D3\u10D8 \u10DB\u10EE\u10DD\u10DA\u10DD\u10D3 \u10D2\u10D0\u10D4\u10E0\u10D7\u10D8\u10D0\u10DC\u10D4\u10D1\u10E3\u10DA \u10DB\u10DD\u10DC\u10D0\u10EA\u10D4\u10DB\u10D4\u10D1\u10E1 \u10D0\u10E9\u10D5\u10D4\u10DC\u10D4\u10D1\u10E1")), /*#__PURE__*/React.createElement(BottomSheet, {
    open: !introSeen,
    title: "\u10E0\u10D0\u10E1 \u10EE\u10D4\u10D3\u10D0\u10D5\u10D4\u10DC \u10DB\u10D4\u10D2\u10DD\u10D1\u10E0\u10D4\u10D1\u10D8",
    onClose: onIntroSeen
  }, /*#__PURE__*/React.createElement("p", {
    className: "type-body-sm",
    style: {
      margin: 0,
      color: 'var(--text-secondary)'
    }
  }, "\u10DB\u10D4\u10D2\u10DD\u10D1\u10E0\u10D4\u10D1\u10D8 \u10EE\u10D4\u10D3\u10D0\u10D5\u10D4\u10DC \u10E8\u10D4\u10DC\u10E1 \u10E4\u10D4\u10E0\u10E1, \u10D0\u10E0\u10E5\u10D4\u10E2\u10D8\u10DE\u10E1 \u10D3\u10D0 \u10D7\u10D0\u10DC\u10EE\u10D5\u10D4\u10D3\u10E0\u10D0\u10E1 \u2014 \u10D0\u10E0\u10D0\u10E1\u10D3\u10E0\u10DD\u10E1 \u10E8\u10D4\u10DC\u10E1 \u10DE\u10D0\u10E1\u10E3\u10EE\u10D4\u10D1\u10E1 \u10D0\u10DC \u10D6\u10E3\u10E1\u10E2 \u10E5\u10E3\u10DA\u10D4\u10D1\u10E1."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "md",
    onClick: onIntroSeen
  }, "\u10D2\u10D0\u10E1\u10D0\u10D2\u10D4\u10D1\u10D8\u10D0")), /*#__PURE__*/React.createElement(BottomSheet, {
    open: add,
    title: "\u10DB\u10D4\u10D2\u10DD\u10D1\u10E0\u10D8\u10E1 \u10D3\u10D0\u10DB\u10D0\u10E2\u10D4\u10D1\u10D0",
    onClose: () => setAdd(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, ['ბმულით', 'QR', 'კონტაქტებიდან'].map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: l,
    onClick: () => setTab(i),
    style: {
      padding: '6px 14px',
      borderRadius: 999,
      font: '500 13px/18px var(--font-ui)',
      cursor: 'pointer',
      background: tab === i ? 'var(--saperavi)' : 'var(--bg-2)',
      color: tab === i ? '#F5EDF1' : 'var(--text-secondary)'
    }
  }, l))), tab === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      padding: '14px 16px',
      borderRadius: 10,
      background: 'var(--bg-2)',
      font: '400 14px/1 monospace',
      color: 'var(--text-secondary)'
    }
  }, "guli.ge/w/nino"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md",
    onClick: () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "copy",
    size: 18,
    color: "var(--text-secondary)"
  }))), tab === 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      height: 150,
      borderRadius: 12,
      background: '#F5EDF1',
      padding: 12,
      boxSizing: 'border-box',
      display: 'grid',
      gridTemplateColumns: 'repeat(9, 1fr)',
      gap: 2
    }
  }, Array.from({
    length: 81
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: i * 7 % 3 === 0 || i % 11 === 2 || i < 3 || i % 9 < 1 ? '#120B10' : 'transparent',
      borderRadius: 1
    }
  }))), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, "\u10D2\u10D0\u10D3\u10D0\u10D4\u10EA\u10D8 \u10E2\u10D4\u10DA\u10D4\u10E4\u10DD\u10DC\u10D8 \u10DB\u10D0\u10D2\u10D8\u10D3\u10D8\u10E1 \u10DB\u10D4\u10DD\u10E0\u10D4 \u10DB\u10EE\u10D0\u10E0\u10D4\u10E1")), tab === 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "type-body-sm",
    style: {
      margin: 0,
      color: 'var(--text-secondary)'
    }
  }, "\u10D9\u10DD\u10DC\u10E2\u10D0\u10E5\u10E2\u10D4\u10D1\u10D8 \u10DB\u10EE\u10DD\u10DA\u10DD\u10D3 \u10E8\u10D4\u10DC\u10E1 \u10E2\u10D4\u10DA\u10D4\u10E4\u10DD\u10DC\u10E8\u10D8 \u10DB\u10E3\u10E8\u10D0\u10D5\u10D3\u10D4\u10D1\u10D0 \u2014 \u10E1\u10D4\u10E0\u10D5\u10D4\u10E0\u10D6\u10D4 \u10D0\u10E0 \u10D8\u10E2\u10D5\u10D8\u10E0\u10D7\u10D4\u10D1\u10D0."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "md"
  }, "\u10D9\u10DD\u10DC\u10E2\u10D0\u10E5\u10E2\u10D4\u10D1\u10D8\u10E1 \u10DC\u10D0\u10EE\u10D5\u10D0")), copied && /*#__PURE__*/React.createElement(Toast, {
    floating: true,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      color: "var(--trait-c)"
    })
  }, "\u10D1\u10DB\u10E3\u10DA\u10D8 \u10D3\u10D0\u10D9\u10DD\u10DE\u10D8\u10E0\u10D3\u10D0")));
}
function PairScreen({
  friend,
  onBack,
  onShare
}) {
  const f = friend || FRIENDS2[0];
  return /*#__PURE__*/React.createElement(Screen2, {
    label: "Pair comparison"
  }, /*#__PURE__*/React.createElement(TopBar2, {
    title: "\u10D7\u10D0\u10DC\u10EE\u10D5\u10D4\u10D3\u10E0\u10D0",
    left: /*#__PURE__*/React.createElement("span", {
      onClick: onBack,
      style: {
        cursor: 'pointer',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 22,
      color: "var(--text-secondary)"
    })),
    right: /*#__PURE__*/React.createElement("span", {
      onClick: onShare,
      style: {
        cursor: 'pointer',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "share",
      size: 20,
      color: "var(--text-secondary)"
    }))
  }), /*#__PURE__*/React.createElement(Scroll2, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '8px 0 0'
    }
  }, /*#__PURE__*/React.createElement(ColorForm, {
    traits: ME2.traits,
    size: 72,
    seed: 0,
    style: {
      marginRight: -18,
      mixBlendMode: 'screen'
    }
  }), /*#__PURE__*/React.createElement(ColorForm, {
    traits: f.traits,
    size: 72,
    seed: f.seed,
    style: {
      mixBlendMode: 'screen'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-display type-numeral"
  }, f.match, "%"), /*#__PURE__*/React.createElement("span", {
    className: "type-body-sm",
    style: {
      color: 'var(--text-secondary)'
    }
  }, ME2.name, " + ", f.name)), /*#__PURE__*/React.createElement(HeartMap, {
    scores: ME2.scores,
    secondScores: f.scores,
    size: 250,
    showLabels: false,
    style: {
      alignSelf: 'center',
      margin: '-10px 0'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-h3"
  }, "\u10E1\u10D0\u10D3 \u10F0\u10D2\u10D0\u10D5\u10EE\u10D0\u10E0\u10D7"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: 16,
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement(TraitBar, {
    trait: "A",
    value: 81,
    secondValue: 66
  }), /*#__PURE__*/React.createElement(TraitBar, {
    trait: "N",
    value: 58,
    secondValue: 71
  })), /*#__PURE__*/React.createElement("span", {
    className: "type-h3"
  }, "\u10E1\u10D0\u10D3 \u10D2\u10D0\u10DC\u10E1\u10EE\u10D5\u10D0\u10D5\u10D3\u10D4\u10D1\u10D8\u10D7"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: 16,
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement(TraitBar, {
    trait: "C",
    value: 47,
    secondValue: 82
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u10D2\u10D4\u10D2\u10DB\u10D0 \u10D3\u10D0 \u10D8\u10DB\u10DE\u10E0\u10DD\u10D5\u10D8\u10D6\u10D0\u10EA\u10D8\u10D0 \u10D4\u10E0\u10D7 \u10DB\u10D0\u10D2\u10D8\u10D3\u10D0\u10E1 \u10E1\u10EE\u10D5\u10D0\u10D3\u10D0\u10E1\u10EE\u10D5\u10D0 \u10D2\u10D4\u10DB\u10DD\u10E1 \u10D0\u10EB\u10DA\u10D4\u10D5\u10E1.")), /*#__PURE__*/React.createElement(InsightCard, {
    title: "\u10D9\u10D8\u10D7\u10EE\u10D5\u10D0 \u10E1\u10D0\u10E6\u10D0\u10DB\u10DD\u10E1\u10D7\u10D5\u10D8\u10E1",
    trait: "C",
    label: null,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "armchair",
      size: 18,
      color: "var(--trait-c)"
    })
  }, "\u10F0\u10D9\u10D8\u10D7\u10EE\u10D4 ", f.name, "\u10E1: \u10E0\u10D0\u10E2\u10DD\u10DB \u10D2\u10D8\u10E0\u10E9\u10D4\u10D5\u10DC\u10D8\u10D0 \u10D2\u10D4\u10D2\u10DB\u10D0 \u10D8\u10DB\u10DE\u10E0\u10DD\u10D5\u10D8\u10D6\u10D0\u10EA\u10D8\u10D0\u10E1?")));
}
function GroupMapScreen({
  onBack
}) {
  return /*#__PURE__*/React.createElement(Screen2, {
    label: "Group map"
  }, /*#__PURE__*/React.createElement(TopBar2, {
    title: GROUP2.name,
    left: /*#__PURE__*/React.createElement("span", {
      onClick: onBack,
      style: {
        cursor: 'pointer',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 22,
      color: "var(--text-secondary)"
    }))
  }), /*#__PURE__*/React.createElement(Scroll2, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      padding: '8px 0 0'
    }
  }, /*#__PURE__*/React.createElement(ColorForm, {
    traits: GROUP2.traits,
    size: 88,
    seed: 2
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-h2"
  }, "\u10D7\u10E5\u10D5\u10D4\u10DC\u10D8 \u10EC\u10E0\u10D8\u10E1 \u10E4\u10D4\u10E0\u10D8: ", GROUP2.colorName), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, "4 \u10EC\u10D4\u10D5\u10E0\u10D8 \xB7 \u10D2\u10D0\u10D4\u10E0\u10D7\u10D8\u10D0\u10DC\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E3\u10E0\u10D0\u10D7\u10D8")), /*#__PURE__*/React.createElement(HeartMap, {
    scores: GROUP2.mean,
    size: 280,
    style: {
      alignSelf: 'center',
      margin: '-4px 0'
    }
  }), GROUP2.titles.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.title,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)',
      opacity: t.consented ? 1 : 0.6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.consented ? 'sparkles' : 'lock',
    size: 18,
    color: t.consented ? 'var(--trait-e)' : 'var(--text-muted)'
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body-sm",
    style: {
      flex: 1
    }
  }, t.title, ":"), /*#__PURE__*/React.createElement("span", {
    className: "type-h3",
    style: {
      color: t.consented ? 'var(--text-primary)' : 'var(--text-muted)'
    }
  }, t.consented ? t.who : 'დამალულია'))), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, "\u10EF\u10D2\u10E3\u10E4\u10E3\u10E0\u10D8 \u10EE\u10D4\u10D3\u10D8 \u10DB\u10EE\u10DD\u10DA\u10DD\u10D3 \u10D2\u10D0\u10D4\u10E0\u10D7\u10D8\u10D0\u10DC\u10D4\u10D1\u10E3\u10DA \u10DB\u10DD\u10DC\u10D0\u10EA\u10D4\u10DB\u10D4\u10D1\u10E1 \u10D0\u10E9\u10D5\u10D4\u10DC\u10D4\u10D1\u10E1. \u10E1\u10D0\u10EE\u10D4\u10DA\u10DD\u10D1\u10D8\u10D7\u10D8 \u10EC\u10D0\u10E0\u10EC\u10D4\u10E0\u10D0 \u10E9\u10D0\u10DC\u10E1 \u10DB\u10EE\u10DD\u10DA\u10DD\u10D3 \u10EC\u10D4\u10D5\u10E0\u10D8\u10E1 \u10D7\u10D0\u10DC\u10EE\u10DB\u10DD\u10D1\u10D8\u10D7.")));
}
Object.assign(window, {
  CircleScreen,
  PairScreen,
  GroupMapScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Circle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/MeExtra.jsx
try { (() => {
// Settings & privacy screen.
const {
  G: G5,
  TopBar: TopBar5,
  Scroll: Scroll5,
  Row: Row5,
  Screen: Screen5
} = window.GuliKit;
const {
  Icon,
  Chip
} = G5;
function SettingsScreen({
  onBack,
  theme,
  onTheme
}) {
  const [notif, setNotif] = React.useState(true);
  const themes = [{
    key: 'dark',
    label: 'მუქი'
  }, {
    key: 'light',
    label: 'ღია'
  }];
  return /*#__PURE__*/React.createElement(Screen5, {
    label: "Settings"
  }, /*#__PURE__*/React.createElement(TopBar5, {
    title: "\u10DE\u10D0\u10E0\u10D0\u10DB\u10D4\u10E2\u10E0\u10D4\u10D1\u10D8",
    left: /*#__PURE__*/React.createElement("span", {
      onClick: onBack,
      style: {
        cursor: 'pointer',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-left",
      size: 22,
      color: "var(--text-secondary)"
    }))
  }), /*#__PURE__*/React.createElement(Scroll5, null, /*#__PURE__*/React.createElement(Row5, null, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 20,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body",
    style: {
      flex: 1
    }
  }, "\u10D4\u10DC\u10D0"), /*#__PURE__*/React.createElement("span", {
    className: "type-body-sm",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon",
    size: 20,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body",
    style: {
      flex: 1
    }
  }, "\u10D7\u10D4\u10DB\u10D0"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, themes.map(t => /*#__PURE__*/React.createElement("span", {
    key: t.key,
    onClick: () => onTheme(t.key),
    style: {
      padding: '5px 12px',
      borderRadius: 999,
      font: '500 12px/18px var(--font-ui)',
      cursor: 'pointer',
      background: theme === t.key ? 'var(--saperavi)' : 'var(--bg-2)',
      color: theme === t.key ? '#F5EDF1' : 'var(--text-secondary)'
    }
  }, t.label)))), /*#__PURE__*/React.createElement("div", {
    onClick: () => setNotif(!notif),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 20,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-body"
  }, "\u10D3\u10E6\u10D8\u10E1 \u10D9\u10D8\u10D7\u10EE\u10D5\u10D0"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u10E7\u10DD\u10D5\u10D4\u10DA\u10D3\u10E6\u10D4, 09:00")), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 26,
      borderRadius: 999,
      position: 'relative',
      flex: 'none',
      background: notif ? 'var(--saperavi)' : 'var(--bg-2)',
      border: '1px solid ' + (notif ? 'var(--saperavi)' : 'var(--line-hairline)'),
      transition: 'background 160ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: notif ? 20 : 2,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: '#F5EDF1',
      transition: 'left 160ms var(--ease-standard)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, "\u10E8\u10D4\u10E1\u10D0\u10EE\u10D4\u10D1"), /*#__PURE__*/React.createElement(Row5, null, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    size: 20,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body",
    style: {
      flex: 1
    }
  }, "\u10EC\u10D4\u10E1\u10D4\u10D1\u10D8 \u10D3\u10D0 \u10D9\u10DD\u10DC\u10E4\u10D8\u10D3\u10D4\u10DC\u10EA\u10D8\u10D0\u10DA\u10E3\u10E0\u10DD\u10D1\u10D0"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement(Row5, null, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 20,
    color: "var(--text-secondary)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-body"
  }, "\u10D2\u10E3\u10DA\u10D8\u10E1 \u10E8\u10D4\u10E1\u10D0\u10EE\u10D4\u10D1"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u10D2\u10E3\u10DA\u10D8 \u10D0\u10E0 \u10E7\u10D8\u10D3\u10D8\u10E1 \u10E8\u10D4\u10DC\u10E1 \u10E7\u10E3\u10E0\u10D0\u10D3\u10E6\u10D4\u10D1\u10D0\u10E1."))), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginTop: 8
    }
  }, "\u10D5\u10D4\u10E0\u10E1\u10D8\u10D0 1.0 \xB7 \u10D0\u10EC\u10E7\u10DD\u10D1\u10D8\u10DA\u10D8\u10D0 \u10D7\u10D1\u10D8\u10DA\u10D8\u10E1\u10E8\u10D8")));
}
Object.assign(window, {
  SettingsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/MeExtra.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Onboarding.jsx
try { (() => {
// Onboarding: splash, value carousel, auth, name, birthday, language, consent.
const {
  G: Gob,
  TopBar: TopBarOb,
  Scroll: ScrollOb,
  Screen: ScreenOb
} = window.GuliKit;
const {
  Button,
  Input,
  LikertCard,
  Icon,
  HeartMap,
  ColorForm
} = Gob;
function Wordmark({
  size = 56
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 ${size}px/1.1 var(--font-ui)`,
      color: 'var(--text-primary)'
    }
  }, "\u10D2\u10E3\u10DA\u10D8"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 12px/1 var(--font-ui)',
      letterSpacing: '0.02em',
      color: 'var(--text-muted)'
    }
  }, "GULI"));
}
function SplashScreen({
  onDone
}) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement(ScreenOb, {
    label: "Splash",
    style: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    className: "guli-splash-blob",
    style: {
      position: 'absolute',
      width: 300,
      height: 300,
      borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
      background: 'radial-gradient(closest-side, rgba(166,42,84,0.4), rgba(110,27,56,0.1) 70%, transparent)',
      filter: 'blur(30px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      position: 'absolute',
      bottom: 48,
      color: 'var(--text-muted)'
    }
  }, "\u10D2\u10D0\u10D8\u10EA\u10D0\u10DC\u10D8 \u10E8\u10D4\u10DC\u10D8 \u10D2\u10E3\u10DA\u10D8"));
}
const CAROUSEL = [{
  title: 'აღმოაჩინე შენი გულის რუკა',
  kind: 'map'
}, {
  title: 'შეადარე შენს წრეს',
  kind: 'overlap'
}, {
  title: 'შენი პასუხები მხოლოდ შენია',
  kind: 'vessel'
}];
function CarouselScreen({
  page = 0,
  onPage,
  onDone
}) {
  const c = CAROUSEL[page];
  const visual = () => {
    if (c.kind === 'map') return /*#__PURE__*/React.createElement(HeartMap, {
      scores: {
        E: 62,
        A: 81,
        C: 47,
        N: 58,
        O: 74
      },
      size: 260,
      showLabels: false
    });
    if (c.kind === 'overlap') return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(ColorForm, {
      traits: ['A', 'O'],
      size: 120,
      seed: 0,
      style: {
        marginRight: -34,
        mixBlendMode: 'screen'
      }
    }), /*#__PURE__*/React.createElement(ColorForm, {
      traits: ['O', 'E'],
      size: 120,
      seed: 2,
      style: {
        mixBlendMode: 'screen'
      }
    }));
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 180,
        height: 220,
        borderRadius: '42% 42% 46% 46% / 16% 16% 60% 60%',
        border: '1px solid rgba(255,255,255,0.25)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 26,
        boxSizing: 'border-box'
      }
    }, /*#__PURE__*/React.createElement(ColorForm, {
      traits: ['N', 'A'],
      size: 96,
      seed: 4
    }));
  };
  return /*#__PURE__*/React.createElement(ScreenOb, {
    label: `Onboarding ${page + 1}`
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 20px',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-body-sm",
    style: {
      color: 'var(--text-muted)',
      cursor: 'pointer'
    },
    onClick: onDone
  }, "\u10D2\u10D0\u10DB\u10DD\u10E2\u10DD\u10D5\u10D4\u10D1\u10D0")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, visual()), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      padding: '0 28px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "type-title",
    style: {
      margin: 0,
      textAlign: 'center',
      maxWidth: '14ch'
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, CAROUSEL.map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    onClick: () => onPage(i),
    style: {
      width: i === page ? 20 : 6,
      height: 6,
      borderRadius: 999,
      background: i === page ? 'var(--saperavi-tint)' : 'var(--bg-2)',
      cursor: 'pointer',
      transition: 'width 240ms var(--ease-standard)'
    }
  }))), page < 2 ? /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => onPage(page + 1),
    style: {
      alignSelf: 'stretch'
    }
  }, "\u10E8\u10D4\u10DB\u10D3\u10D4\u10D2\u10D8") : /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onDone,
    style: {
      alignSelf: 'stretch'
    }
  }, "\u1C93\u1C90\u1C98\u1CAC\u1CA7\u1C94")));
}
function AuthScreen({
  onDone
}) {
  return /*#__PURE__*/React.createElement(ScreenOb, {
    label: "Auth"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 44
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      padding: '0 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onDone
  }, "Apple-\u10D8\u10D7 \u10D2\u10D0\u10D2\u10E0\u10EB\u10D4\u10DA\u10D4\u10D1\u10D0"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: onDone
  }, "Google-\u10D8\u10D7 \u10D2\u10D0\u10D2\u10E0\u10EB\u10D4\u10DA\u10D4\u10D1\u10D0"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onDone
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    size: 18,
    color: "#F5EDF1"
  }), " \u10E2\u10D4\u10DA\u10D4\u10E4\u10DD\u10DC\u10D8\u10E1 \u10DC\u10DD\u10DB\u10E0\u10D8\u10D7"), /*#__PURE__*/React.createElement("p", {
    className: "type-caption",
    style: {
      margin: '8px 0 0',
      textAlign: 'center',
      color: 'var(--text-muted)'
    }
  }, "\u10E0\u10D4\u10D2\u10D8\u10E1\u10E2\u10E0\u10D0\u10EA\u10D8\u10D0 \u10DC\u10D8\u10E8\u10DC\u10D0\u10D5\u10E1, \u10E0\u10DD\u10DB \u10D4\u10D7\u10D0\u10DC\u10EE\u10DB\u10D4\u10D1\u10D8 ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "\u10EC\u10D4\u10E1\u10D4\u10D1\u10E1"), " \u10D3\u10D0 ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "\u10D9\u10DD\u10DC\u10E4\u10D8\u10D3\u10D4\u10DC\u10EA\u10D8\u10D0\u10DA\u10E3\u10E0\u10DD\u10D1\u10D0\u10E1"))));
}
function NameScreen({
  onDone
}) {
  const [v, setV] = React.useState('');
  return /*#__PURE__*/React.createElement(ScreenOb, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(ScrollOb, {
    style: {
      paddingTop: 64,
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "type-title",
    style: {
      margin: 0
    }
  }, "\u10E0\u10D0 \u10D2\u10E5\u10D5\u10D8\u10D0?"), /*#__PURE__*/React.createElement(Input, {
    big: true,
    placeholder: "\u10E8\u10D4\u10DC\u10D8 \u10E1\u10D0\u10EE\u10D4\u10DA\u10D8",
    value: v,
    onChange: e => setV(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      padding: '0 20px 24px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    disabled: !v.trim(),
    onClick: onDone,
    style: {
      width: '100%'
    }
  }, "\u10D2\u10D0\u10D2\u10E0\u10EB\u10D4\u10DA\u10D4\u10D1\u10D0")));
}
function BirthdayScreen({
  onDone
}) {
  const [v, setV] = React.useState('');
  return /*#__PURE__*/React.createElement(ScreenOb, {
    label: "Birthday"
  }, /*#__PURE__*/React.createElement(ScrollOb, {
    style: {
      paddingTop: 64,
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "type-title",
    style: {
      margin: 0
    }
  }, "\u10E0\u10DD\u10D3\u10D8\u10E1 \u10D3\u10D0\u10D8\u10D1\u10D0\u10D3\u10D4?"), /*#__PURE__*/React.createElement(Input, {
    big: true,
    placeholder: "\u10D3\u10D3 . \u10D7\u10D7 . \u10EC\u10EC\u10EC\u10EC",
    value: v,
    onChange: e => setV(e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u10D2\u10E3\u10DA\u10D8 16 \u10EC\u10DA\u10D8\u10D3\u10D0\u10DC \u10D0\u10E0\u10D8\u10E1 \u10EE\u10D4\u10DA\u10DB\u10D8\u10E1\u10D0\u10EC\u10D5\u10D3\u10DD\u10DB\u10D8")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      padding: '0 20px 24px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    disabled: v.trim().length < 6,
    onClick: onDone,
    style: {
      width: '100%'
    }
  }, "\u10D2\u10D0\u10D2\u10E0\u10EB\u10D4\u10DA\u10D4\u10D1\u10D0")));
}
function LanguageScreen({
  onDone
}) {
  const [sel, setSel] = React.useState(0);
  const langs = ['ქართული', 'English', 'Русский'];
  return /*#__PURE__*/React.createElement(ScreenOb, {
    label: "Language"
  }, /*#__PURE__*/React.createElement(ScrollOb, {
    style: {
      paddingTop: 64,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "type-title",
    style: {
      margin: '0 0 16px'
    }
  }, "\u10D4\u10DC\u10D0"), langs.map((l, i) => /*#__PURE__*/React.createElement(LikertCard, {
    key: l,
    label: l,
    trait: "O",
    selected: sel === i,
    onClick: () => setSel(i)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      padding: '0 20px 24px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onDone,
    style: {
      width: '100%'
    }
  }, "\u10D2\u10D0\u10D2\u10E0\u10EB\u10D4\u10DA\u10D4\u10D1\u10D0")));
}
const CONSENT_ROWS = [{
  icon: 'eye-off',
  text: 'შენს პასუხებს მხოლოდ შენ ხედავ'
}, {
  icon: 'users',
  text: 'ჯგუფურ სურათებში მხოლოდ გაერთიანებული, უსახელო მონაცემები ჩანს'
}, {
  icon: 'trash-2',
  text: 'წაშლა ერთი ღილაკით, ნებისმიერ დროს'
}];
function ConsentScreen({
  onDone
}) {
  return /*#__PURE__*/React.createElement(ScreenOb, {
    label: "Consent"
  }, /*#__PURE__*/React.createElement(ScrollOb, {
    style: {
      paddingTop: 64,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "type-title",
    style: {
      margin: '0 0 8px'
    }
  }, "\u10E1\u10D0\u10DC\u10D0\u10DB \u10D3\u10D0\u10D5\u10D8\u10EC\u10E7\u10D4\u10D1\u10D7"), CONSENT_ROWS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.icon,
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      padding: '16px',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 22,
    color: "var(--saperavi-tint)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body",
    style: {
      flex: 1
    }
  }, r.text)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      padding: '0 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onDone
  }, "\u10D5\u10D4\u10D7\u10D0\u10DC\u10EE\u10DB\u10D4\u10D1\u10D8"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md"
  }, "\u10EC\u10D4\u10E1\u10D4\u10D1\u10D8\u10E1 \u10E1\u10E0\u10E3\u10DA\u10D0\u10D3 \u10DC\u10D0\u10EE\u10D5\u10D0")));
}
Object.assign(window, {
  SplashScreen,
  CarouselScreen,
  AuthScreen,
  NameScreen,
  BirthdayScreen,
  LanguageScreen,
  ConsentScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Onboarding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Results.jsx
try { (() => {
// Results: trait deep-dive, archetype, full portrait, share composer.
const {
  G: G4,
  ME: ME4,
  TRAIT_DETAILS: TD4,
  PORTRAIT: P4,
  TopBar: TopBar4,
  Scroll: Scroll4,
  Screen: Screen4
} = window.GuliKit;
const {
  TraitBar,
  InsightCard,
  ArchetypeCard,
  Button,
  ColorForm,
  Chip,
  Icon,
  TRAITS,
  Toast
} = G4;
function BackBtn({
  onBack
}) {
  return /*#__PURE__*/React.createElement("span", {
    onClick: onBack,
    style: {
      cursor: 'pointer',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 22,
    color: "var(--text-secondary)"
  }));
}
function TraitDetail({
  trait = 'E',
  onBack
}) {
  const t = TRAITS[trait];
  const d = TD4[trait];
  return /*#__PURE__*/React.createElement(Screen4, {
    label: "Trait deep-dive"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      padding: '0 0 16px',
      background: `linear-gradient(180deg, ${t.hex}2E, transparent)`
    }
  }, /*#__PURE__*/React.createElement(TopBar4, {
    title: t.poles[1],
    left: /*#__PURE__*/React.createElement(BackBtn, {
      onBack: onBack
    })
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 0'
    }
  }, /*#__PURE__*/React.createElement(TraitBar, {
    trait: trait,
    value: d.value,
    percentileLabel: `${d.value}%`
  }))), /*#__PURE__*/React.createElement(Scroll4, null, /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      margin: 0,
      color: 'var(--text-secondary)'
    }
  }, d.intro), d.notes.map(n => /*#__PURE__*/React.createElement(InsightCard, {
    key: n.title,
    title: n.title,
    trait: trait,
    label: n.label
  }, n.text)), /*#__PURE__*/React.createElement(InsightCard, {
    title: "\u10D4\u10E1 \u10E0\u10D0\u10E1 \u10DC\u10D8\u10E8\u10DC\u10D0\u10D5\u10E1 \u10E8\u10D4\u10DC\u10E1 \u10EC\u10E0\u10D4\u10E8\u10D8",
    trait: trait,
    label: null,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "users",
      size: 18,
      color: t.hex
    })
  }, d.circle), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, "\u10D9\u10D5\u10DA\u10D4\u10D5\u10D8\u10D7\u10D8 \u10E1\u10D0\u10E4\u10E3\u10EB\u10D5\u10D4\u10DA\u10D8: \u10D5\u10D0\u10DA\u10D8\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8 \u10DE\u10D8\u10E0\u10DD\u10D5\u10DC\u10D4\u10D1\u10D8\u10E1 \u10D9\u10D8\u10D7\u10EE\u10D5\u10D0\u10E0\u10D8")));
}
function ArchetypeScreen({
  onBack,
  onShare
}) {
  return /*#__PURE__*/React.createElement(Screen4, {
    label: "Archetype",
    style: {
      padding: 20,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(BackBtn, {
    onBack: onBack
  }), /*#__PURE__*/React.createElement(ArchetypeCard, {
    name: ME4.archetype,
    tagline: ME4.tagline,
    traits: ['E', 'A', 'O'],
    chips: ['გულღია', 'გულთბილი', 'მაძიებელი'],
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md",
    onClick: onShare
  }, "\u10D2\u10D0\u10D6\u10D8\u10D0\u10E0\u10D4\u10D1\u10D0"));
}
function FullPortrait({
  onBack,
  onShare
}) {
  return /*#__PURE__*/React.createElement(Screen4, {
    label: "Full portrait"
  }, /*#__PURE__*/React.createElement(TopBar4, {
    title: "",
    left: /*#__PURE__*/React.createElement(BackBtn, {
      onBack: onBack
    })
  }), /*#__PURE__*/React.createElement(Scroll4, {
    style: {
      padding: '0 28px 32px',
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '8px 0 24px',
      opacity: 0.85
    }
  }, /*#__PURE__*/React.createElement(ColorForm, {
    traits: ME4.traits,
    size: 72,
    seed: 0
  })), /*#__PURE__*/React.createElement("h1", {
    className: "type-title",
    style: {
      margin: '0 0 4px',
      textAlign: 'center'
    }
  }, ME4.colorName), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center',
      display: 'block',
      marginBottom: 28
    }
  }, ME4.name, "\u10E1 \u10DE\u10DD\u10E0\u10E2\u10E0\u10D4\u10E2\u10D8"), P4.map((para, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    className: "type-portrait",
    style: {
      margin: '0 0 22px',
      color: 'var(--text-primary)'
    }
  }, para)), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      margin: '8px 0 20px'
    }
  }, "\u10D9\u10D5\u10DA\u10D4\u10D5\u10D8\u10D7\u10D8 \u10E1\u10D0\u10E4\u10E3\u10EB\u10D5\u10D4\u10DA\u10D8 \xB7 \u10D2\u10D0\u10DC\u10D0\u10EE\u10DA\u10D3\u10D4\u10D1\u10D0 \u10E7\u10DD\u10D5\u10D4\u10DA \u10D7\u10D0\u10D5\u10D7\u10D0\u10DC"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "md",
    onClick: onShare
  }, "\u10D2\u10D0\u10D6\u10D8\u10D0\u10E0\u10D4\u10D1\u10D0")));
}
const SHARE_FORMATS = ['Story', 'კვადრატი', 'სტიკერი'];
function ShareCardPreview({
  format,
  showArchetype,
  showTraits
}) {
  const [t1, t2] = ME4.traits;
  const c1 = TRAITS[t1].hex,
    c2 = TRAITS[t2].hex;
  const story = format === 0,
    sticker = format === 2;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: story ? 148 : 178,
      height: story ? 262 : 178,
      flex: 'none',
      margin: '0 auto',
      borderRadius: 16,
      position: 'relative',
      overflow: 'hidden',
      background: sticker ? 'transparent' : 'var(--bg-0)',
      border: sticker ? '1px dashed var(--line-hairline)' : '1px solid var(--line-hairline)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8
    }
  }, !sticker && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      width: '120%',
      height: '70%',
      top: '-20%',
      borderRadius: '58% 42% 55% 45% / 52% 58% 42% 48%',
      background: `radial-gradient(closest-side, ${c1}59, ${c2}1F 70%, transparent)`,
      filter: 'blur(18px)'
    }
  }), /*#__PURE__*/React.createElement(ColorForm, {
    traits: ME4.traits,
    size: sticker ? 84 : 64,
    seed: 0,
    style: {
      position: 'relative'
    }
  }), showArchetype && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      font: `600 ${story ? 17 : 15}px/1.2 var(--font-ui)`,
      color: 'var(--text-primary)'
    }
  }, ME4.archetype), story && showArchetype && /*#__PURE__*/React.createElement("span", {
    className: "type-portrait",
    style: {
      position: 'relative',
      fontSize: 10,
      lineHeight: '15px',
      color: 'var(--text-secondary)',
      textAlign: 'center',
      maxWidth: '80%'
    }
  }, "\u201E", ME4.tagline, "\""), showTraits && !sticker && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      gap: 4
    }
  }, ['გულღია', 'გულთბილი', 'მაძიებელი'].map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      font: '500 8px/1 var(--font-ui)',
      padding: '3px 6px',
      borderRadius: 999,
      background: `${TRAITS[['E', 'A', 'O'][i]].hex}29`,
      color: TRAITS[['E', 'A', 'O'][i]].hex
    }
  }, c))), !sticker && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: 8,
      font: '600 9px/1 var(--font-ui)',
      color: 'var(--text-muted)'
    }
  }, "\u10D2\u10E3\u10DA\u10D8"), sticker && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      font: '400 8px/1 monospace',
      color: 'var(--text-muted)'
    }
  }, "guli.ge/nino"));
}
function ShareComposer({
  onBack
}) {
  const [format, setFormat] = React.useState(0);
  const [showArchetype, setShowArchetype] = React.useState(true);
  const [showTraits, setShowTraits] = React.useState(true);
  const [lang, setLang] = React.useState('ka');
  const [sent, setSent] = React.useState(false);
  const toggle = (on, label, fn) => /*#__PURE__*/React.createElement("span", {
    onClick: fn,
    style: {
      padding: '6px 12px',
      borderRadius: 999,
      font: '500 12px/18px var(--font-ui)',
      cursor: 'pointer',
      background: on ? 'rgba(232,139,171,0.16)' : 'var(--bg-2)',
      color: on ? 'var(--saperavi-tint)' : 'var(--text-muted)',
      border: '1px solid ' + (on ? 'rgba(232,139,171,0.4)' : 'var(--line-hairline)')
    }
  }, label);
  return /*#__PURE__*/React.createElement(Screen4, {
    label: "Share composer"
  }, /*#__PURE__*/React.createElement(TopBar4, {
    title: "\u10D2\u10D0\u10D6\u10D8\u10D0\u10E0\u10D4\u10D1\u10D0",
    left: /*#__PURE__*/React.createElement(BackBtn, {
      onBack: onBack
    })
  }), /*#__PURE__*/React.createElement(Scroll4, {
    style: {
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'center'
    }
  }, SHARE_FORMATS.map((f, i) => /*#__PURE__*/React.createElement("span", {
    key: f,
    onClick: () => setFormat(i),
    style: {
      padding: '6px 14px',
      borderRadius: 999,
      font: '500 13px/18px var(--font-ui)',
      cursor: 'pointer',
      background: format === i ? 'var(--saperavi)' : 'var(--bg-2)',
      color: format === i ? '#F5EDF1' : 'var(--text-secondary)'
    }
  }, f))), /*#__PURE__*/React.createElement(ShareCardPreview, {
    format: format,
    showArchetype: showArchetype,
    showTraits: showTraits
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, toggle(showArchetype, 'არქეტიპი', () => setShowArchetype(!showArchetype)), toggle(showTraits, 'თვისებები', () => setShowTraits(!showTraits)), toggle(lang === 'en', 'EN', () => setLang(lang === 'ka' ? 'en' : 'ka'))), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, format === 2 ? 'სტიკერს ბმული აქვს — მთავარ ბარათს არასდროს' : '1080×1920 · ბარათი ლამაზია აპლიკაციის კონტექსტის გარეშეც'), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      setSent(true);
      setTimeout(() => setSent(false), 2400);
    }
  }, "\u10D2\u10D0\u10D6\u10D8\u10D0\u10E0\u10D4\u10D1\u10D0")), sent && /*#__PURE__*/React.createElement(Toast, {
    floating: true,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      color: "var(--trait-c)"
    })
  }, "\u10D1\u10D0\u10E0\u10D0\u10D7\u10D8 \u10DB\u10D6\u10D0\u10D3\u10D0\u10D0 \u2014 Stories \u10D2\u10D0\u10D8\u10EE\u10E1\u10DC\u10D4\u10D1\u10D0"));
}
Object.assign(window, {
  TraitDetail,
  ArchetypeScreen,
  FullPortrait,
  ShareComposer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Results.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/TodayMap.jsx
try { (() => {
// Today + Map screens
const {
  G: G1,
  ME: ME1,
  TopBar: TopBar1,
  Scroll: Scroll1,
  Screen: Screen1
} = window.GuliKit;
const {
  DailyQuestionCard,
  InsightCard,
  ScenarioSlider,
  ProgressDrops,
  ColorForm,
  HeartMap,
  TraitBar,
  ArchetypeCard,
  Icon
} = G1;
function TodayScreen() {
  const [v, setV] = React.useState(50);
  const [answered, setAnswered] = React.useState(false);
  return /*#__PURE__*/React.createElement(Screen1, {
    label: "Today"
  }, /*#__PURE__*/React.createElement(TopBar1, {
    title: "\u10D3\u10E6\u10D4\u10E1",
    right: /*#__PURE__*/React.createElement(ProgressDrops, {
      total: 5,
      done: 3,
      size: 8
    })
  }), /*#__PURE__*/React.createElement(Scroll1, null, answered ? /*#__PURE__*/React.createElement(DailyQuestionCard, {
    answered: true,
    countdown: "\u10E8\u10D4\u10DB\u10D3\u10D4\u10D2\u10D8 \u10D9\u10D8\u10D7\u10EE\u10D5\u10D0 \u10EE\u10D5\u10D0\u10DA, 09:00"
  }) : /*#__PURE__*/React.createElement(DailyQuestionCard, {
    question: "\u10D2\u10D0\u10D3\u10D0\u10E3\u10D3\u10D4\u10D1\u10D4\u10DA\u10D8 \u10EA\u10D5\u10DA\u10D8\u10DA\u10D4\u10D1\u10D0 \u10D2\u10D4\u10D2\u10DB\u10D4\u10D1\u10E8\u10D8:",
    traits: ['N', 'O']
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(ScenarioSlider, {
    poleLeft: "\u10DB\u10D0\u10E6\u10D8\u10D6\u10D8\u10D0\u10DC\u10D4\u10D1\u10E1",
    poleRight: "\u10DB\u10D0\u10EE\u10D0\u10DA\u10D8\u10E1\u10D4\u10D1\u10E1",
    value: v,
    onChange: setV,
    trait: "N"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setAnswered(true),
    style: {
      height: 44,
      border: 'none',
      borderRadius: 999,
      background: 'var(--saperavi)',
      color: '#F5EDF1',
      font: '500 15px/1 var(--font-ui)',
      cursor: 'pointer'
    }
  }, "\u10DE\u10D0\u10E1\u10E3\u10EE\u10D8"))), /*#__PURE__*/React.createElement(InsightCard, {
    title: "\u10D3\u10E6\u10D8\u10E1 \u10D3\u10D0\u10D9\u10D5\u10D8\u10E0\u10D5\u10D4\u10D1\u10D0",
    trait: "A",
    label: "\u10D9\u10D5\u10DA\u10D4\u10D5\u10D8\u10D7\u10D8 \u10E1\u10D0\u10E4\u10E3\u10EB\u10D5\u10D4\u10DA\u10D8"
  }, "\u10E0\u10DD\u10EA\u10D0 \u10DB\u10D4\u10D2\u10DD\u10D1\u10D0\u10E0\u10D8 \u10DC\u10D0\u10EC\u10E7\u10D4\u10DC\u10D8\u10D0, \u10DE\u10D8\u10E0\u10D5\u10D4\u10DA\u10D8 \u10E8\u10D4\u10DC \u10E3\u10E0\u10D4\u10D9\u10D0\u10D5 \u2014 \u10E8\u10D4\u10DC\u10E1 \u10EC\u10E0\u10D4\u10E8\u10D8 \u10D4\u10E1 \u10D8\u10E8\u10D5\u10D8\u10D0\u10D7\u10D8 \u10D7\u10D5\u10D8\u10E1\u10D4\u10D1\u10D0\u10D0."), /*#__PURE__*/React.createElement(InsightCard, {
    title: "\u10E1\u10D0\u10EE\u10D0\u10DA\u10D8\u10E1\u10DD \u10E8\u10E2\u10E0\u10D8\u10EE\u10D8",
    trait: "E",
    label: "\u10E1\u10D0\u10EE\u10D0\u10DA\u10D8\u10E1\u10DD"
  }, "\u10E1\u10D0\u10D3\u10E6\u10D4\u10D2\u10E0\u10EB\u10D4\u10DA\u10DD\u10E1 \u10D3\u10D0\u10EC\u10E7\u10D4\u10D1\u10D8\u10E1 \u10D0\u10DA\u10D1\u10D0\u10D7\u10DD\u10D1\u10D0: \u10DB\u10D0\u10E6\u10D0\u10DA\u10D8. \u10D2\u10D0\u10DC\u10E1\u10D0\u10D9\u10E3\u10D7\u10E0\u10D4\u10D1\u10D8\u10D7 \u10DB\u10D4\u10E1\u10D0\u10DB\u10D4 \u10E1\u10D0\u10D0\u10D7\u10D6\u10D4."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)'
    }
  }, /*#__PURE__*/React.createElement(ColorForm, {
    traits: ME1.traits,
    size: 28,
    seed: 0
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body-sm",
    style: {
      flex: 1
    }
  }, "\u10E8\u10D4\u10DC\u10D8 \u10DE\u10DD\u10E0\u10E2\u10E0\u10D4\u10E2\u10D8 \u10D2\u10D0\u10DC\u10D0\u10EE\u10DA\u10D3\u10D0"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  }))));
}
function MapScreen({
  onArchetype,
  onTrait,
  onPortrait,
  onShare,
  onChapters
}) {
  return /*#__PURE__*/React.createElement(Screen1, {
    label: "Heart Map"
  }, /*#__PURE__*/React.createElement(TopBar1, {
    title: "\u10E0\u10E3\u10D9\u10D0",
    right: /*#__PURE__*/React.createElement("span", {
      onClick: onShare,
      style: {
        cursor: 'pointer',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "share",
      size: 20,
      color: "var(--text-secondary)"
    }))
  }), /*#__PURE__*/React.createElement(Scroll1, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '4px 0 0'
    }
  }, /*#__PURE__*/React.createElement(ColorForm, {
    traits: ME1.traits,
    size: 88,
    seed: 0
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-title"
  }, ME1.colorName), /*#__PURE__*/React.createElement("span", {
    className: "type-body-sm",
    style: {
      color: 'var(--text-secondary)'
    }
  }, "\u10E8\u10D4\u10DC\u10D8 \u10E4\u10D4\u10E0\u10D8 \xB7 ", ME1.name))), /*#__PURE__*/React.createElement(HeartMap, {
    scores: ME1.scores,
    size: 330,
    style: {
      alignSelf: 'center',
      margin: '-6px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: '16px 16px 20px',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)'
    }
  }, ['E', 'A', 'C', 'N', 'O'].map(k => /*#__PURE__*/React.createElement("div", {
    key: k,
    onClick: () => onTrait(k),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(TraitBar, {
    trait: k,
    value: ME1.scores[k]
  })))), /*#__PURE__*/React.createElement("div", {
    onClick: onArchetype,
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(ArchetypeCard, {
    compact: true,
    name: ME1.archetype,
    tagline: ME1.tagline,
    traits: ['E', 'A', 'O']
  })), /*#__PURE__*/React.createElement("div", {
    onClick: onPortrait,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-h3"
  }, "\u10E1\u10E0\u10E3\u10DA\u10D8 \u10DE\u10DD\u10E0\u10E2\u10E0\u10D4\u10E2\u10D8"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("div", {
    onClick: onChapters,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--saperavi)',
      boxShadow: 'var(--glow-saperavi)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book-open",
    size: 20,
    color: "var(--saperavi-tint)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-h3"
  }, "\u10D3\u10D0\u10E0\u10E9\u10D0 5 \u10D7\u10D0\u10D5\u10D8"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)'
    }
  }, "\u10E0\u10E3\u10D9\u10D0 \u10E6\u10E0\u10DB\u10D0\u10D5\u10D3\u10D4\u10D1\u10D0 \u10E7\u10DD\u10D5\u10D4\u10DA \u10D7\u10D0\u10D5\u10D7\u10D0\u10DC")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, "\u10E1\u10D0\u10E4\u10E3\u10EB\u10D5\u10D4\u10DA\u10D8: \u10D5\u10D0\u10DA\u10D8\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8 \u10DE\u10D8\u10E0\u10DD\u10D5\u10DC\u10D4\u10D1\u10D8\u10E1 \u10D9\u10D8\u10D7\u10EE\u10D5\u10D0\u10E0\u10D8")));
}
Object.assign(window, {
  TodayScreen,
  MapScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/TodayMap.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/shared.jsx
try { (() => {
// Guli app UI kit — sample data + shared chrome. Loads after _ds_bundle.js.
const G = window.GuliDesignSystem_a2088d;
const ME = {
  name: 'ნინო',
  colorName: 'თბილი ცა',
  traits: ['A', 'O'],
  seed: 0,
  scores: {
    E: 62,
    A: 81,
    C: 47,
    N: 58,
    O: 74
  },
  archetype: 'მასპინძელი',
  tagline: 'შენ ის ხარ, ვინც სუფრას ერთი კითხვით ცვლის.'
};
const FRIENDS = [{
  name: 'გიორგი',
  archetype: 'მემატიანე',
  traits: ['C', 'N'],
  seed: 1,
  match: 78,
  scores: {
    E: 38,
    A: 66,
    C: 82,
    N: 71,
    O: 45
  }
}, {
  name: 'თამარი',
  archetype: 'მაძიებელი',
  traits: ['O', 'E'],
  seed: 2,
  match: 84,
  scores: {
    E: 70,
    A: 58,
    C: 41,
    N: 49,
    O: 88
  }
}, {
  name: 'ლუკა',
  archetype: 'მთის ტბა',
  traits: ['N', 'C'],
  seed: 3,
  match: 64,
  scores: {
    E: 30,
    A: 72,
    C: 68,
    N: 85,
    O: 52
  }
}];
const CHAPTERS = [{
  n: 1,
  trait: 'E',
  title: 'კარი',
  count: 9,
  state: 'done'
}, {
  n: 2,
  trait: 'A',
  title: 'სითბო',
  count: 8,
  state: 'done'
}, {
  n: 3,
  trait: 'C',
  title: 'წესრიგი',
  count: 10,
  state: 'current'
}, {
  n: 4,
  trait: 'N',
  title: 'ზღვა',
  count: 9,
  state: 'locked'
}, {
  n: 5,
  trait: 'O',
  title: 'ჰორიზონტი',
  count: 8,
  state: 'locked'
}, {
  n: 6,
  trait: 'E',
  title: 'სუფრა',
  count: 8,
  state: 'locked',
  fun: true
}, {
  n: 7,
  trait: 'A',
  title: 'გემო',
  count: 10,
  state: 'locked',
  fun: true
}];
const TRAIT_DETAILS = {
  E: {
    value: 62,
    intro: 'გულჩათხრობილობა სიღრმეა: ენერგია შიგნით გროვდება და რჩეულ ხალხს ხმარდება. გულღიაობა კი კარია: ენერგია ხალხში იბადება და ხალხშივე ბრუნდება. შენ კარისკენ იხრები — მაგრამ ზღურბლს არ კარგავ.',
    notes: [{
      title: 'შენი ენერგია',
      text: 'ხალხთან ყოფნა გმუხტავს, მაგრამ დღეში ერთი მშვიდი საათი შენთვის აუცილებელია.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'სუფრასთან',
      text: 'სადღეგრძელოს დაწყება შენთვის ბუნებრივია — განსაკუთრებით, როცა მაგიდას ახალი სახე უზის.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'სახალისო შტრიხი',
      text: 'ალბათობა, რომ წვეულებიდან ბოლო წახვალ: საგრძნობი.',
      label: 'სახალისო'
    }],
    circle: 'შენს წრეში შენ ხშირად ხიდი ხარ — გულჩათხრობილ მეგობრებს შენით ეხსნებათ კარი.'
  },
  A: {
    value: 81,
    intro: 'გულცივობა დისტანციაა, რომელიც აზრს იცავს; გულთბილობა — სიახლოვე, რომელიც ადამიანებს იცავს. შენ მკვეთრად თბილი მხარეს დგახარ.',
    notes: [{
      title: 'პირველი ზარი',
      text: 'როცა მეგობარი ნაწყენია, პირველი შენ ურეკავ — შენს წრეში ეს იშვიათი თვისებაა.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'საზღვრები',
      text: 'სითბო ზოგჯერ საკუთარი საზღვრების ხარჯზე გაქვს — ეს დასაფიქრებელია, არა გამოსასწორებელი.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'სახალისო შტრიხი',
      text: 'შენთან ნასადილევს არავინ მიდის მშიერი. არც ნაწყენი.',
      label: 'სახალისო'
    }],
    circle: 'კონფლიქტისას შენ ხშირად შუამავალი ხდები — ფრთხილად, ორივე მხარეს ნუ აიღებ საკუთარ თავზე.'
  },
  C: {
    value: 47,
    intro: 'უდარდელობა მოქნილობაა — გეგმა მონახაზია და არა კანონი. გულმოდგინება კი რწმენაა, რომ დეტალები პატივისცემაა. შენ შუაში დგახარ, მცირე გადახრით იმპროვიზაციისკენ.',
    notes: [{
      title: 'გეგმები',
      text: 'დაწყება გიადვილდება, დასრულება — ხასიათზეა დამოკიდებული. მოკლე ვადები შენი მოკავშირეა.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'დეტალები',
      text: 'დიდი სურათი გხიბლავს, წვრილმანები გღლის — კარგ დუეტს ქმნი გულმოდგინე ადამიანებთან.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'სახალისო შტრიხი',
      text: 'ჩამონათვალს წერ. ჩამონათვალს კარგავ. ახალს წერ — უკეთესს.',
      label: 'სახალისო'
    }],
    circle: 'გიორგისთან ეს შენი მთავარი განსხვავებაა — და ალბათ ყველაზე საინტერესო სასაუბრო.'
  },
  N: {
    value: 58,
    intro: 'გულფიცხობა ცეცხლია — რეაქცია სწრაფად მოდის და სწრაფად მიდის. გულმშვიდობა კი ტბაა. შენ ტბისკენ იხრები, თუმცა ღელვა სტუმრად გეწვევა ხოლმე.',
    notes: [{
      title: 'ღელვის რიტმი',
      text: 'ღელვა მოდის, როცა საქმე ბევრია, და მიდის, როცა საყვარელ ხალხთან ზიხარ.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'აღდგენა',
      text: 'ცუდი დღის შემდეგ შენი აღდგენა სწრაფია — ძილი და ერთი კარგი საუბარი ყოფნის.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'სახალისო შტრიხი',
      text: 'შენი „კარგად ვარ" 90%-ში მართალია. დანარჩენ 10%-ს ჩაი სჭირდება.',
      label: 'სახალისო'
    }],
    circle: 'ლუკასთან ამ ღერძზე ახლოს ხართ — ამიტომაა თქვენი დუმილიც კომფორტული.'
  },
  O: {
    value: 74,
    intro: 'ჩვეულის ერთგულება ფესვია — გამოცდილი გზები სიმშვიდეს იძლევა. მაძიებლობა კი ჰორიზონტია. შენ ჰორიზონტისკენ იყურები: ყოველი შემთხვევითი ქუჩა ახალი ამბავია.',
    notes: [{
      title: 'ახალი კარები',
      text: 'უცხო ქალაქში გზის დაკარგვა უფრო გახალისებს, ვიდრე გაღიზიანებს.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'იდეები',
      text: 'საუბარში ხშირად შენ შემოგაქვს მოულოდნელი კუთხე — წრე ამას შენგან ელის.',
      label: 'კვლევითი საფუძველი'
    }, {
      title: 'სახალისო შტრიხი',
      text: 'მენიუდან ყოველთვის იმას უკვეთავ, რაც ჯერ არ გისინჯავს. თითქმის ყოველთვის.',
      label: 'სახალისო'
    }],
    circle: 'თამართან ეს საერთო ენაა — ორივე მაძიებელი ხართ, უბრალოდ სხვადასხვა რუკით.'
  }
};
const PORTRAIT = ['შენი კარი ღიაა, და ხალხი ამას შორიდან გრძნობს. სუფრასთან შენ ის ხარ, ვინც უცნობს მეზობლად დაისვამს და საათში ძველ მეგობრად აქცევს. მაგრამ შენი გახსნილობა ზედაპირული არ არის: ადამიანები შენთვის საკითხავი წიგნებია, და არცერთს არ ტოვებ ბოლო თავამდე მიუყვანელს.', 'სითბო შენში პირველია. როცა მეგობარი ნაწყენია, პირველი შენ ურეკავ — არა იმიტომ, რომ გმართებს, არამედ იმიტომ, რომ სხვანაირად არ შეგიძლია. ეს გულთბილობა შენს წრეს უხილავი ძაფებით კრავს, თუმცა ზოგჯერ საკუთარი საზღვრები გავიწყდება.', 'გეგმები შენთვის მონახაზია და არა კანონი. უცხო ქალაქში გზის დაკარგვა უფრო გახალისებს, ვიდრე გაღიზიანებს — რადგან ყოველი შემთხვევითი ქუჩა ახალი ამბავია. ეს მაძიებლობა შენი ცის ფერია: ფართო, ღია, მოუსვენარი.', 'ღელვა შენთან სტუმარია და არა მობინადრე. მოდის, როცა საქმე ბევრია, და მიდის, როცა საყვარელ ხალხთან ზიხარ. შენი სიმშვიდის გასაღები იქვე ინახება, სადაც შენი ენერგია იბადება: ხალხში — მაგრამ საზომით.', 'შენ ის ხარ, ვინც სუფრას ერთი კითხვით ცვლის. ეს იშვიათი ნიჭია — გაუფრთხილდი.'];
const GROUP = {
  name: 'ძველი უბანი',
  colorName: 'თბილი მინანქარი',
  traits: ['A', 'C'],
  mean: {
    E: 50,
    A: 69,
    C: 60,
    N: 66,
    O: 65
  },
  titles: [{
    title: 'ყველაზე გულღია მაგიდასთან',
    who: 'თამარი',
    consented: true
  }, {
    title: 'ყველაზე გულმოდგინე',
    who: null,
    consented: false
  }]
};
function TopBar({
  title,
  left,
  right
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 52,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 20,
      display: 'inline-flex'
    }
  }, left), /*#__PURE__*/React.createElement("span", {
    className: "type-h3"
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 20,
      display: 'inline-flex'
    }
  }, right));
}
function Scroll({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '0 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      minHeight: 0,
      ...style
    }
  }, children);
}
function Row({
  children,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      background: 'var(--bg-1)',
      borderRadius: 16,
      border: '1px solid var(--line-hairline)',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, children);
}
function Screen({
  label,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": label,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      ...style
    }
  }, children);
}
Object.assign(window, {
  GuliKit: {
    G,
    ME,
    FRIENDS,
    CHAPTERS,
    TRAIT_DETAILS,
    PORTRAIT,
    GROUP,
    TopBar,
    Scroll,
    Row,
    Screen
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.LikertCard = __ds_scope.LikertCard;

__ds_ns.LIKERT_LABELS = __ds_scope.LIKERT_LABELS;

__ds_ns.ProgressDrops = __ds_scope.ProgressDrops;

__ds_ns.ScenarioSlider = __ds_scope.ScenarioSlider;

__ds_ns.ThisOrThatPair = __ds_scope.ThisOrThatPair;

__ds_ns.ArchetypeCard = __ds_scope.ArchetypeCard;

__ds_ns.DailyQuestionCard = __ds_scope.DailyQuestionCard;

__ds_ns.InsightCard = __ds_scope.InsightCard;

__ds_ns.BottomSheet = __ds_scope.BottomSheet;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.TRAITS = __ds_scope.TRAITS;

__ds_ns.ColorForm = __ds_scope.ColorForm;

__ds_ns.HeartMap = __ds_scope.HeartMap;

__ds_ns.TraitBar = __ds_scope.TraitBar;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.TabBar = __ds_scope.TabBar;

})();
