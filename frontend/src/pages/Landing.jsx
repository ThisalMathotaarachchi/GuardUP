import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, BookOpen, Crosshair, Award, Brain, ShieldCheck } from 'lucide-react';
import PageShell from '../components/common/PageShell';
import GuardUpSecurityCore from '../components/landing/GuardUpSecurityCore';

const HOW_IT_WORKS = [
  { id: 'learn', label: 'Learn', text: 'Understand the threat', icon: BookOpen },
  { id: 'practice', label: 'Practice', text: 'Make the right decision', icon: Brain },
  { id: 'simulate', label: 'Simulate', text: 'Face a realistic attack', icon: Crosshair },
  { id: 'prove', label: 'Prove', text: 'Demonstrate the skill', icon: Award },
];

const Landing = () => {
  const { user } = useAuth();

  return (
    <PageShell variant="landing" className="landing flex-1 min-h-0">
      <section className="landing-hero">
        <div className="landing-hero__inner">
          <div className="landing-hero__copy">
            <p className="landing-hero__brand">GUARDUP</p>
            <h1 className="landing-hero__headline">
              Build Security Habits.
              <br />
              Prove Them Under Pressure.
            </h1>
            <p className="landing-hero__text">
              GuardUP is a simulation-based cybersecurity awareness platform that helps people
              learn security concepts, practice decisions, experience realistic attacks, and prove
              their ability under pressure.
            </p>
            <div className="landing-hero__cta">
              {user ? (
                <Link to="/dashboard" className="btn-primary">
                  Go to Dashboard
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-primary">
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/dashboard/certifications" className="btn-secondary">
                    Explore Certifications
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="landing-hero__visual">
            <GuardUpSecurityCore />
          </div>
        </div>
      </section>

      <section className="landing-section landing-section--flow">
        <div className="landing-section__inner">
          <h2 className="landing-section__title text-center">How GuardUP Works</h2>
          <div className="landing-journey" role="list">
            {HOW_IT_WORKS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === HOW_IT_WORKS.length - 1;
              return (
                <div key={step.id} className="landing-journey__item" role="listitem">
                  <div className="landing-journey__node">
                    <div className="landing-journey__icon">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <p className="landing-journey__label">{step.label.toUpperCase()}</p>
                    <p className="landing-journey__text">{step.text}</p>
                  </div>
                  {!isLast && <div className="landing-journey__connector" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section__inner landing-trust">
          <ShieldCheck size={28} className="text-accent mb-4" aria-hidden="true" />
          <h2 className="landing-section__title">Human judgment. Realistic pressure. Measurable proof.</h2>
          <p className="landing-section__text max-w-2xl">
            Passive training fades. GuardUP puts learners inside decision moments — analyzing signals,
            choosing responses, and earning certifications that reflect demonstrated capability.
          </p>
          {!user && (
            <Link to="/register" className="btn-primary inline-flex mt-6">
              Get Started
              <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </section>
    </PageShell>
  );
};

export default Landing;
