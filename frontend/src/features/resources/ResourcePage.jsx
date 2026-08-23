import { Link, useLocation, useParams } from 'react-router-dom';
import { getKnowledgeResourceById } from '../../utils/resourceResolver';
import { getRelatedResources } from '../../data/knowledgeCenterData';
import {
  getArticleSections,
  getDifficultyBadgeClassLight,
  getExternalVideoUrl,
  getTypeLabel,
  isEmbeddableVideoUrl,
} from '../../utils/resourceContent';
import ResourceArticleImage from '../../components/resources/ResourceArticleImage';
import SpotTheRedFlags from '../../components/resources/SpotTheRedFlags';
import ResourceThumbnail from '../../components/resources/ResourceThumbnail';
import {
  ArrowLeft,
  BookOpen,
  Video,
  FileText,
  Clock,
  User,
  Calendar,
  ExternalLink,
  Tag,
} from 'lucide-react';

const getTypeIcon = (type) => {
  if (type === 'article') return BookOpen;
  if (type === 'video') return Video;
  return FileText;
};

const SectionCallout = ({ callout }) => {
  if (!callout) return null;
  return (
    <div className={`resource-callout resource-callout--${callout.type || 'info'}`}>
      {callout.title && <p className="font-semibold mb-1">{callout.title}</p>}
      <p>{callout.text}</p>
    </div>
  );
};

const ResourcePage = () => {
  const { resourceId } = useParams();
  const location = useLocation();
  const resource = getKnowledgeResourceById(resourceId);

  const fromLearningPath = location.state?.from === 'learning-path';
  const backPath = fromLearningPath ? '/dashboard/learning-path' : '/dashboard/knowledge-center';
  const backLabel = fromLearningPath ? 'Back to Learning Path' : 'Back to Knowledge Center';

  if (!resource) {
    return (
      <div className="resource-page">
        <div className="resource-page__inner">
          <Link to={backPath} className="resource-page__back">
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
          <h1 className="resource-page__title">Resource not found</h1>
          <p className="resource-page__subtitle">This resource does not exist or is no longer available.</p>
          <Link to={backPath} className="btn-primary py-2 inline-flex mt-4">
            Return to {fromLearningPath ? 'Learning Path' : 'Knowledge Center'}
          </Link>
        </div>
      </div>
    );
  }

  const TypeIcon = getTypeIcon(resource.type);
  const articleSections = getArticleSections(resource);
  const related = getRelatedResources(resourceId);
  const hasEmbeddableVideo = resource.type === 'video'
    && !resource.videoUnavailable
    && isEmbeddableVideoUrl(resource.videoUrl);
  const externalVideoUrl = resource.externalVideoUrl || getExternalVideoUrl(resource.videoUrl);
  const timeLabel = resource.type === 'video' ? 'Duration' : 'Read time';

  return (
    <div className="resource-page">
      <div className="resource-page__inner">
        <Link to={backPath} className="resource-page__back">
          <ArrowLeft size={16} />
          {backLabel}
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide badge-type-light px-2.5 py-1 rounded-full">
            <TypeIcon size={13} />
            {getTypeLabel(resource.type)}
          </span>
          {resource.difficulty && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getDifficultyBadgeClassLight(resource.difficulty)}`}>
              {resource.difficulty}
            </span>
          )}
          <span className="text-caption">{resource.category}</span>
        </div>

        <h1 className="resource-page__title">{resource.title}</h1>
        <p className="resource-page__subtitle">{resource.description}</p>

        <div className="resource-page__meta">
          <span className="inline-flex items-center gap-1.5">
            <User size={14} />
            {resource.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {timeLabel}: {resource.readTime}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} />
            {resource.date}
          </span>
          {resource.source && (
            <span className="inline-flex items-center gap-1.5">
              <Tag size={14} />
              {resource.source}
            </span>
          )}
        </div>

        <div className="resource-page__hero resource-page__hero--visual">
          <ResourceThumbnail resource={resource} className="resource-page__thumb" variant="hero" />
        </div>

        <div className="resource-page__layout">
          <div className="resource-page__reading">
        {resource.type === 'video' && (
          <section className="resource-page__section">
            {hasEmbeddableVideo ? (
              <>
                <div className="resource-page__video-wrap">
                  <div className="aspect-video">
                    <iframe
                      src={resource.videoUrl}
                      title={resource.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                <p className="text-caption mb-4">
                  Video hosted externally. Open the source in a new tab if the player does not load.
                </p>
              </>
            ) : (
              <div className="resource-page__video-fallback mb-4">
                <Video size={40} className="mb-3 text-accent opacity-80" />
                <p className="text-heading font-medium mb-1">
                  {resource.videoUnavailable ? 'Video unavailable' : 'External video resource'}
                </p>
                <p className="text-body text-sm max-w-md">
                  {resource.videoUnavailable
                    ? 'A dedicated video is not currently linked. Review the summary and key takeaways below.'
                    : 'This video opens on an external platform.'}
                </p>
              </div>
            )}

            {externalVideoUrl && !resource.videoUnavailable && (
              <a
                href={externalVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2 inline-flex items-center gap-2 mb-6"
              >
                Watch Video
                <ExternalLink size={16} />
              </a>
            )}

            {resource.summary && (
              <>
                <h2 className="resource-page__section-title">Summary</h2>
                <p className="resource-page__paragraph">{resource.summary}</p>
              </>
            )}
          </section>
        )}

        {resource.type === 'pdf' && (
          <section className="resource-page__section text-center py-6">
            <FileText size={48} className="text-body mx-auto mb-4 opacity-70" />
            {resource.fileUrl && (
              <a
                href={resource.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2 inline-flex items-center gap-2"
              >
                Download PDF
                <ExternalLink size={16} />
              </a>
            )}
          </section>
        )}

        {resource.type === 'article' && articleSections.length > 0 && (
          <section className="resource-page__section">
            {articleSections.map((section, index) => (
              <div key={index} id={section.heading ? `section-${section.heading.replace(/\s+/g, '-').toLowerCase()}` : undefined}>
                {section.heading && (
                  <h2 className="resource-page__heading">{section.heading}</h2>
                )}
                {section.paragraphs?.map((paragraph, pIndex) => (
                  <p key={pIndex} className="resource-page__paragraph">{paragraph}</p>
                ))}
                {section.list?.length > 0 && (
                  <ul className="resource-page__list">
                    {section.list.map((item, li) => (
                      <li key={li}>{item}</li>
                    ))}
                  </ul>
                )}
                <SectionCallout callout={section.callout} />
                {section.diagram && (
                  <ResourceArticleImage
                    diagramType={section.diagram}
                    resource={resource}
                  />
                )}
              </div>
            ))}
          </section>
        )}

        {(resource.id === 'art-8' || resource.category === 'Phishing') && (
          <SpotTheRedFlags />
        )}

        {resource.type === 'video' && resource.fullContent?.length > 0 && (
          <section className="resource-page__section">
            <h2 className="resource-page__section-title">Detailed Overview</h2>
            {resource.fullContent.map((paragraph, index) => (
              <p key={index} className="resource-page__paragraph">{paragraph}</p>
            ))}
          </section>
        )}

        {resource.keyTakeaways?.length > 0 && (
          <section className="resource-page__section">
            <h2 className="resource-page__section-title">Key Takeaways</h2>
            <ul className="resource-page__takeaways">
              {resource.keyTakeaways.map((takeaway, index) => (
                <li key={index}>{takeaway}</li>
              ))}
            </ul>
          </section>
        )}

        {resource.transcript && (
          <section className="resource-page__section">
            <h2 className="resource-page__section-title">Transcript</h2>
            <div className="resource-page__paragraph whitespace-pre-wrap text-sm">{resource.transcript}</div>
          </section>
        )}

        {resource.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {resource.tags.map((tag) => (
              <span key={tag} className="tag-chip">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {related.length > 0 && (
          <section className="resource-related">
            <h2 className="resource-page__section-title">Related Resources</h2>
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/dashboard/resources/${item.id}`}
                state={{ from: fromLearningPath ? 'learning-path' : 'knowledge-center' }}
                className="resource-related__link"
              >
                <span className="text-caption uppercase">{getTypeLabel(item.type)} · {item.category}</span>
                <p className="text-heading font-medium mt-0.5">{item.title}</p>
              </Link>
            ))}
          </section>
        )}
          </div>

          {resource.type === 'article' && articleSections.some((s) => s.heading) && (
            <aside className="resource-page__toc hidden lg:block">
              <p className="resource-page__toc-title">Sections</p>
              <nav className="resource-page__toc-nav">
                {articleSections.filter((s) => s.heading).map((section) => (
                  <a
                    key={section.heading}
                    href={`#section-${section.heading.replace(/\s+/g, '-').toLowerCase()}`}
                    className="resource-page__toc-link"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
