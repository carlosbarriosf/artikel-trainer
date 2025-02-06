import AuthProvider from "@components/AuthProvider";
import Footer from "@components/Footer";
import NavBar from "@components/NavBar";
import "@styles/globals.css";
import { Suspense } from "react";

export const metadata = {
  title: "Artikel Trainer",
  description: "Practice german articles the fun way!",
  icons: "/artikel-trainer-logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <AuthProvider>
            <main className="main">
              <NavBar />
              {children}
              <Footer />
            </main>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
