import { Link, useLocation } from "react-router";

import {
  artistNamePlaceholder,
  copyrightYear,
  locationLabel,
  socialPlaceholders,
  unavailableNavItems,
} from "../../content/public-site";
import { UnavailableNavItem } from "./unavailable-controls";

export function PublicFooter() {
  const { pathname } = useLocation();

  return (
    <footer id="public-footer" className="border-t border-border bg-petal">
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-gutter-text py-10 md:grid-cols-3 md:px-8 lg:px-10">
        <div>
          <p className="font-display text-2xl text-plum-ink">{artistNamePlaceholder}</p>
          <p className="mt-2 type-small text-mauve">Placeholder business name</p>
          <p className="mt-4 type-body text-plum-ink">{locationLabel}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                to="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className="inline-flex min-h-touch items-center type-body font-semibold text-rosewood"
              >
                Home
              </Link>
            </li>
            {unavailableNavItems.map((item) => (
              <li key={item.label}>
                <UnavailableNavItem label={item.label} note={item.note} />
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="type-label text-plum-ink">Social media</p>
          <ul className="mt-3 space-y-2">
            {socialPlaceholders.map((item) => (
              <li key={item.name} className="type-body text-mauve">
                {item.name} — {item.note}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-[1200px] px-gutter-text py-4 type-small text-mauve lg:px-10">
          © {copyrightYear} {artistNamePlaceholder}
        </p>
      </div>
    </footer>
  );
}
