import React from 'react';
import Magnet from './Magnet.tsx';

interface ContactButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  withMagnet?: boolean;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  href,
  className = '',
  withMagnet = true,
  label = 'Buy $NUUTS',
}) => {
  const sharedClasses = `contact-btn contact-pill-btn rounded-full text-white font-medium uppercase tracking-widest cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base select-none inline-flex items-center justify-center no-underline ${className}`;

  const buttonContent = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={sharedClasses}
      aria-label={label}
    >
      {label}
    </a>
  ) : (
    <button
      type="button"
      onClick={onClick}
      className={sharedClasses}
      aria-label={label}
    >
      {label}
    </button>
  );

  if (withMagnet) {
    return <Magnet strength={3} padding={30}>{buttonContent}</Magnet>;
  }

  return buttonContent;
};

export default ContactButton;
