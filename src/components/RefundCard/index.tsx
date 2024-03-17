import { ReciptDataType } from "@/types/refund/ReciptDataType";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import {
  InternalReceiptStatusEnum,
  StatusRefundEnum,
} from "@/utils/constants/enums";
import { Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export const RefundCard = ({ cardInfo }: { cardInfo: ReciptDataType }) => {
  const { push } = useRouter();

  return (
    <Card
      sx={{ maxWidth: 300 }}
      className="cursor-pointer"
      onClick={() => push(`${APP_ROUTES.private.refund}/${cardInfo.id}`)}
    >
      <CardMedia
        component="img"
        height="194"
        image={cardInfo.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2">
          <b>Hash:</b> {cardInfo.hash}
        </Typography>
        <Typography variant="body2">
          <b>Data de criação:</b> {cardInfo.creationDate.toLocaleString()}
        </Typography>
        <div className="flex justify-end gap-2 pt-2">
          <Chip
            label={
              InternalReceiptStatusEnum[
                cardInfo.status as keyof typeof InternalReceiptStatusEnum
              ].label
            }
            color={
              InternalReceiptStatusEnum[
                cardInfo.status as keyof typeof InternalReceiptStatusEnum
              ].color
            }
          />
          {cardInfo.rawVision?.translatedVision?.status && (
            <Chip
              label={
                StatusRefundEnum[
                  cardInfo.rawVision?.translatedVision
                    ?.status as keyof typeof StatusRefundEnum
                ].label
              }
              color={
                StatusRefundEnum[
                  cardInfo.rawVision?.translatedVision
                    ?.status as keyof typeof StatusRefundEnum
                ].color
              }
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
