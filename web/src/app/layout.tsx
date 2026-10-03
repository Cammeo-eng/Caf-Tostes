import type { Metadata, Viewport } from "next";
import { Darumadrop_One, Figtree } from "next/font/google";
import "./globals.css";
import { BagBar } from "@/components/BagBar";
import { BagProvider } from "@/components/BagProvider";
import { BottomNav } from "@/components/BottomNav";

const darumadrop = Darumadrop_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-darumadrop",
});

const figtree = Figtree({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cammeo-eng.github.io/Caf-Tostes/"),
  title: "TOSTES&CO — Cafeteria em Fazenda Rio Grande",
  description: "Seu refúgio de café em Fazenda Rio Grande. Cafeteria artesanal: cardápio, combos do dia e pedido para retirada.",
  openGraph: {
    title: "TOSTES&CO — Cafeteria em Fazenda Rio Grande",
    description: "Seu refúgio de café em Fazenda Rio Grande.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "og/capa-latte-art.jpg", width: 1200, height: 630, alt: "Latte art na TOSTES&CO" }],
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { capable: true, title: "TOSTES&CO", statusBarStyle: "default" },
};

export const viewport: Viewport = { themeColor: "#f3ebdd" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${darumadrop.variable} ${figtree.variable}`}>
      <body className="min-h-dvh pb-16 md:pb-0">
        <BagProvider>
          {children}
          <BagBar />
          <BottomNav />
        </BagProvider>
      </body>
    </html>
  );
}
