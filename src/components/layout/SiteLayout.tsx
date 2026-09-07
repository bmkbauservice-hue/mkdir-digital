import { Outlet } from "react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-mkdir-black text-zinc-100">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
