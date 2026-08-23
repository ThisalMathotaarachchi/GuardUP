import { Shield } from 'lucide-react';

const Logo = ({ size = 'md', showText = true, className = '', variant = 'default' }) => {
  const sizes = {
    sm: { icon: 24, letter: 'text-sm', text: 'text-base', box: 'w-8 h-8' },
    md: { icon: 28, letter: 'text-base', text: 'text-xl', box: 'w-10 h-10' },
    lg: { icon: 36, letter: 'text-lg', text: 'text-2xl', box: 'w-12 h-12' },
    xl: { icon: 48, letter: 'text-2xl', text: 'text-3xl', box: 'w-16 h-16' },
  };
  const s = sizes[size] || sizes.md;
  const isLight = variant === 'light' || variant === 'default';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`gu-logo__icon-box ${s.box} relative flex items-center justify-center rounded-xl`}>
        <Shield
          size={s.icon}
          strokeWidth={1.75}
          className={`gu-logo__glyph absolute ${isLight ? '' : ''}`}
        />
        <span className={`gu-logo__glyph ${s.letter} font-bold relative z-10`} style={{ marginTop: '2px' }}>
          G
        </span>
      </div>
      {showText && (
        <span className={`gu-logo__wordmark ${s.text} font-bold`}>
          GuardUp
        </span>
      )}
    </div>
  );
};

export default Logo;
