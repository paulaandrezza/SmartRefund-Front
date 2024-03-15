import ApplicationContainer from "@/components/ApplicationContainer";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { lightTheme } from "./theme/themes";

const roboto = Roboto({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Refund",
  description:
    "Projeto de processamento de imagens de notas fiscais para automatização de reembolsos corporativos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <body className={roboto.className}>
          <ApplicationContainer>{children}</ApplicationContainer>
        </body>
      </ThemeProvider>
    </html>
  );
}
