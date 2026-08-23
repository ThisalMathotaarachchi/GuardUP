

const pickNaturalSize = (index) => {
  const roll = (index * 17 + 3) % 100;
  if (roll < 20) return [22, 23, 24][index % 3];
  if (roll < 75) return [26, 27, 28, 29][index % 4];
  return [30, 31, 32, 33, 34][index % 5];
};

const SYMBOL_DEFS = [
  
  { type: 'shield', left: '3%', top: '6%', size: 24, delay: 0, duration: 22, tier: 'mobile', anim: 'a' },
  { type: 'lock', left: '94%', top: '4%', size: 22, delay: 7, duration: 26, tier: 'mobile', anim: 'b' },
  { type: 'key', left: '5%', top: '50%', size: 20, delay: 3, duration: 19, tier: 'mobile', anim: 'c' },
  { type: 'node', left: '93%', top: '46%', size: 20, delay: 11, duration: 24, tier: 'mobile', anim: 'a' },
  { type: 'terminal', left: '6%', top: '90%', size: 22, delay: 5, duration: 21, tier: 'mobile', anim: 'b' },
  { type: 'globe', left: '91%', top: '86%', size: 22, delay: 14, duration: 28, tier: 'mobile', anim: 'c' },
  { type: 'fingerprint', left: '2%', top: '26%', size: 20, delay: 9, duration: 23, tier: 'mobile', anim: 'a' },
  { type: 'eye', left: '92%', top: '70%', size: 22, delay: 2, duration: 20, tier: 'mobile', anim: 'b' },
  { type: 'warning', left: '4%', top: '72%', size: 20, delay: 16, duration: 25, tier: 'mobile', anim: 'c' },
  { type: 'hex', left: '90%', top: '20%', size: 20, delay: 6, duration: 18, tier: 'mobile', anim: 'a' },
  { type: 'terminal', left: '50%', top: '92%', size: 18, delay: 4, duration: 20, tier: 'mobile', anim: 'b' },
  { type: 'user', left: '48%', top: '78%', size: 18, delay: 12, duration: 23, tier: 'mobile', anim: 'c' },
  { type: 'firewall', left: '78%', top: '92%', size: 18, delay: 8, duration: 21, tier: 'mobile', anim: 'a' },
  { type: 'lock', left: '8%', top: '42%', size: 18, delay: 10, duration: 24, tier: 'mobile', anim: 'c' },
  { type: 'shield', left: '12%', top: '88%', size: 18, delay: 14, duration: 22, tier: 'mobile', anim: 'b' },
  { type: 'node', left: '72%', top: '32%', size: 18, delay: 18, duration: 21, tier: 'mobile', anim: 'a' },
  { type: 'globe', left: '38%', top: '8%', size: 18, delay: 13, duration: 24, tier: 'mobile', anim: 'c' },
  { type: 'fingerprint', left: '96%', top: '24%', size: 18, delay: 19, duration: 22, tier: 'mobile', anim: 'b' },
  { type: 'key', left: '2%', top: '58%', size: 18, delay: 21, duration: 24, tier: 'mobile', anim: 'a' },
  { type: 'hex', left: '88%', top: '52%', size: 18, delay: 15, duration: 20, tier: 'mobile', anim: 'c' },
  { type: 'eye', left: '6%', top: '14%', size: 18, delay: 8, duration: 26, tier: 'mobile', anim: 'b' },
  { type: 'warning', left: '95%', top: '58%', size: 18, delay: 22, duration: 23, tier: 'mobile', anim: 'a' },
  { type: 'user', left: '3%', top: '96%', size: 18, delay: 11, duration: 21, tier: 'mobile', anim: 'c' },

  
  { type: 'user', left: '14%', top: '12%', size: 22, delay: 4, duration: 27, tier: 'tablet', anim: 'b' },
  { type: 'firewall', left: '85%', top: '32%', size: 22, delay: 12, duration: 22, tier: 'tablet', anim: 'c' },
  { type: 'shield', left: '79%', top: '58%', size: 20, delay: 8, duration: 24, tier: 'tablet', anim: 'a' },
  { type: 'lock', left: '20%', top: '84%', size: 20, delay: 18, duration: 20, tier: 'tablet', anim: 'b' },
  { type: 'key', left: '74%', top: '10%', size: 20, delay: 1, duration: 26, tier: 'tablet', anim: 'c' },
  { type: 'node', left: '16%', top: '38%', size: 20, delay: 13, duration: 21, tier: 'tablet', anim: 'a' },
  { type: 'terminal', left: '82%', top: '78%', size: 20, delay: 10, duration: 23, tier: 'tablet', anim: 'b' },
  { type: 'globe', left: '11%', top: '62%', size: 22, delay: 15, duration: 19, tier: 'tablet', anim: 'c' },
  { type: 'eye', left: '52%', top: '14%', size: 18, delay: 6, duration: 24, tier: 'tablet', anim: 'a' },
  { type: 'warning', left: '42%', top: '48%', size: 18, delay: 15, duration: 21, tier: 'tablet', anim: 'b' },
  { type: 'hex', left: '68%', top: '64%', size: 18, delay: 9, duration: 23, tier: 'tablet', anim: 'c' },
  { type: 'shield', left: '58%', top: '28%', size: 18, delay: 11, duration: 22, tier: 'tablet', anim: 'a' },
  { type: 'key', left: '28%', top: '52%', size: 18, delay: 17, duration: 25, tier: 'tablet', anim: 'b' },
  { type: 'eye', left: '8%', top: '18%', size: 18, delay: 7, duration: 23, tier: 'tablet', anim: 'c' },
  { type: 'terminal', left: '22%', top: '72%', size: 18, delay: 16, duration: 26, tier: 'tablet', anim: 'a' },
  { type: 'shield', left: '24%', top: '76%', size: 18, delay: 20, duration: 24, tier: 'tablet', anim: 'b' },
  { type: 'lock', left: '92%', top: '44%', size: 18, delay: 3, duration: 22, tier: 'tablet', anim: 'a' },
  { type: 'node', left: '30%', top: '8%', size: 18, delay: 14, duration: 25, tier: 'tablet', anim: 'c' },
  { type: 'globe', left: '84%', top: '66%', size: 18, delay: 18, duration: 21, tier: 'tablet', anim: 'b' },
  { type: 'terminal', left: '52%', top: '82%', size: 18, delay: 5, duration: 23, tier: 'tablet', anim: 'a' },
  { type: 'firewall', left: '64%', top: '14%', size: 18, delay: 12, duration: 26, tier: 'tablet', anim: 'c' },
  { type: 'key', left: '18%', top: '48%', size: 18, delay: 9, duration: 20, tier: 'tablet', anim: 'b' },

  
  { type: 'eye', left: '40%', top: '5%', size: 20, delay: 5, duration: 29, tier: 'desktop', anim: 'a' },
  { type: 'hex', left: '66%', top: '8%', size: 20, delay: 17, duration: 22, tier: 'desktop', anim: 'b' },
  { type: 'user', left: '46%', top: '16%', size: 20, delay: 9, duration: 25, tier: 'desktop', anim: 'c' },
  { type: 'warning', left: '54%', top: '88%', size: 20, delay: 3, duration: 27, tier: 'desktop', anim: 'a' },
  { type: 'fingerprint', left: '36%', top: '60%', size: 20, delay: 20, duration: 24, tier: 'desktop', anim: 'b' },
  { type: 'firewall', left: '62%', top: '36%', size: 20, delay: 7, duration: 21, tier: 'desktop', anim: 'c' },
  { type: 'shield', left: '26%', top: '30%', size: 20, delay: 14, duration: 26, tier: 'desktop', anim: 'a' },
  { type: 'lock', left: '76%', top: '50%', size: 20, delay: 11, duration: 23, tier: 'desktop', anim: 'b' },
  { type: 'key', left: '58%', top: '72%', size: 20, delay: 22, duration: 28, tier: 'desktop', anim: 'c' },
  { type: 'node', left: '32%', top: '82%', size: 20, delay: 6, duration: 20, tier: 'desktop', anim: 'a' },
  { type: 'terminal', left: '44%', top: '38%', size: 18, delay: 13, duration: 25, tier: 'desktop', anim: 'b' },
  { type: 'globe', left: '68%', top: '22%', size: 18, delay: 8, duration: 22, tier: 'desktop', anim: 'c' },
  { type: 'warning', left: '88%', top: '12%', size: 18, delay: 4, duration: 20, tier: 'desktop', anim: 'b' },
  { type: 'lock', left: '50%', top: '24%', size: 18, delay: 18, duration: 23, tier: 'desktop', anim: 'b' },
  { type: 'user', left: '18%', top: '68%', size: 18, delay: 15, duration: 24, tier: 'desktop', anim: 'c' },
  { type: 'node', left: '72%', top: '68%', size: 18, delay: 19, duration: 26, tier: 'desktop', anim: 'a' },
  { type: 'fingerprint', left: '58%', top: '48%', size: 18, delay: 12, duration: 22, tier: 'desktop', anim: 'b' },
  { type: 'globe', left: '14%', top: '18%', size: 18, delay: 11, duration: 25, tier: 'desktop', anim: 'c' },
  { type: 'hex', left: '6%', top: '54%', size: 18, delay: 20, duration: 27, tier: 'desktop', anim: 'a' },
  { type: 'firewall', left: '24%', top: '44%', size: 18, delay: 14, duration: 24, tier: 'desktop', anim: 'b' },
  { type: 'key', left: '10%', top: '34%', delay: 17, duration: 23, tier: 'desktop', anim: 'c' },
  { type: 'shield', left: '86%', top: '38%', size: 18, delay: 21, duration: 24, tier: 'desktop', anim: 'a' },
  { type: 'lock', left: '38%', top: '68%', size: 18, delay: 23, duration: 22, tier: 'desktop', anim: 'b' },
  { type: 'warning', left: '62%', top: '84%', size: 18, delay: 25, duration: 26, tier: 'desktop', anim: 'c' },
  { type: 'terminal', left: '34%', top: '18%', size: 18, delay: 24, duration: 23, tier: 'desktop', anim: 'a' },
  { type: 'eye', left: '82%', top: '24%', size: 18, delay: 26, duration: 24, tier: 'desktop', anim: 'c' },
  { type: 'hex', left: '30%', top: '24%', size: 18, delay: 16, duration: 22, tier: 'desktop', anim: 'a' },
  { type: 'user', left: '92%', top: '52%', size: 18, delay: 10, duration: 25, tier: 'desktop', anim: 'b' },
  { type: 'warning', left: '52%', top: '76%', size: 18, delay: 27, duration: 21, tier: 'desktop', anim: 'c' },
  { type: 'fingerprint', left: '70%', top: '78%', size: 18, delay: 13, duration: 23, tier: 'desktop', anim: 'a' },
  { type: 'firewall', left: '40%', top: '82%', size: 18, delay: 28, duration: 26, tier: 'desktop', anim: 'b' },
  { type: 'shield', left: '92%', top: '78%', size: 18, delay: 6, duration: 22, tier: 'desktop', anim: 'c' },
  { type: 'lock', left: '12%', top: '58%', size: 18, delay: 29, duration: 24, tier: 'desktop', anim: 'a' },
  { type: 'node', left: '88%', top: '32%', size: 18, delay: 15, duration: 20, tier: 'desktop', anim: 'b' },
  { type: 'globe', left: '78%', top: '88%', size: 18, delay: 30, duration: 27, tier: 'desktop', anim: 'c' },
].map((symbol, index) => ({ ...symbol, size: pickNaturalSize(index) }));

const SYMBOLS = SYMBOL_DEFS;

const TIER_CLASS = {
  mobile: '',
  tablet: ' gu-signal-field__symbol--tablet',
  desktop: ' gu-signal-field__symbol--desktop',
};

const SymbolSvg = ({ type, size }) => {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.1,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (type) {
    case 'shield':
      return (
        <svg {...props}>
          <path d="M12 3L5 6v5.5c0 4.2 3 7.8 7 9 4-1.2 7-4.8 7-9V6l-7-3z" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...props}>
          <rect x="7" y="11" width="10" height="8" rx="1.5" />
          <path d="M9 11V8a3 3 0 016 0v3" />
        </svg>
      );
    case 'fingerprint':
      return (
        <svg {...props}>
          <path d="M12 11a2 2 0 012 2c0 1.5-1 2.5-2 3.5" />
          <path d="M8 11a4 4 0 018 0v1" />
          <path d="M6 12a6 6 0 0112 0v2" />
          <path d="M4 13a8 8 0 0116 0" />
        </svg>
      );
    case 'key':
      return (
        <svg {...props}>
          <circle cx="9" cy="9" r="3" />
          <path d="M12 9h8M17 9v3M20 9v2" />
        </svg>
      );
    case 'node':
      return (
        <svg {...props}>
          <circle cx="6" cy="12" r="2" />
          <circle cx="18" cy="6" r="2" />
          <circle cx="18" cy="18" r="2" />
          <path d="M8 12h8M16.5 7.5L8 12M16.5 16.5L8 12" />
        </svg>
      );
    case 'terminal':
      return (
        <svg {...props}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M8 10l2 2-2 2M12 14h4" />
        </svg>
      );
    case 'warning':
      return (
        <svg {...props}>
          <path d="M12 4L4 19h16L12 4z" />
          <path d="M12 10v4M12 16v.5" />
        </svg>
      );
    case 'eye':
      return (
        <svg {...props}>
          <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case 'hex':
      return (
        <svg {...props}>
          <rect x="6" y="6" width="12" height="12" rx="1" />
          <path d="M9 9h2v2H9zM13 9h2v2h-2zM9 13h2v2H9zM13 13h2v2h-2z" fill="currentColor" stroke="none" opacity="0.5" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16M12 4a12 12 0 010 16M12 4a12 12 0 000 16" />
        </svg>
      );
    case 'user':
      return (
        <svg {...props}>
          <circle cx="12" cy="9" r="3" />
          <path d="M6 19c0-3 2.7-5 6-5s6 2 6 5" />
        </svg>
      );
    case 'firewall':
      return (
        <svg {...props}>
          <path d="M4 6h16v12H4z" />
          <path d="M8 6V4h8v2M12 10v4M10 12h4" />
        </svg>
      );
    default:
      return null;
  }
};

const GuardUpSecuritySignalField = ({ intensity = 1, className = '' }) => (
  <div
    className={`gu-signal-field ${className}`.trim()}
    style={{ '--signal-intensity': intensity }}
    aria-hidden="true"
  >
    {SYMBOLS.map((symbol, index) => (
      <span
        key={`${symbol.type}-${symbol.left}-${index}`}
        className={`gu-signal-field__symbol gu-signal-field__symbol--anim-${symbol.anim}${TIER_CLASS[symbol.tier]}`}
        style={{
          left: symbol.left,
          top: symbol.top,
          '--signal-delay': `${symbol.delay}s`,
          '--signal-duration': `${symbol.duration}s`,
        }}
      >
        <SymbolSvg type={symbol.type} size={symbol.size} />
      </span>
    ))}
  </div>
);

export default GuardUpSecuritySignalField;
