import { createContext, useContext } from "react";

// APP-OWNED routing. The real mobile-app would use expo-router (file-based screens); this demo keeps
// its single-screen structure and simulates routing with in-app state: App.tsx holds the current
// path + params and re-composes on navigate. Blocks call useNav().navigate(path) to move between
// routes — the native equivalent of the web blocks' <Link href>.
export type Nav = {
  path: string;
  params: Record<string, string>;
  navigate: (path: string, params?: Record<string, string>) => void;
};

export const NavContext = createContext<Nav>({ path: "/", params: {}, navigate: () => {} });

export const useNav = () => useContext(NavContext);
