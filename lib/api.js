export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');

export function apiUrl(path = '') {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${suffix}` : suffix;
}

export function withApiHost(url) {
  if (!url || /^https?:\/\//i.test(url)) return url;
  return apiUrl(url);
}
