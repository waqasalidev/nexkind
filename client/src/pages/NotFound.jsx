import { Link } from 'react-router-dom';
import { Home, AlertTriangle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in-up">
        <div className="relative w-40 h-40 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-dashed border-slate-300 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <AlertTriangle className="text-yellow-500 w-20 h-20 relative z-10" />
          <div className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">404</div>
        </div>

        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Page Not Found</h1>
          <p className="text-slate-500 text-lg">
            Oops! The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary"
          >
            <Home size={18} />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
