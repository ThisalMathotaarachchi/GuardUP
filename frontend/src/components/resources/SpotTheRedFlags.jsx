import { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const RED_FLAGS = [
  { id: 'sender', label: 'Sender address looks slightly off', correct: true },
  { id: 'urgency', label: 'Urgent payroll deadline language', correct: true },
  { id: 'link', label: 'Suspicious verification link domain', correct: true },
  { id: 'greeting', label: 'Personalized greeting with your name', correct: false },
];

const SpotTheRedFlags = () => {
  const [selected, setSelected] = useState([]);
  const [revealed, setRevealed] = useState(false);

  const toggle = (id) => {
    if (revealed) return;
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleCheck = () => setRevealed(true);

  return (
    <div className="interactive-prompt surface-glass p-5 my-6">
      <h3 className="interactive-prompt__title">
        <AlertTriangle size={18} className="interactive-prompt__title-icon" />
        Spot the Red Flags
      </h3>
      <p className="interactive-prompt__lead">Click every suspicious element in this message preview.</p>
      <div className="interactive-prompt__preview surface-card-inner p-4 mb-4 text-sm space-y-2">
        <p><strong>From:</strong> hr-payroll@yourcompany-secure.net</p>
        <p><strong>Subject:</strong> URGENT: Verify payroll details before 5 PM</p>
        <p>Hi Alex, your payroll account requires immediate verification. Failure to confirm will delay your salary.</p>
        <p className="interactive-prompt__link">Verify account now →</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {RED_FLAGS.map((flag) => {
          const isSelected = selected.includes(flag.id);
          let cls = 'interactive-prompt__chip';
          if (revealed && flag.correct && isSelected) cls += ' interactive-prompt__chip--correct';
          else if (revealed && ((!flag.correct && isSelected) || (flag.correct && !isSelected))) cls += ' interactive-prompt__chip--miss';
          else if (isSelected) cls += ' interactive-prompt__chip--selected';
          return (
            <button key={flag.id} type="button" onClick={() => toggle(flag.id)} className={cls}>
              {flag.label}
            </button>
          );
        })}
      </div>
      {!revealed ? (
        <button type="button" onClick={handleCheck} className="btn-primary text-sm py-2 px-4">Check answers</button>
      ) : (
        <div className="interactive-prompt__result">
          <CheckCircle2 size={18} className="interactive-prompt__result-icon" />
          <p>Correct flags include urgency, look-alike sender domains, and unverified links. Personalized greetings alone are not always suspicious.</p>
        </div>
      )}
    </div>
  );
};

export default SpotTheRedFlags;
