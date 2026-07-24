import Link from "next/link";
import { Globe, Mail, MessageCircle, Info } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full relative mt-20 border-t border-white/10 bg-[#141414]/80 backdrop-blur-md shadow-[0_-10px_30px_rgba(229,9,20,0.1)]">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm text-gray-400">
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white transition-colors">Audio Description</Link>
            <Link href="#" className="hover:text-white transition-colors">Investor Relations</Link>
            <Link href="#" className="hover:text-white transition-colors">Legal Notices</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
            <Link href="#" className="hover:text-white transition-colors">Jobs</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Preferences</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white transition-colors">Gift Cards</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-white transition-colors">Corporate Information</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white transition-colors">Media Center</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} 9ineflix, Inc.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
