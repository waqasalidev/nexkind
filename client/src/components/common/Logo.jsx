import { memo, useId } from 'react';
import { Link } from 'react-router-dom';

const SIZES = {
  sm: {
    container: 'h-8 text-base gap-2 font-extrabold tracking-tight',
    iconSize: 'w-7 h-7',
    textSize: 'text-base',
    tagline: 'text-[9px]',
  },
  md: {
    container: 'h-10 text-lg gap-2.5 font-extrabold tracking-tight',
    iconSize: 'w-9 h-9',
    textSize: 'text-lg',
    tagline: 'text-[10px]',
  },
  lg: {
    container: 'h-14 text-2xl gap-3 font-extrabold tracking-tight',
    iconSize: 'w-12 h-12',
    textSize: 'text-2xl',
    tagline: 'text-xs',
  },
  xl: {
    container: 'h-20 text-3xl gap-3.5 font-extrabold tracking-tight',
    iconSize: 'w-16 h-16',
    textSize: 'text-3xl',
    tagline: 'text-sm',
  },
};

/**
 * NexKind Non-Profit Logo
 * Visual symbolism:
 * 1. Supportive humanitarian hands / cradle: Community, helping people, social impact foundation.
 * 2. Rising open book / wings of learning: Education, knowledge, opportunities, empowerment.
 * 3. Radiant rising star / spark: Hope, enlightenment, growth, brighter future.
 * 4. Harmonious palette: Deep humanitarian blue + hopeful emerald + warm amber gold.
 */
const Logo = memo(({
  size = 'md',
  variant = 'light',
  iconOnly = false,
  animated = true,
  to = '/',
  showTagline = false,
  className = '',
}) => {
  const sizeConfig = SIZES[size] || SIZES.md;
  const uniqueId = useId();
  const idSuffix = uniqueId.replace(/:/g, '');

  let primaryTextClass = 'text-slate-900';
  let secondaryTextClass = 'text-emerald-600';
  let taglineClass = 'text-slate-500';

  if (variant === 'white') {
    primaryTextClass = 'text-white';
    secondaryTextClass = 'text-emerald-400';
    taglineClass = 'text-slate-300';
  } else if (variant === 'dark') {
    primaryTextClass = 'text-white';
    secondaryTextClass = 'text-amber-400';
    taglineClass = 'text-slate-400';
  } else {
    // default light
    primaryTextClass = 'text-slate-900';
    secondaryTextClass = 'text-emerald-600';
    taglineClass = 'text-slate-500';
  }

  const LogoIcon = (
    <svg
      className={`${sizeConfig.iconSize} shrink-0 ${
        animated ? 'group-hover:scale-105 transition-transform duration-300 ease-out' : ''
      }`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NexKind Non-Profit Mark"
    >
      <defs>
        {/* Blue Foundation / Hands Gradient */}
        <linearGradient id={`np-blue-${idSuffix}`} x1="16" y1="42" x2="84" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        {/* Emerald Education / Book Pages Gradient */}
        <linearGradient id={`np-emerald-${idSuffix}`} x1="28" y1="28" x2="72" y2="76" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        {/* Gold / Amber Radiant Star Gradient */}
        <linearGradient id={`np-gold-${idSuffix}`} x1="42" y1="6" x2="58" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Soft Aura Glow */}
        <filter id={`np-glow-${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Supportive Humanitarian Hands / Cradle (Community & Helping People) */}
      {/* Left Supportive Hand */}
      <path
        d="M50 88C36 88 22 79 16 66C13 60 14 53 19 48C21 46 25 46 27 49C29 52 28 56 26 59C30 68 40 75 50 76V88Z"
        fill={`url(#np-blue-${idSuffix})`}
      />
      {/* Right Supportive Hand */}
      <path
        d="M50 88C64 88 78 79 84 66C87 60 86 53 81 48C79 46 75 46 73 49C71 52 72 56 74 59C70 68 60 75 50 76V88Z"
        fill={`url(#np-blue-${idSuffix})`}
      />

      {/* 2. Open Book of Knowledge / Wings of Education & Opportunity */}
      {/* Left Page (Education & Growth) */}
      <path
        d="M50 72C42 66 32 58 25 44C22 38 23 31 28 27C31 24 35 25 38 28C43 33 47 43 50 54V72Z"
        fill={`url(#np-emerald-${idSuffix})`}
      />
      {/* Right Page (Education & Growth) */}
      <path
        d="M50 72C58 66 68 58 75 44C78 38 77 31 72 27C69 24 65 25 62 28C57 33 53 43 50 54V72Z"
        fill={`url(#np-emerald-${idSuffix})`}
      />

      {/* Inner Heart contour / center stem connecting community to learning */}
      <path
        d="M50 74C47 68 44 58 44 48C44 42 47 38 50 38C53 38 56 42 56 48C56 58 53 68 50 74Z"
        fill="#ffffff"
        fillOpacity="0.85"
      />

      {/* 3. Radiant Star of Hope / Enlightenment (Radiating Opportunities) */}
      <path
        d="M50 8L52.8 17.5L62 18.5L55 24.2L57.2 33.5L50 28.5L42.8 33.5L45 24.2L38 18.5L47.2 17.5Z"
        fill={`url(#np-gold-${idSuffix})`}
        filter={`url(#np-glow-${idSuffix})`}
        className={animated ? 'animate-pulse' : ''}
      />

      {/* Center core point */}
      <circle cx="50" cy="22" r="2.5" fill="#ffffff" />
    </svg>
  );

  const content = (
    <div className={`flex items-center select-none ${sizeConfig.container} ${className}`}>
      {LogoIcon}
      {!iconOnly && (
        <div className="flex flex-col justify-center leading-none">
          <div className={`font-extrabold tracking-tight ${sizeConfig.textSize} flex items-center`}>
            <span className={primaryTextClass}>Nex</span>
            <span className={secondaryTextClass}>Kind</span>
          </div>
          {(showTagline || size === 'lg' || size === 'xl') && (
            <span className={`${sizeConfig.tagline} ${taglineClass} font-semibold tracking-widest uppercase mt-0.5`}>
              Non-Profit Foundation
            </span>
          )}
        </div>
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

  return <div className="group">{content}</div>;
});

Logo.displayName = 'Logo';

export default Logo;
