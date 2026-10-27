import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
  alternates: { languages: { es: "/es" } },
};

export default function Page() {
  return <Home lang="en" />;
}
