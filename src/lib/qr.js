import QRCode from 'qrcode'

/**
 * Generate a QR code SVG string for a URL.
 * Uses brand colours: dark ink #120B10, light background #F5EDF1.
 *
 * @param {string} url - The URL to encode
 * @returns {Promise<string>} SVG markup string
 */
export async function generateQRSvg(url) {
  return QRCode.toString(url, {
    type: 'svg',
    margin: 1,
    color: {
      dark: '#120B10',
      light: '#F5EDF1',
    },
  })
}
