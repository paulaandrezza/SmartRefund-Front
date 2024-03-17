"use client";

import useAuth from "@/hooks/useAuth";
import { LoginForm } from "@/types/auth/login";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import { isAuthenticated } from "@/utils/helpers/manageCookies";
import { yupResolver } from "@hookform/resolvers/yup";
import { AccountCircle, LockRounded } from "@mui/icons-material";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

const gridStyles = {
  display: "grid",
  width: "100%",
  height: "100vh",
  gridTemplateColumns: "1fr 1fr",
  gap: "32px",
  placeItems: "center",
};

export default function Login() {
  const router = useRouter();
  const { handleLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const isLoginSuccessful = await handleLogin(data);
      const isAuth = await isAuthenticated();

      if (isLoginSuccessful && isAuth) {
        toast.success("Login efetuado com sucesso!");
        router.push(APP_ROUTES.private.refund);
      } else {
        toast.error("Usuário e/ou senha incorretos");
      }
    } catch (error) {
      console.error("error:", error);
      toast.error("Houve um erro ao realizar o login");
    }
  };

  return (
    <main style={gridStyles}>
      <div className="bg-green-50 w-full h-full flex flex-col items-center justify-center gap-4">
        <Image src="/banner.svg" alt="logo" width={300} height={300} />
        <span className="w-24 h-4 bg-[#bfe5cf] rounded-full" />
        <div className="flex flex-col items-center justify-center gap-1 mt-4">
          <Typography align="center" variant="body1">
            Deixe a inteligência artificial cuidar das notas fiscais para você.
          </Typography>
          <Typography align="center" variant="body1">
            <b>Processo de reembolso fácil e eficiente!</b>
          </Typography>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-96 flex-col justify-between items-center gap-10"
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <Image src="/logo.png" alt="logo" width={80} height={80} />
          <Typography align="center" variant="h6" color="primary">
            <b>Smart Refund</b>
          </Typography>
        </div>
        <Typography align="center" variant="body1">
          Bem-vindo de volta! Por favor, faça login para continuar de onde
          parou.
        </Typography>
        <div className="flex flex-col gap-8 w-full">
          <TextField
            id="input-with-icon-textfield"
            label="Username"
            variant="outlined"
            {...register("username")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            error={!!errors?.username?.message}
            helperText={errors?.username?.message}
          />
          <TextField
            type="password"
            id="input-with-icon-textfield"
            label="Senha"
            variant="outlined"
            {...register("password")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRounded />
                </InputAdornment>
              ),
            }}
            error={!!errors?.password?.message}
            helperText={errors?.password?.message}
          />
        </div>

        <Button type="submit" variant="contained" className="w-full">
          Entrar
        </Button>
      </form>
    </main>
  );
}
