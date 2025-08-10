"use client";
import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const lenis = new Lenis({
      duration: isTouchDevice ? 0.6 : 1.05,
      easing: (t) => 1 - Math.pow(2, -10 * t),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      syncTouch: false, // turn OFF for momentum feel
      touchMultiplier: 2.2, // much stronger fling
      autoRaf: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
};
