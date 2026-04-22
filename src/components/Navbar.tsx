import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';

export default function Navbar({ activeSection, onNavigate }: { activeSection: string, onNavigate: (s: string) => void }) {
  const { config } = useSiteData();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-4">
          {config.logoImage ? (
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-accent flex items-center justify-center bg-zinc-900">
              <img src={config.logoImage} alt={config.logoName} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-brand-accent font-bold text-white">
              {config.logoInitials}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold tracking-tight">{config.logoName}</h1>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{config.tagline}</p>
          </div>
        </Link>
      </div>

      <div className="hidden lg:flex gap-8 text-sm font-medium text-zinc-400">
        {[
          { id: 'home', label: 'Home' },
          { id: 'posts', label: 'Updates' },
          { id: 'journal', label: 'PNL' },
          { id: 'story', label: 'Story' },
          { id: 'store', label: 'Resources' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "transition-colors hover:text-white",
              activeSection === item.id ? "text-white" : ""
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
          Sign In
        </Link>
        <button onClick={() => onNavigate('store')} className="btn-outline hidden sm:block">
          Courses
        </button>
      </div>
    </nav>
  );
}
