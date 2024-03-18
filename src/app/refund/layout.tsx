"use client";

import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="refund-layout-grid-container">
      <Header />
      {children}
    </div>
  );
}
