// src/components/About.tsx
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import GradientTexture from './GradientTexture';

// Infinitely animated staggered roller text
const RollerText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('span.char');

    // Timeline: rolls up, rolls down, repeat forever
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { stagger: 0.04, duration: 0.55, ease: 'power3.inOut' }
    });
    tl.to(chars, { y: '-100%' }); // rolls up

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <span
      ref={ref}
      className="relative inline-block overflow-hidden select-none"
      aria-label={text}
      style={{ userSelect: 'none', lineHeight: 1, letterSpacing: '0.02em' }}
    >
      {/* Layout baseline */}
      <span className="invisible flex">
        {text.split('').map((char, i) => (
          <span
            key={`hidden-${i}`}
            className="char inline-block"
            style={{ transformOrigin: 'bottom center' }}
          >
            {char}
          </span>
        ))}
      </span>
      {/* Top copy */}
      <span className="absolute top-0 left-0 flex w-full">
        {text.split('').map((char, i) => (
          <span
            key={`top-${i}`}
            className="char inline-block"
            style={{ transformOrigin: 'bottom center' }}
          >
            {char}
          </span>
        ))}
      </span>
      {/* Bottom copy */}
      <span className="absolute top-full left-0 flex w-full">
        {text.split('').map((char, i) => (
          <span
            key={`bottom-${i}`}
            className="char inline-block"
            style={{ transformOrigin: 'top center' }}
          >
            {char}
          </span>
        ))}
      </span>
    </span>
  );
};

const RevealStagger = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, ease: 'easeOut', delay }}
    style={{ willChange: 'opacity,transform' }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-18%" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative w-full min-h-screen flex items-center py-32 md:py-44 bg-black/20 overflow-x-hidden"
      style={{
        borderBottom: "1.5px solid #e5e7eb",
      }}
    >
      <GradientTexture />

      <motion.div
        className="w-full flex flex-col md:flex-row justify-between items-center md:items-stretch gap-x-12 gap-y-20 px-6 sm:px-12 xl:px-32 max-w-[1920px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.05 }}
      >

        {/* LEFT: Big animated headlines */}
        <div
          className="flex flex-col gap-0 md:gap-2 justify-center items-start w-full md:w-1/2"
          style={{ minWidth: '320px', flexShrink: 0 }}
        >
          <h2 className="font-display text-[15vw] md:text-[8vw] xl:text-12xl uppercase tracking-tight leading-[0.87] text-white whitespace-nowrap pb-3">
            <RollerText text="MISSION" />
          </h2>
          <h2 className="font-display text-[15vw] md:text-[8vw] xl:text-12xl uppercase tracking-tight leading-[0.87] text-foreground whitespace-nowrap">
            <RollerText text="INTEL" />
          </h2>
        </div>

        {/* RIGHT: Editorial content */}
        <div className="flex flex-col items-start w-full md:w-[58%] pt-4 md:pt-6 max-w-2xl mx-auto md:mx-0">
          <RevealStagger>
            <p className="font-sans text-3xl md:text-5xl text-white font-semibold tracking-[-0.018em] leading-snug mb-10 md:mb-14">
              Engineer of reality. Strategist at the intersection of machines, medicine, and minds. I operate at the thresholds, where neural code meets aerospace alloy, where deep memory meets live intelligence.
            </p>
          </RevealStagger>
          <RevealStagger delay={0.08}>
            <h3 className="font-sans text-balance font-bold uppercase tracking-widest text-blue-500 mb-8 mt-4 text-2xl">
              OPERATONAL VALUES
            </h3>
          </RevealStagger>
          <ul className="space-y-4 md:space-y-5 text-lg md:text-2xl text-white-600 ml-4 list-disc">
            <RevealStagger delay={0.11}>
              <li>Memory before action. Intent before words.</li>
            </RevealStagger>
            <RevealStagger delay={0.14}>
              <li>Ruthless strategic execution under pressure.</li>
            </RevealStagger>
            <RevealStagger delay={0.17}>
              <li>Biological fidelity in machine thinking.</li>
            </RevealStagger>
            <RevealStagger delay={0.2}>
              <li>Multidomain fluency</li>
            </RevealStagger>
          </ul>
        </div>

      </motion.div>
    </section>
  );
}
