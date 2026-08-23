import GuardUpSecuritySignalField from './GuardUpSecuritySignalField';

const INTENSITY = {
  landing: 0.78,
  auth: 0.52,
  assessment: 0.48,
  dashboard: 0.52,
  'cert-workspace': 0.44,
  default: 0.42,
  reading: 0.22,
};

const SIGNAL_INTENSITY = {
  landing: 1.28,
  dashboard: 1.18,
  auth: 0.78,
  assessment: 0.82,
  'cert-workspace': 0.92,
  reading: 0.65,
  default: 0.95,
};

const SecurityAtmosphere = ({ variant = 'default', className = '' }) => {
  const intensity = INTENSITY[variant] ?? INTENSITY.default;
  const signalIntensity = SIGNAL_INTENSITY[variant] ?? SIGNAL_INTENSITY.default;

  return (
    <div
      className={`gu-atmosphere gu-atmosphere--${variant} ${className}`.trim()}
      style={{ '--atmosphere-intensity': intensity }}
      aria-hidden="true"
    >
      <div className="gu-atmosphere__layer gu-atmosphere__layer--glow-a" />
      <div className="gu-atmosphere__layer gu-atmosphere__layer--glow-b" />

      <GuardUpSecuritySignalField intensity={signalIntensity} />

      <svg className="gu-atmosphere__svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="gu-atm-light" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gu-atmosphere-svg-glow, #ffffff)" stopOpacity="var(--gu-atmosphere-svg-glow-start, 0.06)" />
            <stop offset="100%" stopColor="var(--gu-atmosphere-svg-glow, #ffffff)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="1200" cy="80" rx="300" ry="200" fill="url(#gu-atm-light)" />
        <ellipse cx="180" cy="820" rx="260" ry="180" fill="url(#gu-atm-light)" />
        <g className="gu-atmosphere__network">
          <circle cx="140" cy="160" r="2" fill="currentColor" fillOpacity="0.25" />
          <circle cx="320" cy="240" r="1.5" className="gu-atmosphere__network-dot--muted" />
          <circle cx="1280" cy="640" r="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M140 160 L320 240" stroke="currentColor" strokeOpacity="0.06" strokeWidth="0.75" fill="none" />
          <path d="M1080 400 L1280 640" stroke="currentColor" strokeOpacity="0.05" strokeWidth="0.65" fill="none" />
        </g>
        <g className="gu-atmosphere__geometry">
          <rect x="1240" y="720" width="12" height="16" rx="1.5" stroke="currentColor" strokeOpacity="0.08" fill="none" />
          <path d="M80 520 L88 504 L96 520 L88 536 Z" stroke="currentColor" strokeOpacity="0.06" fill="none" />
        </g>
      </svg>

      <div className="gu-atmosphere__particles">
        <span className="gu-atmosphere__particle gu-atmosphere__particle--1" />
        <span className="gu-atmosphere__particle gu-atmosphere__particle--2" />
        <span className="gu-atmosphere__particle gu-atmosphere__particle--3" />
        <span className="gu-atmosphere__particle gu-atmosphere__particle--4" />
        <span className="gu-atmosphere__particle gu-atmosphere__particle--5" />
      </div>
    </div>
  );
};

export default SecurityAtmosphere;
