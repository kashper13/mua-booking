import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export type PublicChromeContextValue = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const PublicChromeContext = createContext<PublicChromeContextValue | null>(null);

export function usePublicChrome(): PublicChromeContextValue {
  const value = useContext(PublicChromeContext);
  if (!value) {
    throw new Error("usePublicChrome must be used within PublicChromeProvider");
  }
  return value;
}
