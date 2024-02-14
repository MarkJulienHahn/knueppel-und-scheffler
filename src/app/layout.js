import "./globals.css";

export const metadata = {
  title: "KNUEPPEL & SCHEFFLER",
  description:
    "Knueppel & Scheffler ist die Fullservice-Agentur für besondere Events, Award Shows und Markeninszenierungen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}

export const revalidate = 10;
