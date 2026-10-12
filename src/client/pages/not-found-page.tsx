import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-2xl px-gutter-text py-16">
      <h1 className="type-h1">Not found</h1>
      <p className="mt-4 type-body-lg text-mauve">The page you requested does not exist.</p>
      <p className="mt-6">
        <Link to="/" className="text-rosewood underline">
          Return home
        </Link>
      </p>
    </main>
  );
}
