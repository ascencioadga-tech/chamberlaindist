import type { Metadata } from "next";
import Home from "../Home";
import { copy } from "../content";

export const metadata: Metadata = {
  title: { absolute: copy.es.meta.title },
  description: copy.es.meta.description,
  alternates: { languages: { en: "/" } },
};

export default function Page() {
  return <Home lang="es" />;
}
