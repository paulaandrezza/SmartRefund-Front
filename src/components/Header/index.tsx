import useAuth from "@/hooks/useAuth";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const Header = () => {
  const router = useRouter();
  const { handleLogout } = useAuth();

  const logoutHandler = () => {
    handleLogout();
    toast.success("Logout efetuado com sucesso!");
    router.push(APP_ROUTES.public.login);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, paddingLeft: 4 }}
          >
            Smart Refund
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => logoutHandler()}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
