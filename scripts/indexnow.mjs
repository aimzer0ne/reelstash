// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver, ...) which pages changed,
// so they recrawl them within hours instead of weeks. Run after a production deploy:
//   node scripts/indexnow.mjs                       every URL in the live sitemap
//   node scripts/indexnow.mjs /blog/some-post /     only these paths
// The key below must match public/<key>.txt, which proves we own the host.
const HOST = 'reelsdl.net';
const KEY = 'ee2ae55ae241f1c63552672b5dd36906';

async function sitemapUrls() {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((path) => new URL(path, `https://${HOST}`).href) : await sitemapUrls();

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList })
});
// 200 and 202 both mean accepted; 403 means the key file is not live yet.
console.log(`IndexNow: ${response.status} ${response.statusText} for ${urlList.length} URL(s)`);
if (!response.ok) process.exitCode = 1;
