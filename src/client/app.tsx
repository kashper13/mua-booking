import { Route, Routes } from "react-router";

import { ErrorBoundary } from "./components/error-boundary";
import { AdminLayout } from "./layouts/admin-layout";
import { PublicLayout } from "./layouts/public-layout";
import { AdminPage } from "./pages/admin-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";

export function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
