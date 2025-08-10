import { motion, useInView, useMotionValue, useSpring, Variants, AnimationGeneratorType } from "framer-motion";
import { useRef, useState, useEffect, ChangeEvent, MouseEvent } from "react";
import {
  Send,
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  Clock,
  BrainCircuitIcon,
} from "lucide-react";

interface ContactMethod {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  description: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    id: "email",
    icon: <Mail size={24} />,
    label: "Email",
    value: "changxao@protonmail.com",
    href: "mailto:changxao@protonmail.com",
    description: "For project inquiries",
  },
  {
    id: "phone",
    icon: <Phone size={24} />,
    label: "Phone",
    value: "+91-9819915102",
    href: "tel:+919819915102",
    description: "Available 3:30 AM to 11:30 AM UTC",
  },
  {
    id: "github",
    icon: <Github size={24} />,
    label: "GitHub",
    value: "github.com/chaitnya26",
    href: "https://github.com/chaitnya26",
    description: "View my code",
  },
  {
    id: "linkedin",
    icon: <Linkedin size={24} />,
    label: "LinkedIn",
    value: "linkedin.com/in/chaitnya26",
    href: "https://linkedin.com/in/chaitnya26",
    description: "Professional network",
  },
  {
    id: "huggingface",
    icon: <BrainCircuitIcon size={24} />,
    label: "Huggingface",
    value: "https://huggingface.co/chaitnya26",
    href: "https://huggingface.co/chaitnya26",
    description: "Huggingface",
  },
];

interface FloatingLabelProps {
  children: React.ReactNode;
  focused: boolean;
  hasValue: boolean;
  className?: string;
}

const FloatingLabel: React.FC<FloatingLabelProps> = ({ children, focused, hasValue, className = "" }) => {
  return (
    <motion.label
      className={`absolute left-4 text-gray-400 pointer-events-none transition-all duration-300 ${className}`}
      animate={{
        y: focused || hasValue ? -32 : 0,
        scale: focused || hasValue ? 0.85 : 1,
        color: focused ? "#3b82f6" : "#9ca3af",
      }}
      transition={{ type: "spring" as AnimationGeneratorType, stiffness: 300, damping: 25 }}
    >
      {children}
    </motion.label>
  );
};

interface ContactInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
}

const ContactInput: React.FC<ContactInputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  multiline = false,
  rows = 4,
}) => {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(value.length > 0);
  }, [value]);

  const inputClasses = `
    w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl
    text-white placeholder-transparent focus:outline-none focus:border-blue-400/50
    backdrop-blur-sm transition-all duration-300
    hover:bg-white/8 focus:bg-white/8
    ${focused ? "ring-1 ring-blue-400/30" : ""}
  `;

  return (
    <div className="relative">
      <FloatingLabel focused={focused} hasValue={hasValue}>
        {placeholder}
      </FloatingLabel>
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const y = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.1);
      mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.1);
    }
  };

  const handleInputChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Fix for Variants type: use correct AnimationGeneratorType for "type" property
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2,
        type: "tween", // change from generic string to valid AnimationGeneratorType
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 overflow-x-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Background Circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 opacity-5"
        style={{ x, y }}
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 opacity-5"
        style={{
          x: useSpring(mouseX.get() * -0.5),
          y: useSpring(mouseY.get() * -0.5),
        }}
        animate={{ rotate: -360, scale: [1, 0.9, 1.2, 1] }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="w-full h-full bg-gradient-to-tl from-purple-400/20 to-pink-400/20 rounded-full blur-xl" />
      </motion.div>

      {/* Main Content Wrapper */}
      <motion.div
        className="relative z-10 max-w-[1080px] mx-auto flex flex-col gap-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.header variants={itemVariants} className="text-center max-w-lg mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Let's Create
          </motion.h1>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-300 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Something <span className="italic text-blue-400">Beautiful</span>
          </motion.h2>
          <motion.p className="text-base sm:text-lg text-gray-400 leading-relaxed" variants={itemVariants}>
            Ready to bring your vision to life? Let's discuss your next project and create something extraordinary together.
          </motion.p>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Contact Methods */}
          <motion.div className="flex-1 space-y-8" variants={itemVariants} aria-label="Contact methods">
            <div className="grid grid-cols-1 gap-6">
              {CONTACT_METHODS.map((method) => (
                <motion.a
                  key={method.id}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-white/10 transition duration-500"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -4 }}
                  onHoverStart={() => setHoveredMethod(method.id)}
                  onHoverEnd={() => setHoveredMethod(null)}
                >
                  <div className="flex items-center gap-5">
                    <motion.div
                      className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 group-hover:text-white transition-colors"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {method.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0 max-w-full">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 truncate leading-tight">{method.label}</h3>
                      <p className="text-blue-300 font-medium text-base break-all truncate">{method.value}</p>
                      <p className="text-gray-400 text-sm mt-0.5">{method.description}</p>
                    </div>
                    <motion.div
                      className="text-gray-400 group-hover:text-blue-400 transition-colors text-2xl select-none"
                      animate={hoveredMethod === method.id ? { x: 6 } : { x: 0 }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div className="p-6 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10" variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={22} className="text-blue-400" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white select-none">Location</h3>
              </div>
              <p className="text-gray-300 text-base mb-3">Mumbai, Maharashtra, India</p>
              <div className="flex items-center gap-3">
                <Clock size={22} className="text-blue-400" aria-hidden="true" />
                <span className="text-gray-300 text-base">Available for worldwide projects</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="flex-1" variants={itemVariants}>
            <div className="p-8 sm:p-12 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-8">Send a Message</h3>

              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: Implement send message logic
                }}
                aria-label="Contact form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ContactInput placeholder="Your Name" value={formData.name} onChange={handleInputChange("name")} />
                  <ContactInput type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange("email")} />
                </div>

                <ContactInput placeholder="Subject" value={formData.subject} onChange={handleInputChange("subject")} />

                <ContactInput
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange("message")}
                  multiline
                  rows={5}
                />

                <motion.button
                  type="submit"
                  className="group relative w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Send message"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Send size={20} />
                    Send Message
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer className="text-center mt-20 pt-8 border-t border-white/10" variants={itemVariants}>
          <p className="text-gray-400 text-sm sm:text-base select-text">© 2025 Chaitanya</p>
        </motion.footer>
      </motion.div>
    </section>
  );
}
