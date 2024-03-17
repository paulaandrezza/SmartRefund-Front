const gridStyles = {
  display: "grid",
  width: "100%",
  height: "100%",
  gridTemplateRows: "64px 1fr",
  gridTemplateAreas: `"header" "main"`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div style={gridStyles}>{children}</div>;
}
