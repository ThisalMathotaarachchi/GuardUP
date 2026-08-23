import { Video, ExternalLink } from 'lucide-react';
import { getKnowledgeResourceById } from '../../../utils/resourceResolver';
import {
  getExternalVideoUrl,
  isEmbeddableVideoUrl,
} from '../../../utils/resourceContent';

const CertificationVideoActivity = ({ resourceId, onContinue, isReview }) => {
  const resource = getKnowledgeResourceById(resourceId);

  if (!resource) {
    return (
      <div className="cert-learn-empty">
        <p>This video lesson could not be loaded.</p>
      </div>
    );
  }

  const hasEmbeddableVideo = !resource.videoUnavailable && isEmbeddableVideoUrl(resource.videoUrl);
  const externalVideoUrl = resource.externalVideoUrl || getExternalVideoUrl(resource.videoUrl);

  return (
    <div className="cert-learn-video">
      <p className="cert-learn-video__description">{resource.description}</p>

      {hasEmbeddableVideo ? (
        <div className="cert-learn-video__player">
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
      ) : (
        <div className="cert-learn-video__unavailable">
          <Video size={36} />
          <p className="cert-learn-video__unavailable-title">Video unavailable</p>
          <p className="cert-learn-video__unavailable-text">
            A dedicated video is not currently linked. Review the written learning material below to
            complete this certification activity.
          </p>
        </div>
      )}

      {externalVideoUrl && !resource.videoUnavailable && (
        <a
          href={externalVideoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cert-learn-video__external"
        >
          Open video source
          <ExternalLink size={16} />
        </a>
      )}

      {resource.summary && (
        <section className="cert-learn-block">
          <h3 className="cert-learn-block__title">Summary</h3>
          <p className="cert-learn-block__text">{resource.summary}</p>
        </section>
      )}

      {resource.fullContent?.length > 0 && (
        <section className="cert-learn-block">
          <h3 className="cert-learn-block__title">Learning material</h3>
          {resource.fullContent.map((paragraph, index) => (
            <p key={index} className="cert-learn-block__text">{paragraph}</p>
          ))}
        </section>
      )}

      {resource.keyTakeaways?.length > 0 && (
        <section className="cert-learn-takeaways">
          <h3 className="cert-learn-block__title">Key takeaways</h3>
          <ul className="cert-learn-takeaways__list">
            {resource.keyTakeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </section>
      )}

      <div className="cert-learn-actions">
        <button type="button" onClick={onContinue} className="cert-btn cert-btn--primary cert-btn--lg">
          {isReview ? 'Continue' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default CertificationVideoActivity;
