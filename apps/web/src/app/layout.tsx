import "./globals.css";

// const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:8080";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">{children}</body>
    </html>
  );
}
