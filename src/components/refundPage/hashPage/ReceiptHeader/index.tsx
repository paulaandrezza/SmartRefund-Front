"use client";

import { ReceiptDataType } from "@/types/refund/EventSourceType";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import { ArrowBack, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

type ReceiptSideProps = {
  userType: string | undefined;
  receiptData: ReceiptDataType | undefined;
  setStatusModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReceiptHeader = ({
  userType,
  receiptData,
  setStatusModalOpen,
}: ReceiptSideProps) => {
  const { push } = useRouter();

  return (
    <div className="flex justify-between gap-4 w-full">
      <Button variant="text" onClick={() => push(APP_ROUTES.private.refund)}>
        <ArrowBack />
        Voltar à Página Anterior
      </Button>
      {userType === process.env.NEXT_PUBLIC_API_TOKEN_FINANCE_EMPLOYE &&
        receiptData?.translatedVision.status === 1 && (
          <Button variant="contained" onClick={() => setStatusModalOpen(true)}>
            <Edit />
            Alterar status da solicitação
          </Button>
        )}
    </div>
  );
};
