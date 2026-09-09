import type { Metadata } from "next";

const BASE_URL = "https://9ineflix.com";

export const metadata: Metadata = {
  title: "Watch History",
  description: "View and resume your recently watched movies and TV shows on 9ineflix.",
  alternates: { canonical: `${BASE_URL}/history` },
  robots: { index: false, follow: true },
};

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
