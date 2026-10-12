export function AdminPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold">Admin placeholder</h1>
      <p className="mt-4 text-neutral-700">
        Administrative tools are not implemented. Future <code>/api/admin/*</code> endpoints must
        enforce server-side authentication and authorization. No customer data is loaded, and no
        administrative mutations are available.
      </p>
    </main>
  );
}
