import Navbar from "@/app/components/nav/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-neutral-900">
        <Navbar>{children}</Navbar>
      </body>
    </html>
  );
}
