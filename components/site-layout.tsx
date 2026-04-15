import type { ReactNode } from "react";
import { FullWidthMap } from "@/components/full-width-map";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-root">
      <SiteHeader />
      <div className="site-main">{children}</div>
      <FullWidthMap />
      <SiteFooter />
    </div>
  );
}
