import { useState, useRef, MouseEvent, ReactNode } from 'react';

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
  key?: string | number;
}

export default function ThreeDCard({ children, className = '', id, onClick }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Calculate rotation limits (max 8 degrees)
    const maxRotate = 8;
    const calculatedY = ((x - xc) / xc) * maxRotate;
    const calculatedX = ((yc - y) / yc) * maxRotate;

    setRotateY(calculatedY);
    setRotateX(calculatedX);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer select-none transition-shadow duration-300 ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.05s linear' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), shadow 0.4s ease',
        transformStyle: 'preserve-3d',
      }}
    >
      <div 
        style={{ transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)', transition: 'transform 0.4s ease' }}
        className="h-full w-full"
      >
        {children}
      </div>
    </div>
  );
}
