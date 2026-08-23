export const GUARDUP_AVATARS = [
  { id: 'defender', label: 'Shadow', role: 'Mysterious masked guardian' },
  { id: 'analyst-f', label: 'Nova', role: 'Stylized operative' },
  { id: 'analyst-m', label: 'Rex', role: 'Casual tech character' },
  { id: 'strategist', label: 'Vega', role: 'Futuristic guardian' },
  { id: 'operator', label: 'Jace', role: 'Relaxed hacker' },
  { id: 'architect', label: 'Cipher', role: 'Visor strategist' },
  { id: 'sentinel', label: 'Aegis', role: 'Protector sentinel' },
  { id: 'investigator', label: 'Ghost', role: 'Anonymous investigator' },
  { id: 'fox', label: 'Kitsune', role: 'Cyber fox mascot' },
  { id: 'ai-core', label: 'Nexus', role: 'AI digital character' },
  { id: 'guardian', label: 'Sentinel', role: 'Cape guardian' },
  { id: 'educator', label: 'Sage', role: 'Friendly guide' },
];

export const getAvatarImageSrc = (avatarId) => {
  const resolved = avatarId === 'analyst' ? 'analyst-m' : avatarId;
  return `/assets/avatars/${resolved}.webp`;
};
