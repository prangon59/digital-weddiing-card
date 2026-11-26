import React, { useRef, useState, useCallback } from 'react';
import { prefersReducedMotion, isLowEndDevice } from '../utils/helpers';

/**
 * Lightweight 3D Tilt Card Component
 * Adds smooth 3D perspective rotation on touch/pointer move
 * Safe for mobile and low-end Android devices
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.015,
  onClick,
  ...rest
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const isReduced = prefersReducedMotion() || isLowEndDevice();

  const handlePointerMove = useCallback((e) => {
    if (isReduced) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
    const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

    if (clientX === undefined || clientY === undefined) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    );
  }, [maxTilt, scale, isReduced]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handlePointerMove}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerLeave}
      onClick={onClick}
      className={`transition-transform duration-200 ease-out transform-style-3d ${className}`}
      style={{
        transform: isReduced ? 'none' : transformStyle,
        willChange: isHovered ? 'transform' : 'auto',
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
