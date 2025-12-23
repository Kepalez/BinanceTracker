import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { ThemeToggle } from "../components/layout/ThemeToggle";
import { LanguageProvider } from "../components/providers/LanguageProvider";
import { LanguageToggle } from "../components/layout/LanguageToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shimeji Market",
  description: "Crypto market analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 h-screen overflow-hidden flex flex-col duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <Image 
                    src="/logo.png" 
                    alt="Logo" 
                    fill 
                    className="object-contain"
                    priority
                  />
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Shimeji Market</h1>
              </div>
              <div className="flex items-center gap-2">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </header>

            <main className="flex-1 overflow-hidden relative">
              {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}