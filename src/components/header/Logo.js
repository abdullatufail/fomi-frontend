import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="Fomi home" className="rounded-md text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay">
      <svg width="22" height="34" viewBox="0 0 22 34" fill="currentColor" aria-hidden="true">
        <path d="M0 0h22l-2.4 6.5H7.4v5.6h11l-2.4 6.3H7.4V34L0 29.5V0z" />
      </svg>
    </Link>
  );
}
