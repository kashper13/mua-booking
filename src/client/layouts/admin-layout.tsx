import { Link, Outlet } from "react-router";

export function AdminLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-petal">
      <div
        className="border-b border-border bg-blush-tint px-gutter-text py-3 type-small text-rosewood-dark"
        role="status"
      >
        Admin placeholder only. This route is not authenticated. Client-side routing is not a
        security control.
      </div>
      <header className="border-b border-border px-gutter-text py-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-medium">Admin</p>
          <Link to="/" className="type-small text-rosewood underline">
            Back to public site
          </Link>
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
