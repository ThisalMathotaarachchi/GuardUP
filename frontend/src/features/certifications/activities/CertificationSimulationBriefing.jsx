import { Gamepad2, Target, Clock, Eye, CheckCircle, ExternalLink } from 'lucide-react';
import { isSimulationActivityComplete } from '../../../utils/certificationProgress';

const CertificationSimulationBriefing = ({
  certification,
  activity,
  user,
  onLaunch,
  onContinue,
  isReview,
}) => {
  const completed = isSimulationActivityComplete(user, activity);
  const route = activity.metadata?.route;
  const skills = certification.learningObjectives.slice(0, 3);

  return (
    <div className="cert-learn-sim">
      <div className="cert-learn-sim__hero">
        <Gamepad2 size={32} />
        <p className="cert-learn-sim__label">Simulation Briefing</p>
      </div>

      <section className="cert-learn-block">
        <h3 className="cert-learn-block__title">Scenario</h3>
        <p className="cert-learn-block__text">{activity.description}</p>
      </section>

      <section className="cert-learn-block cert-learn-block--accent">
        <h3 className="cert-learn-block__title">
          <Target size={18} className="inline mr-2 -mt-0.5" />
          Objective
        </h3>
        <p className="cert-learn-block__text">
          Apply your certification training in a realistic, safe environment. Make decisions as you would
          in a real incident — verify, report, and avoid risky actions.
        </p>
      </section>

      <section className="cert-learn-block">
        <h3 className="cert-learn-block__title">Skills being tested</h3>
        <ul className="cert-learn-list">
          {skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <div className="cert-learn-sim__meta">
        <div className="cert-learn-stat">
          <Clock size={18} />
          <div>
            <p className="cert-learn-stat__label">Estimated duration</p>
            <p className="cert-learn-stat__value">{activity.estimatedDuration}</p>
          </div>
        </div>
        <div className="cert-learn-stat">
          <Eye size={18} />
          <div>
            <p className="cert-learn-stat__label">Pay attention to</p>
            <p className="cert-learn-stat__value">Urgency cues, sender identity, and safe reporting</p>
          </div>
        </div>
      </div>

      {completed && (
        <div className="cert-learn-sim__completed">
          <CheckCircle size={20} />
          <p>Simulation completed — your progress has been recorded for this certification.</p>
        </div>
      )}

      <div className="cert-learn-actions cert-learn-actions--split">
        {route ? (
          <>
            <button
              type="button"
              onClick={onLaunch}
              className="cert-btn cert-btn--primary cert-btn--lg"
            >
              {completed ? 'Replay Simulation' : 'Launch Simulation'}
              <ExternalLink size={16} />
            </button>
            {completed && (
              <button type="button" onClick={onContinue} className="cert-btn cert-btn--secondary cert-btn--lg">
                Continue to Debrief
              </button>
            )}
          </>
        ) : (
          <p className="cert-learn-empty">This simulation route is not yet configured.</p>
        )}
      </div>

      {!completed && route && (
        <p className="cert-learn-sim__note">
          After completing the simulation, return here to continue your certification journey.
          {isReview ? ' Your simulation progress is tracked automatically when completion is detected.' : ''}
        </p>
      )}
    </div>
  );
};

export default CertificationSimulationBriefing;
