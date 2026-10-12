import { Outlet } from "react-router";

import { PublicFooter } from "../components/public/public-footer";
import { PublicHeader } from "../components/public/public-header";
import { PublicChromeProvider } from "../components/public/public-chrome";

export function PublicLayout() {
  return (
    <PublicChromeProvider>
      <div className="flex min-h-dvh min-w-0 flex-col overflow-x-clip bg-petal max-lg:pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
        <a
          id="skip-to-content"
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <PublicHeader />
        <div id="main-content" className="min-w-0 flex-1">
          <Outlet />
        </div>
        <PublicFooter />
      </div>
    </PublicChromeProvider>
  );
}
