import "./globals.css";

export const metadata = {
  title: "Password Strength Checker",
  description: "A simple password strength checker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
