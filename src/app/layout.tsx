// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";
// 1. Importar el Provider y el Toggle
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { ThemeToggle } from "../components/layout/ThemeToggle";

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
      {/* suppressHydrationWarning es necesario para next-themes en el html tag */}
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 h-screen overflow-hidden flex flex-col duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* Header Actualizado */}
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
            
            {/* Botón de cambio de tema a la derecha */}
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-hidden relative">
            {children}
          </main>
        
        </ThemeProvider>
      </body>
    </html>
  );
}