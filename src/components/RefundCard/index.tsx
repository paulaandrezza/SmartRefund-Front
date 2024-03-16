import { RecipData } from "@/types/refund/ReciptData";
import { InternalReceiptStatusEnum } from "@/utils/constants/enums";
import { Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";

export const RefundCard = ({ cardInfo }: { cardInfo: RecipData }) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
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
        <div className="flex justify-end pt-2">
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
        </div>
      </CardContent>
    </Card>
  );
};
