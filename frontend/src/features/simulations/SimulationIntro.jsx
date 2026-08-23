import { Play, CheckCircle, ArrowRight, Shield, AlertTriangle, MousePointer } from 'lucide-react';

const SimulationIntro = ({ scenario, onStart }) => {
  const isBeginner = scenario.id.includes('beginner');
  const isRansomware = scenario.id.includes('ransomware') || !isBeginner;

  return (
    <div className="sim-intro sim-layer-full z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <div className="sim-intro__card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sim-intro__header">
          <div className="sim-intro__icon-wrap">
            <Shield className="sim-intro__icon" size={40} />
          </div>
          <h1 className="sim-intro__title">{scenario.title}</h1>
          <p className="sim-intro__description">{scenario.description}</p>
          <span className="sim-intro__level">
            {isBeginner ? 'Beginner Level' : 'Intermediate Level'}
          </span>
        </div>

        <div className="sim-intro__panel">
          <h3 className="sim-intro__panel-title">
            <AlertTriangle size={18} className="sim-intro__panel-icon" />
            Scenario Briefing
          </h3>
          {isRansomware ? (
            <p className="sim-intro__body">
              You are <strong>Sarah Chen</strong>, an <strong>IT Administrator</strong> at{' '}
              <strong>Apex Global Corp</strong>. It&apos;s a normal Tuesday morning. Your team is
              monitoring the network when an alert appears...
            </p>
          ) : (
            <>
              <p className="sim-intro__body">
                You are <strong>{scenario.employeeName}</strong>, a{' '}
                <strong>{scenario.employeeRole}</strong> at <strong>{scenario.companyName}</strong>.
              </p>
              <p className="sim-intro__body sim-intro__body--muted">
                Your inbox already has normal work emails. During the next <strong>5 minutes</strong>,
                new messages will arrive — some legitimate, some phishing attacks.
              </p>
            </>
          )}
        </div>

        <div className="sim-intro__panel">
          <h3 className="sim-intro__panel-title">
            <MousePointer size={18} className="sim-intro__panel-icon" />
            How to Play
          </h3>
          {isRansomware ? (
            <p className="sim-intro__body">
              Click on systems to investigate. Use the Action Buttons to isolate, scan, and recover.
              Communicate with leadership and employees.
            </p>
          ) : (
            <ul className="sim-intro__list">
              {[
                'If you want to report an email as phishing, click the Report Phishing button.',
                'If you want to mark an email as safe, click the Reply button.',
                'Pay attention to the sender\'s email address and the email body for red flags.',
                'Enable security features in Settings for bonus points.',
                'Complete all 15 emails within 5 minutes for a speed bonus.',
              ].map((text) => (
                <li key={text} className="sim-intro__list-item">
                  <CheckCircle size={18} className="sim-intro__check" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="sim-intro__panel">
          <h3 className="sim-intro__panel-title">Learning Objectives</h3>
          {isRansomware ? (
            <ul className="sim-intro__list">
              <li className="sim-intro__list-item">
                <CheckCircle size={18} className="sim-intro__check" />
                <span>
                  Detect the ransomware, contain the spread, restore data, and complete the
                  post-incident review.
                </span>
              </li>
            </ul>
          ) : (
            <ul className="sim-intro__list">
              {scenario.objectives.map((objective) => (
                <li key={objective} className="sim-intro__list-item">
                  <CheckCircle size={18} className="sim-intro__check" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {isRansomware ? (
          <div className="sim-intro__stats sim-intro__stats--single">
            <div>
              <p className="sim-intro__stat-value">7:00</p>
              <p className="sim-intro__stat-label">Time limit</p>
            </div>
          </div>
        ) : (
          <div className="sim-intro__stats">
            <div>
              <p className="sim-intro__stat-value">5:00</p>
              <p className="sim-intro__stat-label">Time limit</p>
            </div>
            <div>
              <p className="sim-intro__stat-value">15</p>
              <p className="sim-intro__stat-label">Incoming emails</p>
            </div>
            <div>
              <p className="sim-intro__stat-value">8</p>
              <p className="sim-intro__stat-label">Phishing threats</p>
            </div>
          </div>
        )}

        <button type="button" onClick={onStart} className="btn-primary w-full sim-intro__cta">
          <Play size={20} />
          Start Simulation
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default SimulationIntro;
