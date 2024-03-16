import { RecipData } from "@/types/refund/ReciptData";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

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
        <Typography variant="body2">
          <b>Status:</b> Sucesso
        </Typography>
      </CardContent>
    </Card>
  );
};
