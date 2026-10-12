import { Link, Outlet } from "react-router";

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-neutral-200 px-6 py-4">
        <Link to="/" className="font-medium">
          MUA Booking
        </Link>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="border-t border-neutral-200 px-6 py-4 text-sm text-neutral-600">
        Phase 0 application shell
      </footer>
    </div>
  );
}
