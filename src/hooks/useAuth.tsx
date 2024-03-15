import { AuthServices } from "@/services/auth/auth_services";
import { LoginFormResponse } from "@/types/auth/login";
import { USER_TYPE } from "@/utils/constants/user-type";
import { removeCookie, saveCookie } from "@/utils/helpers/manageCookies";
import { createContext, useCallback, useContext, useState } from "react";

type IAuthContextData = {
  userToken: LoginFormResponse;
  handleLogin: (
    user_type: (typeof USER_TYPE)[keyof typeof USER_TYPE],
  ) => Promise<boolean>;
  handleLogout: () => void;
};

const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<LoginFormResponse>(
    {} as LoginFormResponse,
  );

  const handleLogin = async (
    user_type: (typeof USER_TYPE)[keyof typeof USER_TYPE],
  ) => {
    try {
      const isAuth = AuthServices.login({ user_type });

      setUserToken(isAuth);
      if (isAuth.token !== "") {
        saveCookie(isAuth.token);
      } else {
        throw new Error("Token not found for the provided user type");
      }

      return true;
    } catch (error) {
      console.error("error:", error);
      return false;
    }
  };

  const handleLogout = useCallback(() => {
    setUserToken({} as LoginFormResponse);
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
