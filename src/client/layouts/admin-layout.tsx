import { Link, Outlet } from "react-router";

export function AdminLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <div className="border-b border-neutral-300 bg-neutral-100 px-6 py-3 text-sm" role="status">
        Admin placeholder only. This route is not authenticated. Client-side routing is not a
        security control.
      </div>
      <header className="border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-medium">Admin</p>
          <Link to="/" className="text-sm underline">
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
