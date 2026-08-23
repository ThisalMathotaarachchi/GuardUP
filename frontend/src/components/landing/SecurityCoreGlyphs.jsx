
const Glyph = ({ children, className = '' }) => (
  <svg
    className={`sc-glyph ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const GlyphShield = () => (
  <Glyph>
    <path
      className="sc-glyph__shadow"
      d="M12 4.5 6.5 6.8v5.4c0 3.4 2.3 5.8 5.5 7.1 3.2-1.3 5.5-3.7 5.5-7.1V6.8L12 4.5Z"
    />
    <path
      className="sc-glyph__body"
      d="M12 3.8 5.8 6.4v5.8c0 3.8 2.6 6.5 6.2 7.8 3.6-1.3 6.2-4 6.2-7.8V6.4L12 3.8Z"
    />
    <path className="sc-glyph__accent" d="M12 8.2v6.1M9.4 10.8h5.2" />
  </Glyph>
);

export const GlyphLock = () => (
  <Glyph>
    <rect className="sc-glyph__shadow" x="7.8" y="11.2" width="8.4" height="7.2" rx="1.2" />
    <path className="sc-glyph__body" d="M8.2 11.6h7.6a1 1 0 0 1 1 1v5.8a1 1 0 0 1-1 1H8.2a1 1 0 0 1-1-1v-5.8a1 1 0 0 1 1-1Z" />
    <path className="sc-glyph__body" d="M9.4 11.6V9.3a2.6 2.6 0 0 1 5.2 0v2.3" />
    <circle className="sc-glyph__accent" cx="12" cy="14.8" r="1.1" />
    <path className="sc-glyph__accent" d="M12 15.9v1.3" />
  </Glyph>
);

export const GlyphIdentity = () => (
  <Glyph>
    <circle className="sc-glyph__shadow" cx="12" cy="8.4" r="2.8" />
    <circle className="sc-glyph__body" cx="12" cy="8" r="2.6" />
    <path className="sc-glyph__body" d="M7.2 18.2c.8-2.8 2.9-4.2 4.8-4.2s4 1.4 4.8 4.2" />
    <path className="sc-glyph__accent" d="M15.8 9.2 17 8.1M12 5.2v1.2" />
  </Glyph>
);

export const GlyphNetwork = () => (
  <Glyph>
    <circle className="sc-glyph__shadow" cx="12" cy="12" r="2.2" />
    <circle className="sc-glyph__body" cx="12" cy="12" r="1.8" />
    <circle className="sc-glyph__body" cx="6.2" cy="8.2" r="1.4" />
    <circle className="sc-glyph__body" cx="17.8" cy="8.2" r="1.4" />
    <circle className="sc-glyph__body" cx="6.2" cy="15.8" r="1.4" />
    <circle className="sc-glyph__body" cx="17.8" cy="15.8" r="1.4" />
    <path className="sc-glyph__line" d="M10.4 11.1 7.4 9M13.6 11.1l3-2.1M10.4 12.9l-3 2.1M13.6 12.9l3 2.1" />
    <circle className="sc-glyph__accent" cx="12" cy="12" r="0.55" />
  </Glyph>
);

export const GlyphDatabase = () => (
  <Glyph>
    <ellipse className="sc-glyph__shadow" cx="12" cy="7.4" rx="5.4" ry="1.8" />
    <ellipse className="sc-glyph__body" cx="12" cy="7" rx="5.2" ry="1.6" />
    <path className="sc-glyph__body" d="M6.8 7v8.8c0 1 2.4 1.8 5.2 1.8s5.2-.8 5.2-1.8V7" />
    <ellipse className="sc-glyph__line" cx="12" cy="11.2" rx="5.2" ry="1.3" />
    <ellipse className="sc-glyph__line" cx="12" cy="14.8" rx="5.2" ry="1.3" />
    <path className="sc-glyph__accent" d="M12 7.8v1.2" />
  </Glyph>
);

export const GlyphMonitoring = () => (
  <Glyph>
    <path className="sc-glyph__body" d="M5.2 12.8h13.6" />
    <path className="sc-glyph__accent" d="M7.2 12.8 9.4 9.8l2.1 4.8 2.2-2.8 2.1 1.4 1.8-2.4" />
    <circle className="sc-glyph__shadow" cx="17.6" cy="8.2" r="2.2" />
    <circle className="sc-glyph__line" cx="17.6" cy="8.2" r="1.6" />
    <path className="sc-glyph__accent" d="M17.6 6.8v1.2M16.2 8.2h1.2" />
  </Glyph>
);

export const GlyphCert = () => (
  <Glyph>
    <circle className="sc-glyph__shadow" cx="12" cy="12" r="6.4" />
    <circle className="sc-glyph__body" cx="12" cy="12" r="6" />
    <path className="sc-glyph__line" d="M12 6.2v2.2M12 15.6v2.2M6.2 12h2.2M15.6 12h2.2" />
    <path className="sc-glyph__accent" d="m9.1 12.2 1.8 1.8 3.8-3.8" />
  </Glyph>
);

export const GlyphSignal = () => (
  <Glyph>
    <circle className="sc-glyph__shadow" cx="12" cy="12" r="1.4" />
    <circle className="sc-glyph__accent" cx="12" cy="12" r="1" />
    <path className="sc-glyph__line" d="M12 5.2v1.4M12 17.4v1.4M5.2 12h1.4M17.4 12h1.4" />
    <path className="sc-glyph__body" d="M8.1 8.1c2.2-2.2 5.6-2.2 7.8 0M9.6 9.6c1.4-1.4 3.4-1.4 4.8 0" />
  </Glyph>
);

export const GLYPHS = {
  shield: GlyphShield,
  lock: GlyphLock,
  identity: GlyphIdentity,
  network: GlyphNetwork,
  database: GlyphDatabase,
  monitoring: GlyphMonitoring,
  cert: GlyphCert,
  signal: GlyphSignal,
};
