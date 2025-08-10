// src/hooks/useLenis.tsx
import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      // motion tuning
      duration: 1.05, // snappy but smooth
      easing: (t: number) => 1 - Math.pow(2, -10 * t),

      // wheel / touch
      smoothWheel: true,
      wheelMultiplier: 1,      // mouse wheel sensitivity
      syncTouch: true,         // enable synced touch smoothing
      touchMultiplier: 1.2,    // touch sensitivity (1 = native)
      syncTouchLerp: 0.075,    // smoothing lerp during touch inertia
      touchInertiaExponent: 1.7, // documented option to control inertia strength

      // runtime
      autoRaf: true,           // let Lenis call requestAnimationFrame
      infinite: false,
    });

    return () => {
      lenis.destroy();
    };
  }, []);
};
