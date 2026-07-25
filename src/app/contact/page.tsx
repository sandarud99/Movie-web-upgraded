export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#141414] pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-brand mb-8 tracking-tight">Contact Us</h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="mb-10 text-xl text-white">
            Have a question, feedback, or a feature request? We'd love to hear from you. Our support team is available 24/7.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm uppercase text-gray-500 font-bold tracking-wider mb-1">General Inquiries</h3>
                  <a href="mailto:hello@9ineflix.com" className="text-brand hover:text-white transition-colors">hello@9ineflix.com</a>
                </div>
                <div>
                  <h3 className="text-sm uppercase text-gray-500 font-bold tracking-wider mb-1">Technical Support</h3>
                  <a href="mailto:support@9ineflix.com" className="text-brand hover:text-white transition-colors">support@9ineflix.com</a>
                </div>
                <div>
                  <h3 className="text-sm uppercase text-gray-500 font-bold tracking-wider mb-1">Press & Media</h3>
                  <a href="mailto:press@9ineflix.com" className="text-brand hover:text-white transition-colors">press@9ineflix.com</a>
                </div>
              </div>
            </div>
            
            <div className="bg-[#141414] p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6 mt-0">Send a Message</h2>
              <form className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors"
                />
                <textarea 
                  placeholder="How can we help?" 
                  rows={4}
                  className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand transition-colors resize-none"
                />
                <button 
                  type="button"
                  className="bg-brand text-white font-bold py-3 rounded-lg hover:bg-brand/80 transition-colors mt-2 shadow-[0_0_15px_rgba(229,9,20,0.5)]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
