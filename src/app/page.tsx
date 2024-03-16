"use client";

import useAuth from "@/hooks/useAuth";
import { AuthServices } from "@/services/auth/auth_services";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import { USER_TYPE, UserTypes } from "@/utils/constants/user-type";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const { handleLogin } = useAuth();

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await AuthServices.isAuthenticated();
      if (isAuthenticated) router.push(APP_ROUTES.private.refund);
    };

    checkAuthentication();
  }, []);

  const loginHandler = async (user_type: UserTypes) => {
    try {
      const isLoginSuccessful = await handleLogin(user_type);
      if (isLoginSuccessful) {
        toast.success("Login efetuado com sucesso!");
        router.push(APP_ROUTES.private.refund);
      } else {
        toast.error("Usuário e/ou senha incorretos");
        console.error("error:", ".env.local is not a valid environment");
      }
    } catch (error) {
      console.error("error:", error);
      toast.error("Houve um erro ao realizar o login");
    }
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
          onClick={() => loginHandler(USER_TYPE.EMPLOYEE)}
        >
          Funcionário
        </Button>
        <Button
          variant="contained"
          onClick={() => loginHandler(USER_TYPE.FINANCE_EMPLOYEE)}
        >
          Funcionário do financeiro
        </Button>
      </div>
    </main>
  );
}
