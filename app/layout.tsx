import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./global/components/navbar";
import getSiteContent from "./global/api/site";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();

  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.title.default,
      template: site.title.template,
    },
  };
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSiteContent();

  return (
    <html
      lang={site.locale}
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
        <Navbar brand={site.brand} open_menu={site.open_menu} close_menu={site.close_menu} />
        <main className="flex min-h-dvh flex-col px-1 pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
