import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { ProjectData } from './ProjectsSection.tsx';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const images = [project.col2Img, project.col1Img1, project.col1Img2];

  const handleNext = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#111111] border-2 border-[#D7E2EA]/20 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 shadow-2xl text-[#D7E2EA] z-10 my-6 overflow-hidden flex flex-col gap-6"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-black text-2xl text-[#D7E2EA]">{project.number}</span>
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium">
                [{project.category}]
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                {project.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="text-[#D7E2EA]/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 cursor-pointer"
              aria-label="Close project showcase"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Visual Carousel */}
          <div className="relative w-full h-[320px] sm:h-[440px] md:h-[500px] bg-[#0C0C0C] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center border border-white/5">
            <img
              src={images[activeImageIdx]}
              alt={`${project.name} slide ${activeImageIdx + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain sm:object-cover"
            />

            {/* Prev / Next controls */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slide Indicator */}
            <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-xs font-mono border border-white/10">
              {activeImageIdx + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-24 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIdx === idx
                    ? 'border-[#BBCCD7] scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Details & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-white/10">
            <div className="md:col-span-2">
              <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium mb-1">
                Raid Debrief
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-[#D7E2EA]/90 font-light">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 font-medium mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Trench Tech &amp; Stack
              </h4>
              <div className="flex flex-wrap gap-1.5 text-xs text-[#D7E2EA]/80 font-mono">
                <span>pump.fun</span> · <span>Solana</span> · <span>Raydium</span> · <span>WebGL Mesh</span>
              </div>
              <a
                href="#contact"
                onClick={onClose}
                className="mt-2 text-xs uppercase tracking-wider text-white hover:text-[#BBCCD7] inline-flex items-center gap-1 transition-colors underline"
              >
                Join the Next Raid <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
