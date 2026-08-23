import { getAvatarImageSrc } from '../../data/avatars';

const GuardUpAvatar = ({ avatarId = 'defender', size = 40, className = '' }) => {
  const resolved = avatarId === 'analyst' ? 'analyst-m' : avatarId;
  const src = getAvatarImageSrc(resolved);

  return (
    <span
      className={`gu-avatar inline-flex overflow-hidden rounded-full ${className}`.trim()}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt=""
        className="gu-avatar__img"
        width={512}
        height={512}
        style={{ width: size, height: size }}
        decoding="async"
      />
    </span>
  );
};

export default GuardUpAvatar;
