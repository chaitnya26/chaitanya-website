import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import VideoBackground from './VideoBackground';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse parallax positions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax transforms for text and glows
  const textParallaxX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const textParallaxY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const glowParallaxX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const glowParallaxY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-inner', {
        yPercent: 120,
        skewY: 7,
        duration: 1.8,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.8,
      });
      gsap.from(['.hero-subtitle', '.hero-cta-group'], {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 2.0,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const massiveTitle = [
    { text: 'ENGINEERING', class: 'gradient-text' },
    { text: 'INTELLIGENCE', class: 'text-foreground' },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      
      className="h-screen w-full flex justify-center items-center relative overflow-hidden px-4 sm:px-6 md:px-12"
    >
      <VideoBackground />
      

      {/* Foreground content */}
      <motion.div
        className="relative z-20 text-center flex flex-col items-center max-w-7xl mx-auto"
        style={{ x: textParallaxX, y: textParallaxY }}
      >
        <div>
          {massiveTitle.map((line) => (
            <div key={line.text} className="hero-line overflow-hidden">
              {/* Clamping font size for fluid scaling */}
              <span
                className={`hero-line-inner block font-black uppercase ${line.class}`}
                style={{
                  fontSize: `clamp(2.5rem, 11vw, 18rem)`, // fluid scale between 2.5rem and 7rem max, scaled by viewport width
                  lineHeight: 1,
                }}
              >
                {line.text}
              </span>
            </div>
          ))}
        </div>

        <p className="hero-subtitle mt-6 max-w-xl px-2 sm:px-4 text-base sm:text-xl text-muted-foreground font-body leading-relaxed">
          Designing reality-altering systems at the intersection of AI, Biotech, and Aerospace.
        </p>

        <div className="hero-cta-group mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none">
          <motion.div whileHover={{ scale: 1.05,}} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="w-full sm:w-auto px-6 py-5 text-base font-bold uppercase tracking-wider rounded-lg shadow-soft text-primary-foreground hover:shadow-glow hover:cursor-pointer transition-all duration-300"
              style={{ background: 'var(--gradient-primary)' }}
            >
              View Missions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <a href="/Chaitanya_Upadhyay_Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto block">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-6 py-5 text-base font-bold uppercase tracking-wider rounded-lg border-2 border-border bg-background/30 backdrop-blur-sm hover:bg-foreground hover:text-black hover:cursor-pointer hover:bg-white transition-colors"
              >
                Resume
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <a href="/contact" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto block">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto px-6 py-5 text-base font-bold uppercase tracking-wider rounded-lg border-2 border-border bg-background/30 backdrop-blur-sm hover:bg-foreground hover:text-black hover:cursor-pointer hover:bg-white transition-colors"
              >
                Contact me
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </motion.div>

    
    </section>
  );
};

export default Hero;
