import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0C0C0C] text-[#D7E2EA] border-t border-white/10 px-6 md:px-12 py-12 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Title */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-xl font-bold uppercase tracking-wider text-white">
            Deez Nuts · $NUUTS
          </div>
          <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">
            The oldest AI influencer on Solana pump.fun · 100% jeet-proof
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-[#D7E2EA]/80">
          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            Pump.fun
          </a>
          <a
            href="https://dexscreener.com/solana"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            DexScreener
          </a>
          <a
            href="https://x.com/deeznuts___sol"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            X / Twitter
          </a>
          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors uppercase tracking-widest"
          >
            Buy $NUUTS
          </a>
        </div>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-[#D7E2EA]/70 hover:text-white transition-colors cursor-pointer p-2 rounded-full hover:bg-white/5"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#D7E2EA]/40 font-mono">
        <div>© {new Date().getFullYear()} Deez Nuts ($NUUTS). Powered by Solana.</div>
        <div>Living WebGL Soft-Body Mesh Engine</div>
      </div>
    </footer>
  );
};

export default Footer;
