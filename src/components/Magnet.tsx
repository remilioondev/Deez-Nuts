import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number; // Divisor factor: higher means subtler movement (default ~2.5)
  padding?: number;  // Distance in px outside element where cursor triggers magnetic attraction (default ~40)
  className?: string;
  disabled?: boolean;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 2.5,
  padding = 40,
  className = '',
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Check if mouse is within element bounds + padding
      const isInside =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding;

      if (isInside) {
        setIsHovered(true);
        const deltaX = (e.clientX - centerX) / strength;
        const deltaY = (e.clientY - centerY) / strength;
        setPosition({ x: deltaX, y: deltaY });
      } else if (isHovered) {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [disabled, isHovered, padding, strength]);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.3s cubic-bezier(0, 0, 0.2, 1)'
          : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default Magnet;
