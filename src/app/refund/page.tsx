"use client";

import { AsideFilter } from "@/components/AsideFilter";
import { MainSection } from "@/components/MainSection";

const gridStyles = {
  gridArea: "main",
  display: "grid",
  width: "100%",
  gridTemplateColumns: "280px 1fr",
  gridTemplateAreas: `"aside mainSection"`,
  gap: "32px",
};

export default function Refund() {
  return (
    <main className="bg-slate-50" style={gridStyles}>
      <AsideFilter />
      <MainSection />
    </main>
  );
}
