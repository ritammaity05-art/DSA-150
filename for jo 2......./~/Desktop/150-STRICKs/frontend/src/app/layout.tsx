import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "150 STRICKs - Master Top 150 Coding Interview Problems | Powered by Ritam",
  description: "150 STRICKs: Master Top 150 Data Structures and Algorithms problems intuitively with real-life analogies, animated visual dry runs, bilingual explanations, and progressive hints. Powered by Ritam.",
  keywords: ["150 STRICKs", "150 STRICKS", "DSA", "LeetCode 150", "NeetCode alternative", "Coding Interview", "Data Structures", "Algorithms", "Bengali DSA", "Ritam DSA"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-amber-500/30 selection:text-amber-200">
        <ThemeProvider>
          <AuthProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
