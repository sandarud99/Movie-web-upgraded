"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 40 }, (_, i) => (currentYear - i).toString());

const sortOptions = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Rating", value: "vote_average.desc" },
  { label: "Release Date", value: "primary_release_date.desc" },
];

function CustomDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || label;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-black/50 border border-white/20 text-white text-sm rounded-full px-5 py-2.5 outline-none hover:border-brand transition-colors focus:border-brand"
      >
        <span>{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-48 max-h-60 overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 py-2">
          <button
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
              value === "" ? "text-brand font-bold bg-white/5" : "text-gray-300"
            }`}
          >
            {label}
          </button>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                value === opt.value ? "text-brand font-bold bg-white/5" : "text-gray-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentYearParam = searchParams.get("year") || "";
  const currentSortParam = searchParams.get("sort") || "";

  const applyFilters = (newYear: string, newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newYear) params.set("year", newYear);
    else params.delete("year");
    
    if (newSort) params.set("sort", newSort);
    else params.delete("sort");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("year");
    params.delete("sort");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const hasFilters = currentYearParam || currentSortParam;
  const yearOptions = years.map(y => ({ label: y, value: y }));

  return (
    <div className="px-6 md:px-12 py-4 mb-6 relative z-50">
      <div className="flex flex-wrap items-center gap-4 bg-[#141414]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg">
        <h3 className="text-white font-bold mr-4">Filter By:</h3>
        
        <CustomDropdown
          label="All Years"
          value={currentYearParam}
          options={yearOptions}
          onChange={(val) => applyFilters(val, currentSortParam)}
        />

        <CustomDropdown
          label="Sort By"
          value={currentSortParam}
          options={sortOptions}
          onChange={(val) => applyFilters(currentYearParam, val)}
        />

        {/* Clear Button */}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-gray-400 hover:text-white transition-colors font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
