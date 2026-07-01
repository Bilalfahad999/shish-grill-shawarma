/* eslint-disable @next/next/no-img-element */

/**
 * Central brand logo. Swap the `src` values here (e.g. to "/logo.png") to change
 * the logo everywhere it is used across the site.
 *
 * Rendered with a plain <img> (not next/image) because these are static,
 * pre-sized SVG brand assets — next/image adds no benefit and its SVG handling
 * causes intrinsic-size issues.
 *
 * - `mark`  → compact square badge (shawarma spit only), for small icon spots
 * - default → full badge with the shawarma mark + wordmarks
 */
export function Logo({
  variant = "full",
  size = 40,
  className = "",
}: {
  variant?: "full" | "mark";
  size?: number;
  className?: string;
  /** Kept for API compatibility; ignored with plain <img>. */
  priority?: boolean;
}) {
  const src = variant === "mark" ? "/logo-mark.svg" : "/logo.svg";
  return (
    <img
      src={src}
      alt="Shish Shawarma & Grill"
      width={size}
      height={size}
      className={className}
    />
  );
}
