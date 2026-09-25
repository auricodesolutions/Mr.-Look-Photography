export function useAdminContent(key, fallback) {
  void key;
  return fallback;
}

export function publicAsset(path) {
  if (!path || /^(?:https?:|data:|blob:|\/)/i.test(path)) return path;
  return `/${path.replace(/^\/+/, '')}`;
}
