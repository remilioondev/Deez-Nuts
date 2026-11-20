import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn.tsx';
import LiveProjectButton from './LiveProjectButton.tsx';

export interface ProjectData {
  number: string;
  name: string;
  category: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  description: string;
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    name: 'The Pump.fun Takeover',
    category: 'Solana',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
    description:
      'Conquering the bonding curve within minutes. Over 10,000 degens flooded the live stream to witness the oldest AI influencer break the meme ecosystem.',
  },
  {
    number: '02',
    name: 'Raydium Migration & LP Burn',
    category: 'Liquidity',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
    description:
      'Graduated from pump.fun straight into Raydium with 100% liquidity pool locked and burned forever. Pure decentralized diamond hands holding the floor.',
  },
  {
    number: '03',
    name: 'Metaverse Chin Syndicate',
    category: 'WebGL Lore',
    col1Img1:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1Img2:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2Img:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
    description:
      'Proprietary interactive living avatar engine bringing the world’s most elastic AI influencer straight to browser viewports across the decentralized web.',
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  totalCards: number;
  onSelectProject: (project: ProjectData) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale calculation: targetScale = 1 - (totalCards - 1 - index) * 0.03
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="h-[85vh] min-h-[580px] flex items-start justify-center sticky top-24 md:top-32"
      style={{
        top: `calc(6rem + ${index * 28}px)`,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        {/* Top row: Number, category label, project name, Live Project button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D7E2EA]/15">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            {/* Huge Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none tracking-tight select-none"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {project.number}
            </span>

            <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-medium">
              [{project.category}]
            </span>

            <h3
              className="text-[#D7E2EA] font-medium uppercase tracking-wide leading-tight"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.8rem)' }}
            >
              {project.name}
            </h3>
          </div>

          <div className="shrink-0 self-end sm:self-center">
            <LiveProjectButton onClick={() => onSelectProject(project)} />
          </div>
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* Left Column (40% width): 2 stacked images */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
            <div
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] cursor-pointer group relative"
              onClick={() => onSelectProject(project)}
            >
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-500 group-hover:scale-105"
                style={{ height: 'clamp(130px, 16vw, 230px)' }}
              />
            </div>

            <div
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] cursor-pointer group relative"
              onClick={() => onSelectProject(project)}
            >
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-500 group-hover:scale-105"
                style={{ height: 'clamp(160px, 22vw, 340px)' }}
              />
            </div>
          </div>

          {/* Right Column (60% width): 1 tall image */}
          <div
            className="md:col-span-7 rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden bg-[#161616] cursor-pointer group relative flex"
            onClick={() => onSelectProject(project)}
          >
            <img
              src={project.col2Img}
              alt={`${project.name} main showcase`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full min-h-[300px] object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectData) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  return (
    <section
      id="projects"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 pb-28"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading: "Raids" */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-16 sm:mb-20 md:mb-28">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Raids
          </h2>
        </FadeIn>

        {/* 3 sticky-stacking project cards */}
        <div className="relative flex flex-col gap-8 pb-12">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={PROJECTS.length}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
