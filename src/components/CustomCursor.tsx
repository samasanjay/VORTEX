import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Check touch device or reduced motion
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hovered elements for data-cursor attribute
      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      if (target) {
        const cursorText = target.getAttribute('data-cursor') || 'VIEW';
        setLabel(cursorText);
        setIsActive(true);
        document.body.classList.add('cursor-active');
      } else {
        setIsActive(false);
        setLabel('');
        document.body.classList.remove('cursor-active');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.classList.remove('cursor-active');
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
      <div
        className="custom-cursor-ring"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      />
      {isActive && (
        <div
          className="custom-cursor-label"
          style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        >
          {label}
        </div>
      )}
    </>
  );
};
