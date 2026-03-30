import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "next-themes";
import UrlProvider from "@/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "shrtnr.in",
  description: "URL shortner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} ${geistSans.variable}  antialiased`}
      >
        <UrlProvider>
          <ThemeProvider attribute={"class"}>
            <main className="min-h-screen container max-w-7xl px-4 mx-auto">
              <Header />
              {children}
            </main>

            <footer className="py-6 mt-10 text-center bg-secondary">
              <p>Made by Nayedul Alam</p>
            </footer>
          </ThemeProvider>
        </UrlProvider>

      </body>
    </html>
  );
}
