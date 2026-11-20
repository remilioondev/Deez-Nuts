import React from 'react';
import Magnet from './Magnet.tsx';

interface LiveProjectButtonProps {
  onClick?: () => void;
  className?: string;
  withMagnet?: boolean;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  className = '',
  withMagnet = true,
}) => {
  const buttonContent = (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer inline-flex items-center justify-center select-none ${className}`}
      aria-label="View Raid Intel"
    >
      Raid Intel
    </button>
  );

  if (withMagnet) {
    return <Magnet strength={3.5} padding={25}>{buttonContent}</Magnet>;
  }

  return buttonContent;
};

export default LiveProjectButton;
