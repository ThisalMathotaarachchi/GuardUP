import { useCallback, useEffect, useRef, useState } from 'react';
import Logo from '../common/Logo';
import { GLYPHS } from './SecurityCoreGlyphs';

const CENTER = { x: 50, y: 50 };
const ACTIVITY_CYCLE = 6.5;


const PARTICLE_DATA = [
  [58, 34, 0.92, 0.42, 'all', true, 0],
  [67, 41, 0.78, 0.34, 'all', false, 1],
  [74, 52, 0.65, 0.28, 'all', true, 2],
  [70, 64, 0.84, 0.38, 'all', false, 3],
  [62, 72, 0.71, 0.32, 'all', false, 4],
  [48, 78, 0.88, 0.4, 'all', true, 5],
  [35, 74, 0.62, 0.26, 'all', false, 6],
  [26, 62, 0.8, 0.36, 'all', false, 7],
  [22, 48, 0.73, 0.3, 'all', true, 8],
  [28, 34, 0.69, 0.28, 'all', false, 9],
  [42, 24, 0.86, 0.36, 'all', false, 10],
  [54, 20, 0.76, 0.32, 'all', false, 11],
  [38, 42, 0.55, 0.22, 'tablet', false, 12],
  [52, 58, 0.48, 0.2, 'tablet', true, 13],
  [64, 48, 0.58, 0.24, 'tablet', false, 14],
  [44, 66, 0.52, 0.22, 'tablet', false, 15],
  [32, 52, 0.46, 0.2, 'tablet', false, 16],
  [56, 38, 0.5, 0.22, 'tablet', false, 17],
  [76, 38, 0.42, 0.18, 'desktop', false, 18],
  [80, 56, 0.38, 0.16, 'desktop', false, 19],
  [68, 28, 0.44, 0.18, 'desktop', true, 20],
  [18, 38, 0.4, 0.16, 'desktop', false, 21],
  [16, 56, 0.36, 0.14, 'desktop', false, 22],
  [46, 14, 0.34, 0.14, 'desktop', false, 23],
  [60, 82, 0.32, 0.14, 'desktop', false, 24],
  [34, 18, 0.3, 0.12, 'desktop', false, 25],
  [82, 68, 0.28, 0.12, 'desktop', false, 26],
  [50, 66, 0.26, 0.12, 'desktop', false, 27],
];

const FRAGMENTS = [
  { id: 'shield', x: 73, y: 27, z: 0.82, tier: 'all' },
  { id: 'identity', x: 79, y: 50, z: 0.68, tier: 'all' },
  { id: 'database', x: 66, y: 73, z: 0.76, tier: 'all' },
  { id: 'signal', x: 31, y: 77, z: 0.64, tier: 'all' },
  { id: 'lock', x: 23, y: 46, z: 0.58, tier: 'tablet' },
  { id: 'network', x: 29, y: 24, z: 0.72, tier: 'tablet' },
  { id: 'monitoring', x: 51, y: 17, z: 0.86, tier: 'desktop' },
  { id: 'cert', x: 83, y: 40, z: 0.7, tier: 'desktop' },
];

const tierClass = (tier, prefix) => {
  if (tier === 'desktop') return `${prefix}--desktop-only`;
  if (tier === 'tablet') return `${prefix}--tablet-up`;
  return '';
};

const activityDelay = (order) => `${(0.08 + order * 0.07).toFixed(2)}s`;

const twinkleDelay = (index) => `${((index * 1.37) % 7).toFixed(2)}s`;


const GuardUpSecurityCore = () => {
  const rootRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleMove = useCallback(
    (event) => {
      if (reducedMotion || !rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: nx * 4.5, y: -ny * 3.5 });
    },
    [reducedMotion],
  );

  const handleLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const particles = PARTICLE_DATA.map(([x, y, z, size, tier, connect, order], index) => ({
    id: `p-${index}`,
    x,
    y,
    z,
    size,
    tier,
    connect,
    order,
    index,
  }));

  const connections = particles.filter((p) => p.connect);

  return (
    <div
      ref={rootRef}
      className="security-core"
      aria-hidden="true"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="security-core__stage"
        style={{
          '--tilt-x': tilt.x,
          '--tilt-y': tilt.y,
        }}
      >
        <div className="security-core__float">
          <div className="security-core__parallax">
            <svg className="security-core__canvas" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="sic-field" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--sc-field-inner)" stopOpacity="0.14" />
                  <stop offset="55%" stopColor="var(--sc-field-mid)" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="var(--sc-field-outer)" stopOpacity="0" />
                </radialGradient>
              </defs>

              <ellipse
                className="security-core__field"
                cx={CENTER.x}
                cy={CENTER.y}
                rx="38"
                ry="36"
              />

              {connections.map((particle) => (
                <g key={`link-${particle.id}`}>
                  <line
                    className={`security-core__connection ${tierClass(particle.tier, 'security-core__connection')}`}
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={particle.x}
                    y2={particle.y}
                  />
                  <line
                    className={`security-core__connection security-core__connection--signal ${tierClass(particle.tier, 'security-core__connection')}`}
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={particle.x}
                    y2={particle.y}
                    pathLength="100"
                    style={{ '--activity-delay': activityDelay(particle.order) }}
                  />
                </g>
              ))}

              {particles.map((particle) => (
                <circle
                  key={particle.id}
                  className={`security-core__particle ${tierClass(particle.tier, 'security-core__particle')}`}
                  cx={particle.x}
                  cy={particle.y}
                  r={particle.size}
                  style={{
                    '--pz': particle.z,
                    '--activity-delay': activityDelay(particle.order),
                    '--twinkle-delay': twinkleDelay(particle.index),
                  }}
                />
              ))}
            </svg>

            {FRAGMENTS.map((fragment, index) => {
              const Glyph = GLYPHS[fragment.id];
              return (
                <div
                  key={fragment.id}
                  className={`security-core__fragment ${tierClass(fragment.tier, 'security-core__fragment')}`}
                  style={{
                    left: `${fragment.x}%`,
                    top: `${fragment.y}%`,
                    '--fz': fragment.z,
                    '--activity-delay': activityDelay(index + 2),
                  }}
                >
                  <Glyph />
                </div>
              );
            })}
          </div>

          <div className="security-core__core">
            <div className="security-core__core-aura" />
            <div className="security-core__core-field" />
            <div className="security-core__logo">
              <Logo size="lg" showText={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardUpSecurityCore;
