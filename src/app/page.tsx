"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import TechStack from '@/components/TechStack';

export default function HomePage() {
  const pathname = usePathname();

  useEffect(() => {
    // On route change, check for hash and smooth scroll
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [pathname]); // run effect whenever route changes

  return (
    <div className="text-foreground">
      <Navigation />
      <Hero />
      {/* Ensure About and Contact have matching ids for scrolling */}
      <About />
      <TechStack />
      <Projects />
      <Footer />
    </div>
  );
}
