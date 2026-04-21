import type { ReactNode } from "react";
import { FullWidthMap } from "@/components/full-width-map";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCartItemCount } from "@/lib/cart";

export async function SiteLayout({ children }: { children: ReactNode }) {
  const cartCount = await getCartItemCount();
  return (
    <div className="site-root">
      <SiteHeader cartCount={cartCount} />
      <main className="site-main">{children}</main>
      <FullWidthMap />
      <SiteFooter />
    </div>
  );
}
