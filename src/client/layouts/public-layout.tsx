import { Link, Outlet } from "react-router";

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-petal">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="border-b border-border px-gutter-text py-4">
        <Link to="/" className="font-medium text-rosewood">
          MUA Booking
        </Link>
      </header>
      <div id="main-content" className="flex-1">
        <Outlet />
      </div>
      <footer className="border-t border-border px-gutter-text py-4 type-small text-mauve">
        Phase 0 application shell
      </footer>
    </div>
  );
}
