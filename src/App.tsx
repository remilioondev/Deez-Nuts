/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import HeroSection from './components/HeroSection.tsx';
import AboutSection from './components/AboutSection.tsx';
import ServicesSection from './components/ServicesSection.tsx';
import VideoCarouselSection from './components/VideoCarouselSection.tsx';
import ContactModal from './components/ContactModal.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-[#0C0C0C] text-[#D7E2EA] font-['Kanit',sans-serif] selection:bg-[#BBCCD7] selection:text-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. HeroSection */}
      <HeroSection onOpenContact={handleOpenContact} />

      {/* 2. AboutSection */}
      <AboutSection onOpenContact={handleOpenContact} />

      {/* 4. ServicesSection */}
      <ServicesSection />

      {/* 5. VideoCarouselSection (Replaces Raids) */}
      <VideoCarouselSection />

      {/* Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive Contact & Degen Terminal Modal */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />
    </div>
  );
}
