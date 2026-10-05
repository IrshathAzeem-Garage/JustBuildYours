import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, Clock, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { siteConfig } from '../data/siteConfig';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic frontend validations
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.contactNumber.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all the required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');

    try {
      const { serviceId, templateId, publicKey } = siteConfig.emailjs;

      const isConfigured =
        serviceId &&
        templateId &&
        publicKey &&
        serviceId !== 'YOUR_SERVICE_ID' &&
        templateId !== 'YOUR_TEMPLATE_ID' &&
        publicKey !== 'YOUR_PUBLIC_KEY';

      if (!isConfigured) {
        throw new Error('EmailJS configuration is missing. Please set your actual VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.');
      }

      // Template parameters matching EmailJS template variables
      const templateParams = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.contactNumber,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus('success');
      setFormData({ fullName: '', email: '', contactNumber: '', message: '' });
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMessage(
        (err?.message && err.message.includes('EmailJS configuration'))
          ? err.message
          : ('Something went wrong sending your message. You can also write to us directly at ' + siteConfig.email)
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-border-custom bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Column: Studio Closing Statement & Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-secondary-text font-medium">
              Start The Conversation
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-primary-text tracking-tight leading-[1.05]">
              Let's build something.
            </h2>

            <p className="text-base sm:text-lg text-secondary-text leading-relaxed">
              Have an idea, a business or something completely new in mind? Fill out the form or reach out directly. We typically respond within 24 hours.
            </p>

            <div className="pt-6 space-y-4 border-t border-border-custom">

              <div className="flex items-center gap-3 text-sm text-primary-text">
                <div className="w-8 h-8 rounded-lg bg-white border border-border-custom flex items-center justify-center text-primary-text">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-muted-text font-mono uppercase">Direct Email</span>
                  <a href={`mailto:${siteConfig.email}`} className="font-medium hover:underline">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {siteConfig.instagram && (
                <div className="flex items-center gap-3 text-sm text-primary-text">
                  <div className="w-8 h-8 rounded-lg bg-white border border-border-custom flex items-center justify-center text-primary-text">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-muted-text font-mono uppercase">Studio Instagram</span>
                    <a
                      href={siteConfig.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline"
                    >
                      @justbuildyours
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm text-primary-text">
                <div className="w-8 h-8 rounded-lg bg-white border border-border-custom flex items-center justify-center text-primary-text">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-muted-text font-mono uppercase">Response Time</span>
                  <span className="text-secondary-text">Under 24 hours guaranteed</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-border-custom p-6 sm:p-10 shadow-card">

              {status === 'success' ? (
                <div className="py-12 px-4 text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-display font-bold text-primary-text">
                    Idea Received.
                  </h3>

                  <p className="text-base text-secondary-text max-w-md mx-auto leading-relaxed">
                    Thanks! We've received your idea and we'll get back to you soon.
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full border border-border-custom text-xs font-semibold text-primary-text hover:bg-neutral-50 transition-colors"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5 animate-fade-in">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-primary-text mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-3 rounded-xl border border-border-custom bg-[#FAF9F6] text-primary-text placeholder:text-muted-text text-sm focus:bg-white focus:outline-none focus:border-primary-text focus:ring-1 focus:ring-primary-text transition-all"
                    />
                  </div>

                  {/* Email & Contact Number in 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-primary-text mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-border-custom bg-[#FAF9F6] text-primary-text placeholder:text-muted-text text-sm focus:bg-white focus:outline-none focus:border-primary-text focus:ring-1 focus:ring-primary-text transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contactNumber" className="block text-xs font-mono uppercase tracking-wider text-primary-text mb-2">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        required
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl border border-border-custom bg-[#FAF9F6] text-primary-text placeholder:text-muted-text text-sm focus:bg-white focus:outline-none focus:border-primary-text focus:ring-1 focus:ring-primary-text transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-primary-text mb-2">
                      Tell us about your idea... <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What kind of product or website are you imagining? What problem does it solve? Mention any reference links or timeline you have in mind."
                      className="w-full px-4 py-3 rounded-xl border border-border-custom bg-[#FAF9F6] text-primary-text placeholder:text-muted-text text-sm focus:bg-white focus:outline-none focus:border-primary-text focus:ring-1 focus:ring-primary-text transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary-text text-white text-sm font-semibold hover:bg-neutral-800 transition-all duration-200 shadow-sm active:scale-[0.98] disabled:opacity-50"
                      id="contact-submit-btn"
                    >
                      {status === 'submitting' ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Sending Idea...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Your Idea</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-muted-text pt-2">
                    Your details are kept strictly private. No spam, ever.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
