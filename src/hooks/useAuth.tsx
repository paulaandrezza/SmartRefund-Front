import { AuthServices } from "@/services/auth/auth_services";
import { ApiLoginResponse, LoginForm } from "@/types/auth/login";
import { removeCookie, saveCookie } from "@/utils/helpers/manageCookies";
import { createContext, useCallback, useContext, useState } from "react";

type IAuthContextData = {
  userToken: ApiLoginResponse;
  handleLogin: (loginForm: LoginForm) => Promise<boolean>;
  handleLogout: () => void;
};

const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<ApiLoginResponse>(
    {} as ApiLoginResponse,
  );

  const handleLogin = async (loginForm: LoginForm) => {
    try {
      const { data } = await AuthServices.login(loginForm);

      setUserToken(data);
      if (data.token !== "") {
        saveCookie(data.token);
      } else {
        throw new Error(
          "Token not found for the provided user type. Check the .env.local file",
        );
      }

      return true;
    } catch (error) {
      console.error("error:", error);
      return false;
    }
  };

  const handleLogout = useCallback(() => {
    setUserToken({} as ApiLoginResponse);
    removeCookie();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used with AuthProvider");
  }

  return context;
};

export default useAuth;
