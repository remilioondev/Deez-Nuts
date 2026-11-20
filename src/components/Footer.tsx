import React, { useState } from 'react';
import { ArrowUp, Copy, Check } from 'lucide-react';
import { CA_ADDRESS, PUMP_FUN_URL, DEXSCREENER_URL, X_URL } from '../constants/token.ts';

interface FooterProps {
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const [isCopied, setIsCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyCA = () => {
    navigator.clipboard.writeText(CA_ADDRESS);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <footer className="relative bg-[#0C0C0C] text-[#D7E2EA] border-t border-white/10 px-6 md:px-12 py-12 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Title */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-xl font-bold uppercase tracking-wider text-white">
            Deez Nuts · $NUUTS
          </div>
          <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-light">
            The oldest AI influencer on Solana pump.fun · 100% jeet-proof
          </p>
          <button
            type="button"
            onClick={copyCA}
            className="mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-[#D7E2EA]/85 transition-colors cursor-pointer max-w-full"
            title="Copy Contract Address"
          >
            <span className="text-[#BBCCD7] font-semibold">CA:</span>
            <span className="truncate max-w-[200px] sm:max-w-none">{CA_ADDRESS}</span>
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-[#D7E2EA]/50 shrink-0" />
            )}
          </button>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-[#D7E2EA]/80">
          <a
            href={PUMP_FUN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            Pump.fun
          </a>
          <a
            href={DEXSCREENER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            DexScreener
          </a>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            X / Twitter
          </a>
          <a
            href={PUMP_FUN_URL}
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
