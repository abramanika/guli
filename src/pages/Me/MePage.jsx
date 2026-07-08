import React, { useEffect, useState } from 'react';
import PageTransition from '../../components/PageTransition.jsx';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Chip, ColorForm, BottomSheet, Toast, TRAITS } from '../../design-system/index.js';
import useResultsStore, { FALLBACK } from '../../stores/resultsStore.js';
import useAuthStore from '../../stores/authStore.js';
import { supabase } from '../../lib/supabase.js';

const VIS_LABELS = ['მხოლოდ მე', 'მეგობრები', 'ბმულით'];
const VIS_VALUES = ['private', 'friends', 'link'];

export default function MePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { scores, archetype, colorName, name, traits, loading, loadResults } = useResultsStore();

  const [preview, setPreview] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [vis, setVis] = useState(0); // index into VIS_LABELS
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-dismiss toast after 2.4s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    loadResults(user?.id ?? null);
  }, [user?.id, loadResults]);

  // Load existing visibility setting from profile
  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from('profiles')
      .select('visibility')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data?.visibility) {
          const idx = VIS_VALUES.indexOf(data.visibility);
          if (idx !== -1) setVis(idx);
        }
      });
  }, [user?.id]);

  const displayName = name ?? FALLBACK.name;
  const displayArchetype = archetype ?? FALLBACK.archetype;
  const displayColorName = colorName ?? FALLBACK.colorName;
  const displayTraits = traits ?? FALLBACK.traits;

  // Derive top-2 trait keys for ColorForm
  const topTraits = (() => {
    const s = scores ?? FALLBACK.scores;
    const sorted = Object.entries(s).sort(([, a], [, b]) => b - a);
    return [sorted[0][0], sorted[1][0]];
  })();

  async function handleVisChange(idx) {
    setVis(idx);
    if (!user?.id) return;
    await supabase
      .from('profiles')
      .update({ visibility: VIS_VALUES[idx] })
      .eq('id', user.id);
  }

  async function handleExport() {
    if (exporting) return;
    setExporting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
      const res = await fetch(`${supabaseUrl}/functions/v1/export-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'guli-data-export.json';
      a.click();
      URL.revokeObjectURL(url);
      setToast({ message: 'მონაცემები გადმოიწერა', type: 'success' });
    } catch {
      setToast({ message: 'გადმოწერა ვერ მოხერხდა', type: 'error' });
    } finally {
      setExporting(false);
    }
  }

  async function handleDeleteConfirm() {
    if (deleting) return;
    setDeleting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
      const res = await fetch(`${supabaseUrl}/functions/v1/delete-account`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
      // Sign out and redirect to root after successful deletion
      await supabase.auth.signOut();
      navigate('/');
    } catch {
      setConfirm(false);
      setToast({ message: 'წაშლა ვერ მოხერხდა', type: 'error' });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <PageTransition>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-0)' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 16px', gap: 8,
        borderBottom: '1px solid var(--line-hairline)',
        flex: 'none',
      }}>
        <span className="type-h3" style={{ flex: 1 }}>მე</span>
        <span
          onClick={() => navigate('/me/settings')}
          style={{ cursor: 'pointer', display: 'inline-flex' }}
        >
          <Icon name="settings" size={20} color="var(--text-secondary)" />
        </span>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* Identity blob */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '8px 0 4px' }}>
          <ColorForm traits={topTraits} size={88} seed={0} />
          <span className="type-title">{displayName}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Chip trait="A" active>{displayArchetype?.name ?? FALLBACK.archetype.name}</Chip>
            <Chip trait="O" active>{displayColorName}</Chip>
          </div>
        </div>

        {/* Preview toggle */}
        <div
          onClick={() => setPreview(!preview)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16,
            border: '1px solid var(--line-hairline)', cursor: 'pointer',
          }}
        >
          <Icon name="eye" size={20} color={preview ? 'var(--saperavi-tint)' : 'var(--text-secondary)'} />
          <span className="type-body" style={{ flex: 1 }}>ასე გხედავენ სხვები</span>
          <span className="type-caption" style={{ color: preview ? 'var(--saperavi-tint)' : 'var(--text-muted)' }}>
            {preview ? 'ჩართულია' : 'ნახვა'}
          </span>
        </div>

        {preview && (
          <div style={{
            padding: '14px 16px', background: 'var(--bg-0)', borderRadius: 16,
            border: '1px dashed var(--line-hairline)', display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <ColorForm traits={topTraits} size={44} seed={0} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="type-h3">{displayName}</span>
              <span className="type-caption" style={{ color: 'var(--text-muted)' }}>
                {displayArchetype?.name ?? FALLBACK.archetype.name} · {displayColorName} — ქულები არ ჩანს
              </span>
            </div>
          </div>
        )}

        {/* Visibility selector */}
        <span className="type-caption" style={{ color: 'var(--text-muted)', marginTop: 4 }}>ვინ ხედავს შენს რუკას</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {VIS_LABELS.map((label, i) => (
            <div
              key={label}
              onClick={() => handleVisChange(i)}
              style={{
                flex: 1, textAlign: 'center', padding: '12px 4px', borderRadius: 12,
                background: 'var(--bg-1)', font: '500 13px/18px var(--font-ui)',
                border: '1px solid ' + (i === vis ? 'var(--saperavi)' : 'var(--line-hairline)'),
                boxShadow: i === vis ? 'var(--glow-saperavi)' : 'none',
                color: i === vis ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Data section */}
        <span className="type-caption" style={{ color: 'var(--text-muted)', marginTop: 4 }}>მონაცემები</span>

        <div
          onClick={handleExport}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16,
            border: '1px solid var(--line-hairline)', cursor: exporting ? 'default' : 'pointer',
            opacity: exporting ? 0.6 : 1,
          }}
        >
          <Icon name="download" size={20} color="var(--text-secondary)" />
          <span className="type-body" style={{ flex: 1 }}>მონაცემების გადმოწერა</span>
        </div>

        <div
          onClick={() => setConfirm(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px', background: 'var(--bg-1)', borderRadius: 16,
            border: '1px solid var(--line-hairline)', cursor: 'pointer',
          }}
        >
          <Icon name="trash-2" size={20} color="var(--error)" />
          <span className="type-body" style={{ flex: 1, color: 'var(--error)' }}>წაშალე ჩემი მონაცემები</span>
        </div>

        <span className="type-caption" style={{ color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
          გული არ ყიდის შენს ყურადღებას.
        </span>
      </div>

      {/* Delete confirmation bottom sheet */}
      <BottomSheet open={confirm} title="წაიშალოს ყველაფერი?" onClose={() => setConfirm(false)}>
        <p className="type-body-sm" style={{ margin: 0, color: 'var(--text-secondary)' }}>
          რუკა, პასუხები, კავშირები — ყველაფერი წაიშლება სრულად და დაუბრუნებლად. ეს ერთი შეხებით სრულდება.
        </p>
        <Button
          variant="destructive"
          onClick={handleDeleteConfirm}
          style={{ opacity: deleting ? 0.6 : 1 }}
        >
          {deleting ? 'იშლება...' : 'დიახ, წაშალე'}
        </Button>
        <Button variant="ghost" size="md" onClick={() => setConfirm(false)}>გადავიფიქრე</Button>
      </BottomSheet>

      {/* Toast notifications */}
      {toast && (
        <Toast floating>
          {toast.message}
        </Toast>
      )}
    </div>
    </PageTransition>
  );
}
