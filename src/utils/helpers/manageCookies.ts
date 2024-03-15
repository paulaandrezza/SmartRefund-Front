"use server";

import { cookies } from "next/headers";

const APP_KEY = "SMART_REFUND";

export const saveCookie = (userToken: string) => {
  cookies().set(`${APP_KEY}_USER_TOKEN`, userToken);
};

export const removeCookie = () => {
  cookies().set(`${APP_KEY}_USER_TOKEN`, "", {
    maxAge: 0,
  });
};

export const getCookie = () => {
  return cookies().get(`${APP_KEY}_USER_TOKEN`);
};

export const isAuthenticated = async () => {
  const cookieValue = await getCookie();
  return cookieValue !== undefined;
};
