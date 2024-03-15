"use client";

import { AuthServices } from "@/services/auth/auth_services";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import { USER_TYPE } from "@/utils/constants/user-type";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await AuthServices.isAuthenticated();
      if (isAuthenticated) router.push(APP_ROUTES.private.refund);
    };

    checkAuthentication();
  }, []);

  const handleLogin = (
    user_type: (typeof USER_TYPE)[keyof typeof USER_TYPE],
  ) => {
    const isAuth = AuthServices.login({ user_type });
    if (isAuth) router.push(APP_ROUTES.private.refund);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <Image src="/logo.png" alt="logo" width={144} height={144} />

      <Typography component="p">
        Selecione o tipo de funcionário que deseja logar
      </Typography>

      <div className="flex flex-row gap-4 items-center justify-center">
        <Button
          variant="contained"
          onClick={() => handleLogin(USER_TYPE.EMPLOYEE)}
        >
          Funcionário
        </Button>
        <Button
          variant="contained"
          onClick={() => handleLogin(USER_TYPE.FINANCE_EMPLOYEE)}
        >
          Funcionário do financeiro
        </Button>
      </div>
    </main>
  );
}
