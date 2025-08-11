"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const WebDevelopment = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const techRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    const heroTl = gsap.timeline();

    heroTl.fromTo(
      ".hero-title .word",
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: {
          amount: 0.8,
          from: "start",
        },
      }
    );

    // Services section stagger animation
  

    // Tech stack animation
    ScrollTrigger.create({
      trigger: techRef.current,
      start: "top 70%",
      animation: gsap.fromTo(
        ".tech-item",
        {
          scale: 0.8,
          opacity: 0,
          rotationY: 90,
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: {
            amount: 1.5,
            from: "center",
          },
        }
      ),
    });

    // Process timeline animation
    ScrollTrigger.create({
      trigger: processRef.current,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      animation: gsap.fromTo(
        ".process-line",
        {
          height: "0%",
        },
        {
          height: "100%",
          ease: "none",
        }
      ),
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Sample code snippets (unchanged)
  const reactCode = `import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      className="app-container"
    >
      <h1>Modern Web Application</h1>
      <p>Built with React, optimized for performance.</p>
    </motion.div>
  );
};

export default App;`;

  const nodeCode = `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;

  const services = [
    {
      title: "Custom Web Applications",
      description:
        "Full-stack applications built with modern frameworks like React, Vue, and Angular, backed by robust APIs.",
      icon: "🚀",
      tech: ["React", "Node.js", "PostgreSQL"],
      code: reactCode,
    },
    {
      title: "E-Commerce Solutions",
      description:
        "Scalable online stores with payment integration, inventory management, and advanced analytics.",
      icon: "🛒",
      tech: ["Next.js", "Stripe", "MongoDB"],
      code: `// E-commerce checkout logic
const processPayment = async (orderData) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderData.total * 100,
      currency: 'usd',
      metadata: {
        orderId: orderData.id
      }
    });

    return { success: true, clientSecret: paymentIntent.client_secret };
  } catch (error) {
    return { success: false, error: error.message };
  }
};`,
    },
    {
      title: "Enterprise Web Platforms",
      description:
        "Complex business applications with role-based access, workflow automation, and enterprise integrations.",
      icon: "🏢",
      tech: ["TypeScript", "Docker", "AWS"],
      code: `// Enterprise authentication middleware
class AuthMiddleware {
  static authenticate = async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Access denied' });
    }
  };
}`,
    },
    {
      title: "Progressive Web Apps",
      description:
        "App-like experiences that work offline, send push notifications, and install on devices.",
      icon: "📱",
      tech: ["Service Workers", "WebAssembly", "IndexedDB"],
      code: `// Service Worker for offline functionality
self.addEventListener('fetch', event => {
  if (event.request.destination === 'document') {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
});`,
    },
    {
      title: "API Development",
      description:
        "RESTful and GraphQL APIs with comprehensive documentation, testing, and monitoring.",
      icon: "🔗",
      tech: ["GraphQL", "Redis", "Docker"],
      code: nodeCode,
    },
    {
      title: "Performance Optimization",
      description:
        "Speed optimization, Core Web Vitals improvement, and SEO enhancement for existing applications.",
      icon: "⚡",
      tech: ["Lighthouse", "Webpack", "CDN"],
      code: `// Performance optimization techniques
const optimizeImages = async (images) => {
  return Promise.all(
    images.map(async (img) => {
      const optimized = await sharp(img.buffer)
        .resize(800, 600, { 
          fit: 'cover',
          withoutEnlargement: true 
        })
        .webp({ quality: 80 })
        .toBuffer();

      return { ...img, buffer: optimized, format: 'webp' };
    })
  );
};`,
    },
  ];

  const technologies = [
    { name: "React", level: 95, color: "#61DAFB" },
    { name: "Node.js", level: 92, color: "#339933" },
    { name: "TypeScript", level: 88, color: "#3178C6" },
    { name: "Python", level: 85, color: "#3776AB" },
    { name: "PostgreSQL", level: 90, color: "#336791" },
    { name: "AWS", level: 87, color: "#FF9900" },
    { name: "Docker", level: 84, color: "#2496ED" },
    { name: "GraphQL", level: 86, color: "#E10098" },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Discovery & Planning",
      description:
        "I analyze your requirements, define technical specifications, and create a comprehensive project roadmap.",
      duration: "1-2 weeks",
      deliverables: ["Technical Requirements", "Architecture Design", "Project Timeline"],
    },
    {
      step: 2,
      title: "Design & Prototyping",
      description:
        "Create wireframes, UI designs, and interactive prototypes to visualize the final product.",
      duration: "2-3 weeks",
      deliverables: ["UI/UX Designs", "Interactive Prototypes", "Design System"],
    },
    {
      step: 3,
      title: "Development & Testing",
      description:
        "Agile development with continuous integration, automated testing, and regular client reviews.",
      duration: "4-8 weeks",
      deliverables: ["Core Application", "Test Suite", "Documentation"],
    },
    {
      step: 4,
      title: "Deployment & Support",
      description:
        "Production deployment, performance monitoring, and ongoing maintenance and support.",
      duration: "8-12 weeks",
      deliverables: ["Live Application", "Monitoring Setup", "Support Documentation"],
    },
  ];

 return (
  <> 
  <section className="bg-black text-white min-h-screen">
    <nav className="py-12">
      <Navigation />
    </nav>
    {/* Hero Section */}
    <section
      ref={heroRef}
      className="min-h-screen flex  justify-center items-start px-6 sm:px-8 md:px-16 lg:px-24 relative overflow-hidden"
    >
      
      <div className="w-full max-w-4xl">
        <div className="hero-title mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight" style={{
                  fontSize: `clamp(2.5rem, 11vw, 10rem)`, // fluid scale between 2.5rem and 7rem max, scaled by viewport width
                  lineHeight: 1,
                }}>
            <div className="word">I</div>
            <div className="word">BUILD.</div> <br />
            <div className="word">I</div>
            <div className="word">CODE.</div> <br />
            <div className="word">I</div>
            <div className="word text-blue-500">DELIVER.</div>
          </h1>
        </div>

        <div className="max-w-xl mb-12">
          <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-white">
            Professional web development services that transform your vision into powerful, scalable digital solutions. From concept to deployment, we craft exceptional web experiences.
          </p>
        </div>

        {/* Code Preview */}
        <div className=" max-w-full">
          <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-x-auto">
            <div className="flex items-center gap-1 mb-3 sm:mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-3 text-gray-400 text-xs sm:text-sm font-mono">App.jsx</span>
            </div>
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                background: "transparent",
                padding: 0,
                margin: 0,
                fontSize: "12px",
                fontFamily: "'Fira Code', monospace",
                whiteSpace: "pre",
              }}
              wrapLongLines
            >
              {reactCode.slice(0, 300) + "..."}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </motion.div>
      </div>
    </section>

    {/* Services Section */}
    <section
      ref={servicesRef}
      className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24"
    >
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">My Services</h2>
        <p className="text-base sm:text-lg text-white max-w-xl mx-auto">
          Comprehensive web development solutions tailored to your business needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-item bg-black rounded-2xl p-6 sm:p-8 hover:border-blue-500 transition-all duration-100 hover:shadow-xl hover:cursor-pointer"
          >
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{service.icon}</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{service.title}</h3>
            <p className="text-blue-300 mb-4 sm:mb-6 text-sm sm:text-base">{service.description}</p>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {service.tech.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  background: "transparent",
                  padding: 0,
                  margin: 0,
                  fontSize: "10px",
                  fontFamily: "'Fira Code', monospace",
                  whiteSpace: "pre",
                }}
                wrapLongLines
                showLineNumbers={false}
              >
                {service.code.slice(0, 200) + "..."}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Technology Stack Section */}
    <section
      ref={techRef}
      className="min-h-screen bg-black px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24"
    >
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">Technology Stack</h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
          Cutting-edge technologies and frameworks I use to build exceptional web applications
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="tech-item bg-black rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition-shadow"
          >
            <div className="mb-3 sm:mb-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold"
                style={{ backgroundColor: tech.color }}
              >
                {tech.name.charAt(0)}
              </div>
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">{tech.name}</h3>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="h-2 rounded-full"
                style={{
                  backgroundColor: tech.color,
                  width: `${tech.level}%`,
                }}
              ></div>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">{tech.level}% Proficiency</span>
          </div>
        ))}
      </div>

      {/* Code Examples */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 overflow-x-auto">
          <h4 className="text-white text-lg font-bold mb-4">Frontend Development</h4>
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{
              background: "transparent",
              padding: 0,
              margin: 0,
              fontSize: "12px",
              fontFamily: "'Fira Code', monospace",
              whiteSpace: "pre",
            }}
          >
            {reactCode}
          </SyntaxHighlighter>
        </div>

        <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 overflow-x-auto">
          <h4 className="text-white text-lg font-bold mb-4">Backend Development</h4>
          <SyntaxHighlighter
            language="javascript"
            style={vscDarkPlus}
            customStyle={{
              background: "transparent",
              padding: 0,
              margin: 0,
              fontSize: "12px",
              fontFamily: "'Fira Code', monospace",
              whiteSpace: "pre",
            }}
          >
            {nodeCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </section>

    {/* Process Section */}
    <section
      ref={processRef}
      className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-24"
    >
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">The Process</h2>
        <p className="text-base sm:text-lg text-blue-400 max-w-xl mx-auto">
          A proven methodology that ensures successful project delivery
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="process-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-600 top-0 bottom-0 hidden md:block"></div>

        {processSteps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-start md:items-center mb-12 md:mb-16 relative ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-full md:w-1/2 ${
                index % 2 === 0 ? "md:pr-8" : "md:pl-8"
              }`}
            >
              <div className="bg-black border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-blue-500 transition-colors relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg sm:text-xl mr-3 sm:mr-4">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">{step.title}</h3>
                    <span className="text-blue-600 font-medium">{step.duration}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 sm:mb-6">{step.description}</p>
                <div>
                  <h4 className="font-bold mb-2">Deliverables:</h4>
                  <ul className="list-disc list-inside text-gray-600 text-sm sm:text-base">
                    {step.deliverables.map((deliverable, idx) => (
                      <li key={idx}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Step circle for desktop, positioned absolutely */}
            <div className="hidden md:block w-8 h-8 bg-blue-600 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-white z-20"></div>
          </div>
        ))}
      </div>
    </section>

</section>
 
       
      <div className=" mx-auto ">
        <Footer />
      </div>
    </>
  
);
};
export default WebDevelopment;
