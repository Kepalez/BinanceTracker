// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Aquí importaríamos el componente Sidebar más adelante
// import Sidebar from "@/components/layout/Sidebar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Binance Tracker",
  description: "Crypto market analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-50 text-slate-900 h-screen overflow-hidden flex`}>
        {/* Sidebar: Oculto en móvil, fijo en desktop */}
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white p-4">
          <h1 className="text-xl font-bold text-blue-600 mb-6">CryptoView</h1>
          <nav>
            {/* Links placeholder */}
            <div className="p-2 bg-blue-50 text-blue-700 rounded-md">Market</div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Header móvil podría ir aquí */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}