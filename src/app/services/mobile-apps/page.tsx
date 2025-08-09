"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";

import dynamic from "next/dynamic";
// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);
const SmoothGR = dynamic(() => import("../../../components/SmoothGR"), {
  ssr: false,
});

const MobileApps = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero title words
    const heroWords = heroRef.current?.querySelectorAll(".word");
    if (heroWords && heroWords.length > 0) {
      gsap.fromTo(
        heroWords,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          stagger: { amount: 0.8, from: "start" },
        }
      );
    }

    // Animate tech skills with scroll stagger
    const techSkills = techRef.current?.querySelectorAll(".tech-skill");
    if (techSkills && techSkills.length > 0 && techRef.current) {
      ScrollTrigger.create({
        trigger: techRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        animation: gsap.fromTo(
          techSkills,
          { y: 50, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: { amount: 1.2, from: "start" },
          }
        ),
      });
    }

    // Process timeline animation: height grow on scroll
    const processLine = processRef.current?.querySelector(".process-line");
    if (processLine && processRef.current) {
      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        animation: gsap.fromTo(
          processLine,
          { height: "0%" },
          { height: "100%", ease: "none" }
        ),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const codeSample = `// React Native Example: Simple Buttons
import React from 'react';
import { View, Button, Alert } from 'react-native';

export default function App() {
  return (
    <View style={{ padding: 50 }}>
      <Button title="Press Me" onPress={() => Alert.alert('Hello!')} />
    </View>
  );
}`;

  const technologies = [
    { name: "React Native", level: 94, color: "#61dafb" },
    { name: "Flutter", level: 89, color: "#02569B" },
    { name: "Swift", level: 90, color: "#FA7343" },
    { name: "Kotlin", level: 88, color: "#A97BFF" },
    { name: "Firebase", level: 93, color: "#FFCA28" },
    { name: "GraphQL", level: 86, color: "#E535AB" },
    { name: "Redux", level: 92, color: "#764ABC" },
    { name: "CI/CD", level: 85, color: "#F7DF1E" },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Discover & Ideation",
      description: "Deep user research, feature scoping, wireframing, storyboarding, and defining MVP goals.",
      duration: "1-2 weeks",
    },
    {
      step: 2,
      title: "Design & Prototyping",
      description: "UI/UX design, interactive prototypes, and app workflows optimized for user engagement.",
      duration: "2-3 weeks",
    },
    {
      step: 3,
      title: "Development & Testing",
      description: "Native & cross-platform coding, unit testing, QA, and iteration for bug fixing & optimization.",
      duration: "4-8 weeks",
    },
    {
      step: 4,
      title: "Launch & Support",
      description: "App store deployment, analytics setup, user onboarding, and ongoing support & updates.",
      duration: "Ongoing",
    },
  ];

  return (
    <div className="text-black min-h-screen font-body">
      <Navigation />
      <SmoothGR />
      {/* Hero Section */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/E.mp4" type="video/mp4" />
      </video>
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-8 py-16 text-center z-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl"
        >
          <h1 className="flex flex-wrap justify-center text-5xl md:text-8xl font-extrabold leading-tight mb-8 drop-shadow-xl">
            <span className="m-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent word">
              Mobile
            </span>
            <span className="m-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent word">
              App
            </span>
            <span className="m-2 bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent word">
              Development
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Build stunning, blazing-fast, and intuitive mobile applications for iOS and Android —
            cross-platform and native solutions meticulously crafted for your business success.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#services"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full font-bold text-lg shadow-lg"
            >
              Get Started
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#portfolio"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full font-bold text-lg hover:bg-white/20"
            >
              View Portfolio
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Service Overview */}
      <section className="px-8 md:px-20 py-20 border-t  mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6  text-white">Mobile App Expertise</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            From idea to deployment, I crafts apps that deliver exceptional user
            experiences, performance, and scalability. I leverage the latest frameworks and
            tools for maximum impact.
          </p>
        </div>
        {/* Tech Stack */}
        <div ref={techRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {technologies.map((tech, i) => (
            <motion.div
              key={i}
              className="tech-skill bg-white/10 rounded-2xl p-6 shadow hover:shadow-xl transition-transform text-white"
            >
              <div
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-xl font-bold mb-4"
                style={{ backgroundColor: tech.color }}
              >
                {tech.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{tech.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: tech.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${tech.level}%` }}
                  transition={{ duration: 1, delay: 0.2 * i }}
                />
              </div>
              <div className="text-center text-sm">{tech.level}% proficiency</div>
            </motion.div>
          ))}
        </div>
        {/* Code Sample */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-20 max-w-5xl mx-auto overflow-hidden shadow-lg">
          <h3 className="text-2xl font-bold text-white mb-4">Sample React Native Button</h3>
          <SyntaxHighlighter
            language="jsx"
            style={vscDarkPlus}
            customStyle={{ fontSize: "12px", padding: "16px", margin: 0 }}
          >
            {codeSample}
          </SyntaxHighlighter>
        </div>
      </section>

      {/* Process Line */}
      <section ref={processRef}></section>

      <section ref={processRef} className="px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24  text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-white">Mobile App Workflow</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
              A systematic approach ensuring quality, reliability, and innovation at every stage
            </p>
          </div>
          <div className="relative">
            {/* Vertical blue line hidden on small screens */}
            <div className="process-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 top-0 bottom-0 hidden md:block" style={{ height: 0 }} />
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-start mb-12 md:mb-16 relative ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`w-full md:w-1/2 px-0 md:px-8`}>
                  <div className="bg-white border-2 border-gray-200 rounded-2xl py-6 sm:p-8 hover:border-blue-500 transition-colors shadow-lg relative z-10 text-black">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16  text-white bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl mr-4 sm:mr-6">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold">{step.title}</h3>
                        <span className="font-medium text-black">{step.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6">{step.description}</p>
                    <div>
                      <h4 className="font-bold mb-2 text-gray-800">Key Deliverables:</h4>
                      {/* Add deliverables here if needed */}
                    </div>
                  </div>
                </div>
                {/* Step indicator circle visible on md+ */}
                <div className="hidden md:block w-8 h-8 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-white z-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MobileApps;
