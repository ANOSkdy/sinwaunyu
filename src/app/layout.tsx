import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "株式会社辰和運輸 | 北海道恵庭市の運送・物流・産業廃棄物収集運搬",
  description:
    "株式会社辰和運輸は、北海道恵庭市を拠点に札幌圏・道内一円の一般貨物輸送・重機輸送・産業廃棄物収集運搬を行う運送会社です。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-[var(--color-bg)] text-slate-900">
        <Header />
        {/* 全幅にするため max-w / px を外す */}
        <main className="mt-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
