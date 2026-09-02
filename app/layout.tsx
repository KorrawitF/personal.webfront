import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./global/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Korrawit",
    template: "Korrawit • %s",
  },
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased`}
    >
      <body>
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10
            bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)]
            bg-size-[40px_40px]
            mask-[radial-gradient(ellipse_at_center,#000_70%,transparent_100%)]
            [-webkit-mask-image:radial-gradient(ellipse_at_center,#000_70%,transparent_100%)]"
        />
        <Navbar />
        <main className="flex min-h-dvh flex-col px-1 pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
