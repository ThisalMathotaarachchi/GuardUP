import { Target, Clock, Award, Gamepad2, Shield, BookOpen, ClipboardCheck } from 'lucide-react';
import { getCertificationSimulation } from '../../../utils/certificationProgress';

const CertificationIntroActivity = ({ certification, activity, onBegin }) => {
  const simulation = getCertificationSimulation(certification.id);

  return (
    <div className="cert-learn-intro">
      <div className="cert-learn-intro__welcome">
        <Shield size={28} className="cert-learn-intro__icon" />
        <p className="cert-learn-intro__program">GUARDUP CERTIFICATION</p>
        <h2 className="cert-learn-intro__heading">{certification.title}</h2>
        <p className="cert-learn-intro__lead">
          {activity.metadata?.overview || certification.description}
        </p>
        <div className="cert-learn-intro__badges">
          <span className="cert-learn-badge cert-learn-badge--accent">{certification.level}</span>
          <span className="cert-learn-badge">{certification.estimatedDuration}</span>
        </div>
      </div>

      <section className="cert-learn-block">
        <h3 className="cert-learn-block__title">What you will learn</h3>
        <p className="cert-learn-block__text">{certification.description}</p>
      </section>

      <section className="cert-learn-block cert-learn-block--accent">
        <h3 className="cert-learn-block__title">Skills gained</h3>
        <ul className="cert-learn-list">
          {certification.learningObjectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      {simulation && !simulation.metadata?.comingSoon && (
        <section className="cert-learn-block">
          <h3 className="cert-learn-block__title">
            <Gamepad2 size={18} className="inline mr-2 -mt-0.5" />
            Simulation scenario
          </h3>
          <p className="cert-learn-block__text">{simulation.description}</p>
          <p className="cert-learn-block__meta">
            {simulation.metadata?.simulationLabel || simulation.title}
            {' · '}
            {simulation.estimatedDuration}
          </p>
        </section>
      )}

      {simulation && simulation.metadata?.comingSoon && (
        <section className="cert-learn-block">
          <h3 className="cert-learn-block__title">
            <Gamepad2 size={18} className="inline mr-2 -mt-0.5" />
            Upcoming simulation
          </h3>
          <p className="cert-learn-block__text">{simulation.description}</p>
          <p className="cert-learn-block__meta">
            {simulation.metadata?.simulationLabel || simulation.title}
            {' · '}
            {simulation.estimatedDuration}
            {' · Coming in a future release'}
          </p>
        </section>
      )}

      <section className="cert-learn-block">
        <h3 className="cert-learn-block__title">
          <ClipboardCheck size={18} className="inline mr-2 -mt-0.5" />
          Assessment requirements
        </h3>
        <ul className="cert-learn-list">
          <li>Complete all learning activities in sequence</li>
          <li>Pass knowledge checks with at least 60% score</li>
          <li>Complete the simulation and debrief</li>
          <li>Pass the final certification assessment</li>
        </ul>
      </section>

      <section className="cert-learn-block">
        <h3 className="cert-learn-block__title">
          <Award size={18} className="inline mr-2 -mt-0.5" />
          Certificate reward
        </h3>
        <p className="cert-learn-block__text">
          Earn the <strong>{certification.certificate?.title}</strong> upon successful completion.
        </p>
      </section>

      <div className="cert-learn-intro__stats">
        <div className="cert-learn-stat">
          <Clock size={18} />
          <div>
            <p className="cert-learn-stat__label">Estimated duration</p>
            <p className="cert-learn-stat__value">{certification.estimatedDuration}</p>
          </div>
        </div>
        <div className="cert-learn-stat">
          <Target size={18} />
          <div>
            <p className="cert-learn-stat__label">Certification level</p>
            <p className="cert-learn-stat__value">{certification.level}</p>
          </div>
        </div>
        <div className="cert-learn-stat">
          <BookOpen size={18} />
          <div>
            <p className="cert-learn-stat__label">Activities</p>
            <p className="cert-learn-stat__value">{certification.activityCount} steps</p>
          </div>
        </div>
      </div>

      <div className="cert-learn-actions">
        <button type="button" onClick={onBegin} className="cert-btn cert-btn--primary cert-btn--lg">
          Begin Certification
        </button>
      </div>
    </div>
  );
};

export default CertificationIntroActivity;
