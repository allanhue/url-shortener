import "./globals.css";

export const metadata = {
  title: "URL Shortener",
  description: "A data-driven URL shortener with analytics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
