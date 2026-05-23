import { memo } from 'react';
import Logo from './Logo';

const LoadingSpinner = memo(({
  fullPage = false,
  text = 'Loading...',
  size = 'lg',
}) => {
  const containerClass = fullPage
    ? 'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-md'
    : 'flex flex-col items-center justify-center p-8 w-full';

  return (
    <div className={containerClass}>
      <div className="relative flex items-center justify-center">
        {/* Animated Rotating Gradient Ring */}
        <div className="absolute w-20 h-20 rounded-full border-4 border-slate-100/40 border-t-blue-600 border-r-amber-500 animate-spin duration-1000"></div>
        
        {/* Central Logo Pulsing */}
        <div className="relative z-10 animate-pulse duration-1000 scale-90">
          <Logo size={size} iconOnly={true} animated={false} to={null} />
        </div>
      </div>
      
      {text && (
        <p className="mt-4 text-sm font-semibold tracking-wider text-slate-500 uppercase animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
