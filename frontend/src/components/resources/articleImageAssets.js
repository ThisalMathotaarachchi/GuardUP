import { getResourceImage } from './resourceImageAssets';

const ASSET_BASE = '/assets/knowledge/articles';


const DIAGRAM_IMAGES = {
  'threat-landscape': {
    file: 'article-threat-landscape.webp',
    alt: 'Security operations environment monitoring diverse cyber threat categories',
  },
  'cia-triad': {
    file: 'article-cia-triad.webp',
    alt: 'Layered enterprise security protecting confidentiality, integrity, and availability',
  },
  'phishing-flow': {
    file: 'article-phishing-flow.webp',
    alt: 'Suspicious phishing email with spoofed sender and malicious link on a workstation',
  },
  'ransomware-flow': {
    file: 'article-ransomware-flow.webp',
    alt: 'Ransomware incident showing encrypted files and locked systems on an IT workstation',
  },
  'mfa-flow': {
    file: 'article-mfa-flow.webp',
    alt: 'Multi-factor authentication with login screen and smartphone verification code',
  },
};

export const getArticleImage = ({ diagramType, resource, title }) => {
  const diagramMeta = diagramType ? DIAGRAM_IMAGES[diagramType] : null;

  if (diagramMeta) {
    const alt = resource?.title
      ? `${resource.title} — ${diagramMeta.alt}`
      : title
        ? `${title} — ${diagramMeta.alt}`
        : diagramMeta.alt;

    return {
      src: `${ASSET_BASE}/${diagramMeta.file}`,
      alt,
    };
  }

  if (resource) {
    return getResourceImage(resource);
  }

  return getResourceImage({
    title: title || 'Cybersecurity article',
    category: 'Cybersecurity Basics',
    tags: ['fundamentals'],
    type: 'article',
  });
};
