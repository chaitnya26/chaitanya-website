import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Professional project data structure
const projects = [
  {
    id: 'rag-ai',
    category: "AI & Machine Learning",
    title: "RAG-Driven Psychiatric AI Assistant",
    location: "Mumbai, India",
    period: "06/2025 – present",
    description: "Architected a privacy-first GenAI system integrating WHO ICD-11 standards with ChromaDB for semantic retrieval. Processed 16,000+ medical entities achieving 94% accuracy in diagnostic suggestions.",
    impact: "Reduced diagnostic time by 40% • Improved accuracy by 25%",
    tech: ["Python", "ChromaDB", "FastAPI", "Gradio", "Docker"],
    status: "In Production",
    links: {
      demo: "https://github.com/chaitnya26/icd-rag-agent",
      case_study: "mailto:changxao@protonmail.com"
    }
  },
  {
    id: 'ev-research',
    category: "Market Research",
    title: "India EV Market Analysis & Strategy",
    location: "Mumbai, India", 
    period: "04/2025 – 05/2025",
    description: "Comprehensive analysis of India's electric vehicle adoption trends and supply chain dynamics. Delivered strategic recommendations for Industry 4.0 implementation.",
    impact: "Identified 3 key market opportunities • Projected 18% cost reduction",
    tech: ["Python", "Tableau", "Advanced Analytics"],
    status: "Completed",
    links: {
      demo: "https://github.com/chaitnya26",
      case_study: "mailto:changxao@protonmail.com"
    }
  },
  {
    id: 'hvac-optimization',
    category: "Engineering Design",
    title: "HVAC System Optimization",
    location: "Mumbai, India",
    period: "12/2024 – 04/2025", 
    description: "Benchmarked 16.6–200 TR HVAC systems against ASHRAE standards. Developed IRR models and optimization algorithms for energy efficiency improvements.",
    impact: "18% energy cost reduction • $2.3M projected savings",
    tech: ["ANSYS", "Python", "Advanced Modeling"],
    status: "Completed",
    links: {
      demo: "https://github.com/chaitnya26",
      case_study: "mailto:changxao@protonmail.com"
    }
  },
  {
    id: 'aircraft-cfd',
    category: "Aerospace Engineering",
    title: "Blended Wing Body Aircraft Analysis",
    location: "Mumbai, India",
    period: "07/2024 – 11/2024",
    description: "CFD analysis comparing blended wing body vs conventional aircraft designs using SST k-ω turbulence modeling. Comprehensive feasibility assessment.",
    impact: "12% drag reduction identified • Grade: 93/100 (A+)",
    tech: ["MATLAB", "ANSYS Fluent", "SolidWorks"],
    status: "Completed",
    links: {
      demo: "https://github.com/chaitnya26/Innovative-Design-of-a-Business-Jet", 
      case_study: "mailto:changxao@protonmail.com"
    }
  },
  {
    id: 'uav-development',
    category: "Aerospace Engineering",
    title: "UAV Design & Optimization",
    location: "Mumbai, India",
    period: "12/2023 – 05/2024",
    description: "Led 10-member team in UAV development using CFD and XFOIL optimization. Achieved significant performance improvements through aerodynamic redesign.",
    impact: "11% weight reduction • 10% drag reduction • Team of 10",
    tech: ["MATLAB", "C++", "AutoCAD", "XFOIL"],
    status: "Completed",
    links: {
      demo: "https://github.com/chaitnya26",
      case_study: "mailto:changxao@protonmail.com"
    }
  }
];

// Professional hero section
const ProjectsHero = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });
  
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-blue-700 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Engineering Portfolio
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Project Portfolio
        </h1>
        
        <p className="text-md sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          A curated selection of engineering projects spanning AI/ML, aerospace, 
          and sustainable systems. Each project demonstrates technical excellence 
          and measurable business impact.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">4+</div>
            <div className="text-gray-600 text-sm sm:text-base">Projects</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">40%</div>
            <div className="text-gray-600 text-sm sm:text-base">Avg. Efficiency Gain</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">$100K+</div>
            <div className="text-gray-600 text-sm sm:text-base">Total Value Created</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};


// Professional project card
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-50px' });
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Production': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <motion.article
      ref={ref}
      className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-full mb-2 sm:mb-3 whitespace-nowrap">
            {project.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors ">
            {project.title}
          </h3>
          <div className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4 ">
            {project.location} • {project.period}
          </div>
        </div>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      
      {/* Description */}
      <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
        {project.description}
      </p>
      
      {/* Impact Metrics */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 sm:mb-8">
        <div className="text-xs sm:text-sm font-semibold text-blue-900 mb-1">
          Key Impact
        </div>
        <div className="text-blue-800 text-sm sm:text-base">
          {project.impact}
        </div>
      </div>
      
      {/* Technologies */}
      <div className="mb-6 sm:mb-8">
        <div className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">
          Technologies Used
        </div>
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-lg font-medium whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={project.links.demo}
          className="flex-1 bg-blue-600 text-white text-center py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
        </a>
        <a
          href={project.links.case_study}
          className="flex-1 border border-gray-300 text-gray-700 text-center py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          Case Study
        </a>
      </div>
    </motion.article>
  );
};


// Main component
export default function Projects() {
  return (
    <div className=" min-h-screen bg-gray-50">
      <ProjectsHero />
      
      <section id="projects" className="py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 px-2 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Featured Projects
            </h2>
            <p className="text-md sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each project represents a unique engineering challenge solved through 
              innovative thinking and rigorous technical execution.
            </p>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div 
            className="text-center mt-16 sm:mt-20 p-8 sm:p-12 bg-white border border-gray-200 rounded-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Interested in My Work?
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              I'm always open to discussing new opportunities, collaborations, 
              or answering questions about my engineering projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
              <a
                href="mailto:changxao@protonmail.com"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                Get In Touch
              </a>
              <a
                href="/Chaitanya_Upadhyay_Resume.pdf"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
