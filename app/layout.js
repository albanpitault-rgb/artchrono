// app/layout.js
import "./globals.css";

export const metadata = {
  title: "ArtChrono — Quiz d’Histoire de l’art",
  description: "Devine siècle et année en 20s, indices à la clé. Images sourcées.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}



