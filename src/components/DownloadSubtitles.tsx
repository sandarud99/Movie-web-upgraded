import { HardDrive, Subtitles, Download, FileText } from "lucide-react";

export default function DownloadSubtitles() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-16 mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SELECT QUALITY CARD */}
        <div className="rounded-[32px] p-8 bg-[#0a050a] border border-[#ff4060]/20 shadow-[0_0_50px_rgba(229,9,20,0.15)] relative overflow-hidden">
          {/* Subtle Top Red Glow inside card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-[#ff4060] blur-[30px] opacity-20"></div>
          
          <div className="flex items-center gap-3 mb-8">
            <HardDrive className="w-5 h-5 text-gray-400" />
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">
              SELECT QUALITY
            </h2>
            <div className="w-5 h-5 rounded-full border border-gray-600 flex items-center justify-center text-gray-500 text-[10px] font-bold">i</div>
          </div>

          <div className="flex flex-col gap-4">
            {/* 720p */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#2a080c] to-transparent border border-[#ff4060]/20 group hover:border-[#ff4060]/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#4a0b12] flex flex-col items-center justify-center border border-[#ff4060]/20">
                  <span className="text-[10px] text-[#ff4060] font-black uppercase leading-none mb-0.5">HD</span>
                  <span className="text-sm text-white font-black leading-none">720p</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-white font-bold text-sm">Direct Download</h4>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/10 text-gray-400">WEB-RIP</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500">
                    <span>803.38 MB</span>
                    <span className="px-1.5 py-0.5 rounded border border-blue-500/30 text-blue-400 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-sm bg-blue-500/20 flex items-center justify-center">▶</span>
                      H.264
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* 1080p */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#2a080c] to-transparent border border-[#ff4060]/20 group hover:border-[#ff4060]/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#4a0b12] flex flex-col items-center justify-center border border-[#ff4060]/20">
                  <span className="text-[10px] text-[#ff4060] font-black uppercase leading-none mb-0.5">FHD</span>
                  <span className="text-sm text-white font-black leading-none">1080p</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-white font-bold text-sm">Direct Download</h4>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/10 text-gray-400">WEB-RIP</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500">
                    <span>1.37 GB</span>
                    <span className="px-1.5 py-0.5 rounded border border-green-500/30 text-green-400 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-sm bg-green-500/20 flex items-center justify-center">▶</span>
                      HEVC
                    </span>
                    <span className="px-1.5 py-0.5 rounded border border-yellow-500/30 text-yellow-500 flex items-center gap-1">
                      <span className="w-3 h-3 rounded-sm bg-yellow-500/20 flex items-center justify-center">■</span>
                      10-BIT
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SUBTITLES CARD */}
        <div className="rounded-[32px] p-8 bg-[#0a050a] border border-[#ff4060]/10 shadow-[0_0_50px_rgba(229,9,20,0.05)] relative overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <Subtitles className="w-5 h-5 text-gray-400" />
            <h2 className="text-sm font-bold text-white tracking-widest uppercase">
              SUBTITLES
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#2a1a08] to-transparent border border-yellow-500/20 group hover:border-yellow-500/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#4a320b] flex items-center justify-center border border-yellow-500/20">
                  <FileText className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Sinhala Subtitle</h4>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    BY <span className="text-white">BAISCOPE.LK</span>
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
