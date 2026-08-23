import { AlertTriangle, CheckCircle, Lightbulb, Target } from 'lucide-react';
import { getCertificationSimulation, isSimulationActivityComplete } from '../../../utils/certificationProgress';

const COMMON_MISTAKES = {
  'cert-phishing-defense': [
    'Clicking links before verifying the sender domain',
    'Responding to urgency without confirming through a trusted channel',
    'Assuming a familiar display name means the message is legitimate',
  ],
  'cert-ransomware-response': [
    'Delaying isolation of affected systems',
    'Paying ransom without following organizational policy',
    'Failing to escalate to security and IT leadership promptly',
  ],
  'cert-advanced-threat': [
    'Sharing MFA or verification codes through chat without verifying the requester',
    'Trusting inbound IT messages without checking the employee directory or official portal',
    'Dismissing authentication alerts without investigating session details',
  ],
};

const CertificationDebriefActivity = ({
  certification,
  activity,
  user,
  onContinue,
}) => {
  const simulation = getCertificationSimulation(certification.id);
  const simCompleted = simulation ? isSimulationActivityComplete(user, simulation) : false;
  const mistakes = COMMON_MISTAKES[certification.id] ?? [
    'Rushing decisions under pressure',
    'Skipping verification steps',
    'Failing to report suspicious activity',
  ];

  return (
    <div className="cert-learn-debrief">
      <section className="cert-learn-block">
        <h3 className="cert-learn-block__title">What happened</h3>
        <p className="cert-learn-block__text">
          {simulation
            ? `You worked through the ${simulation.metadata?.simulationLabel || simulation.title} — a guided scenario designed to test how you respond under realistic pressure.`
            : activity.description}
        </p>
        {simCompleted && (
          <div className="cert-learn-debrief__result">
            <CheckCircle size={18} />
            <span>Simulation marked complete in your certification progress.</span>
          </div>
        )}
        {!simCompleted && simulation && (
          <div className="cert-learn-debrief__result cert-learn-debrief__result--pending">
            <AlertTriangle size={18} />
            <span>
              Simulation completion will sync automatically when detected from your account progress.
            </span>
          </div>
        )}
      </section>

      <section className="cert-learn-block cert-learn-block--accent">
        <h3 className="cert-learn-block__title">
          <Target size={18} className="inline mr-2 -mt-0.5" />
          What you were expected to recognize
        </h3>
        <ul className="cert-learn-list">
          {(activity.metadata?.focusAreas ?? []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="cert-learn-block">
        <h3 className="cert-learn-block__title">Common mistakes</h3>
        <ul className="cert-learn-list cert-learn-list--warn">
          {mistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="cert-learn-block">
        <h3 className="cert-learn-block__title">What this simulation demonstrates</h3>
        <p className="cert-learn-block__text">
          {simulation?.description || certification.shortDescription}
          {' '}
          Hands-on practice reinforces the judgment skills that knowledge checks alone cannot fully measure.
        </p>
      </section>

      <section className="cert-learn-block cert-learn-block--success">
        <h3 className="cert-learn-block__title">
          <Lightbulb size={18} className="inline mr-2 -mt-0.5" />
          Practical takeaway
        </h3>
        <p className="cert-learn-block__text">
          {certification.learningObjectives[certification.learningObjectives.length - 1]
            || 'Apply what you practiced immediately in your daily workflow — verify, report, and escalate early.'}
        </p>
      </section>

      <div className="cert-learn-actions">
        <button type="button" onClick={onContinue} className="cert-btn cert-btn--primary cert-btn--lg">
          Continue
        </button>
      </div>
    </div>
  );
};

export default CertificationDebriefActivity;
