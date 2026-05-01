import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "YA HALA SUPERMARKT — Haarlem",
  description:
    "Verse groenten, fruit, vlees en dagelijkse boodschappen — buurtsupermarkt in Haarlem.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
