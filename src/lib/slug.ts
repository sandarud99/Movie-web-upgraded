/**
 * Converts a movie/show title + id into a SEO-friendly slug.
 * Example: "The Dark Knight", "155" => "the-dark-knight-155"
 */
export function toWatchSlug(title: string, id: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .trim()
    .replace(/\s+/g, "-")          // spaces to hyphens
    .replace(/-+/g, "-");          // collapse multiple hyphens
  return `${slug}-${id}`;
}

/**
 * Extracts the numeric TMDB ID from the end of a slug.
 * Example: "the-dark-knight-155" => "155"
 */
export function idFromSlug(slug: string): string {
  const parts = slug.split("-");
  return parts[parts.length - 1];
}

/**
 * Returns the correct watch URL for a movie or TV show.
 */
export function watchUrl(title: string, id: string, type: string): string {
  const slug = toWatchSlug(title, id);
  return type === "SERIES" ? `/watch-tv/${slug}` : `/watch/${slug}`;
}
