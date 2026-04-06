'use client';
import { useEffect } from 'react';

export default function ScrollProgress() {
  useEffect(() => {
    const el = document.getElementById('scroll-progress')!; // not null asserted

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        el.style.width = '0%';
        return;
      }
      const progress = (scrollTop / docHeight) * 100;
      el.style.width = `${progress}%`;
    }

    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return null;
}
