import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  paths: { name: string; href?: string }[];
}

export default function Breadcrumbs({ paths }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 font-medium">
      <Link href="/" className="hover:text-brand transition-colors">
        Home
      </Link>
      
      {paths.map((path, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-600" />
          {path.href ? (
            <Link href={path.href} className="hover:text-brand transition-colors">
              {path.name}
            </Link>
          ) : (
            <span className="text-white font-bold">{path.name}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
