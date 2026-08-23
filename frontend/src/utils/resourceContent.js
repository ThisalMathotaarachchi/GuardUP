export const getDifficultyBadgeClassLight = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'beginner':
      return 'badge-easy-light';
    case 'intermediate':
      return 'badge-medium-light';
    case 'advanced':
      return 'badge-hard-light';
    default:
      return 'badge-type-light';
  }
};

export const getArticleSections = (resource) => {
  if (resource.sections?.length) {
    return resource.sections;
  }

  const paragraphs = resource.fullContent?.length
    ? resource.fullContent
    : resource.content
      ? [resource.content]
      : [];

  if (!paragraphs.length) return [];

  return [{ heading: null, paragraphs }];
};

export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case 'beginner':
      return 'badge-easy';
    case 'intermediate':
      return 'badge-medium';
    case 'advanced':
      return 'badge-hard';
    default:
      return 'bg-white/10 text-white/65';
  }
};

export const isEmbeddableVideoUrl = (videoUrl) =>
  Boolean(videoUrl && (videoUrl.includes('youtube.com/embed/') || videoUrl.includes('player.vimeo.com/video/')));

export const getExternalVideoUrl = (videoUrl) => {
  if (!videoUrl) return null;
  if (videoUrl.includes('youtube.com/embed/')) {
    const videoId = videoUrl.split('youtube.com/embed/')[1]?.split(/[?&]/)[0];
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : videoUrl;
  }
  return videoUrl;
};

export const getTypeLabel = (type) => {
  if (type === 'video') return 'Video';
  if (type === 'pdf') return 'Guide';
  return 'Article';
};
