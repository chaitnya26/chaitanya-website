"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaSnapchatGhost,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

//----------------------------
// TYPES
//----------------------------

type AnchorNav = {
  name: string;
  href: string;
  type: "anchor";
};

type MegaNav = {
  name: string;
  key: keyof typeof footerSections;
  type: "mega";
};

type NavOrderItem = AnchorNav | MegaNav;

//----------------------------
// DATA
//----------------------------

const footerSections = {
  services: {
    title: "Services",
    links: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "Engineering Services", href: "/services/engineering" },
      { name: "Mobile Apps", href: "/services/mobile-apps" },
      { name: "Brand Strategy", href: "/services/branding" },
      { name: "Digital Marketing", href: "/services/marketing" },
      { name: "Consulting", href: "/services/consulting" },
    ],
  },
  portfolio: {
    title: "Portfolio",
    links: [
      { name: "Projects", href: "#projects" },
      { name: "Mobile Apps", href: "/portfolio/mobile" },
      { name: "Brand Identity", href: "/portfolio/branding" },
      { name: "Case Studies", href: "/portfolio/case-studies" },
      { name: "Client Stories", href: "/portfolio/testimonials" },
      { name: "Awards & Recognition", href: "/portfolio/awards" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "Design Process", href: "/process" },
      { name: "Free Templates", href: "/resources/templates" },
      { name: "Design System", href: "/resources/design-system" },
      { name: "FAQ", href: "/faq" },
      { name: "Support Center", href: "/support" },
    ],
  },
  company: {
    title: "About",
    links: [
      { name: "About Me", href: "/about" },
      { name: "My Story", href: "/story" },
      { name: "Work With Me", href: "/collaborate" },
      { name: "Speaking", href: "/speaking" },
      { name: "Press Kit", href: "/press" },
      { name: "Contact", href: "#contact" },
    ],
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
      { name: "Licensing", href: "/licensing" },
    ],
  },
};

const navOrder: NavOrderItem[] = [
  { name: "Home", href: "#home", type: "anchor" },
  ...Object.entries(footerSections).map(
    ([key, section]) =>
      ({
        name: section.title,
        key: key as keyof typeof footerSections,
        type: "mega",
      } as MegaNav)
  ),
  { name: "Contact", href: "#contact", type: "anchor" },
  { name: "Blog", href: "/blog", type: "anchor" },
];

const socials = [
  {
    href: "https://github.com/chaitnya26",
    icon: FaGithub,
    label: "GitHub",
    hoverClass: "hover:text-gray-600",
  },
  {
    href: "https://linkedin.com/in/chaitnya26",
    icon: FaLinkedin,
    label: "LinkedIn",
    hoverClass: "hover:text-[#0A66C2]",
  },
  {
    href: "https://instagram.com/sir_chaitnya",
    icon: FaInstagram,
    label: "Instagram",
    hoverClass: "hover:text-[#E1306C]",
  },
  {
    href: "https://snapchat.com/add/chaitnya26",
    icon: FaSnapchatGhost,
    label: "Snapchat",
    hoverClass: "hover:text-[#FFFC00]",
  },
];

//----------------------------
// HELPERS
//----------------------------

const smoothScroll = (href: string) => {
  if (!href.startsWith("#")) return;
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const Logo = ({ invert }: { invert: boolean }) => (
  <span
    className={`font-black select-none transition-colors duration-200 whitespace-nowrap ${
      invert
        ? "text-black"
        : "text-white hover:text-blue-500 hover:cursor-pointer"
    }`}
    style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)", letterSpacing: "-0.03em" }}
  >
    <a href="/#home">CHAITANYA</a>
  </span>
);

//----------------------------
// COMPONENTS
//----------------------------

function NavButton({
  label,
  isOpen,
  onClick,
  invert,
}: {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  invert: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      type="button"
      aria-expanded={isOpen}
      className={`relative flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-colors duration-150 min-h-[44px] ${
        invert
          ? "text-black hover:text-blue-600"
          : "text-white hover:text-black hover:cursor-pointer hover:bg-white"
      }`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <span>{label}</span>
      <motion.div
        aria-hidden="true"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
      >
        <FaChevronDown className="w-4 h-4" />
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.span
            layoutId="pill"
            className="absolute inset-0 rounded-full -z-10"
            style={{ background: "#267DFF" }}
            initial={{ opacity: 0, scale: 0.87 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.87 }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function DesktopMegaMenu({
  openKey,
  close,
}: {
  openKey: keyof typeof footerSections | null;
  close: () => void;
}) {
  const timeoutRef = useRef<number | null>(null);

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      close();
    }, 700);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const section =
    openKey !== null ? footerSections[openKey] : undefined;
  if (!section) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-x-0 top-20 z-40 w-full backdrop-blur-lg"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ type: "spring", stiffness: 45, damping: 10 }}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        role="region"
        aria-label={section.title + " submenu"}
      >
        <div className="relative px-8 bg-black/40">
          <div className="relative">
            <div className="mx-auto max-w-7xl px-5 md:px-10 py-10 md:py-14">
              <h3 className="text-3xl font-bold text-white mb-10">
                {section.title}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {section.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-lg font-semibold px-4 md:px-6 py-4 rounded-2xl text-white hover:bg-blue-100 hover:text-blue-600 transition-all duration-150"
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        close();
                        smoothScroll(link.href);
                      }
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function DesktopNav({
  openMega,
  setOpenMega,
  active,
  handleNavClick,
  invert,
}: {
  openMega: keyof typeof footerSections | null;
  setOpenMega: (key: keyof typeof footerSections | null) => void;
  active: string;
  handleNavClick: (href: string) => void;
  invert: boolean;
}) {
  return (
    <nav className="hidden lg:flex items-center gap-x-2">
      {navOrder.map((item) => {
        if (item.type === "mega") {
          return (
            <NavButton
              key={item.key}
              label={item.name}
              isOpen={openMega === item.key}
              onClick={() =>
                setOpenMega(openMega === item.key ? null : item.key)
              }
              invert={invert}
            />
          );
        } else {
          // Anchor type
          return (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (item.href.startsWith("#")) {
                  e.preventDefault();
                  handleNavClick(item.href);
                  smoothScroll(item.href);
                }
              }}
              className={`relative px-6 py-2 font-bold rounded-full flex items-center whitespace-nowrap transition-colors duration-150 ${
                invert
                  ? "text-black hover:text-blue-600"
                  : "text-white hover:text-black hover:bg-white "
              } ${
                active === item.href.replace("#", "").toLowerCase()
                  ? invert
                    ? "text-blue-600"
                    : "text-white"
                  : ""
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.93 }}
              aria-current={
                active === item.href.replace("#", "").toLowerCase()
                  ? "page"
                  : undefined
              }
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.8 }}
            >
              {item.name}
              <AnimatePresence>
                {active === item.href.replace("#", "").toLowerCase() && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "#267DFF" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.82 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </AnimatePresence>
            </motion.a>
          );
        }
      })}
    </nav>
  );
}

function DesktopSocials({ invert = false }: { invert?: boolean }) {
  return (
    <div className="hidden lg:flex gap-2 md:gap-4 items-center">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className={`${invert ? "text-black" : "text-white"} p-2 md:p-3 rounded-full hover:bg-white/20 transition-colors ${s.hoverClass}`}
        >
          <s.icon className="w-5 h-5 md:w-6 md:h-6" />
        </a>
      ))}
    </div>
  );
}

function Hamburger({
  isOpen,
  toggle,
  invert,
}: {
  isOpen: boolean;
  toggle: () => void;
  invert: boolean;
}) {
  return (
    <motion.button
      className={`p-4 rounded-lg flex transition-all lg:hidden ${invert ? "text-black" : "text-white"}`}
      onClick={toggle}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      style={{ backdropFilter: "blur(10px)" }}
    >
      <motion.div className="relative w-6 h-6">
        <motion.span
          className="block absolute top-0 left-0 w-6 h-0.5 bg-current rounded"
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
          transition={{ duration: 0.21 }}
        />
        <motion.span
          className="block absolute top-2 left-0 w-6 h-0.5 bg-current rounded"
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.21 }}
        />
        <motion.span
          className="block absolute top-4 left-0 w-6 h-0.5 bg-current rounded"
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
          transition={{ duration: 0.21 }}
        />
      </motion.div>
    </motion.button>
  );
}

//----------------------------
// MOBILE DRAWER (SCROLL FIX)
//----------------------------

function MobileDrawer({
  isOpen,
  onClose,
  active,
  invert = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  active: string;
  invert?: boolean;
}) {
  const [expanded, setExpanded] = useState<keyof typeof footerSections | null>(
    null
  );

  const router = useRouter();
  const pathname = usePathname();

  // Important scroll lock, only blocks background!
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMobileNavClick = (href: string) => {
    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push("/" + href);
      } else {
        smoothScroll(href);
      }
    } else if (href === "/") {
      if (pathname !== "/") {
        router.push("/");
      }
    } else {
      router.push(href);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-lg z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed top-0 right-0 h-full w-80 max-w-[95vw] z-50 overflow-y-auto"
            style={{
              background: "rgba(0, 0, 0, 0.85)",
              WebkitOverflowScrolling: "touch",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 530, damping: 38 }}
            aria-modal="true"
            role="dialog"
          >
            <div className="p-6 text-white">
              <div className="flex justify-between items-center mb-8">
                <Logo invert={true} />
                <button
                  onClick={onClose}
                  className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close menu"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-3">
                {navOrder.map((item) =>
                  item.type === "mega" ? (
                    <div key={item.key}>
                      <button
                        className={`w-full flex justify-between items-center py-4 px-5 rounded-xl font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          expanded === item.key
                            ? "bg-blue-600 text-white"
                            : "text-white hover:bg-blue-700 hover:text-white"
                        }`}
                        onClick={() =>
                          setExpanded(expanded === item.key ? null : item.key)
                        }
                        aria-expanded={expanded === item.key}
                        aria-controls={`mobile-submenu-${item.key}`}
                      >
                        {item.name}
                        <motion.div
                          aria-hidden="true"
                          animate={{ rotate: expanded === item.key ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FaChevronDown className="w-5 h-5" />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.key && (
                          <motion.div
                            id={`mobile-submenu-${item.key}`}
                            className="pl-6 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="space-y-2 mt-2">
                              {footerSections[
                                item.key as keyof typeof footerSections
                              ].links.map((link) => (
                                <a
                                  key={link.name}
                                  href={link.href}
                                  className="block py-3 px-4 rounded-lg text-white hover:bg-blue-700 hover:text-white font-medium transition-colors"
                                  tabIndex={0}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleMobileNavClick(link.href);
                                  }}
                                >
                                  {link.name}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`block py-4 px-5 rounded-xl font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        active === item.href.replace("#", "").toLowerCase()
                          ? "bg-blue-600 text-white"
                          : "text-white hover:bg-blue-700 hover:text-white"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileNavClick(item.href);
                      }}
                    >
                      {item.name}
                    </a>
                  )
                )}
              </nav>
              <div className="flex gap-4 mt-10 justify-center pt-6 border-t border-gray-700">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full text-white hover:text-blue-600 hover:bg-blue-900 transition-colors"
                    aria-label={s.label}
                  >
                    <s.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

//----------------------------
// MAIN NAVIGATION COMPONENT
//----------------------------

export default function Navigation() {
  const [invert, setInvert] = useState(false);
  const [active, setActive] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMega, setOpenMega] = useState<keyof typeof footerSections | null>(
    null
  );

  const router = useRouter();
  const pathname = usePathname();

  // Scroll spy - updates active nav, closes mega menus
  useEffect(() => {
    const handler = () => {
      const anchors = navOrder
        .filter((n) => n.type !== "mega")
        .map((n) => (n as AnchorNav).href.replace("#", "").toLowerCase());
      const pos = window.scrollY + 120;
      for (const id of anchors) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id);
          setOpenMega(null);
          return;
        }
      }
      setOpenMega(null);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Invert nav on bright/invert-nav sections (IntersectionObserver)
  useEffect(() => {
    const targets = document.querySelectorAll(".invert-nav");
    if (!("IntersectionObserver" in window)) return;
    const io = new window.IntersectionObserver(
      (entries) => setInvert(entries.some((e) => e.isIntersecting)),
      { threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Handle nav clicks, managing hash navigation and multi-page scroll
  const handleNavClick = (href: string) => {
    setOpenMega(null);

    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      if (pathname !== "/") {
        router.push("/" + href);
      } else {
        smoothScroll(href);
      }
      setActive(id);
    } else {
      router.push(href);
    }
    if (drawerOpen) setDrawerOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed z-50 top-0 left-0 right-0 w-full backdrop-blur-xl bg-black/80`}
        role="banner"
      >
        <div className="px-4 overflow-auto mx-10">
          <div className="h-20 flex items-center w-full">
            <div className="flex-auto">
              <Logo invert={invert} />
            </div>
            {/* Desktop Center: Nav */}
            <div className="hidden lg:flex justify-center">
              <DesktopNav
                openMega={openMega}
                setOpenMega={setOpenMega}
                active={active}
                handleNavClick={handleNavClick}
                invert={invert}
              />
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 md:gap-3 lg:gap-4">
              <DesktopSocials invert={invert} />
              <Hamburger
                isOpen={drawerOpen}
                toggle={() => setDrawerOpen(!drawerOpen)}
                invert={invert}
              />
            </div>
          </div>
        </div>
      </nav>
      <DesktopMegaMenu openKey={openMega} close={() => setOpenMega(null)} />
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        active={active}
        invert={invert}
      />
    </>
  );
}
