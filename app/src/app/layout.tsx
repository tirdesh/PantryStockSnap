"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProviderWrapper } from "../context/ThemeContext";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper>
          <AuthProvider>
            <div className="layout">
              <Header />
              <main className="content">{children}</main>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
