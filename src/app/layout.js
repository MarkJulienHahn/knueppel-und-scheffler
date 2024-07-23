"use client";

import Head from "next/head";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <Head>
        <title>KNUEPPEL & SCHEFFLER</title>
        <meta
          name="description"
          content="Knueppel & Scheffler ist die Fullservice-Agentur für besondere Events, Award Shows und Markeninszenierungen."
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}

export const revalidate = 10;
