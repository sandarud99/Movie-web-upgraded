import { CastMember } from "@/types/tmdb";
import { Users } from "lucide-react";

interface TopCastProps {
  cast: CastMember[];
}

export default function TopCast({ cast }: TopCastProps) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-12">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-5 h-5 text-brand" />
        <h2 className="text-lg font-black text-white tracking-tight">Top Cast</h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-y-8 gap-x-4 pb-6">
        {cast.map((member) => (
          <div key={member.id} className="flex flex-col items-center w-full group">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 border-2 border-white/10 group-hover:border-brand transition-colors shadow-lg">
              <img 
                src={member.profileUrl} 
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h4 className="text-white text-xs md:text-sm font-bold text-center line-clamp-2 w-full">
              {member.name}
            </h4>
            <p className="text-gray-500 text-[10px] md:text-xs text-center line-clamp-2 w-full mt-0.5">
              {member.character}
            </p>
          </div>
        ))}
      </div>
      
    </div>
  );
}
