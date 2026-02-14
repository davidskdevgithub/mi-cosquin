import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ServiceWorkerRegistrar } from "@/features/pwa";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

export const metadata: Metadata = {
  title: "Mi Cosquin",
  description:
    "Una grilla interactiva para el Cosquin Rock, agregar favoritos y compartir con amigos",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mi Cosquin",
  },
};

export const viewport: Viewport = {
  themeColor: "#171717",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          async
          src="https://plausible.io/js/pa-dRNpv6v9twfWfz0lTXHlN.js"
        ></script>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: no tenemos otra forma de cargarlo
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible=window.plausible||function()
              {(window.plausible.q = window.plausible.q || []).push(arguments)}
              ,window.plausible.init=window.plausible.init||function(i){(window.plausible.o = i || {})};
              window.plausible.init()
            `,
          }}
        ></script>
      </head>
      <body>
        <ServiceWorkerRegistrar />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
