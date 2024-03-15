"use client";

import useAuth from "@/hooks/useAuth";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Refund() {
  const router = useRouter();
  const { handleLogout, userToken } = useAuth();

  console.log(userToken);

  const logoutHandler = () => {
    handleLogout();
    toast.success("Logout efetuado com sucesso!");
    router.push(APP_ROUTES.public.root);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <Button variant="contained" onClick={() => logoutHandler()}>
        Sair
      </Button>
    </main>
  );
}
