export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#141414] pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-brand mb-8 tracking-tight">About 9ineflix</h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="text-xl mb-6 text-white font-medium">
            9ineflix is your ultimate destination for premium cinematic entertainment.
          </p>
          
          <p className="mb-6">
            Founded with the vision of bringing the magic of the silver screen directly to your living room, 9ineflix offers an unparalleled streaming experience. We curate the finest selection of blockbuster movies, critically acclaimed indie films, and binge-worthy television series from around the globe.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is simple: to connect people with stories they'll love. We believe that great storytelling has the power to inspire, educate, and entertain. By leveraging cutting-edge technology and a beautiful, intuitive interface, we ensure that nothing stands between you and your next favorite movie.
          </p>
          
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>Premium Quality:</strong> Stream in stunning 4K HDR with Dolby Atmos support.</li>
            <li><strong>Zero Interruptions:</strong> Enjoy an ad-free experience on all our premium tiers.</li>
            <li><strong>Cinematic Interface:</strong> Browse our library using our state-of-the-art interactive UI.</li>
            <li><strong>Privacy First:</strong> Your watch history stays on your device. We respect your data.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
