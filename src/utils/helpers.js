export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function daysAgo(dateStr) {
  const posted = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return `${diff} days ago`;
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}