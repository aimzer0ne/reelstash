function parseStoryPath(pathname) {
  const parts = String(pathname || '').split('/').filter(Boolean);
  if (!parts.length || parts[0].toLowerCase() !== 'stories') return null;
  if (parts.length >= 3 && parts[1].toLowerCase() === 'highlights' && /^\d{6,30}$/.test(parts[2])) {
    return { highlightId: parts[2] };
  }
  if (parts.length >= 2 && /^[A-Za-z0-9._]{1,30}$/.test(parts[1])) {
    const storyId = parts[2] && /^\d{6,30}$/.test(parts[2]) ? parts[2] : null;
    return { username: parts[1], storyId };
  }
  return null;
}
const u = new URL('https://www.instagram.com/stories/rajshamani/https://www.instagram.com/stories/rajshamani/');
console.log(parseStoryPath(u.pathname));
