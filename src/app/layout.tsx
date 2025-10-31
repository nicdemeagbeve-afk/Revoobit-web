import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider"; // Import ThemeProvider

export const metadata: Metadata = {
  title: "Revoobit Togo Digital Hub | Votre Présence Digitale",
  description: "La plateforme dédiée aux distributeurs Revoobit au Togo : créez et gérez votre site web professionnel pour promouvoir les produits Revoobit et développer votre réseau.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Changed default theme to dark
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}