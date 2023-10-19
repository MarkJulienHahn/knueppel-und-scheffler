import "./globals.css";

export const metadata = {
  title: "KUEPPEL & SCHEFFLER",
  description:
    "Full-service event agency for event management, event organization, event coordination, guest management, guest relations, guest services, and invitation management in Berlin.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export const revalidate = 10;
