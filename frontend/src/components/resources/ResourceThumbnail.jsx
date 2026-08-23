import { getResourceImage } from './resourceImageAssets';

const ResourceThumbnail = ({ resource, className = '', variant = 'card' }) => {
  const { src, alt } = getResourceImage(resource);

  return (
    <div className={`kc-thumb kc-thumb--${variant} ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        className="kc-thumb__img"
        loading={variant === 'hero' ? 'eager' : 'lazy'}
        decoding="async"
        width={1280}
        height={720}
      />
      <div className="kc-thumb__overlay" aria-hidden="true" />
    </div>
  );
};

export default ResourceThumbnail;
