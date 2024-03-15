import { LoginForm } from "@/types/auth/login";
import { USER_TYPE } from "@/utils/constants/user-type";
import {
  getCookie,
  removeCookie,
  saveCookie,
} from "@/utils/helpers/manageCookies";

export const AuthServices = {
  login(loginForm: LoginForm): boolean {
    try {
      let token = "";

      if (loginForm.user_type === USER_TYPE.EMPLOYEE) {
        token = process.env.NEXT_PUBLIC_API_TOKEN_EMPLOYEE || "";
      } else if (loginForm.user_type === USER_TYPE.FINANCE_EMPLOYEE) {
        token = process.env.NEXT_PUBLIC_API_TOKEN_FINANCE_EMPLOYE || "";
      } else {
        throw new Error("Invalid user type");
      }

      if (token) {
        saveCookie(token);
        return true;
      } else {
        throw new Error("Token not found for the provided user type");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  },

  logout(): void {
    removeCookie();
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await getCookie();
      return !!token;
    } catch (error) {
      return false;
    }
  },
};
