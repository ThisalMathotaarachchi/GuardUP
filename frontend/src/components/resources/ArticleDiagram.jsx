const DiagramFrame = ({ title, children, caption, footnote }) => (
  <figure className="resource-diagram">
    <div className="resource-diagram__frame">
      {title && <p className="resource-diagram__title">{title}</p>}
      {children}
      {footnote && <p className="resource-diagram__footnote">{footnote}</p>}
    </div>
    {caption && <figcaption className="resource-diagram__caption">{caption}</figcaption>}
  </figure>
);

const node = (x, y, w, h, label, sub) => (
  <g key={`${x}-${label}`}>
    <rect x={x - w / 2} y={y} width={w} height={h} rx="6" fill="rgba(255,255,255,0.05)" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
    <text x={x} y={y + (sub ? 18 : 22)} textAnchor="middle" fill="currentColor" fillOpacity="0.85" fontSize="9" fontWeight="600">
      {label.split('\n').map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : 11}>{line}</tspan>
      ))}
    </text>
    {sub && <text x={x} y={y + 32} textAnchor="middle" fill="currentColor" fillOpacity="0.45" fontSize="7">{sub}</text>}
  </g>
);

const arrow = (x1, x2, y) => (
  <line x1={x1} y1={y} x2={x2} y2={y} stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.2" markerEnd="url(#gu-diagram-arrow)" />
);

const DIAGRAMS = {
  'cia-triad': (
    <DiagramFrame title="CIA Triad">
      <svg viewBox="0 0 480 200" className="resource-diagram__svg" aria-hidden="true">
        <circle cx="120" cy="100" r="52" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="240" cy="100" r="52" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="360" cy="100" r="52" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
        <text x="120" y="96" textAnchor="middle" fill="currentColor" fillOpacity="0.85" fontSize="11" fontWeight="600">Confidentiality</text>
        <text x="120" y="112" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="9">Keep data private</text>
        <text x="240" y="96" textAnchor="middle" fill="currentColor" fillOpacity="0.85" fontSize="11" fontWeight="600">Integrity</text>
        <text x="240" y="112" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="9">Data stays accurate</text>
        <text x="360" y="96" textAnchor="middle" fill="currentColor" fillOpacity="0.85" fontSize="11" fontWeight="600">Availability</text>
        <text x="360" y="112" textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="9">Systems stay online</text>
      </svg>
    </DiagramFrame>
  ),
  'phishing-flow': (
    <DiagramFrame title="Phishing Attack Flow">
      <svg viewBox="0 0 520 140" className="resource-diagram__svg" aria-hidden="true">
        <defs>
          <marker id="gu-diagram-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="currentColor" fillOpacity="0.45" />
          </marker>
        </defs>
        {node(40, 44, 84, 52, 'User', 'Target')}
        {node(155, 44, 84, 52, 'Malicious\nMessage', 'Email/SMS')}
        {node(280, 44, 84, 52, 'Fake Site', 'Spoofed login')}
        {node(405, 44, 84, 52, 'Credential\nTheft', 'Account access')}
        {arrow(82, 113, 70)}
        {arrow(197, 238, 70)}
        {arrow(322, 363, 70)}
      </svg>
    </DiagramFrame>
  ),
  'ransomware-flow': (
    <DiagramFrame title="Ransomware Lifecycle" footnote="Prevention and backups reduce impact at every stage">
      <svg viewBox="0 0 560 150" className="resource-diagram__svg" aria-hidden="true">
        <defs>
          <marker id="gu-diagram-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="currentColor" fillOpacity="0.45" />
          </marker>
        </defs>
        {[
          { x: 55, label: 'Initial\nAccess' },
          { x: 155, label: 'Execution' },
          { x: 255, label: 'Encryption' },
          { x: 355, label: 'Extortion' },
          { x: 455, label: 'Recovery' },
        ].map((n, i, arr) => (
          <g key={n.label}>
            {node(n.x, 50, 76, 48, n.label)}
            {i < arr.length - 1 && arrow(n.x + 40, arr[i + 1].x - 40, 74)}
          </g>
        ))}
      </svg>
    </DiagramFrame>
  ),
  'mfa-flow': (
    <DiagramFrame title="Multi-Factor Authentication" footnote="Both factors required — password alone is not enough">
      <svg viewBox="0 0 480 160" className="resource-diagram__svg" aria-hidden="true">
        <defs>
          <marker id="gu-diagram-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="currentColor" fillOpacity="0.45" />
          </marker>
        </defs>
        {node(70, 55, 80, 46, 'User')}
        {node(170, 55, 80, 46, 'Password')}
        {node(280, 55, 80, 46, 'Second Factor')}
        {node(390, 55, 80, 46, 'Access\nGranted')}
        {arrow(112, 128, 78)}
        {arrow(212, 238, 78)}
        {arrow(322, 348, 78)}
      </svg>
    </DiagramFrame>
  ),
  'threat-landscape': (
    <DiagramFrame title="Common Threat Categories">
      <svg viewBox="0 0 480 180" className="resource-diagram__svg" aria-hidden="true">
        {[
          { x: 80, y: 70, label: 'Phishing' },
          { x: 200, y: 70, label: 'Malware' },
          { x: 320, y: 70, label: 'Social\nEngineering' },
          { x: 140, y: 130, label: 'Insider\nThreats' },
          { x: 260, y: 130, label: 'Unpatched\nSystems' },
          { x: 380, y: 130, label: 'Weak\nCredentials' },
        ].map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="32" fill="rgba(255,255,255,0.04)" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fill="currentColor" fillOpacity="0.75" fontSize="8" fontWeight="600">
              {n.label.split('\n').map((line, i) => (
                <tspan key={i} x={n.x} dy={i === 0 ? 0 : 10}>{line}</tspan>
              ))}
            </text>
          </g>
        ))}
      </svg>
    </DiagramFrame>
  ),
};

const ArticleDiagram = ({ type, caption }) => {
  const diagram = DIAGRAMS[type];
  if (!diagram) return null;

  if (caption) {
    return (
      <div className="resource-diagram-wrap">
        {diagram}
        <p className="resource-diagram__caption">{caption}</p>
      </div>
    );
  }

  return diagram;
};

export default ArticleDiagram;
