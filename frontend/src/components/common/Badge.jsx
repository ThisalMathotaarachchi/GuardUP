import { Shield, Target, Crosshair, Lock, Crown } from 'lucide-react';

const SIZE_MAP = { sm: 32, md: 48, lg: 64, xl: 96 };


const TIER_STYLES = {
  initiate: {
    label: 'Initiate',
    bg: '#F0FDF4',
    border: '#10B981',
    icon: '#10B981',
    Icon: Shield,
  },
  hunter: {
    label: 'Hunter',
    bg: '#EFF6FF',
    border: '#06B6D4',
    icon: '#0891B2',
    Icon: Target,
  },
  guardian: {
    label: 'Guardian',
    bg: '#F5F3FF',
    border: '#6C2BD9',
    icon: '#6C2BD9',
    Icon: Crosshair,
  },
  elite: {
    label: 'Elite',
    bg: '#FFFBEB',
    border: '#F59E0B',
    icon: '#D97706',
    Icon: Lock,
  },
  legendary: {
    label: 'Legendary',
    bg: '#FDF4FF',
    border: '#A855F7',
    icon: '#9333EA',
    Icon: Crown,
  },
};


const TIER_MAP = {
  common: 'initiate',
  uncommon: 'hunter',
  rare: 'guardian',
  epic: 'elite',
  legendary: 'legendary',
  initiate: 'initiate',
  hunter: 'hunter',
  guardian: 'guardian',
  elite: 'elite',
};

const TIER_BY_CATEGORY = {
  first: 'hunter',
  skill: 'guardian',
  streak: 'elite',
  milestone: 'guardian',
  elite: 'legendary',
  certification: 'guardian',
  quiz: 'hunter',
};

export const normalizeBadge = (badge = {}) => {
  const category = (badge.category || '').toLowerCase();
  let tier = badge.tier || TIER_BY_CATEGORY[category] || 'initiate';
  const name = badge.name || '';

  if (/streak|fire|roll|unstoppable/i.test(name)) tier = 'elite';
  if (/perfect|hero|sentinel|master|legendary|crisis|slayer/i.test(name)) tier = 'legendary';
  if (/spotter|hunter|sharp|skill|responder/i.test(name)) tier = 'guardian';
  if (/initiate|first|backup/i.test(name)) tier = 'hunter';

  const mapped = TIER_MAP[tier] || 'initiate';

  return {
    name: badge.name || 'Achievement',
    description: badge.description || '',
    tier: mapped,
    tierLabel: TIER_STYLES[mapped]?.label || 'Initiate',
    iconKey: badge.iconKey,
  };
};

const Badge = ({
  badge,
  size = 'md',
  interactive = true,
  className = '',
  pop = false,
}) => {
  const normalized = normalizeBadge(badge);
  const px = SIZE_MAP[size] || SIZE_MAP.md;
  const tierStyle = TIER_STYLES[normalized.tier] || TIER_STYLES.initiate;
  const Icon = tierStyle.Icon;
  const iconSize = Math.round(px * 0.4);

  return (
    <div
      className={`relative inline-flex flex-col items-center flex-shrink-0 ${interactive ? 'transition-transform duration-200 hover:scale-105' : ''} ${pop ? 'badge-pop' : ''} ${className}`}
      title={`${normalized.name} — ${tierStyle.label}`}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: px,
          height: px,
          background: tierStyle.bg,
          border: `2px solid ${tierStyle.border}`,
          boxShadow: '0 1px 4px rgba(26, 26, 46, 0.06)',
        }}
      >
        <Icon size={iconSize} style={{ color: tierStyle.icon }} strokeWidth={2} />
      </div>
    </div>
  );
};

export default Badge;
