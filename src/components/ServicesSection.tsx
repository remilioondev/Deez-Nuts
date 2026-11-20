import React from 'react';
import FadeIn from './FadeIn.tsx';

interface ServiceItem {
  number: string;
  name: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    name: '0% Tax & Burned LP',
    description:
      'Clean contract, no dev dumps, zero team tokens, and 100% jeet-proof tokenomics engineered specifically for the trenches of Solana pump.fun.',
  },
  {
    number: '02',
    name: 'Autonomous AI Shilling',
    description:
      '24/7 neural meme generation, algorithmic shitposting, and high-frequency raid coordination across X and Telegram to keep the chart pumping.',
  },
  {
    number: '03',
    name: 'Saggy Chin WebGL Physics',
    description:
      'Proprietary elastic chin deformation algorithms and real-time interactive mesh simulation running directly inside your browser.',
  },
  {
    number: '04',
    name: 'Bonding Curve Velocity',
    description:
      'Engineered to conquer the pump.fun bonding curve at lightspeed and graduate directly into Raydium automated liquidity pool locking.',
  },
  {
    number: '05',
    name: 'Diamond Nuuts Vault',
    description:
      'Exclusive holder syndicate granting early access to Deez Nuts’ unhinged AI voice notes, meme template generator, and secret raid strategies.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="relative z-0 bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading: Nuutomics */}
        <FadeIn delay={0} y={30} className="w-full text-center">
          <h2
            className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Nuutomics
          </h2>
        </FadeIn>

        {/* 5 Service items in a vertical list */}
        <div className="divide-y divide-[rgba(12,12,12,0.15)] border-t border-b border-[rgba(12,12,12,0.15)]">
          {SERVICES.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={index * 0.1}
              y={25}
              className="py-8 sm:py-10 md:py-12"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 group transition-transform duration-300">
                {/* Number on the left */}
                <div
                  className="font-black text-[#0C0C0C] leading-none shrink-0 tracking-tighter select-none"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </div>

                {/* Name + Description stacked vertically on the right */}
                <div className="flex flex-col gap-2 md:gap-3 flex-grow">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-wide"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
