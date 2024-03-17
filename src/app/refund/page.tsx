"use client";

import { AsideFilter } from "@/components/AsideFilter";
import { MainSection } from "@/components/MainSection";
import { EventSourceServices } from "@/services/recipt/eventSource_services";
import { AllReceiptDataType } from "@/types/refund/EventSourceType";
import React from "react";

const gridStyles = {
  gridArea: "main",
  display: "grid",
  width: "100%",
  gridTemplateColumns: "280px 1fr",
  gridTemplateAreas: `"aside mainSection"`,
  gap: "32px",
};

export default function Refund() {
  const [receiptsData, setReceiptsData] = React.useState<AllReceiptDataType>();

  React.useEffect(() => {
    const fetchReceiptsData = async () => {
      try {
        const data = await EventSourceServices.getAllReceipts();
        setReceiptsData(data.data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar notas fiscais:", error);
      }
    };

    fetchReceiptsData();
  }, []);

  return (
    <main className="bg-slate-50" style={gridStyles}>
      <AsideFilter />
      <MainSection receiptsData={receiptsData} />
    </main>
  );
}
