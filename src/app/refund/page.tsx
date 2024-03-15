"use client";

import { AuthServices } from "@/services/auth/auth_services";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Refund() {
  const router = useRouter();

  const handleLogout = () => {
    AuthServices.logout();
    router.push(APP_ROUTES.public.root);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <Button variant="contained" onClick={() => handleLogout()}>
        Sair
      </Button>
    </main>
  );
}
