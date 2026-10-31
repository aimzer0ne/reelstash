// Turns a video or audio file into an MP3 in the browser, since the Worker can't run ffmpeg.
const SAMPLE_RATE = 44100;
const BLOCK = 1152;

function toInt16(samples) {
  const out = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i += 1) {
    out[i] = Math.max(-1, Math.min(1, samples[i])) * 0x7fff;
  }
  return out;
}

export async function saveAsMp3(url, filename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Link expired. Fetch the post again.');
  const source = await response.arrayBuffer();

  let audio;
  try {
    audio = await new OfflineAudioContext(1, 1, SAMPLE_RATE).decodeAudioData(source);
  } catch {
    throw new Error('This video has no soundtrack.');
  }

  const { Mp3Encoder } = await import('@breezystack/lamejs');
  const channels = Math.min(audio.numberOfChannels, 2);
  const encoder = new Mp3Encoder(channels, SAMPLE_RATE, 192);
  const left = toInt16(audio.getChannelData(0));
  const right = channels === 2 ? toInt16(audio.getChannelData(1)) : null;
  const parts = [];
  for (let i = 0; i < left.length; i += BLOCK) {
    const blockLeft = left.subarray(i, i + BLOCK);
    const part = right ? encoder.encodeBuffer(blockLeft, right.subarray(i, i + BLOCK)) : encoder.encodeBuffer(blockLeft);
    if (part.length) parts.push(part);
    // Keep the page responsive during long tracks.
    if (i % (BLOCK * 400) === 0) await new Promise((resolve) => setTimeout(resolve));
  }
  parts.push(encoder.flush());

  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob(parts, { type: 'audio/mpeg' }));
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 60_000);
}
