import { Add, Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { AddReciptModal } from "../AddReciptModal";
import { RefundCard } from "../RefundCard";

export const reciptData = {
  id: 1,
  hash: "AAABKJ",
  employeeId: 1,
  creationDate: new Date(),
  status: 2,
  image: "/nf.webp",
  rawVision: {
    id: 1,
    isReceipt: "Sim",
    category: "Alimentação",
    total: "50.00",
    description: "Reembolso de refeição",
    isTranslated: true,
    translatedVision: {
      id: 1,
      isReceipt: true,
      category: 1,
      status: 2,
      total: 50,
      description:
        "Reembolso de refeição sdjfghsdkdffdssssjg dfgjkh dfgjk fdgjkfdhgkjh fgjhfg kfghklgkjf hjkhfgkj hfgfghjghjk ghjghjkghkghjk hjkjl",
    },
  },
};

export const MainSection = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [showClearIcon, setShowClearIcon] = React.useState("none");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
  };

  return (
    <>
      <Box
        component="section"
        className="h-full p-4 bg-slate-50 overflow-x-hidden"
        bgcolor="primary"
        style={{ gridArea: "mainSection" }}
      >
        <div className="flex justify-end flex-1 gap-4 sticky pb-4">
          <TextField
            size="small"
            className="w-80"
            variant="outlined"
            placeholder="Pesquisar hash da nota fiscal"
            type="search"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <Button variant="contained" onClick={() => setOpenModal(true)}>
            <Add />
            Adicionar nota fiscal
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {Array(19)
            .fill(19)
            .map((_, index) => (
              <RefundCard key={index} cardInfo={reciptData} />
            ))}
        </div>
      </Box>
      <AddReciptModal open={openModal} setIsOpen={setOpenModal} />
    </>
  );
};
