/**
 * Site configuration for Just Build Yours (JBY)
 * Easily change contact information, social links, and form endpoints here.
 */
export const siteConfig = {
  name: "JUST BUILD YOURS",
  shortName: "JBY",
  tagline: "You bring the idea. We build it.",
  secondaryTagline: "You don't need to know how to build it. You just need to know what you want to build.",
  description: "Beautiful websites, digital products and AI-powered applications built around your idea.",
  logo: "/jby_dark_logo.jpg",

  // Contact & Social Details (Replace with your actual links anytime)
  email: "justbuildyours@gmail.com",
  instagram: "https://instagram.com/justbuildyours",
  whatsappNumber: "+91 98765 43210", // Optional quick contact

  // EmailJS service configuration (loaded securely from .env)
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
  },

  // Nav items
  navLinks: [
    { label: "Home", href: "#hero" },
    { label: "About Us", href: "#about" },
    { label: "What We Build", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact Us", href: "#contact" },
  ],

  // Footer copyright
  copyrightYear: 2026,
};
