import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Sparkles, Copy, Check, ExternalLink, Zap } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CA_ADDRESS = 'D1ckNuutS8x4k9PumpFunLegendaryTokenSoL2026';

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [handle, setHandle] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [inquiryType, setInquiryType] = useState('Whale Buy & Trench Raid');
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CA_ADDRESS);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim() || !contactInfo.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setHandle('');
    setContactInfo('');
    setMessage('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#111111] border-2 border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-[#D7E2EA] z-10 my-8 overflow-hidden"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 text-[#D7E2EA]/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                  Alpha Dispatched!
                </h3>
                <p className="text-[#D7E2EA]/70 text-sm max-w-xs leading-relaxed">
                  Loud and clear, {handle}. Deez Nuts and the trench syndicate received your transmission. Diamond hands only.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-full border border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 uppercase text-xs tracking-widest font-medium cursor-pointer transition-colors"
                >
                  Return to Trenches
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#BBCCD7] font-medium mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Degen Terminal · Solana
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight hero-heading">
                    Ape In $NUUTS
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D7E2EA]/60 mt-1">
                    The oldest AI influencer breaking pump.fun. Zero taxes, 100% jeet-proof.
                  </p>
                </div>

                {/* Contract Address Box with 1-Click Copy */}
                <div className="bg-[#181818] border border-white/10 rounded-2xl p-3 mb-5">
                  <div className="flex items-center justify-between text-xs text-[#D7E2EA]/60 uppercase tracking-widest font-medium mb-1.5">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" /> Contract Address (CA)
                    </span>
                    {isCopied && <span className="text-emerald-400 text-[10px] font-mono">Copied to clipboard!</span>}
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-[#0C0C0C] px-3 py-2 rounded-xl border border-white/5">
                    <span className="text-xs font-mono text-[#D7E2EA] truncate selection:bg-white selection:text-black">
                      {CA_ADDRESS}
                    </span>
                    <button
                      type="button"
                      onClick={copyToClipboard}
                      className="shrink-0 p-1.5 hover:bg-white/10 rounded-lg text-[#BBCCD7] hover:text-white transition-colors cursor-pointer"
                      title="Copy Contract Address"
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick Degen Links */}
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  <a
                    href="https://pump.fun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1c2228] hover:bg-[#25303a] text-xs uppercase tracking-wider font-medium text-emerald-400 border border-emerald-500/20 transition-all text-center"
                  >
                    Pump.fun <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://dexscreener.com/solana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1c2228] hover:bg-[#25303a] text-xs uppercase tracking-wider font-medium text-cyan-300 border border-cyan-500/20 transition-all text-center"
                  >
                    DexScreener <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Alpha Dispatch / Raid Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 border-t border-white/10 pt-4">
                  <div className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                    Transmit Raid Intel or Syndicate Collab
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#D7E2EA]/80 font-medium mb-1">
                        Your Degen Handle
                      </label>
                      <input
                        type="text"
                        required
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="@sol_whale"
                        className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#BBCCD7] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#D7E2EA]/80 font-medium mb-1">
                        Telegram / Email
                      </label>
                      <input
                        type="text"
                        required
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="t.me/yourtag or email"
                        className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#BBCCD7] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D7E2EA]/80 font-medium mb-1">
                      Transmission Purpose
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#D7E2EA] focus:outline-none focus:border-[#BBCCD7] transition-colors"
                    >
                      <option value="Whale Buy & Trench Raid">Whale Buy &amp; Trench Raid</option>
                      <option value="Meme Video & Art Submission">Meme Video &amp; Art Submission</option>
                      <option value="Influencer / KOL Collab">Influencer / KOL Collab</option>
                      <option value="Alpha Leak & Syndicate Access">Alpha Leak &amp; Syndicate Access</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#D7E2EA]/80 font-medium mb-1">
                      Brief Intel / Scope
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Drop your raid proposal, meme concept, or alpha..."
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#D7E2EA] placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#BBCCD7] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-pill-btn rounded-full text-white font-medium uppercase tracking-widest py-3 text-xs sm:text-sm cursor-pointer mt-1 flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Transmitting...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Transmit Alpha
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
