import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Archivo_Black } from "next/font/google";
import "./globals.css";

// Two faces for the whole site: a classic Garamond for headings, Inter for everything else.
const serif = Cormorant_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Only for the redrawn Chamberlain badge.
const badge = Archivo_Black({
  variable: "--font-badge",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Jaime S. Chamberlain | Chamberlain Distributing, Inc., Nogales, Arizona",
    template: "%s | Chamberlain Distributing, Inc.",
  },
  description:
    "Jaime S. Chamberlain, president of Chamberlain Distributing, Inc., a family produce importer in Nogales, Arizona since 1971. Past chairman of the Greater Nogales Santa Cruz County Port Authority and 2025 Hispanic Businessman of the Year.",
  // Kept out of search engines until Chamberlain Distributing has approved it.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${serif.variable} ${sans.variable} ${badge.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
