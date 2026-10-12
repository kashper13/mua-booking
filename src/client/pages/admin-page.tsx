export function AdminPage() {
  return (
    <main className="mx-auto max-w-2xl px-gutter-text py-16">
      <h1 className="type-h1-admin">Admin placeholder</h1>
      <p className="mt-4 type-body-lg text-mauve">
        Administrative tools are not implemented. Future <code>/api/admin/*</code> endpoints must
        enforce server-side authentication and authorization. No customer data is loaded, and no
        administrative mutations are available.
      </p>
    </main>
  );
}
