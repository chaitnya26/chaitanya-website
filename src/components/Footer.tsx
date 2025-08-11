"use client";
import { motion, useInView, easeOut, easeInOut } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Mail, Phone, MapPin, ArrowRight, Github, Linkedin, Twitter, Instagram,
  Send, ExternalLink, Star, Shield, Award, Users
} from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const [bubblePositions, setBubblePositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const positions = Array.from({ length: 20 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }));
      setBubblePositions(positions);
    }
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("subscribed");
    setTimeout(() => setNewsletterStatus(""), 3000);
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/chaitnya26", color: "hover:text-gray-900" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/chaitnya26", color: "hover:text-blue-600" },
    { name: "X/Twitter", icon: Twitter, href: "https://x.com/", color: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/sir_chaitnya", color: "hover:text-pink-500" }
  ];

  const footerSections = {
    services: {
      title: "Services",
      links: [
        { name: "Web Development", href: "/services/web-development" },
        { name: "Engineering Services", href: "/services/engineering" },
        { name: "Mobile Apps", href: "/services/mobile-apps" },
        { name: "Brand Strategy", href: "/services/branding" },
        { name: "Digital Marketing", href: "/services/marketing" },
        { name: "Consulting", href: "/services/consulting" }
      ]
    },
    portfolio: {
      title: "Portfolio",
      links: [
        { name: "Projects", href: "#projects" },
        { name: "Apps", href: "/portfolio/mobile" },
        { name: "Brand Identity", href: "/portfolio/branding" },
        { name: "Case Studies", href: "/portfolio/case-studies" },
        { name: "Client Stories", href: "/portfolio/testimonials" },
        { name: "Awards & Recognition", href: "/portfolio/awards" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Design Process", href: "/process" },
        { name: "Free Templates", href: "/resources/templates" },
        { name: "Design System", href: "/resources/design-system" },
        { name: "FAQ", href: "/faq" },
        { name: "Support Center", href: "/support" }
      ]
    },
    company: {
      title: "About",
      links: [
        { name: "About Me", href: "/about" },
        { name: "My Story", href: "/story" },
        { name: "Work With Me", href: "/collaborate" },
        { name: "Speaking", href: "/speaking" },
        { name: "Press Kit", href: "/press" },
        { name: "Contact", href: "/contact" }
      ]
    },
    legal: {
      title: "Legal & Compliance",
      links: [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },
        { name: "Cookie Policy", href: "/cookie-policy" },
        { name: "GDPR Compliance", href: "/gdpr" },
        { name: "Accessibility Statement", href: "/accessibility" },
        { name: "Disclaimer", href: "/disclaimer" },
        { name: "Refund Policy", href: "/refund-policy" },
        { name: "Data Protection", href: "/data-protection" },
        { name: "Licensing", href: "/licensing" }
      ]
    }
  };

  const testimonials = [
    {
      text: "Exceptional work and attention to detail. Delivered beyond expectations.",
      author: "Ronik Jain",
      company: "Director, Artoraa",
      rating: 5
    },
    {
      text: "Professional, timely, and innovative. Will definitely work together again.",
      author: "Michael Chen",
      company: "Design Director",
      rating: 5
    }
  ];



  

  return (
    <footer
      ref={ref}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubblePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: pos.x,
              y: pos.y
            }}
            animate={{
              y: [pos.y, pos.y - 100],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
        
      >
        <div  className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 py-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <div
            className="max-w-md mx-auto mb-12"
        
          >
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:scale-105 transition-transform"
                  aria-label="Subscribe to newsletter"
                >
                  <Send size={20} />
                </button>
              </div>
              {newsletterStatus === "subscribed" && (
                <motion.p
                  className="text-green-400 text-sm mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Successfully subscribed! Welcome to the community.
                </motion.p>
              )}
            </form>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-gray-400 mb-16">
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Classified</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} />
              <span>Classified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} />
              <span>Classified</span>
            </div>
          </div>
        </div>

        <motion.div
         
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16"
        >
          <div className="lg:col-span-2">
            <div
              
              className="font-display text-2xl font-bold bg-gradient-to-r text-white mb-6"
            >
              Chaitanya
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Passionate engineer. <br />
              Specializing in AI/ML, aerospace innovation, and sustainable technology solutions.
            </p>
            <div className="space-y-3 mb-8">
              <a href="mailto:changxao@protonmail.com" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
                <Mail size={16} />
                <span>changxao@protonmail.com</span>
              </a>
              <a href="tel:+919819915102" className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors">
                <Phone size={16} />
                <span>+91-9819915102</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={16} />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield size={16} />
                <span>Available Worldwide</span>
              </div>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-black border border-white/20 rounded-xl backdrop-blur-lg hover:bg-white active:bg-white transition-all ${social.color}`}
                  aria-label={`Visit ${social.name}`}
                >
                  <social.icon  />
                </motion.a>
              ))}
            </div>
          </div>

          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} >
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-600 hover:bg-gray-300 rounded-2xl px-2 py-2 transition-colors text-sm group flex items-center gap-2"
                    >
                      {link.name}
                      <ExternalLink
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div  className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Clients Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          
          className="text-center mb-16 p-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-3xl backdrop-blur-lg"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can bring your vision to life with innovative technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl font-semibold hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
              <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 rounded-2xl font-semibold hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
         
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-center md:text-left">
            <p className="text-gray-400">© 2025 Chaitanya. All rights reserved.</p>
            <p className="text-sm text-gray-500 mt-1">
              Crafted with precision, powered by innovation, secured by compliance.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/privacy-policy" className="text-gray-400 hover:text-blue-400 transition-colors">
              Privacy
            </a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-blue-400 transition-colors">
              Terms
            </a>
            <a href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors">
              Cookies
            </a>
            <a href="/accessibility" className="text-gray-400 hover:text-blue-400 transition-colors">
              Accessibility
            </a>
            <a href="/sitemap" className="text-gray-400 hover:text-blue-400 transition-colors">
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
