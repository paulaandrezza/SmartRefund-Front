"use client";

import { InfoSection } from "@/components/InfoSection";
import { reciptData } from "@/components/MainSection";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import {
  InternalReceiptStatusEnum,
  StatusRefundEnum,
  TranslatedVisionReceiptCategoryEnum,
} from "@/utils/constants/enums";
import {
  AcUnit,
  AccountCircle,
  ArrowBack,
  AttachMoney,
  Category,
  DateRange,
  Description,
  Help,
  Info,
} from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hash() {
  const { push } = useRouter();

  return (
    <main
      className="bg-slate-50 flex flex-col items-start p-8"
      style={{ gridArea: "main" }}
    >
      <Button variant="text" onClick={() => push(APP_ROUTES.private.refund)}>
        <ArrowBack />
        Voltar à Página Anterior
      </Button>
      <div className="w-full flex flex-row p-8">
        <Box
          component="section"
          className="flex-1 flex flex-col justify-start items-center"
        >
          <Image src="/nf.webp" alt="recipt" width={500} height={600} />
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
                value={`R$ ${reciptData.rawVision.translatedVision.total}`}
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

          {reciptData.rawVision.translatedVision && (
            <div className="flex flex-col justify-start gap-2 w-2/3">
              <Typography variant="subtitle1" color="primary">
                Resposta do ChatGPT Vision
              </Typography>
              <Divider />
              <InfoSection
                icon={<Help />}
                label="É uma nota fiscal"
                value={`R$ ${reciptData.rawVision.total}`}
              />
              <InfoSection
                icon={<Category />}
                label="Categoria"
                value={reciptData.rawVision.category}
              />
              <InfoSection
                icon={<AttachMoney />}
                label="Total"
                value={`R$ ${reciptData.rawVision.total}`}
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
    </main>
  );
}
