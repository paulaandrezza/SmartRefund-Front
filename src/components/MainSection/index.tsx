import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { AddReciptModal } from "../AddReciptModal";
import { RefundCard } from "../RefundCard";

const recipData = {
  id: 1,
  hash: "AAABKJ",
  employeeId: 1,
  creationDate: new Date(),
  status: 1,
  image: "/logo.png",
};

export const MainSection = () => {
  const [openModal, setOpenModal] = React.useState(false);

  return (
    <>
      <Box
        component="section"
        className="h-full p-4 flex flex-col gap-4"
        bgcolor="primary"
      >
        <div className="flex justify-end">
          <Button variant="contained" onClick={() => setOpenModal(true)}>
            <Add />
            Adicionar nota fiscal
          </Button>
        </div>
        <RefundCard cardInfo={recipData} />
      </Box>
      <AddReciptModal open={openModal} setIsOpen={setOpenModal} />
    </>
  );
};
