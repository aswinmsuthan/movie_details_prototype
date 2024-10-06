import type { Metadata } from "next";
import "./styles/globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';  // Add this import

export const metadata: Metadata = {
  title: "MovieLore",
  description: "Where movies come to life",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />  {/* Add the Footer component here */}
      </body>
    </html>
  );
}
