import { UserTypes } from "@/utils/constants/user-type";

export type LoginForm = {
  user_type: UserTypes;
};

export type LoginFormResponse = {
  token: UserTypes;
};
