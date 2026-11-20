import React, { useRef, useState, useEffect } from 'react';

const ROW1_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
];

const ROW2_IMAGES = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

// Tripled lists for seamless scroll coverage
const TRIPLED_ROW1 = [...ROW1_IMAGES, ...ROW1_IMAGES, ...ROW1_IMAGES];
const TRIPLED_ROW2 = [...ROW2_IMAGES, ...ROW2_IMAGES, ...ROW2_IMAGES];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const row1Translate = offset - 200;
  const row2Translate = -(offset - 200);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative select-none"
      aria-label="3D and Motion showcase reels"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: Moves RIGHT on scroll */}
        <div className="w-full overflow-hidden flex">
          <div
            className="flex gap-3 flex-nowrap"
            style={{
              transform: `translateX(${row1Translate}px)`,
              willChange: 'transform',
            }}
          >
            {TRIPLED_ROW1.map((src, i) => (
              <div
                key={`r1-${i}`}
                className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#161616] relative shrink-0 border border-white/5 shadow-lg"
              >
                <img
                  src={src}
                  alt={`Motion 3D Reel ${i + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl select-none pointer-events-none"
                  onError={(e) => {
                    // Fallback visual if third-party GIF is unavailable
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves LEFT on scroll */}
        <div className="w-full overflow-hidden flex">
          <div
            className="flex gap-3 flex-nowrap"
            style={{
              transform: `translateX(${row2Translate}px)`,
              willChange: 'transform',
            }}
          >
            {TRIPLED_ROW2.map((src, i) => (
              <div
                key={`r2-${i}`}
                className="w-[420px] h-[270px] min-w-[420px] rounded-2xl overflow-hidden bg-[#161616] relative shrink-0 border border-white/5 shadow-lg"
              >
                <img
                  src={src}
                  alt={`Motion 3D Reel ${i + 12}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl select-none pointer-events-none"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
