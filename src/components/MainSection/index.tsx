import { Add, Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { AddReciptModal } from "../AddReciptModal";
import { RefundCard } from "../RefundCard";

const recipData = {
  id: 1,
  hash: "AAABKJ",
  employeeId: 1,
  creationDate: new Date(),
  status: 5,
  image: "/logo.png",
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
        className="h-full p-4 flex flex-col gap-4"
        bgcolor="primary"
      >
        <div className="flex justify-end gap-4">
          <TextField
            className="w-72"
            variant="outlined"
            label="Pesquisar pelo hash"
            placeholder="Insira a hash da nota fiscal"
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

          <Button variant="contained" color="secondary">
            Pesquisar
          </Button>

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
