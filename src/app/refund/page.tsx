"use client";

import { AsideFilter } from "@/components/AsideFilter";
import { Header } from "@/components/Header";
import { MainSection } from "@/components/MainSection";
import { Divider } from "@mui/material";

const gridStyles = {
  gridArea: "main",
  display: "grid",
  width: "100%",
  gridTemplateColumns: "260px 1fr",
  gridTemplateAreas: `"aside mainSection"`,
  gap: "32px",
};

export default function Refund() {
  return (
    <>
      <Header />
      <main className="bg-slate-50" style={gridStyles}>
        <AsideFilter />
        <Divider orientation="vertical" />
        <MainSection />
      </main>
    </>
  );
}
