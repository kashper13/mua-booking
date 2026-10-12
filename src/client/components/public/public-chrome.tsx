import { useMemo, useState, type ReactNode } from "react";

import { PublicChromeContext } from "./public-chrome-context";

export function PublicChromeProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const value = useMemo(() => ({ menuOpen, setMenuOpen }), [menuOpen]);

  return <PublicChromeContext.Provider value={value}>{children}</PublicChromeContext.Provider>;
}
