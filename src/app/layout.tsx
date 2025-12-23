import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import "./globals.css";

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
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900 h-screen overflow-hidden flex flex-col`}>
        <header className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              fill 
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Shimeji Market</h1>
        </header>

        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </body>
    </html>
  );
}