"use client";

import { AsideFilter } from "@/components/AsideFilter";
import { Header } from "@/components/Header";
import { MainSection } from "@/components/MainSection";

const gridStyles = {
  display: "grid",
  width: "100%",
  gridTemplateColumns: "260px 1fr",
  gap: "32px",
};

export default function Refund() {
  return (
    <>
      <Header />
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-slate-50"
        style={gridStyles}
      >
        <AsideFilter />
        <MainSection />
      </main>
    </>
  );
}
