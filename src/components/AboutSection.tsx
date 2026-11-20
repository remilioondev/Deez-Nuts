import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Loader2, RotateCcw, Copy, Check } from 'lucide-react';
import FadeIn from './FadeIn.tsx';
import AnimatedText from './AnimatedText.tsx';
import ContactButton from './ContactButton.tsx';
import { CA_ADDRESS } from '../constants/token.ts';

interface AboutSectionProps {
  onOpenContact?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalDuration, setTotalDuration] = useState('2:15');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCopyCA = () => {
    navigator.clipboard.writeText(CA_ADDRESS);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTime = (t: number) => {
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startPlayback = (vid: HTMLVideoElement) => {
    setHasError(false);
    setIsBuffering(true);
    vid
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsBuffering(false);
      })
      .catch(() => {
        vid.muted = true;
        setIsMuted(true);
        vid
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false);
          })
          .catch(() => {
            setIsBuffering(false);
          });
      });
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (hasError) {
      handleRetry();
      return;
    }
    if (!vid.paused) {
      vid.pause();
      setIsPlaying(false);
      setIsBuffering(false);
    } else {
      startPlayback(vid);
    }
  };

  const handleRetry = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setHasError(false);
    setIsBuffering(true);
    vid.load();
    startPlayback(vid);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    if (videoRef.current.duration && Number.isFinite(videoRef.current.duration)) {
      setTotalDuration(formatTime(videoRef.current.duration));
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((curr / dur) * 100);
    setCurrentTime(formatTime(curr));
    if (videoRef.current.duration && Number.isFinite(videoRef.current.duration)) {
      setTotalDuration(formatTime(videoRef.current.duration));
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

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* 4 Decorative 3D Corner Images */}
      {/* 1. Top-Left: Moon Icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10 select-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="3D Moon Element"
            referrerPolicy="no-referrer"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          />
        </FadeIn>
      </div>

      {/* 2. Bottom-Left: 3D Object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10 select-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Geometric Element"
            referrerPolicy="no-referrer"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          />
        </FadeIn>
      </div>

      {/* 3. Top-Right: Lego Icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10 select-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="3D Lego Element"
            referrerPolicy="no-referrer"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          />
        </FadeIn>
      </div>

      {/* 4. Bottom-Right: 3D Group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10 select-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Sculpture Group"
            referrerPolicy="no-referrer"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          />
        </FadeIn>
      </div>

      {/* Center Content Stack */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl mx-auto w-full">
        {/* Heading: "About Deez" */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About Deez
          </h2>
        </FadeIn>

        {/* Origin Video right under the title: ABSOLUTE NUTS.mp4 */}
        <FadeIn delay={0.15} y={30} className="mt-8 sm:mt-10 md:mt-12 w-full">
          <div className="relative w-full rounded-[28px] sm:rounded-[38px] border-2 border-[#D7E2EA]/20 bg-[#121212] p-2.5 sm:p-4 shadow-2xl overflow-hidden">
            <div className="relative w-full aspect-video bg-black rounded-[20px] sm:rounded-[28px] overflow-hidden group">
              <video
                ref={videoRef}
                src="/assets/aistudio/absolute_nuts_web.mp4"
                poster="/assets/aistudio/absolute_nuts_poster.jpg"
                playsInline
                preload="auto"
                muted={isMuted}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onWaiting={() => setIsBuffering(true)}
                onCanPlay={() => setIsBuffering(false)}
                onPlaying={() => {
                  setIsBuffering(false);
                  setIsPlaying(true);
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => {
                  setIsBuffering(false);
                  setIsPlaying(false);
                }}
                onEnded={() => {
                  setIsBuffering(false);
                  setIsPlaying(false);
                }}
                onError={() => {
                  setIsBuffering(false);
                  setIsPlaying(false);
                  setHasError(true);
                }}
                className="w-full h-full object-contain cursor-pointer bg-black"
                onClick={togglePlay}
              />

              {/* Buffering Spinner */}
              {isBuffering && !hasError && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 pointer-events-none">
                  <Loader2 className="w-10 h-10 text-[#BBCCD7] animate-spin" />
                </div>
              )}

              {/* Play / Retry Center Overlay */}
              <AnimatePresence>
                {(!isPlaying || hasError) && !isBuffering && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black/45 backdrop-blur-[2px] cursor-pointer"
                    onClick={togglePlay}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#646973] to-[#BBCCD7] text-[#0C0C0C] flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                      {hasError ? (
                        <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8" />
                      ) : (
                        <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current translate-x-0.5" />
                      )}
                    </div>
                    <span className="px-3.5 py-1 rounded-full bg-black/75 border border-white/15 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#D7E2EA]">
                      {hasError ? 'Tap to retry video' : 'Absolute Nuts · Origin Story'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Controls Bar */}
              <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 sm:p-5 flex flex-col gap-2">
                <div
                  className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full cursor-pointer relative overflow-hidden"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#646973] to-[#BBCCD7] rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[#D7E2EA] font-mono">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1 hover:text-white transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <span className="text-[11px] text-white/75 select-none">
                      {currentTime} / {totalDuration}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    aria-label="Full screen"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Gap between video & text */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full">
          {/* Animated paragraph */}
          <AnimatedText text="Born in 1942, digitized on Solana in 2026. Armed with unhinged AI alpha and the heaviest diamond nuuts in the entire pump.fun trenches. I don't care about your paper hands or your jeet panic — we are bonding-curve warriors riding straight to Valhalla. Lock in, touch grass later, and let's send $NUUTS to billions!" />
        </div>

        {/* Gap between text block and button */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex flex-col items-center gap-5">
          <FadeIn delay={0.2} y={20}>
            <ContactButton onClick={onOpenContact} label="Ape In $NUUTS" />
          </FadeIn>

          <FadeIn delay={0.25} y={16}>
            <button
              type="button"
              onClick={handleCopyCA}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-[#D7E2EA] transition-colors cursor-pointer max-w-full"
              title="Copy Contract Address"
            >
              <span className="text-[#BBCCD7] font-semibold uppercase tracking-wider shrink-0">CA:</span>
              <span className="truncate max-w-[210px] sm:max-w-none">{CA_ADDRESS}</span>
              {isCopied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#D7E2EA]/60 shrink-0" />
              )}
            </button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
