"use client";

import { InfoSection } from "@/components/InfoSection";
import { reciptData } from "@/components/MainSection";
import { ChangeStatusModal } from "@/components/Modals/ChangeStatusModal";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import {
  InternalReceiptStatusEnum,
  StatusRefundEnum,
  TranslatedVisionReceiptCategoryEnum,
} from "@/utils/constants/enums";
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

export default function Hash() {
  const { push } = useRouter();
  const [statusModalOpen, setStatusModalOpen] = React.useState<boolean>(false);
  const [userType, setUserType] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const user_type = await getCookie();
        setUserType(user_type.userType?.value);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
          <Image src="/Nfe.png" alt="recipt" width={500} height={600} />
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
              value={reciptData.hash}
            />
            <InfoSection
              icon={<AccountCircle />}
              label="Id do funcionário"
              value={reciptData.id}
            />
            <InfoSection
              icon={<DateRange />}
              label="Data de criação"
              value={reciptData.creationDate.toLocaleString()}
            />
            <InfoSection
              icon={<Info />}
              label="Status"
              chip={{
                label:
                  InternalReceiptStatusEnum[
                    reciptData.status as keyof typeof InternalReceiptStatusEnum
                  ].label,
                color:
                  InternalReceiptStatusEnum[
                    reciptData.status as keyof typeof InternalReceiptStatusEnum
                  ].color,
              }}
            />
          </div>
          {reciptData.rawVision.translatedVision && (
            <div className="flex flex-col justify-start gap-2 w-2/3">
              <Typography variant="subtitle1" color="primary">
                Resultado da solicitação
              </Typography>
              <Divider />
              <InfoSection
                icon={<Category />}
                label="Categoria"
                chip={{
                  label:
                    TranslatedVisionReceiptCategoryEnum[
                      reciptData.rawVision.translatedVision
                        .category as keyof typeof TranslatedVisionReceiptCategoryEnum
                    ].label,
                  color:
                    InternalReceiptStatusEnum[
                      reciptData.rawVision.translatedVision
                        .category as keyof typeof TranslatedVisionReceiptCategoryEnum
                    ].color,
                }}
              />
              <InfoSection
                icon={<AttachMoney />}
                label="Total"
                value={`R$ ${reciptData.rawVision.translatedVision.total.toFixed(2)}`}
              />
              <InfoSection
                icon={<Info />}
                label="Status da solicitação"
                chip={{
                  label:
                    StatusRefundEnum[
                      reciptData.rawVision.translatedVision
                        .status as keyof typeof StatusRefundEnum
                    ].label,
                  color:
                    StatusRefundEnum[
                      reciptData.rawVision.translatedVision
                        .status as keyof typeof StatusRefundEnum
                    ].color,
                }}
              />
              <InfoSection
                icon={<Description />}
                label="Descrição"
                value={reciptData.rawVision.translatedVision.description}
              />
            </div>
          )}

          {reciptData.rawVision && (
            <div className="flex flex-col justify-start gap-2 w-2/3">
              <Typography variant="subtitle1" color="primary">
                Resposta do ChatGPT Vision
              </Typography>
              <Divider />
              <InfoSection
                icon={<Help />}
                label="É uma nota fiscal"
                value={reciptData.rawVision.isReceipt}
              />
              <InfoSection
                icon={<Category />}
                label="Categoria"
                value={reciptData.rawVision.category}
              />
              <InfoSection
                icon={<AttachMoney />}
                label="Total"
                value={reciptData.rawVision.total}
              />
              <InfoSection
                icon={<Description />}
                label="Descrição"
                value={reciptData.rawVision.description}
              />
            </div>
          )}
        </Box>
      </div>
      <ChangeStatusModal
        open={statusModalOpen}
        setIsOpen={setStatusModalOpen}
      />
    </main>
  );
}
