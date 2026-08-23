import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, HelpCircle } from 'lucide-react';
import { getKnowledgeResourceById } from '../../../utils/resourceResolver';
import { getRelatedResources } from '../../../data/knowledgeCenterData';
import { getArticleSections, getDifficultyBadgeClassLight } from '../../../utils/resourceContent';
import ResourceArticleImage from '../../../components/resources/ResourceArticleImage';

const SectionCallout = ({ callout }) => {
  if (!callout) return null;
  return (
    <div className={`cert-learn-callout cert-learn-callout--${callout.type || 'info'}`}>
      {callout.title && <p className="cert-learn-callout__title">{callout.title}</p>}
      <p>{callout.text}</p>
    </div>
  );
};

const ExpandablePanel = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="cert-learn-expand">
      <button type="button" className="cert-learn-expand__trigger" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && <div className="cert-learn-expand__body">{children}</div>}
    </div>
  );
};

const CertificationArticleActivity = ({ activity, resourceId, onContinue, isReview }) => {
  const resource = getKnowledgeResourceById(resourceId);
  const [reflectionAnswer, setReflectionAnswer] = useState('');

  if (!resource) {
    return (
      <div className="cert-learn-empty">
        <p>This article could not be loaded.</p>
      </div>
    );
  }

  const sections = getArticleSections(resource);
  const related = getRelatedResources(resourceId).slice(0, 3);

  return (
    <article className="cert-learn-article">
      <p className="cert-learn-article__description">{resource.description}</p>

      {resource.difficulty && (
        <span className={`cert-learn-badge ${getDifficultyBadgeClassLight(resource.difficulty)}`}>
          {resource.difficulty}
        </span>
      )}

      <ExpandablePanel title="Why this matters" defaultOpen>
        <p>
          {resource.description}
          {' '}
          Understanding this material directly supports your certification goals and reduces real-world risk
          in {resource.category?.toLowerCase() || 'security'} scenarios.
        </p>
      </ExpandablePanel>

      {sections.map((section, index) => (
        <section key={index} className="cert-learn-article__section">
          {section.heading && (
            <h2 className="cert-learn-article__heading">{section.heading}</h2>
          )}
          {section.paragraphs?.map((paragraph, pIndex) => (
            <p key={pIndex} className="cert-learn-article__paragraph">{paragraph}</p>
          ))}
          {section.list?.length > 0 && (
            <ul className="cert-learn-list">
              {section.list.map((item, li) => (
                <li key={li}>{item}</li>
              ))}
            </ul>
          )}
          <SectionCallout callout={section.callout} />
          {section.diagram && (
            <ResourceArticleImage diagramType={section.diagram} resource={resource} />
          )}

          {index === 1 && (
            <div className="cert-learn-scenario">
              <p className="cert-learn-scenario__label">Scenario</p>
              <p>
                Imagine you receive a message related to {resource.category?.toLowerCase() || 'security'}.
                Apply the concepts from this section before taking any action — pause, verify, and escalate
                when something feels off.
              </p>
            </div>
          )}

          {index === Math.floor(sections.length / 2) && (
            <div className="cert-learn-prompt">
              <Lightbulb size={18} />
              <div>
                <p className="cert-learn-prompt__label">Knowledge prompt</p>
                <p>What would you do first if this situation appeared in your inbox today?</p>
              </div>
            </div>
          )}
        </section>
      ))}

      {sections.length > 0 && (
        <div className="cert-learn-think">
          <HelpCircle size={18} />
          <div>
            <p className="cert-learn-think__label">Think about this</p>
            <p className="cert-learn-think__question">
              Which red flag from this lesson would be hardest for you to spot under pressure, and why?
            </p>
            <textarea
              className="cert-learn-think__input"
              rows={3}
              placeholder="Optional — reflect before continuing"
              value={reflectionAnswer}
              onChange={(event) => setReflectionAnswer(event.target.value)}
            />
          </div>
        </div>
      )}

      {resource.keyTakeaways?.length > 0 && (
        <section className="cert-learn-takeaways">
          <h2 className="cert-learn-block__title">Key takeaways</h2>
          <ul className="cert-learn-takeaways__list">
            {resource.keyTakeaways.map((takeaway, index) => (
              <li key={index}>{takeaway}</li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 && (
        <section className="cert-learn-related">
          <h2 className="cert-learn-block__title">Related concepts</h2>
          <ul className="cert-learn-related__list">
            {related.map((item) => (
              <li key={item.id}>
                <span className="cert-learn-related__type">{item.type}</span>
                {item.title}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="cert-learn-actions">
        <button type="button" onClick={onContinue} className="cert-btn cert-btn--primary cert-btn--lg">
          {isReview ? 'Continue' : 'Continue'}
        </button>
      </div>
    </article>
  );
};

export default CertificationArticleActivity;
