import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Sidebar";
import ForYou from "@/components/trending";
import Search from "@/components/Search";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Sosmed apalah namanya",
  description: "Entah lah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex">
          <div className="rounded-lg w-80 ">
            <Navbar />
          </div>
          <div className="grid grid-cols-1 h-screen gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-lg lg:col-span-2">{children}</div>
            <div className="rounded-lg">
              <div className="flex flex-col mx-4">
                <Search />
                <ForYou />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
