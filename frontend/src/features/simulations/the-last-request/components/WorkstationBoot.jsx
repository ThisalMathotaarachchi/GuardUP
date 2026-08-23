import { useEffect, useState } from 'react';

const WorkstationBoot = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, Math.round((elapsed / 1400) * 100)));
      if (elapsed >= 1500) {
        clearInterval(tick);
        onComplete?.();
      }
    }, 40);
    return () => clearInterval(tick);
  }, [onComplete]);

  return (
    <div className="lr-boot" role="status" aria-live="polite" aria-label="Starting workstation">
      <div className="lr-boot__panel">
        <div className="lr-boot__logo" aria-hidden="true">
          <span className="lr-boot__logo-mark">A</span>
        </div>
        <p className="lr-boot__brand">Aurelia Systems</p>
        <p className="lr-boot__status">Starting workstation...</p>
        <div className="lr-boot__bar" aria-hidden="true">
          <div className="lr-boot__bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default WorkstationBoot;
