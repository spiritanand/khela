import "./globals.css";

// const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8080";
import { Roboto_Mono } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const rm = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rm.className}>
      <body className="dark">{children}</body>
    </html>
  );
}
