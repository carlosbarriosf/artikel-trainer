
import AuthProvider from '@components/AuthProvider';
import NavBar from '@components/NavBar';
import '@styles/globals.css';


export const metadata = {
  title: "Artikel Trainer",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <AuthProvider>
          <main className='main'>
            <NavBar />
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
