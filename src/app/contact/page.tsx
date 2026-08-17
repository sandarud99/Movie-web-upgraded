"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Glowing Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-6 font-heading tracking-tight">
            Let's Talk
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question, feedback, or a feature request? We'd love to hear from you. Our support team is available 24/7 to help you out.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-stretch">
          {/* Left Side - Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-4 h-full"
          >
            <div className="flex-1 group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-center hover:bg-white/10 hover:border-brand/50 transition-all duration-300">
              <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="text-brand w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
              <p className="text-gray-400 text-sm mb-3">Drop us a message anytime.</p>
              <a href="mailto:info@9ineflix.com" className="text-brand hover:text-white font-medium transition-colors">info@9ineflix.com</a>
            </div>

            <div className="flex-1 group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-center hover:bg-white/10 hover:border-[#1877F2]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#1877F2]/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FacebookIcon className="text-[#1877F2] w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Facebook</h3>
              <p className="text-gray-400 text-sm mb-3">Follow us for updates and news.</p>
              <a href="#" className="text-[#1877F2] hover:text-white font-medium transition-colors">@9ineflix</a>
            </div>

            <div className="flex-1 group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-center hover:bg-white/10 hover:border-[#E1306C]/50 transition-all duration-300">
              <div className="w-12 h-12 bg-[#E1306C]/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <InstagramIcon className="text-[#E1306C] w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Instagram</h3>
              <p className="text-gray-400 text-sm mb-3">Check out our latest stories and posts.</p>
              <a href="#" className="text-[#E1306C] hover:text-white font-medium transition-colors">@9ineflix</a>
            </div>
          </motion.div>
          
          {/* Right Side - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 bg-[#141414]/80 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden h-full flex flex-col"
          >
            {/* Form decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />
            
            <h2 className="text-3xl font-bold text-white mb-2">Send a Message</h2>
            <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
            
            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-sm font-medium">
                Thank you! Your message has been sent successfully. We will get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-300 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className={`bg-black/60 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all placeholder:text-gray-600`}
                  />
                  {errors.name && <span className="text-red-500 text-xs ml-1">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-300 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className={`bg-black/60 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all placeholder:text-gray-600`}
                  />
                  {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email}</span>}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?" 
                  className={`bg-black/60 border ${errors.subject ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all placeholder:text-gray-600`}
                />
                {errors.subject && <span className="text-red-500 text-xs ml-1">{errors.subject}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..." 
                  rows={5}
                  className={`bg-black/60 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all resize-none placeholder:text-gray-600`}
                />
                {errors.message && <span className="text-red-500 text-xs ml-1">{errors.message}</span>}
              </div>

              <button 
                type="submit"
                className="group flex items-center justify-center gap-3 bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand/80 transition-all mt-4 shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] hover:-translate-y-1"
              >
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
