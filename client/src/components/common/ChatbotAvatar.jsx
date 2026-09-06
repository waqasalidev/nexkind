import { memo, useId } from 'react';

const SIZES = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12',
  hero: 'w-16 h-16',
};

/**
 * ChatbotAvatar — Custom Nexkind AI Counselor & Assistant Icon
 * Combines Nexkind's caring community shield, friendly intelligent eyes,
 * and the radiant spark of knowledge/hope.
 */
const ChatbotAvatar = memo(({ size = 'md', animated = false, className = '' }) => {
  const uniqueId = useId();
  const idSuffix = uniqueId.replace(/:/g, '');
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <svg
      className={`${sizeClass} shrink-0 select-none ${animated ? 'transition-transform duration-300 hover:scale-110' : ''} ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="NexKind AI Assistant"
    >
      <defs>
        {/* Soft radial background glow */}
        <radialGradient id={`bot-glow-${idSuffix}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4338ca" stopOpacity="0" />
        </radialGradient>

        {/* Head / Body gradient: NexKind Blue & Indigo */}
        <linearGradient id={`bot-head-${idSuffix}`} x1="20" y1="18" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Face screen gradient */}
        <linearGradient id={`bot-visor-${idSuffix}`} x1="28" y1="36" x2="72" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>

        {/* Friendly eyes / smile glow: Hopeful Emerald / Cyan */}
        <linearGradient id={`bot-cyan-${idSuffix}`} x1="30" y1="46" x2="70" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>

        {/* Top spark gradient: Warm Amber / Gold */}
        <linearGradient id={`bot-spark-${idSuffix}`} x1="45" y1="8" x2="55" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Subtle outer aura */}
      <circle cx="50" cy="50" r="46" fill={`url(#bot-glow-${idSuffix})`} />

      {/* Antenna / Spark of Knowledge mount */}
      <path
        d="M50 22V16"
        stroke={`url(#bot-spark-${idSuffix})`}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Radiant Top Spark (Nexkind trademark star) */}
      <path
        d="M50 6L52.5 12L58.5 14.5L52.5 17L50 23L47.5 17L41.5 14.5L47.5 12Z"
        fill={`url(#bot-spark-${idSuffix})`}
        className={animated ? 'animate-pulse' : ''}
      />

      {/* Outer Head Shell — friendly rounded silhouette with ear bumps */}
      <rect
        x="18"
        y="24"
        width="64"
        height="56"
        rx="22"
        fill={`url(#bot-head-${idSuffix})`}
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="2"
      />

      {/* Left ear pill */}
      <rect x="12" y="44" width="7" height="16" rx="3.5" fill="#3b82f6" />
      {/* Right ear pill */}
      <rect x="81" y="44" width="7" height="16" rx="3.5" fill="#3b82f6" />

      {/* Visor / Face Display */}
      <rect
        x="26"
        y="34"
        width="48"
        height="36"
        rx="14"
        fill={`url(#bot-visor-${idSuffix})`}
        stroke="#6366f1"
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />

      {/* Left Friendly Curved Eye */}
      <path
        d="M36 50C36 46.5 39 44 43 44C47 44 50 46.5 50 50"
        stroke={`url(#bot-cyan-${idSuffix})`}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Right Friendly Curved Eye */}
      <path
        d="M50 50C50 46.5 53 44 57 44C61 44 64 46.5 64 50"
        stroke={`url(#bot-cyan-${idSuffix})`}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Caring, gentle smile */}
      <path
        d="M44 59C46.5 62 53.5 62 56 59"
        stroke={`url(#bot-cyan-${idSuffix})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Cheerful cheek dots */}
      <circle cx="34" cy="55" r="1.8" fill="#f43f5e" fillOpacity="0.75" />
      <circle cx="66" cy="55" r="1.8" fill="#f43f5e" fillOpacity="0.75" />
    </svg>
  );
});

ChatbotAvatar.displayName = 'ChatbotAvatar';

export default ChatbotAvatar;
