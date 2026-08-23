export const formatRelativeTime = (isoString) => {
  if (!isoString) return '';

  const timestamp = new Date(isoString).getTime();
  if (Number.isNaN(timestamp)) return '';

  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return 'Just now';

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;

  return new Date(isoString).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
};
