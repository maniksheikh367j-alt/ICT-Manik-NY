import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteContext';

export default function Footer() {
  const { config } = useSiteData();

  return (
    <footer id="contact" className="px-10 py-20 bg-black/80 text-[10px] text-zinc-600 flex flex-col items-center gap-12 uppercase tracking-[0.3em] font-bold border-t border-white/[0.03]">
      <div className="flex flex-wrap justify-center gap-12 border-b border-white/[0.03] pb-12 w-full max-w-4xl">
        <div className="flex flex-col items-center gap-4 group">
          <span className="text-zinc-700 group-hover:text-zinc-500 transition-colors">Telegram</span>
          <a href={`https://t.me/${config.telegram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-brand-accent lowercase font-mono text-[11px] hover:glow-green transition-all">{config.telegram}</a>
        </div>
        <div className="flex flex-col items-center gap-4 group">
          <span className="text-zinc-700 group-hover:text-zinc-500 transition-colors">WhatsApp</span>
          <a href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-brand-accent font-mono text-[11px] hover:glow-green transition-all">{config.whatsapp}</a>
        </div>
        {config.tiktok && (
          <div className="flex flex-col items-center gap-4 group">
            <span className="text-zinc-700 group-hover:text-zinc-500 transition-colors">TikTok</span>
            <a href={config.tiktok.includes('http') ? config.tiktok : `https://www.tiktok.com/${config.tiktok.startsWith('@') ? config.tiktok : '@' + config.tiktok}`} target="_blank" rel="noreferrer" className="text-brand-accent lowercase font-mono text-[11px] hover:glow-green transition-all">{config.tiktok}</a>
          </div>
        )}
        <div className="flex flex-col items-center gap-4 group">
          <span className="text-zinc-700 group-hover:text-zinc-500 transition-colors">Direct Email</span>
          <a href={`mailto:${config.email}`} className="text-brand-accent lowercase font-mono text-[11px] hover:glow-green transition-all">{config.email}</a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-sm overflow-hidden border border-white/[0.05] bg-zinc-950 flex items-center justify-center p-2 glow-green">
            {config.logoImage ? (
                <img src={config.logoImage} alt={config.logoName} className="w-full h-full object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-brand-accent font-black text-[10px]">
                    {config.logoInitials}
                </div>
            )}
          </div>
          <span className="tracking-[0.4em] opacity-40">© 2024 {config.logoName} _ ALL_SYSTEMS_OPERATIONAL</span>
        </div>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mt-8 md:mt-0 text-[9px] opacity-40 hover:opacity-100 transition-opacity">
          <Link to="/policies?type=privacy" className="hover:text-brand-accent transition-colors">Privacy_Protocol</Link>
          <Link to="/policies?type=terms" className="hover:text-brand-accent transition-colors">Terms_Compliance</Link>
          <Link to="/policies?type=refund" className="hover:text-brand-accent transition-colors">Refund_Policy</Link>
          <Link to="/policies?type=return" className="hover:text-brand-accent transition-colors">Return_Policy</Link>
          <Link to="/policies?type=public" className="hover:text-brand-accent transition-colors">Public_Policy</Link>
          <Link to="/policies?type=contact_policy" className="hover:text-brand-accent transition-colors">Contact_Protocol</Link>
          <Link to="/policies?type=contact_segment" className="hover:text-brand-accent transition-colors">Contact_Us</Link>
          <Link to="/login" className="hover:text-white transition-colors">Access_Terminal</Link>
        </div>
      </div>
      <div className="flex items-center gap-3 opacity-20">
        <div className="h-px w-8 bg-zinc-800" />
        <span className="text-[7px] tracking-[0.8em]">ICT_MANIK_PROTOCOL_V2</span>
        <div className="h-px w-8 bg-zinc-800" />
      </div>
    </footer>
  );
}
