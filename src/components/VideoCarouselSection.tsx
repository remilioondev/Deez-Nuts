import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Film,
  Sparkles,
} from 'lucide-react';
import FadeIn from './FadeIn.tsx';

export interface VideoItem {
  id: string;
  number: string;
  title: string;
  category: string;
  duration: string;
  videoUrl: string;
  description: string;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'video-1',
    number: '01',
    title: 'Locker Room Loadout',
    category: 'Tactical Raid',
    duration: '0:11',
    videoUrl: '/assets/aistudio/ltx_00043_d1cc06f0.mp4',
    description:
      'Deez Nuts strapping up in the trench locker room with dual mags, blade, and heavy artillery before raiding pump.fun.',
  },
  {
    id: 'video-2',
    number: '02',
    title: 'Trench Air Strike (GTA Edition)',
    category: 'Street Chaos',
    duration: '0:14',
    videoUrl: '/assets/aistudio/gta_1_web.mp4',
    description:
      'Dodging incoming projectiles in the drop-top while checking Solana charts — zero panic, pure degen composure.',
  },
  {
    id: 'video-3',
    number: '03',
    title: 'Knight Kitty & The Heavyweight',
    category: 'Trench Lore',
    duration: '0:08',
    videoUrl: '/assets/aistudio/vid_00011-audio_4a5f2a5e.mp4',
    description:
      'Even the bravest armored knight in the mist knows who carries the heaviest $NUUTS on the entire Solana battlefield.',
  },
  {
    id: 'video-4',
    number: '04',
    title: 'Tunnel Velocity 200MPH',
    category: 'Moon Mission',
    duration: '0:08',
    videoUrl: '/assets/aistudio/vid_00015-audio_06f0944f.mp4',
    description:
      'Full throttle through the tunnel chasing vertical green candles and PumpfunSwap graduation at lightspeed.',
  },
  {
    id: 'video-5',
    number: '05',
    title: 'Diamond Chin Invincibility',
    category: 'Jeet Proof',
    duration: '0:11',
    videoUrl: '/assets/aistudio/vid_00021-audio_a25b4a47.mp4',
    description:
      'Eating full-force rooftop haymakers straight to the chin without blinking. Unbreakable diamond hands, unbreakable chin.',
  },
];

export const VideoCarouselSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalDuration, setTotalDuration] = useState('0:00');
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = VIDEOS[currentIndex];

  // Reset video state when switching slides
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime('0:00');
    setTotalDuration(currentVideo.duration);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, [currentIndex, currentVideo.duration]);

  const playWithFallback = (vid: HTMLVideoElement) => {
    vid
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        vid.muted = true;
        setIsMuted(true);
        vid.play().then(() => setIsPlaying(true)).catch(() => {});
      });
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (!vid.paused) {
      vid.pause();
      setIsPlaying(false);
    } else {
      playWithFallback(vid);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((curr / dur) * 100);

    const format = (t: number) => {
      const mins = Math.floor(t / 60);
      const secs = Math.floor(t % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    setCurrentTime(format(curr));
    if (videoRef.current.duration) {
      setTotalDuration(format(videoRef.current.duration));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    videoRef.current.currentTime = newProgress * (videoRef.current.duration || 0);
    setProgress(newProgress * 100);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  const handleSelectVideo = (idx: number) => {
    setCurrentIndex(idx);
    setTimeout(() => {
      if (videoRef.current) {
        playWithFallback(videoRef.current);
      }
    }, 60);
  };

  return (
    <section
      id="videos"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-12 pt-20 pb-28 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#BBCCD7] font-medium mb-3">
            <Film className="w-4 h-4 text-emerald-400" />
            <span>Vault &amp; Transmissions</span>
          </div>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Videos
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#D7E2EA]/60 uppercase tracking-widest max-w-xl mx-auto font-light">
            Live pump.fun broadcasts, viral meme drops &amp; AI transmissions
          </p>
        </FadeIn>

        {/* ========================================================================= */}
        {/* MAIN FEATURED VIDEO PLAYER */}
        {/* ========================================================================= */}
        <div className="relative w-full rounded-[32px] sm:rounded-[44px] md:rounded-[52px] border-2 border-[#D7E2EA]/20 bg-[#121212] p-4 sm:p-6 md:p-8 shadow-2xl overflow-hidden mb-12">
          {/* Top Bar: Slide Index, Category & Quick Nav */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#D7E2EA]/15 flex-wrap">
            <div className="flex items-center gap-3 sm:gap-4">
              <span
                className="font-black text-[#D7E2EA] leading-none tracking-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
              >
                {currentVideo.number}
              </span>
              <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm font-medium">
                [{currentVideo.category}]
              </span>
              <h3
                className="text-[#D7E2EA] font-medium uppercase tracking-wide leading-tight hidden sm:block truncate max-w-md"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)' }}
              >
                {currentVideo.title}
              </h3>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Video Viewport */}
          <div className="relative w-full aspect-video sm:h-[420px] md:h-[500px] lg:h-[560px] bg-black rounded-[24px] sm:rounded-[36px] overflow-hidden mt-5 sm:mt-6 group">
            <video
              ref={videoRef}
              src={currentVideo.videoUrl}
              playsInline
              preload="metadata"
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain cursor-pointer"
              onClick={togglePlay}
            />

            {/* Play / Pause Big Center Button Overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px] cursor-pointer"
                  onClick={togglePlay}
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#646973] to-[#BBCCD7] text-[#0C0C0C] flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                    <Play className="w-9 h-9 sm:w-11 sm:h-11 fill-current translate-x-1" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 flex flex-col gap-2.5 transition-opacity duration-300">
              {/* Progress Slider Bar */}
              <div
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden group/bar"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-gradient-to-r from-[#646973] to-[#BBCCD7] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Lower Control Buttons */}
              <div className="flex items-center justify-between text-xs text-[#D7E2EA] font-mono">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-1.5 hover:text-white transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1.5 hover:text-white transition-colors cursor-pointer"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-[11px] text-white/70 select-none">
                    {currentTime} / {totalDuration !== '0:00' ? totalDuration : currentVideo.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-1.5 hover:text-white transition-colors cursor-pointer"
                    aria-label="Full screen"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Intel */}
          <div className="mt-5 sm:mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-2xl">
              <h4 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                {currentVideo.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#D7E2EA]/70 leading-relaxed font-light">
                {currentVideo.description}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[#D7E2EA]/50 uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-full self-start md:self-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Track {currentIndex + 1} of {VIDEOS.length}</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CAROUSEL THUMBNAILS STRIP */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest font-medium text-[#D7E2EA]/60">
            <span>Video Tracklist ({VIDEOS.length})</span>
            <span>Select to watch</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {VIDEOS.map((video, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(idx)}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border-2 transition-all p-2.5 flex flex-col gap-2.5 bg-[#141414] ${
                    isActive
                      ? 'border-[#BBCCD7] scale-[1.02] shadow-xl'
                      : 'border-white/10 hover:border-white/30 hover:scale-[1.01]'
                  }`}
                >
                  {/* Video Frame Preview Thumbnail */}
                  <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/80">
                    <video
                      src={`${video.videoUrl}#t=0.5`}
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Badge Overlay */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-[10px] font-mono uppercase text-white border border-white/10">
                      {video.number}
                    </div>

                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-[10px] font-mono text-white/80">
                      {video.duration}
                    </div>

                    {/* Play Icon Badge */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${isActive ? 'bg-black/25' : 'bg-black/20 group-hover:bg-black/40'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${isActive ? 'bg-[#BBCCD7] text-black scale-110' : 'bg-white/30 text-white group-hover:scale-110'}`}>
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="flex flex-col gap-0.5 px-1 pb-1">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium">
                      {video.category}
                    </span>
                    <h5 className="text-xs sm:text-sm font-medium uppercase tracking-tight text-[#D7E2EA] truncate group-hover:text-white transition-colors">
                      {video.title}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarouselSection;
