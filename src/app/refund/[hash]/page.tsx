"use client";

import { InfoSection } from "@/components/InfoSection";
import { ChangeStatusModal } from "@/components/Modals/ChangeStatusModal";
import { EventSourceServices } from "@/services/recipt/eventSource_services";
import { ReceiptDataType } from "@/types/refund/EventSourceType";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import {
  InternalReceiptStatusEnum,
  StatusRefundEnum,
  TranslatedVisionReceiptCategoryEnum,
} from "@/utils/constants/enums";
import { formattedDate } from "@/utils/helpers/formattedDate";
import { getCookie } from "@/utils/helpers/manageCookies";
import {
  AcUnit,
  AccountCircle,
  ArrowBack,
  AttachMoney,
  Category,
  DateRange,
  Description,
  Edit,
  Help,
  Info,
} from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function Hash({ params }: { params: { hash: string } }) {
  const { push } = useRouter();
  const [statusModalOpen, setStatusModalOpen] = React.useState<boolean>(false);
  const [userType, setUserType] = React.useState<string | undefined>();
  const [receiptData, setReceiptData] = React.useState<ReceiptDataType>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user_type = await getCookie();
        setUserType(user_type.userType?.value);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReceiptData = async () => {
      try {
        const data = await EventSourceServices.getReceiptByHash(params.hash);
        console.log(data.data);
        setReceiptData(data.data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar notas fiscais:", error);
      }
    };

    fetchData();
    fetchReceiptData();
  }, []);

  return (
    <main
      className="bg-slate-50 flex flex-col items-start p-8"
      style={{ gridArea: "main" }}
    >
      <div className="flex justify-between gap-4 w-full">
        <Button variant="text" onClick={() => push(APP_ROUTES.private.refund)}>
          <ArrowBack />
          Voltar à Página Anterior
        </Button>
        {userType === process.env.NEXT_PUBLIC_API_TOKEN_FINANCE_EMPLOYE && (
          <Button variant="contained" onClick={() => setStatusModalOpen(true)}>
            <Edit />
            Alterar status da solicitação
          </Button>
        )}
      </div>

      <div className="w-full flex flex-row p-8">
        <Box
          component="section"
          className="flex-1 flex flex-col justify-start items-center"
        >
          {receiptData?.internalReceipt.image && (
            <Image
              src="/logo.png"
              // src={receiptData.internalReceipt.image || "/logo.png"}
              alt="Nota fiscal"
              width={500}
              height={600}
            />
          )}
        </Box>

        <Box
          component="section"
          className="flex-1 flex flex-col justify-start gap-8"
        >
          <div className="flex flex-col justify-start gap-2 w-2/3">
            <Typography variant="subtitle1" color="primary">
              Informações sobre o envio
            </Typography>
            <Divider />
            <InfoSection
              icon={<AcUnit />}
              label="Hash"
              value={receiptData?.internalReceipt.uniqueHash}
            />
            <InfoSection
              icon={<AccountCircle />}
              label="Id do funcionário"
              value={receiptData?.internalReceipt.employeeId}
            />
            <InfoSection
              icon={<DateRange />}
              label="Data de criação"
              value={formattedDate(receiptData?.internalReceipt.creationDate)}
            />
            {receiptData?.internalReceipt.status && (
              <InfoSection
                icon={<Info />}
                label="Status"
                chip={{
                  label:
                    InternalReceiptStatusEnum[
                      receiptData?.internalReceipt
                        .status as keyof typeof InternalReceiptStatusEnum
                    ].label,
                  color:
                    InternalReceiptStatusEnum[
                      receiptData?.internalReceipt
                        .status as keyof typeof InternalReceiptStatusEnum
                    ].color,
                }}
              />
            )}
          </div>

          <div className="flex flex-col justify-start gap-2 w-2/3">
            <Typography variant="subtitle1" color="primary">
              Resultado da solicitação
            </Typography>
            <Divider />
            {receiptData?.translatedVision.category !== undefined && (
              <InfoSection
                icon={<Category />}
                label="Categoria"
                chip={{
                  label:
                    TranslatedVisionReceiptCategoryEnum[
                      receiptData.translatedVision
                        .category as keyof typeof TranslatedVisionReceiptCategoryEnum
                    ].label,
                  color:
                    TranslatedVisionReceiptCategoryEnum[
                      receiptData.translatedVision
                        .category as keyof typeof TranslatedVisionReceiptCategoryEnum
                    ].color,
                }}
              />
            )}
            <InfoSection
              icon={<AttachMoney />}
              label="Total"
              value={`R$ ${receiptData?.translatedVision.total.toFixed(2)}`}
            />
            {receiptData?.translatedVision.status !== undefined && (
              <InfoSection
                icon={<Info />}
                label="Status da solicitação"
                chip={{
                  label:
                    StatusRefundEnum[
                      receiptData.translatedVision
                        .status as keyof typeof StatusRefundEnum
                    ].label,
                  color:
                    StatusRefundEnum[
                      receiptData.translatedVision
                        .status as keyof typeof StatusRefundEnum
                    ].color,
                }}
              />
            )}
            <InfoSection
              icon={<Description />}
              label="Descrição"
              value={receiptData?.translatedVision.description}
            />
          </div>

          <div className="flex flex-col justify-start gap-2 w-2/3">
            <Typography variant="subtitle1" color="primary">
              Resposta do ChatGPT Vision
            </Typography>
            <Divider />
            <InfoSection
              icon={<Help />}
              label="É uma nota fiscal"
              value={receiptData?.rawVision.isReceipt}
            />
            <InfoSection
              icon={<Category />}
              label="Categoria"
              value={receiptData?.rawVision.category}
            />
            <InfoSection
              icon={<AttachMoney />}
              label="Total"
              value={receiptData?.rawVision.total}
            />
            <InfoSection
              icon={<Description />}
              label="Descrição"
              value={receiptData?.rawVision.description}
            />
          </div>
        </Box>
      </div>
      <ChangeStatusModal
        open={statusModalOpen}
        setIsOpen={setStatusModalOpen}
      />
    </main>
  );
}
