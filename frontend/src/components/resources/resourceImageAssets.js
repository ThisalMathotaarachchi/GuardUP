

export const resolveResourceTopic = (resource) => {
  const category = (resource.category || '').toLowerCase();
  const tags = (resource.tags || []).join(' ').toLowerCase();
  const haystack = `${category} ${tags} ${resource.title}`.toLowerCase();

  if (haystack.includes('phish')) return 'phishing';
  if (haystack.includes('ransom')) return 'ransomware';
  if (haystack.includes('mfa') || haystack.includes('multi-factor') || haystack.includes('authentication')) return 'mfa';
  if (haystack.includes('password') || haystack.includes('credential')) return 'password';
  if (haystack.includes('social')) return 'social';
  if (haystack.includes('incident') || haystack.includes('response')) return 'incident';
  if (haystack.includes('url') || haystack.includes('link') || haystack.includes('domain')) return 'url';
  if (haystack.includes('remote') || haystack.includes('vpn')) return 'remote';
  if (haystack.includes('insider')) return 'insider';
  if (haystack.includes('privacy') || haystack.includes('gdpr') || haystack.includes('personal data')) return 'privacy';
  if (haystack.includes(' ai ') || haystack.includes('artificial')) return 'ai';
  if (haystack.includes('data') || haystack.includes('protection')) return 'data';
  if (haystack.includes('network') || haystack.includes('zero trust') || haystack.includes('apt')) return 'network';
  if (haystack.includes('physical') || haystack.includes('badge') || haystack.includes('access control')) return 'basics';
  if (resource.type === 'video') return 'video';
  if (category.includes('basic') || category.includes('fundamental')) return 'basics';
  return 'basics';
};

const TOPIC_META = {
  phishing: { file: 'phishing.webp', label: 'phishing awareness and email security' },
  ransomware: { file: 'ransomware.webp', label: 'ransomware and encrypted systems' },
  mfa: { file: 'mfa.webp', label: 'multi-factor authentication' },
  password: { file: 'password.webp', label: 'password and credential security' },
  social: { file: 'social.webp', label: 'social engineering awareness' },
  incident: { file: 'incident.webp', label: 'incident response and security operations' },
  url: { file: 'url.webp', label: 'web and URL security' },
  remote: { file: 'remote.webp', label: 'remote work security' },
  insider: { file: 'insider.webp', label: 'insider threat awareness' },
  privacy: { file: 'privacy.webp', label: 'digital privacy and data protection' },
  ai: { file: 'ai.webp', label: 'AI system security' },
  data: { file: 'data.webp', label: 'data protection and secure storage' },
  network: { file: 'network.webp', label: 'network and infrastructure security' },
  basics: { file: 'basics.webp', label: 'cybersecurity fundamentals' },
  video: { file: 'video.webp', label: 'cybersecurity training and learning' },
};

const ASSET_BASE = '/assets/knowledge';

export const getResourceImage = (resource) => {
  const topic = resolveResourceTopic(resource);
  const meta = TOPIC_META[topic] || TOPIC_META.basics;
  return {
    src: `${ASSET_BASE}/${meta.file}`,
    alt: `${resource.title} — ${meta.label}`,
    topic,
  };
};
