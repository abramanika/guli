import html2canvas from 'html2canvas';

/**
 * Capture a DOM element as a PNG blob.
 * @param {HTMLElement} element - The element to capture
 * @param {Object} options - { width, height, scale }
 * @returns {Promise<Blob>} PNG blob
 */
export async function captureElement(element, { width, height, scale = 2 } = {}) {
  const canvas = await html2canvas(element, {
    width,
    height,
    scale,
    backgroundColor: null,
    useCORS: true,
    logging: false,
  });
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

/**
 * Share or download a captured image.
 * Uses Web Share API if available (mobile), falls back to download.
 * @param {Blob} blob - Image blob
 * @param {string} filename - e.g., "guli-share.png"
 */
export async function shareOrDownload(blob, filename = 'guli-share.png') {
  const file = new File([blob], filename, { type: 'image/png' });

  if (navigator.canShare?.({ files: [file] })) {
    await navigator.share({
      files: [file],
      title: 'გული',
    });
    return 'shared';
  }

  // Fallback: download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  return 'downloaded';
}
