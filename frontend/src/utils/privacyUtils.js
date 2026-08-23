export const isPrivacyModeEnabled = (user) => Boolean(user?.preferences?.privacy);

export const maskEmail = (email) => {
  if (!email) return '•••@•••.•••';
  const [local, domain] = email.split('@');
  if (!domain) return '•••@•••.•••';

  const maskedLocal =
    local.length <= 2
      ? '••'
      : `${local[0]}${'•'.repeat(Math.min(local.length - 2, 4))}${local.slice(-1)}`;

  const domainParts = domain.split('.');
  const tld = domainParts.pop() || '•••';
  const dom = domainParts.join('.') || '•••';
  const maskedDomain =
    dom.length <= 1 ? '•••' : `${dom[0]}${'•'.repeat(Math.min(dom.length - 1, 4))}`;

  return `${maskedLocal}@${maskedDomain}.${tld}`;
};

export const maskName = (name) => {
  if (!name) return '•••';
  if (name.length === 1) return `${name}•`;
  return `${name[0]}${'•'.repeat(Math.min(name.length - 1, 4))}`;
};

export const displayFullName = (user, privacyEnabled) => {
  if (!privacyEnabled) {
    return `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'User';
  }
  return `${maskName(user?.firstName)} ${maskName(user?.lastName)}`.trim();
};

export const displayEmail = (user, privacyEnabled) => {
  if (!privacyEnabled) return user?.email || '';
  return maskEmail(user?.email);
};
