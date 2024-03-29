import { Roboto } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/utils/providers/AuthProvider";
import Navbar from "./components/nav/Navbar";
import QueryProvider from "@/utils/providers/QueryProvider/QueryProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "uTalkTo | Admin",
  description: "Generated by webDev2776",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
