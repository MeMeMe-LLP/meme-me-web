import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Meme@Me — The Revenge Simulator";
const DESCRIPTION =
  "Bully your own chat. Meme@Me is an asymmetrical, role-reversal Twitch meta-game where the streamer plays an all-powerful troll viewer and chat plays desperate virtual streamers fighting to survive cartoon anvils labeled \"Cringe.\" Coming to Steam.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Meme@Me",
  keywords: [
    "Meme@Me",
    "Revenge Simulator",
    "Twitch game",
    "Twitch Bits",
    "streamer game",
    "indie game",
    "brainrot",
    "Looney Tunes",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Meme@Me",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
