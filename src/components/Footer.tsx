import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';

export default function Footer() {
  const { config } = useSiteData();

  return (
    <footer id="contact" className="px-10 py-12 bg-black/40 text-[10px] text-zinc-600 flex flex-col items-center gap-8 uppercase tracking-[0.2em] font-bold mt-20 border-t border-white/5">
      <div className="flex flex-wrap justify-center gap-8 border-b border-white/5 pb-8 w-full max-w-4xl">
        <div className="flex flex-col items-center gap-2">
          <span className="text-zinc-400">Telegram</span>
          <a href={`https://t.me/${config.telegram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-brand-accent lowercase">{config.telegram}</a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-zinc-400">WhatsApp</span>
          <a href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-brand-accent">{config.whatsapp}</a>
        </div>
        {config.tiktok && (
          <div className="flex flex-col items-center gap-2">
            <span className="text-zinc-400">TikTok</span>
            <a href={config.tiktok.includes('http') ? config.tiktok : `https://www.tiktok.com/${config.tiktok.startsWith('@') ? config.tiktok : '@' + config.tiktok}`} target="_blank" rel="noreferrer" className="text-brand-accent lowercase">{config.tiktok}</a>
          </div>
        )}
        <div className="flex flex-col items-center gap-2">
          <span className="text-zinc-400">Direct Email</span>
          <a href={`mailto:${config.email}`} className="text-brand-accent lowercase">{config.email}</a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl pt-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-zinc-900">
            {config.logoImage ? (
                <img src={config.logoImage} alt={config.logoName} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-brand-accent text-brand-bg font-bold text-[8px]">
                    {config.logoInitials}
                </div>
            )}
          </div>
          <span>© 2024 {config.logoName} - All Rights Reserved</span>
        </div>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link to="/login" className="hover:text-white transition-colors">Admin Terminal</Link>
          <Link to="/policies?type=privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/policies?type=terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
      <span className="text-brand-accent text-[8px] animate-pulse">Designed for Success</span>
    </footer>
  );
}
