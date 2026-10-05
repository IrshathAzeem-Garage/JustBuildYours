import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check active section
      const sections = ['hero', 'about', 'services', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F6F2]/90 backdrop-blur-md border-b border-border-custom py-3.5 shadow-subtle'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
            id="nav-brand-logo"
          >
            <img
              src={siteConfig.logo}
              alt={siteConfig.name}
              className="w-8 h-8 rounded-lg object-cover shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0"
            />
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-primary-text transition-colors">
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {siteConfig.navLinks.map((link) => {
              const sectionKey = link.href.replace('#', '');
              const isActive = activeSection === sectionKey;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1.5 text-sm rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-primary-text font-semibold bg-black/5'
                      : 'text-secondary-text hover:text-primary-text hover:bg-black/[0.03]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-4 py-2 rounded-full bg-primary-text text-white hover:bg-neutral-800 transition-all duration-200 shadow-sm group active:scale-95"
              id="desktop-nav-cta"
            >
              <span>Let's Build</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-primary-text text-white hover:bg-neutral-800 transition-all active:scale-95"
            >
              <span>Build</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-primary-text hover:bg-black/5 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              id="mobile-nav-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-background/98 backdrop-blur-xl border-b border-border-custom px-6 py-8 shadow-elevated animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {siteConfig.navLinks.map((link) => {
              const sectionKey = link.href.replace('#', '');
              const isActive = activeSection === sectionKey;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-lg py-2 transition-colors flex items-center justify-between border-b border-border-custom/60 ${
                    isActive
                      ? 'text-primary-text font-bold'
                      : 'text-secondary-text hover:text-primary-text font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-muted-text uppercase tracking-widest">
                    {sectionKey}
                  </span>
                </a>
              );
            })}

            <div className="pt-4">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-5 py-3.5 rounded-xl bg-primary-text text-white hover:bg-neutral-800 transition-all shadow-sm"
              >
                <span>Let's Build Yours</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
