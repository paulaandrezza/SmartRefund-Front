export type LoginForm = {
  username: string;
  password: string;
};

export type LoginFormResponse = {
  token: string;
};

export type ApiLoginResponse = {
  token: string;
  user_type: string;
};
