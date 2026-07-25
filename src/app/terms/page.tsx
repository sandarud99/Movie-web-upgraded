export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#141414] pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Terms of Service</h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="text-sm text-gray-500 mb-8">Effective Date: July 2026</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using the 9ineflix streaming service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Use License</h2>
          <p className="mb-4">
            We grant you a personal, non-exclusive, non-transferable, limited license to access and use the 9ineflix service for personal, non-commercial purposes only. You may not distribute, modify, transmit, reuse, or use the content for public or commercial purposes.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Conduct</h2>
          <p className="mb-4">
            You agree not to use the service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. Scraping, data mining, or unauthorized downloading of streams is strictly prohibited.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Modifications to Service</h2>
          <p className="mb-4">
            9ineflix reserves the right to modify, suspend, or discontinue the service (or any part thereof) at any time with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.
          </p>
        </div>
      </div>
    </div>
  );
}
