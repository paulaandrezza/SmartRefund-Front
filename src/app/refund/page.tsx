"use client";

import useAuth from "@/hooks/useAuth";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Refund() {
  const router = useRouter();
  const { handleLogout, userToken } = useAuth();

  const logoutHandler = () => {
    handleLogout();
    toast.success("Logout efetuado com sucesso!");
    router.push(APP_ROUTES.public.root);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      {userToken.token == process.env.NEXT_PUBLIC_API_TOKEN_EMPLOYEE && (
        <Typography component="p">Funcionário</Typography>
      )}
      {userToken.token == process.env.NEXT_PUBLIC_API_TOKEN_FINANCE_EMPLOYE && (
        <Typography component="p">Funcionário do Financeiro</Typography>
      )}
      <Button variant="contained" onClick={() => logoutHandler()}>
        Sair
      </Button>
    </main>
  );
}
