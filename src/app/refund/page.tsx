"use client";

import { AsideFilter } from "@/components/AsideFilter";
import { Header } from "@/components/Header";
import useAuth from "@/hooks/useAuth";
import { Typography } from "@mui/material";

const gridStyles = {
  display: "grid",
  width: "100%",
  gridTemplateColumns: "200px 1fr",
  gap: "16px",
};

export default function Refund() {
  const { userToken } = useAuth();

  return (
    <>
      <Header />
      <main
        className="flex min-h-full flex-col items-center justify-center gap-8 p-6"
        style={gridStyles}
      >
        <AsideFilter />
        <div>
          {userToken.token == process.env.NEXT_PUBLIC_API_TOKEN_EMPLOYEE && (
            <Typography component="p">Funcionário</Typography>
          )}
          {userToken.token ==
            process.env.NEXT_PUBLIC_API_TOKEN_FINANCE_EMPLOYE && (
            <Typography component="p">Funcionário do Financeiro</Typography>
          )}
        </div>
      </main>
    </>
  );
}
