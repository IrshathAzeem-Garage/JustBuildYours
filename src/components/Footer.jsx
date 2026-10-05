import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { siteConfig } from '../data/siteConfig';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-16 md:py-20 border-t border-border-custom bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-border-custom/80">
          
          {/* Brand Logo & Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <img
                src={siteConfig.logo}
                alt={siteConfig.name}
                className="w-8 h-8 rounded-lg object-cover shadow-sm shrink-0"
              />
              <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-primary-text block">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary-text">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Social / Contact Links */}
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-secondary-text hover:text-primary-text transition-colors"
              aria-label="Email studio"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            {siteConfig.instagram && (
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-secondary-text hover:text-primary-text transition-colors"
                aria-label="Instagram profile"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            )}

            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full border border-border-custom flex items-center justify-center text-secondary-text hover:text-primary-text hover:border-primary-text transition-colors ml-2"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Studio Note */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-secondary-text font-normal">
          <p>© {siteConfig.copyrightYear} Just Build Yours</p>
          <p className="text-muted-text">
            Digital Products · Business Websites · AI Applications
          </p>
        </div>

      </div>
    </footer>
  );
}
