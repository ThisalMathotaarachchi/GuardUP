import { getArticleImage } from './articleImageAssets';

const ResourceArticleImage = ({ diagramType, resource, title, caption, className = '' }) => {
  const { src, alt } = getArticleImage({ diagramType, resource, title });

  return (
    <figure className={`resource-article-image ${className}`.trim()}>
      <div className="resource-article-image__frame">
        <img
          src={src}
          alt={alt}
          className="resource-article-image__img"
          loading="lazy"
          decoding="async"
          width={1280}
          height={720}
        />
        <div className="resource-article-image__overlay" aria-hidden="true" />
      </div>
      {caption && (
        <figcaption className="resource-article-image__caption">{caption}</figcaption>
      )}
    </figure>
  );
};

export default ResourceArticleImage;
