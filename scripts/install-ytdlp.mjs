import { chmodSync, createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const VENDOR = join(ROOT, 'vendor');
const onCloudflare = Boolean(process.env.CF_PAGES || process.env.CLOUDFLARE || process.env.WORKERS_CI);
if (onCloudflare) {
  console.log('Skipping yt-dlp download on Cloudflare (Workers assets are limited to 25 MiB).');
  process.exit(0);
}
const required = Boolean(process.env.VERCEL);
const assets = {
  'linux-x64': 'yt-dlp_linux',
  'linux-arm64': 'yt-dlp_linux_aarch64',
  'darwin-x64': 'yt-dlp_macos',
  'darwin-arm64': 'yt-dlp_macos',
  'win32-x64': 'yt-dlp.exe',
  'win32-arm64': 'yt-dlp.exe'
};
const key = `${process.platform}-${process.arch}`;
const asset = assets[key];
const outputName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
const outputPath = join(VENDOR, outputName);

if (!asset) {
  const message = `No yt-dlp binary is published for ${key}.`;
  if (required) throw new Error(message);
  console.warn(message);
  process.exit(0);
}

if (existsSync(outputPath) && !process.env.FORCE_YTDLP_DOWNLOAD) {
  console.log(`yt-dlp already present at ${outputPath}`);
  process.exit(0);
}

mkdirSync(VENDOR, { recursive: true });
const url = `https://github.com/yt-dlp/yt-dlp/releases/latest/download/${asset}`;
console.log(`Downloading ${url}`);
const response = await fetch(url, { redirect: 'follow' });
if (!response.ok || !response.body) {
  const message = `Failed to download yt-dlp (${response.status}).`;
  if (required) throw new Error(message);
  console.warn(message);
  process.exit(0);
}

await pipeline(Readable.fromWeb(response.body), createWriteStream(outputPath));
if (process.platform !== 'win32') chmodSync(outputPath, 0o755);
console.log(`Installed yt-dlp to ${outputPath}`);
