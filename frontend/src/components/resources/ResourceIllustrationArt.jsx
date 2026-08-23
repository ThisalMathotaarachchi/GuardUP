import { useId } from 'react';

const Illus = ({ children, variant = 'card' }) => (
  <svg
    viewBox="0 0 320 180"
    className={`kc-illustration${variant === 'hero' ? ' kc-illustration--hero' : ''}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Bg = ({ uid }) => (
  <>
    <defs>
      <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
      </linearGradient>
      <linearGradient id={`${uid}-panel`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
      </linearGradient>
      <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect width="320" height="180" fill={`url(#${uid}-sky)`} />
    <rect x="0" y="148" width="320" height="32" fill="rgba(0,0,0,0.35)" />
  </>
);

export const PhishingIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="24" y="28" width="200" height="118" rx="8" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.18)" />
      <rect x="24" y="28" width="200" height="22" rx="8" fill="rgba(255,255,255,0.06)" />
      <circle cx="38" cy="39" r="4" fill="rgba(239,68,68,0.55)" />
      <circle cx="50" cy="39" r="4" fill="rgba(255,255,255,0.15)" />
      <rect x="34" y="58" width="72" height="6" rx="3" fill="rgba(255,255,255,0.35)" />
      <rect x="34" y="70" width="140" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
      <rect x="34" y="80" width="120" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="34" y="96" width="88" height="14" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" />
      <text x="42" y="106" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="monospace">payroll-verify.net</text>
      <path d="M34 118h120" stroke="rgba(239,68,68,0.45)" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="236" y="36" width="60" height="72" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
      <path d="M266 52v28M254 66h24" stroke="rgba(234,179,8,0.65)" strokeWidth="2" />
      <circle cx="266" cy="66" r="14" stroke="rgba(234,179,8,0.5)" fill="rgba(234,179,8,0.12)" filter={`url(#${uid}-glow)`} />
    </Illus>
  );
};

export const RansomwareIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="40" y="34" width="96" height="68" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
      <rect x="52" y="48" width="72" height="40" rx="3" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.1)" />
      <rect x="60" y="58" width="56" height="4" rx="2" fill="rgba(239,68,68,0.55)" />
      <rect x="60" y="68" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
      <rect x="60" y="76" width="48" height="3" rx="1.5" fill="rgba(255,255,255,0.1)" />
      <path d="M88 98v14M82 104h12" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
      <rect x="148" y="44" width="56" height="48" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
      <path d="M164 58h24M164 68h18M164 78h20" stroke="rgba(255,255,255,0.2)" />
      <rect x="220" y="38" width="64" height="88" rx="8" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.16)" />
      <circle cx="252" cy="68" r="16" stroke="rgba(255,255,255,0.35)" fill="rgba(255,255,255,0.04)" />
      <rect x="246" y="62" width="12" height="14" rx="2" stroke="rgba(255,255,255,0.5)" />
      <path d="M252 76v6" stroke="rgba(255,255,255,0.45)" />
      <path d="M228 108h48" stroke="rgba(239,68,68,0.4)" strokeDasharray="4 3" />
    </Illus>
  );
};

export const MfaIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="36" y="40" width="120" height="88" rx="8" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.16)" />
      <rect x="52" y="56" width="88" height="10" rx="4" fill="rgba(255,255,255,0.12)" />
      <rect x="52" y="74" width="88" height="10" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
      <rect x="52" y="96" width="56" height="18" rx="4" fill="rgba(255,255,255,0.14)" />
      <path d="M180 52h24" stroke="rgba(255,255,255,0.25)" strokeDasharray="4 3" />
      <rect x="204" y="34" width="72" height="112" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" />
      <rect x="216" y="50" width="48" height="28" rx="6" fill="rgba(255,255,255,0.08)" />
      <text x="240" y="68" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="11" fontWeight="700" fontFamily="monospace">482910</text>
      <circle cx="240" cy="108" r="10" stroke="rgba(255,255,255,0.35)" />
      <path d="M228 132h24" stroke="rgba(34,197,94,0.55)" strokeWidth="2" />
    </Illus>
  );
};

export const PasswordIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="48" y="48" width="140" height="72" rx="8" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.16)" />
      <rect x="64" y="64" width="108" height="12" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)" />
      <circle cx="72" cy="70" r="3" fill="rgba(255,255,255,0.55)" />
      <circle cx="82" cy="70" r="3" fill="rgba(255,255,255,0.4)" />
      <circle cx="92" cy="70" r="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="102" cy="70" r="3" fill="rgba(255,255,255,0.25)" />
      <rect x="64" y="84" width="108" height="6" rx="3" fill="rgba(34,197,94,0.35)" />
      <rect x="64" y="84" width="72" height="6" rx="3" fill="rgba(34,197,94,0.65)" />
      <rect x="210" y="52" width="56" height="64" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
      <path d="M238 68a8 8 0 010 16h-8v-8h8z" stroke="rgba(255,255,255,0.45)" />
      <path d="M230 84v8" stroke="rgba(255,255,255,0.35)" />
    </Illus>
  );
};

export const SocialIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <circle cx="88" cy="72" r="22" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
      <path d="M72 98c0-10 7-18 16-18s16 8 16 18" stroke="rgba(255,255,255,0.35)" />
      <circle cx="228" cy="72" r="22" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" strokeDasharray="4 3" />
      <path d="M212 98c0-10 7-18 16-18s16 8 16 18" stroke="rgba(255,255,255,0.2)" strokeDasharray="3 2" />
      <rect x="118" y="66" width="80" height="28" rx="14" fill="rgba(234,179,8,0.12)" stroke="rgba(234,179,8,0.35)" />
      <path d="M134 80h68" stroke="rgba(234,179,8,0.45)" strokeDasharray="5 3" />
      <rect x="72" y="118" width="176" height="36" rx="6" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.12)" />
      <rect x="84" y="130" width="100" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="84" y="140" width="72" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
    </Illus>
  );
};

export const NetworkIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="130" y="24" width="60" height="132" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeDasharray="6 4" />
      <circle cx="72" cy="56" r="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
      <circle cx="248" cy="56" r="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
      <circle cx="56" cy="128" r="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
      <circle cx="264" cy="128" r="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
      <path d="M86 56h44M190 56h44M68 128h62M190 128h62" stroke="rgba(255,255,255,0.22)" />
      <rect x="148" y="72" width="24" height="36" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" />
    </Illus>
  );
};

export const IncidentIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  const steps = ['Alert', 'Triage', 'Contain', 'Recover'];
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <Bg uid={uid} />
      {steps.map((label, i) => (
        <g key={label} transform={`translate(${36 + i * 72}, 58)`}>
          <rect width="56" height="44" rx="6" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.14)" />
          <text x="28" y="28" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="8" fontWeight="600">{label}</text>
          {i < 3 && <path d="M60 22h10" stroke="rgba(255,255,255,0.25)" />}
        </g>
      ))}
      <circle cx="160" cy="130" r="10" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.45)" />
      <path d="M160 124v8M156 128h8" stroke="rgba(239,68,68,0.65)" />
    </Illus>
  );
};

export const BasicsIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  const layers = ['Users', 'Endpoints', 'Network', 'Data'];
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      {layers.map((label, i) => (
        <rect
          key={label}
          x={48 + i * 8}
          y={36 + i * 22}
          width={224 - i * 16}
          height={38}
          rx="6"
          fill={`rgba(255,255,255,${0.05 + i * 0.015})`}
          stroke="rgba(255,255,255,0.14)"
        />
      ))}
      {layers.map((label, i) => (
        <text key={label} x={64 + i * 8} y={58 + i * 22} fill="rgba(255,255,255,0.55)" fontSize="9" fontWeight="600">{label}</text>
      ))}
      <path d="M160 24 L172 36 H148 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
    </Illus>
  );
};

export const DataIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <ellipse cx="120" cy="58" rx="48" ry="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
      <path d="M72 58v52c0 8 21 14 48 14s48-6 48-14V58" stroke="rgba(255,255,255,0.22)" />
      <path d="M72 82c0 8 21 14 48 14s48-6 48-14" stroke="rgba(255,255,255,0.14)" />
      <rect x="200" y="48" width="72" height="88" rx="8" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.16)" />
      <path d="M236 68 L224 88 L248 88 Z" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" />
      <rect x="214" y="98" width="44" height="24" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
    </Illus>
  );
};

export const AiIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="108" y="44" width="104" height="88" rx="12" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.18)" />
      <circle cx="160" cy="78" r="20" stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.04)" />
      <path d="M148 78h24M160 66v24" stroke="rgba(255,255,255,0.35)" />
      <path d="M48 90 L108 90" stroke="rgba(255,255,255,0.2)" />
      <path d="M212 90 L272 90" stroke="rgba(255,255,255,0.2)" />
      <rect x="36" y="74" width="48" height="32" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
      <rect x="236" y="74" width="48" height="32" rx="4" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.25)" />
    </Illus>
  );
};

export const RemoteIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="40" y="52" width="112" height="72" rx="6" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.16)" />
      <rect x="52" y="64" width="88" height="44" rx="3" fill="rgba(0,0,0,0.35)" />
      <rect x="176" y="44" width="96" height="88" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
      <path d="M152 88h24" stroke="rgba(255,255,255,0.25)" strokeDasharray="4 3" />
      <circle cx="224" cy="88" r="18" stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.04)" />
      <path d="M214 88h20M224 78v20" stroke="rgba(255,255,255,0.35)" />
    </Illus>
  );
};

export const InsiderIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <circle cx="88" cy="72" r="20" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" />
      <path d="M68 108c0-12 9-22 20-22s20 10 20 22" stroke="rgba(255,255,255,0.35)" />
      <rect x="168" y="48" width="96" height="72" rx="6" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.16)" />
      <rect x="184" y="64" width="64" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
      <rect x="184" y="78" width="48" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
      <path d="M128 88c20 8 28 24 32 40" stroke="rgba(234,179,8,0.45)" strokeDasharray="5 3" />
      <circle cx="168" cy="132" r="8" fill="rgba(234,179,8,0.15)" stroke="rgba(234,179,8,0.45)" />
    </Illus>
  );
};

export const UrlIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="32" y="68" width="256" height="44" rx="8" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.16)" />
      <text x="48" y="96" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="monospace">https:
      <text x="108" y="96" fill="rgba(239,68,68,0.85)" fontSize="10" fontFamily="monospace">secure-payroll.net</text>
      <rect x="240" y="78" width="36" height="24" rx="4" fill="rgba(239,68,68,0.12)" stroke="rgba(239,68,68,0.35)" />
      <path d="M252 84v12M246 90h12" stroke="rgba(239,68,68,0.65)" />
      <rect x="48" y="36" width="120" height="20" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
    </Illus>
  );
};

export const PrivacyIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="56" y="48" width="88" height="96" rx="6" fill={`url(#${uid}-panel)`} stroke="rgba(255,255,255,0.14)" />
      <rect x="68" y="62" width="64" height="5" rx="2" fill="rgba(255,255,255,0.15)" />
      <rect x="68" y="74" width="48" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
      <rect x="68" y="86" width="56" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
      <path d="M176 72 L216 72 L196 120 Z" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
      <circle cx="196" cy="88" r="10" stroke="rgba(255,255,255,0.35)" />
      <rect x="228" y="56" width="48" height="64" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.14)" />
      <path d="M240 72h24M240 84h16" stroke="rgba(255,255,255,0.2)" />
    </Illus>
  );
};

export const VideoIllustration = ({ variant }) => {
  const uid = useId().replace(/:/g, '');
  return (
    <Illus variant={variant}>
      <Bg uid={uid} />
      <rect x="48" y="36" width="224" height="108" rx="10" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.18)" />
      <path d="M148 78 L188 98 L148 118 Z" fill="rgba(255,255,255,0.75)" />
      <rect x="48" y="36" width="224" height="18" rx="10" fill="rgba(255,255,255,0.06)" />
    </Illus>
  );
};

export const ILLUSTRATION_COMPONENTS = {
  phishing: PhishingIllustration,
  ransomware: RansomwareIllustration,
  mfa: MfaIllustration,
  password: PasswordIllustration,
  social: SocialIllustration,
  network: NetworkIllustration,
  incident: IncidentIllustration,
  basics: BasicsIllustration,
  data: DataIllustration,
  ai: AiIllustration,
  remote: RemoteIllustration,
  insider: InsiderIllustration,
  url: UrlIllustration,
  privacy: PrivacyIllustration,
  video: VideoIllustration,
};
