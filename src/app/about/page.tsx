"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import dynamic from "next/dynamic";
const SmoothGR = dynamic(() => import("../../components/SmoothGR"), {
  ssr: false,
});

const AboutMe = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Optional: future GSAP animations could be added here
    // For now GSAP imports removed to avoid unused plugin warnings
  }, []);

  return (
    <div className="text-white min-h-screen  relative font-bold">
      {/* Background Shader */}
      
<SmoothGR/>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-8 py-24 text-center z-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <h1 className="flex flex-wrap justify-center text-5xl md:text-8xl font-extrabold leading-tight mb-8 drop-shadow-xl">
            <span className="m-2 bg-gradient-to-r from-pink-500 via-red-500 bg-clip-text text-transparent">
              About
            </span>
            <span className="m-2 bg-gradient-to-r from-blue-400 via-purple-500 bg-clip-text text-transparent">
              Me
            </span>
          </h1>

          <div className="space-y-6 text-lg md:text-xl text-gray-200 leading-relaxed font-bold">
            <p>
              I operate where intelligence meets embodiment, and execution meets inevitability.
              My work fuses AI architecture, systems engineering, and financial modeling into a
              singular force—built for those playing the long game at the highest level.
            </p>

            <p>
              I’ve designed mission-critical systems in Aerospace and HVAC. I have also built
              valuation frameworks. And now, I’m shaping the core architecture for AGI and
              autonomous systems—engineering AI pipelines with open-source LLMs and dynamic
              memory models.
            </p>

            <p>
              This isn’t about temporary gameplay. It’s about working on technologies and ventures
              that endure the test of time. I thrive where failure costs millions, time is finite,
              and precision is not optional. I bring the edge of a founder, the clarity of a
              systems engineer, and the discipline of a war general.
            </p>

            <p>
              Beyond the surface, I’m a lifelong martial artist (Jeet Kune Do), composer, and
              practitioner of Zen and Stoicism—treating every move as both art and strategy. If
              you're building something that demands intelligence, capital, and system-level clarity,
              I am already on the move.
            </p>

            <p>
              One can say I am not the jack, but master of all my trades. My mastery is not about
              the titles I earn or the number of achievements I own, but my relentless pursuit of
              perfection in everything I do. And yet, paradoxically, in my mind:
            </p>

            <div className="mt-6">
              <strong className="block text-2xl mb-2">no "I",</strong>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="sm:text-4xl md:text-4xl lg:text-4xl font-bold"
              >
                It just all happens, by itself.
              </motion.h2>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutMe;
