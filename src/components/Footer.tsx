import Link from "next/link";
import { Globe, Mail, MessageCircle, Info } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 mb-6 mx-6 md:mx-12 rounded-[2rem] border border-white/10 bg-[#141414]/60 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-brand/5 via-transparent to-transparent -z-10" />
      
      <div className="w-full px-8 md:px-16 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h2 className="text-brand font-black text-3xl tracking-tighter drop-shadow-[0_0_15px_rgba(229,9,20,0.6)] mb-4">
              9INEFLIX
            </h2>
            <p className="text-gray-400 max-w-sm">
              Your ultimate destination for premium streaming. Watch anywhere. Cancel anytime.
            </p>
          </div>
          
          <div className="flex gap-4">
            <Link href="#" className="p-2 bg-white/5 hover:bg-brand/20 border border-white/10 hover:border-brand/50 rounded-full transition-all text-white backdrop-blur-sm hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:-translate-y-1">
              <Globe className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 bg-white/5 hover:bg-brand/20 border border-white/10 hover:border-brand/50 rounded-full transition-all text-white backdrop-blur-sm hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:-translate-y-1">
              <Mail className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 bg-white/5 hover:bg-brand/20 border border-white/10 hover:border-brand/50 rounded-full transition-all text-white backdrop-blur-sm hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:-translate-y-1">
              <MessageCircle className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2 bg-white/5 hover:bg-brand/20 border border-white/10 hover:border-brand/50 rounded-full transition-all text-white backdrop-blur-sm hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:-translate-y-1">
              <Info className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mb-12 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} 9ineflix, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
