import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Grilla Cosquin Rock",
  description:
    "Una grilla interactiva para el Cosquin Rock, agregar favoritos y compartir con amigos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
