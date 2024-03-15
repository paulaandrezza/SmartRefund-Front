"use client";

import { AuthServices } from "@/services/auth/auth_services";
import { APP_ROUTES } from "@/utils/constants/app-routes";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function ApplicationContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await AuthServices.isAuthenticated();
      if (!isAuthenticated) router.push(APP_ROUTES.public.root);
    };

    checkAuthentication();
  }, []);

  return children;
}
