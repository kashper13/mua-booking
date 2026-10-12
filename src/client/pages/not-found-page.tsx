import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Not found</h1>
      <p className="mt-4 text-neutral-700">The page you requested does not exist.</p>
      <p className="mt-6">
        <Link to="/" className="underline">
          Return home
        </Link>
      </p>
    </main>
  );
}
