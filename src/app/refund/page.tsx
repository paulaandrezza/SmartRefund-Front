"use client";

import { AsideFilter } from "@/components/AsideFilter";
import { MainSection } from "@/components/MainSection";
import { EventSourceServices } from "@/services/recipt/eventSource_services";
import { AllReceiptDataType } from "@/types/refund/EventSourceType";
import React from "react";

export default function Refund() {
  const [receiptsData, setReceiptsData] = React.useState<AllReceiptDataType>();

  const fetchReceiptsData = async () => {
    try {
      const data = await EventSourceServices.getAllReceipts();
      setReceiptsData(data.data);
    } catch (error) {
      console.error("Erro ao buscar notas fiscais:", error);
    }
  };

  React.useEffect(() => {
    fetchReceiptsData();
  }, []);

  return (
    <main className="refund-grid-container bg-slate-50">
      <AsideFilter />
      <MainSection
        receiptsData={receiptsData}
        fetchReceiptsData={fetchReceiptsData}
      />
    </main>
  );
}
