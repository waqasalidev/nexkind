import { memo, useId } from 'react';
import { Link } from 'react-router-dom';

const SIZES = {
  sm: {
    container: 'h-8 text-base gap-2 font-extrabold tracking-tight',
    iconSize: 'w-8 h-8',
    textSize: 'text-base',
  },
  md: {
    container: 'h-10 text-lg gap-2.5 font-extrabold tracking-tight',
    iconSize: 'w-10 h-10',
    textSize: 'text-lg',
  },
  lg: {
    container: 'h-14 text-2xl gap-3 font-extrabold tracking-tight',
    iconSize: 'w-12 h-12',
    textSize: 'text-2xl',
  },
  xl: {
    container: 'h-20 text-3xl gap-4 font-extrabold tracking-tight',
    iconSize: 'w-16 h-16',
    textSize: 'text-3xl',
  },
};

const Logo = memo(({
  size = 'md',
  variant = 'light',
  iconOnly = false,
  animated = true,
  to = '/',
  className = '',
}) => {
  const sizeConfig = SIZES[size] || SIZES.md;
  const uniqueId = useId();
  const idSuffix = uniqueId.replace(/:/g, '');

  // Decide if background is dark/white
  const isDarkBackground = variant === 'white' || variant === 'dark';

  let textClass = 'text-slate-800';
  let primaryTextClass = 'text-primary';
  let secondaryTextClass = 'text-secondary';

  if (variant === 'white') {
    textClass = 'text-white';
    primaryTextClass = 'text-white';
    secondaryTextClass = 'text-secondary';
  } else if (variant === 'dark') {
    textClass = 'text-slate-200';
    primaryTextClass = 'text-white';
    secondaryTextClass = 'text-amber-400';
  } else {
    // default light
    textClass = 'text-slate-800';
    primaryTextClass = 'text-primary';
    secondaryTextClass = 'text-secondary';
  }

  // Dynamically select high-contrast premium gradients based on theme/background variant
  // This matches logo.svg (light) and logo-white.svg (dark) exactly
  const primaryGradStops = isDarkBackground
    ? { stop1: '#3b82f6', stop2: '#2563eb' }  // Bright blue for contrast on dark
    : { stop1: '#2563eb', stop2: '#1e3a8a' }; // Official logo blue for light

  const secondaryGradStops = { stop1: '#f59e0b', stop2: '#d97706' }; // Consistent amber

  const accentGradStops = isDarkBackground
    ? { stop1: '#60a5fa', stop2: '#93c5fd' }  // Glowing accent for dark
    : { stop1: '#3b82f6', stop2: '#60a5fa' }; // Official accent for light

  const LogoIcon = (
    <svg
      className={`${sizeConfig.iconSize} shrink-0 ${animated ? 'group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 ease-out' : ''}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`logo-primary-grad-${idSuffix}`} x1="20" y1="12" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={primaryGradStops.stop1} />
          <stop offset="100%" stopColor={primaryGradStops.stop2} />
        </linearGradient>
        <linearGradient id={`logo-secondary-grad-${idSuffix}`} x1="80" y1="12" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={secondaryGradStops.stop1} />
          <stop offset="100%" stopColor={secondaryGradStops.stop2} />
        </linearGradient>
        <linearGradient id={`logo-accent-grad-${idSuffix}`} x1="39" y1="12" x2="61" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={accentGradStops.stop1} />
          <stop offset="100%" stopColor={accentGradStops.stop2} />
        </linearGradient>
        <filter id={`logo-glow-${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background soft glow under icon on hover */}
      {animated && (
        <circle
          cx="50"
          cy="50"
          r="35"
          fill={`url(#logo-accent-grad-${idSuffix})`}
          className="opacity-0 group-hover:opacity-15 transition-opacity duration-500"
        />
      )}

      {/* Left Wing (Book Page / Heart Half) */}
      <path
        d="M50 85C30 75 20 55 20 38C20 22 32 12 46 22C49 24 50 27 50 27C50 27 47 24 43 24C34 24 28 32 28 48C28 60 36 72 50 78Z"
        fill={`url(#logo-primary-grad-${idSuffix})`}
        className={`${animated ? 'group-hover:translate-x-[-1.5px] transition-transform duration-300 ease-out' : ''}`}
      />

      {/* Right Wing (Book Page / Heart Half) */}
      <path
        d="M50 85C70 75 80 55 80 38C80 22 68 12 54 22C51 24 50 27 50 27C50 27 53 24 57 24C66 24 72 32 72 48C72 60 64 72 50 78Z"
        fill={`url(#logo-secondary-grad-${idSuffix})`}
        className={`${animated ? 'group-hover:translate-x-[1.5px] transition-transform duration-300 ease-out' : ''}`}
      />

      {/* Center Star (Spark of Knowledge) */}
      <path
        d="M50 10L53.5 19L62.5 22.5L53.5 26L50 35L46.5 26L37.5 22.5L46.5 19Z"
        fill={`url(#logo-accent-grad-${idSuffix})`}
        filter={`url(#logo-glow-${idSuffix})`}
        className={`${animated ? 'animate-pulse' : ''}`}
      />
    </svg>
  );

  const content = (
    <div className={`flex items-center select-none ${sizeConfig.container} ${className}`}>
      {LogoIcon}
      {!iconOnly && (
        <span
          className={`font-extrabold tracking-tight ${sizeConfig.textSize} ${animated ? 'group-hover:translate-x-[1px] transition-transform duration-300' : ''}`}
        >
          <span className={primaryTextClass}>Nex</span>
          <span className={secondaryTextClass}>Kind</span>
        </span>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="group inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return (
    <div className="group">
      {content}
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;
