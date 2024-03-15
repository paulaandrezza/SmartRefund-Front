import { USER_TYPE } from "@/utils/constants/user-type";

export type LoginForm = {
  user_type: (typeof USER_TYPE)[keyof typeof USER_TYPE];
};

export type LoginFormResponse = {
  token: string;
};
