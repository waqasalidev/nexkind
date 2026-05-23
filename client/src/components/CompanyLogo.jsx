import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import { getLogoCandidates } from '../utils/companyLogos';

const SIZES = {
  sm: 'w-10 h-10 text-sm',
  md: 'w-16 h-16 text-xl',
  lg: 'w-20 h-20 text-2xl',
  xl: 'w-24 h-24 text-3xl',
};

const CompanyLogo = memo(({ src, name, size = 'md', className = '' }) => {
  const candidates = useMemo(() => getLogoCandidates(name, src), [name, src]);
  const [index, setIndex] = useState(0);
  const sizeClass = SIZES[size] || SIZES.md;

  useEffect(() => {
    setIndex(0);
  }, [name, src]);

  const handleError = useCallback(() => {
    setIndex((i) => i + 1);
  }, []);

  if (index >= candidates.length) {
    return (
      <div
        className={`${sizeClass} bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0 ${className}`}
      >
        {(name || 'C').charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={candidates[index]}
      alt={name || 'Company'}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      className={`${sizeClass} object-contain rounded-lg bg-white p-1 shrink-0 ${className}`}
    />
  );
});

CompanyLogo.displayName = 'CompanyLogo';

export default CompanyLogo;
