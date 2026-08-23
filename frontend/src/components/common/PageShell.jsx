import SecurityAtmosphere from '../atmosphere/SecurityAtmosphere';

const VARIANTS = ['landing', 'dashboard', 'assessment', 'auth', 'reading', 'cert-workspace', 'default'];

const PageShell = ({ variant = 'default', center = false, scroll = false, className = '', children }) => {
  const safeVariant = VARIANTS.includes(variant) ? variant : 'default';
  const centerClass = center || safeVariant === 'auth' || safeVariant === 'assessment' ? 'page-shell__content--center' : '';
  const scrollClass = scroll || safeVariant === 'auth' ? 'page-shell__content--scroll' : '';
  const fillClass = ['landing', 'auth', 'assessment', 'dashboard', 'reading', 'cert-workspace'].includes(safeVariant)
    ? 'flex-1 min-h-0 w-full'
    : '';

  return (
    <div className={`page-shell page-shell--${safeVariant} ${fillClass} ${className}`.trim()}>
      <SecurityAtmosphere variant={safeVariant === 'landing' ? 'landing' : safeVariant} />
      <div className={`page-shell__content ${centerClass} ${scrollClass}`.trim()}>
        {children}
      </div>
    </div>
  );
};

export default PageShell;
