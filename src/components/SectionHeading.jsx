import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  action,
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <span className="inline-block text-xs uppercase tracking-widest text-secondary-text font-medium mb-3">
          {eyebrow}
        </span>
      )}
      
      <div className={`flex flex-col ${action && !isCenter ? 'md:flex-row md:items-end md:justify-between gap-6' : ''}`}>
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-primary-text leading-[1.12]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-secondary-text leading-relaxed font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {action && (
          <div className="shrink-0 mt-4 md:mt-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
