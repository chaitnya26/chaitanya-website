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


  

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen py-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 overflow-x-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
      onMouseMove={handleMouseMove}
    >
      
      {/* Main Content Wrapper */}
  <div className="relative z-10 max-w-[1080px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <header className="text-center max-w-lg mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
          >
            Let's Create
          </h1>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-300 mb-6"
          >
            Something <span className="italic text-blue-400">Beautiful</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed" >
            Ready to bring your vision to life? Let's discuss your next project and create something extraordinary together.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Contact Methods */}
          <div className="flex-1 space-y-8 "  aria-label="Contact methods">
            <div className="grid grid-cols-1 gap-6">
              {CONTACT_METHODS.map((method) => (
                <a
                  key={method.id}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10 hover:bg-black transition-all duration-200 active:bg-blue-900"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 group-hover:text-white transition-colors">
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0 max-w-full">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 truncate leading-tight">{method.label}</h3>
                      <p className="text-blue-300 font-medium text-base break-all truncate">{method.value}</p>
                      <p className="text-gray-400 text-sm mt-0.5">{method.description}</p>
                    </div>
                    <div
                      className="text-gray-400 group-hover:text-blue-400 transition-colors text-2xl select-none"
                    >
                      →
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Info */}
            <div className="p-6 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10" >
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={22} className="text-blue-400" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white select-none">Location</h3>
              </div>
              <p className="text-gray-300 text-base mb-3">Mumbai, Maharashtra, India</p>
              <div className="flex items-center gap-3">
                <Clock size={22} className="text-blue-400" aria-hidden="true" />
                <span className="text-gray-300 text-base">Available for worldwide projects</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1" >
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
                  className="group relative w-full py-4 px-8 bg-black rounded-2xl text-white font-semibold text-lg overflow-hidden hover:bg-white hover:text-black transition-all hover:cursor-pointer"
                  aria-label="Send message"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3 ">
                    <Send size={20} />
                    Send Message
                  </span>
                </motion.button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 pt-8 border-t border-white/10">
          <p className="text-gray-400 text-sm sm:text-base select-text">© 2025 Chaitanya</p>
        </footer>
      </div>
    </section>
  );
}
