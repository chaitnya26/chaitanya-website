"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import LavaLamp from "../../../components/LavaLamp";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Engineering = () => {
  const heroRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero section animation: stagger up fade for each word
    const heroWords = heroRef.current?.querySelectorAll(".hero-title .word");
    if (heroWords && heroWords.length > 0) {
      gsap.fromTo(
        heroWords,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: { amount: 0.8, from: "start" },
        }
      );
    }

    // Services section stagger fade-up animation
    const serviceItems = servicesRef.current?.querySelectorAll(".service-item");
    if (serviceItems && serviceItems.length > 0 && servicesRef.current) {
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 80%",
        end: "bottom 20%",
        animation: gsap.fromTo(
          serviceItems,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            stagger: { amount: 1.2, grid: [2, 3], from: "start" },
          }
        ),
        toggleActions: "play none none reverse",
      });
    }

    // Technology stack animation: rotateY and scale in with stagger
    const techItems = techRef.current?.querySelectorAll(".tech-item");
    if (techItems && techItems.length > 0 && techRef.current) {
      ScrollTrigger.create({
        trigger: techRef.current,
        start: "top 70%",
        animation: gsap.fromTo(
          techItems,
          { scale: 0.8, opacity: 0, rotationY: 90 },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: { amount: 1.5, from: "center" },
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

  // -- Data arrays unchanged --
  // (Collapsed here for clarity; use your same softwareCode, cfdCode, aiCode, biotechCode, services, technologies, processSteps)
  // You can keep your previous array literals.

  const softwareCode = `// AWS Lambda Function with TypeScript
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

// ... (rest of your code string as before)
};`;

  const cfdCode = `// ANSYS Fluent UDF for Custom Turbulence Model
#include "udf.h"
// ...
`;

  const aiCode = `# Advanced RAG System with LangChain and Vector DB
import asyncio
# ... 
`;

  const biotechCode = `# Bioinformatics Pipeline for Genomic Analysis
import pandas as pd
# ...
`;

  const services = [
    {
      title: "Software Engineering",
      description: "Cloud-native applications with AWS, Azure, GCP. Microservices, containers, serverless architectures, and DevOps automation for scalable, reliable systems.",
      icon: "💻",
      tech: ["AWS", "Kubernetes", "TypeScript", "Go"],
      code: softwareCode,
      metrics: ["99.9% Uptime", "50ms Response Time", "Auto-scaling"],
    },
    // ... (rest of the services array)
    {
      title: "Mechanical & Aerospace Engineering",
      description: "Advanced CFD simulations, aerodynamics analysis, structural optimization, and thermal management for aerospace and automotive applications.",
      icon: "🚁",
      tech: ["ANSYS", "MATLAB", "SolidWorks", "CFD"],
      code: cfdCode,
      metrics: ["±2% Accuracy", "10x Faster Simulation", "Multi-physics"],
    },
    {
      title: "Systems Engineering",
      description: "End-to-end system integration, requirements engineering, verification & validation, and risk management for complex multi-disciplinary projects.",
      icon: "⚙️",
      tech: ["DOORS", "SysML", "MBSE", "V&V"],
      code: `// Systems Engineering Requirements Traceability
class RequirementsManager {
  constructor() {
    this.requirements = new Map();
    this.traceabilityMatrix = new Map();
  }
// ...
}`,
      metrics: ["100% Traceability", "ISO 15288", "Risk Mitigation"],
    },
    {
      title: "AI/ML Engineering",
      description: "Cutting-edge transformer architectures, LLMs, RAG workflows, agentic AI systems, and AGI research for next-generation intelligent applications.",
      icon: "🤖",
      tech: ["PyTorch", "Transformers", "LangChain", "Vector DB"],
      code: aiCode,
      metrics: ["95% Accuracy", "Sub-second Inference", "Multi-modal"],
    },
    {
      title: "Biotech Research",
      description: "Computational biology, bioinformatics pipelines, genomic analysis, protein modeling, and drug discovery platforms for biotech innovation.",
      icon: "🧬",
      tech: ["BioPython", "R", "PyMOL", "BLAST"],
      code: biotechCode,
      metrics: ["99% Sequence Identity", "High Throughput", "FDA Compliant"],
    },
  ];

  const technologies = [
    { name: "AWS/Azure/GCP", level: 94, color: "#FF9900", category: "Cloud" },
    // ... (rest of tech array as before)
    { name: "Kubernetes", level: 91, color: "#326CE5", category: "DevOps" },
    { name: "Python/Go/TypeScript", level: 96, color: "#3776AB", category: "Languages" },
    { name: "ANSYS/MATLAB", level: 88, color: "#FF6B35", category: "Simulation" },
    { name: "TensorFlow/PyTorch", level: 92, color: "#FF6F00", category: "AI/ML" },
    { name: "Docker/CI/CD", level: 89, color: "#2496ED", category: "DevOps" },
    { name: "PostgreSQL/MongoDB", level: 87, color: "#336791", category: "Database" },
    { name: "Grafana/Prometheus", level: 85, color: "#F46800", category: "Monitoring" },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Discovery & Requirements",
      description: "Deep technical analysis, stakeholder interviews, and comprehensive requirements gathering to define project scope and success criteria.",
      duration: "2-3 weeks",
      deliverables: ["Technical Specification", "Architecture Diagram", "Risk Assessment"],
    },
    // ... (rest of your process steps unchanged)
    {
      step: 2,
      title: "System Design & Modeling",
      description: "Detailed system architecture, mathematical modeling, simulation setup, and prototype development with performance validation.",
      duration: "3-4 weeks",
      deliverables: ["System Architecture", "Mathematical Models", "Proof of Concept"],
    },
    {
      step: 3,
      title: "Implementation & Integration",
      description: "Agile development, continuous integration, rigorous testing, and seamless system integration with real-time monitoring.",
      duration: "4-8 weeks",
      deliverables: ["Production System", "Test Results", "Integration Documentation"],
    },
    {
      step: 4,
      title: "Validation & Deployment",
      description: "End-to-end validation, performance optimization, production deployment, and comprehensive training and support.",
      duration: "8-12 weeks",
      deliverables: ["Validated System", "Performance Metrics", "Training Materials"],
    },
  ];

  return (
    <div className="min-h-screen font-body bg-black/5 text-white">
      <div className="py-8">
        <Navigation />
      </div>
      <LavaLamp />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden text-center"
      >
        <div className="w-full">
          <div className="hero-title mb-6 sm:mb-8">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black leading-tight tracking-tight"
              style={{
                fontSize: `clamp(2.5rem, 11vw, 10rem)`,
                lineHeight: 1,
              }}
            >
              <div className="word">ENGINEERING</div>
              <div className="word">EXCELLENCE</div>
              <div className="word text-blue-600">DELIVERED</div>
            </h1>
          </div>

          <div className="mb-10 sm:mb-12">
            <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-white">
              Transforming complex engineering challenges into innovative solutions across{" "}
              <strong> Software engineering, Mechanical and Aerospace Systems, AI/ML engineering,</strong> and{" "}
              <strong>Biotech</strong> domains. Where precision meets innovation.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">4+</div>
              <div className="text-white font-medium text-sm sm:text-base">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">18%</div>
              <div className="text-white font-medium text-sm sm:text-base">IRR</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">$100K+</div>
              <div className="text-white font-medium text-sm sm:text-base">Cost savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-black text-blue-600">Multi-domain</div>
              <div className="text-white font-medium text-sm sm:text-base">Experience</div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-blue-600 rounded-full mt-2"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        ref={servicesRef}
        className="px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-blue-600">
              Engineering Services
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
              Comprehensive engineering solutions across multiple disciplines,
              delivering innovation and excellence at every scale.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-item bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 hover:border-blue-500 transition-shadow duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                  <div className="text-4xl sm:text-5xl select-none">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {service.tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium select-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-500 select-none">
                      {service.metrics.map((metric, idx) => (
                        <span key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 select-none text-xs sm:text-sm">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="ml-3 text-gray-400 font-mono lowercase">
                      {service.title.toLowerCase().replace(/[^a-z]/g, "")}.
                      {service.title.includes("AI")
                        ? "py"
                        : service.title.includes("Mechanical") || service.title.includes("CFD")
                        ? "c"
                        : "js"}
                    </span>
                  </div>
                  <SyntaxHighlighter
                    language={
                      service.title.includes("AI") || service.title.includes("Biotech")
                        ? "python"
                        : service.title.includes("CFD") || service.title.includes("Mechanical")
                        ? "c"
                        : "javascript"
                    }
                    style={vscDarkPlus}
                    customStyle={{
                      background: "transparent",
                      padding: "12px",
                      margin: 0,
                      fontSize: "12px",
                      maxHeight: "280px",
                      overflowX: "auto",
                      fontFamily: "'Fira Code', monospace",
                      whiteSpace: "pre",
                    }}
                    wrapLongLines
                    showLineNumbers
                    useInlineStyles={true}
                  >
                    {service.code.length > 1200
                      ? service.code.slice(0, 1200) + "\n\n// ... (truncated)"
                      : service.code}
                  </SyntaxHighlighter>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section
        ref={techRef}
        className="min-h-screen bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24 text-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-black">
              Technology Stack
            </h2>
            <p className="text-base sm:text-lg text-black max-w-4xl mx-auto">
              Industry-leading tools and technologies powering our engineering solutions
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="tech-item bg-white rounded-2xl p-5 sm:p-6 text-center hover:shadow-lg transition-transform duration-300 group select-none"
              >
                <div className="mb-3">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: tech.color }}
                  >
                    {tech.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-1">{tech.name}</h3>
                <div className="text-xs sm:text-sm text-gray-500 mb-3 font-medium">{tech.category}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: tech.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <span className="text-sm text-gray-600 font-medium">{tech.level}%</span>
              </div>
            ))}
          </div>
          {/* Performance Metrics */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg mt-12 sm:mt-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-green-500 mb-1 sm:mb-2">10x</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">
                  Faster Development
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  With automated CI/CD pipelines
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-blue-500 mb-1 sm:mb-2">95%</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">
                  Accuracy Rate
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  In simulation and modeling
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-black text-purple-500 mb-1 sm:mb-2">24/7</div>
                <div className="text-gray-600 font-medium text-sm sm:text-base">
                  System Monitoring
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                  With automated alerting
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section
        ref={processRef}
        className="px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24 bg-white text-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 text-black">
              My Engineering Process
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
              A systematic approach ensuring quality, reliability, and innovation at every stage
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="process-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 top-0 bottom-0 hidden md:block" style={{ height: 0 }} />
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-start mb-12 md:mb-16 relative ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`w-full md:w-1/2 px-0 md:px-8`}>
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-blue-500 transition-colors shadow-lg relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl mr-4 sm:mr-6">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold">{step.title}</h3>
                        <span className="text-blue-600 font-medium">{step.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6">{step.description}</p>
                    <div>
                      <h4 className="font-bold mb-2 text-gray-800">Key Deliverables:</h4>
                      <ul className="space-y-2 text-sm sm:text-base text-gray-600">
                        {step.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex w-12 h-12 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-white z-20 items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="min-h-screen bg-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-12 sm:mb-16 text-black">
            Why Choose Me for your Engineering Solutions?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl sm:text-5xl mb-4 select-none">🎯</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-blue-600">
                Precision & Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Rigorous engineering standards with mathematical precision and validated methodologies ensuring optimal performance.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl sm:text-5xl mb-4 select-none">🚀</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-blue-600">
                Innovation and Leadership
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Cutting-edge research and development with patents and publications in top-tier engineering journals.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl sm:text-5xl mb-4 select-none">🤝</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-blue-600">
                Collaborative Approach
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Transparent communication, regular reviews, and continuous stakeholder engagement throughout the project lifecycle.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl hover:cursor-pointer hover:shadow-glow transition-all">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-black">
              Engineering Certifications & Standards
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div>
                <div className="text-3xl font-black text-blue-600 mb-2 hover:text-black hover:scale-110 transition-all ">
                  ISO 9001
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Quality Management</div>
              </div>
              <div>
                <div className="text-3xl font-black text-green-600 mb-2  hover:text-black hover:scale-110 transition-all">
                  AWS
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Certified Solutions</div>
              </div>
              <div>
                <div className="text-3xl font-black text-purple-600 mb-2  hover:text-black hover:scale-110 transition-all">
                  IEEE
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Standards Compliance</div>
              </div>
              <div>
                <div className="text-3xl font-black text-red-600 mb-2  hover:text-black hover:scale-110 transition-all">
                  NIST
                </div>
                <div className="text-gray-600 text-sm sm:text-base">Security Framework</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Engineering;
