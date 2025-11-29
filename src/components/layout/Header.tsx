"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// 「会社情報」は除外
const navItems = [
  { href: "/company", label: "事業内容" },
  { href: "/service", label: "車両紹介" },
  { href: "/news", label: "お知らせ" },
  { href: "/recruit", label: "採用情報" },
  { href: "/contact", label: "お問い合わせ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* 左端：ロゴ＋社名 */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white">
            <Image
              src="/images/logo_sinwa.png"
              alt="株式会社辰和運輸ロゴ"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            株式会社辰和運輸
          </span>
        </Link>

        {/* PCナビ */}
        <nav className="hidden gap-6 text-sm font-medium text-slate-700 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* モバイルメニュー */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="メニュー"
          className="inline-flex items-center rounded-full border border-slate-200 p-3 text-slate-700 transition hover:bg-slate-50 md:hidden"
        >
          <span className="relative flex h-4 w-6 flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-slate-800 transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-full bg-slate-800 transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`block h-0.5 w-full bg-slate-800 transition-transform duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* モバイルナビ */}
      {open &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex justify-end md:hidden ${
              open ? "pointer-events-auto" : "pointer-events-none"
            }`}
            aria-hidden={!open}
          >
            <button
              type="button"
              aria-label="メニューを閉じる"
              className={`absolute inset-0 h-full w-full bg-slate-900/30 backdrop-blur-sm transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setOpen(false)}
            />
            <nav
              id="mobile-nav"
              aria-label="スマートフォン向けメニュー"
              className={`relative z-10 flex h-full w-80 max-w-[90%] flex-col bg-white shadow-2xl transition-transform duration-300 ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <span className="text-base font-semibold text-slate-900">メニュー</span>
                <button
                  type="button"
                  aria-label="メニューを閉じる"
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 pb-6 pt-4 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-3 text-slate-800 transition hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>,
          document.body
        )}
    </header>
  );
}
