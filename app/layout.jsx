import "./globals.css";

export const metadata = {
  title: "Leonari Timepieces",
  description: "Fine watches, quietly sourced. Authenticated, curated, delivered with confidence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body">{children}</body>
    </html>
  );
}
