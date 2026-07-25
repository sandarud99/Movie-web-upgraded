export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#141414] pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="text-sm text-gray-500 mb-8">Last Updated: July 2026</p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            At 9ineflix, we respect your privacy. We collect minimal information required to provide our streaming services. This includes your account credentials, billing information, and general usage statistics. 
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Local Storage & Watch History</h2>
          <p className="mb-4">
            We believe your viewing habits are your own business. That is why your Watch History is stored <strong>locally on your device</strong> using browser LocalStorage. We do not transmit your watch history to our servers for advertising or tracking purposes. If you clear your browser cache, your history is permanently deleted.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Third-Party Services</h2>
          <p className="mb-4">
            We use third-party APIs (such as TMDB) to fetch movie metadata and posters. These services may collect basic IP and request data as governed by their respective privacy policies.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement state-of-the-art security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>
      </div>
    </div>
  );
}
