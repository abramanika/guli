import { useState } from 'react'
import { generateQRSvg } from '../../lib/qr'
import { supabase } from '../../lib/supabase'

export default function CirclePage() {
  const [qrSvg, setQrSvg] = useState(null)
  const [inviteUrl, setInviteUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleCreateInvite() {
    setLoading(true)
    try {
      const session = (await supabase.auth.getSession()).data.session
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-invite`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const { url } = await res.json()
      setInviteUrl(url)
      const svg = await generateQRSvg(`https://${url}`)
      setQrSvg(svg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>წრე</h2>
      <button onClick={handleCreateInvite} disabled={loading}>
        {loading ? 'იქმნება…' : 'მოწვევის ბმული'}
      </button>
      {inviteUrl && <p style={{ fontSize: 14, marginTop: 8 }}>{inviteUrl}</p>}
      {qrSvg && (
        <div
          style={{ marginTop: 16, width: 160 }}
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
      )}
    </div>
  )
}
