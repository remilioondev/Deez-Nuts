import React from 'react';
import { motion } from 'framer-motion';
import ContactButton from './ContactButton.tsx';
import LivingPortrait from './LivingPortrait.tsx';

interface HeroSectionProps {
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[640px] flex flex-col justify-between overflow-x-clip select-none"
    >
      {/* 1. Navbar: 4 links evenly spaced with justify-between */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 z-30"
        aria-label="Main Navigation"
      >
        <a
          href="#about"
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
        >
          About
        </a>
        <a
          href="#services"
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
        >
          Nuutomics
        </a>
        <a
          href="#videos"
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
        >
          Videos
        </a>
        <a
          href="https://pump.fun"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
        >
          Buy $NUUTS
        </a>
      </motion.nav>

      {/* 2. Hero Heading: Massive h1 "Deez Nuts" */}
      <div className="w-full overflow-hidden flex justify-center z-0">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center mt-6 sm:mt-4 md:-mt-5 text-[15vw] sm:text-[16vw] md:text-[17vw] lg:text-[18vw]"
        >
          Deez Nuts
        </motion.h1>
      </div>

      {/* 3. The Living Portrait: Centered absolute */}
      <LivingPortrait />

      {/* 4. Bottom Bar: Flexbox justify-between items-end */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[170px] sm:max-w-[240px] md:max-w-[290px]"
          style={{ fontSize: 'clamp(0.75rem, 1.35vw, 1.4rem)' }}
        >
          the oldest ai influencer with more $nuuts than anyone on solana pump.fun. 100% jeet-proof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton href="https://pump.fun" label="Buy $NUUTS" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
