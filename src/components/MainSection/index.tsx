import { AllReceiptDataType } from "@/types/refund/EventSourceType";
import { getCookie } from "@/utils/helpers/manageCookies";
import { Add, Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { AddReciptModal } from "../Modals/AddReciptModal";
import { RefundCard } from "../RefundCard";

interface MainSectionProps {
  receiptsData: AllReceiptDataType | undefined;
  fetchReceiptsData: () => void;
}

export const MainSection = ({
  receiptsData,
  fetchReceiptsData,
}: MainSectionProps) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [userType, setUserType] = React.useState<string | undefined>();
  const [filteredReceiptsData, setFilteredReceiptsData] = React.useState<
    AllReceiptDataType | undefined
  >(receiptsData);

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

  React.useEffect(() => {
    setFilteredReceiptsData(receiptsData);
  }, [receiptsData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value;
    if (searchValue !== "") {
      setFilteredReceiptsData(
        receiptsData?.filter((receiptData) =>
          receiptData.internalReceipt.uniqueHash
            .toLowerCase()
            .includes(searchValue.toLowerCase()),
        ),
      );
    } else {
      setFilteredReceiptsData(receiptsData);
    }
  };

  return (
    <>
      <Box
        component="section"
        className="h-full p-6 bg-slate-50 overflow-x-hidden"
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

          {userType === process.env.NEXT_PUBLIC_API_TOKEN_EMPLOYEE && (
            <Button variant="contained" onClick={() => setOpenModal(true)}>
              <Add />
              Adicionar nota fiscal
            </Button>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {receiptsData?.map((receiptData, index) => (
            <RefundCard key={index} cardInfo={receiptData} />
          ))}
        </div>
      </Box>
      <AddReciptModal
        open={openModal}
        setIsOpen={setOpenModal}
        fetchReceiptsData={fetchReceiptsData}
      />
    </>
  );
};
