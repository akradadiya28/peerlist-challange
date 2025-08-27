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

export const metadata: Metadata = {
  title: "Peerlist Challenge",
  description: "Peerlist interactive design challenge",
  icons: {
    icon: '/peerlist.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative min-h-screen w-full overflow-hidden">
          {/* base background (dark) */}
          <div className="absolute inset-0 bg-black" />

          {/* grid lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.5,
            }}
          />

          {/* optional tiny dots for texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
              opacity: 0.18,
            }}
          />

          {/* vignette/mask to fade top area like the reference */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 45%, transparent 70%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 45%, transparent 70%)",
            }}
          />

          {/* content */}
          <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}