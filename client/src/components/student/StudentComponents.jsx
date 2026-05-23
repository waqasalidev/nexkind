import { Search, Calendar, MapPin, Clock } from 'lucide-react';

export const ContentCard = ({ title, subtitle, image, tags, footer, onClick, onAction, actionLabel, secondaryActionLabel, onSecondaryAction }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
      {image && (
        <div className="h-48 overflow-hidden relative">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Floating Tags Overlay */}
          {tags && (
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-bold rounded-full shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col relative">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
          {subtitle && <div className="text-slate-500 text-sm mb-4 line-clamp-2">{subtitle}</div>}
        </div>

        {footer && <div className="pt-4 border-t border-slate-100 mt-4 text-sm text-slate-500">{footer}</div>}

        {actionLabel && (
          <div className="flex gap-3 mt-5">
            {secondaryActionLabel && (
              <button
                onClick={onSecondaryAction}
                className="flex-1 py-2.5 bg-white text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300 border border-slate-200 shadow-sm"
              >
                {secondaryActionLabel}
              </button>
            )}
            <button
              onClick={onClick || onAction}
              className={`flex-1 py-2.5 bg-slate-50 text-slate-700 font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-300 border border-slate-200 hover:border-primary/50 shadow-sm hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group/btn ${!secondaryActionLabel ? 'w-full' : ''}`}
            >
              {actionLabel}
              <span className="hidden group-hover/btn:inline-block transition-all">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const PageHeader = ({ title, subtitle, onSearch }) => (
  <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <p className="text-slate-500">{subtitle}</p>
    </div>
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="pl-10 pr-4 py-2 w-full md:w-64 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
      />
    </div>
  </div>
);
