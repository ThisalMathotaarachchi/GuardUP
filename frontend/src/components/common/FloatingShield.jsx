import { Shield } from 'lucide-react';

const ORBIT_DOTS = 8;

const FloatingShield = ({ className = '' }) => (
  <div className={`shield-scene ${className}`}>
    <div className="shield-orbit-ring">
      {Array.from({ length: ORBIT_DOTS }).map((_, i) => (
        <span
          key={i}
          className="shield-orbit-dot"
          style={{ '--orbit-index': i, '--orbit-total': ORBIT_DOTS }}
        />
      ))}
    </div>
    <div className="shield-orbit-ring shield-orbit-ring--inner">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="shield-orbit-dot shield-orbit-dot--sm"
          style={{ '--orbit-index': i, '--orbit-total': 5 }}
        />
      ))}
    </div>
    <div className="shield-core animate-float-shield">
      <Shield size={100} strokeWidth={1.25} className="shield-icon" />
      <span className="shield-letter">G</span>
    </div>
  </div>
);

export default FloatingShield;
