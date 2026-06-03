import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-[#1e3d2c] text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 border-b border-white/15 pb-14 md:grid-cols-2 md:gap-16">
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">お問い合わせ</h2>
            <p className="mt-4 text-sm leading-8 text-white/75 md:text-base">
              輸送・車両手配・産業廃棄物収集運搬に関するご相談は、こちらからお気軽にご連絡ください。
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-4 text-white transition hover:text-white/80"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-[#1e3d2c] shadow-lg shadow-black/20 transition hover:bg-slate-100 md:h-20 md:w-20">
                →
              </span>
              <span className="text-base font-bold md:text-lg">
                お問い合わせはこちら
              </span>
            </Link>
          </section>

          <section className="md:border-l md:border-white/15 md:pl-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
              Recruit
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">採用について</h2>
            <p className="mt-4 text-sm leading-8 text-white/75 md:text-base">
              安全運転とチームワークを大切にしながら、北海道の物流を支える仲間を募集しています。
            </p>
            <Link
              href="/recruit"
              className="mt-8 inline-flex items-center gap-4 text-white transition hover:text-white/80"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-[#1e3d2c] shadow-lg shadow-black/20 transition hover:bg-slate-100 md:h-20 md:w-20">
                ⧉
              </span>
              <span className="text-base font-bold md:text-lg">
                採用情報はこちら
              </span>
            </Link>
          </section>
        </div>

        <div className="mt-14 space-y-3">
          <div className="text-xl font-bold md:text-2xl">株式会社辰和運輸</div>
          <p className="text-sm leading-7 text-white/75 md:text-base">
            〒061-1433 北海道恵庭市北柏木町5丁目2-1
          </p>
          <p className="text-sm leading-7 text-white/75 md:text-base">
            TEL：0123-33-5273　FAX：0123-33-5287
          </p>
        </div>

        <div className="mt-8 border-t border-white/15 pt-4 text-xs text-white/65 md:flex md:items-center md:justify-between">
          <p>© {year} 株式会社辰和運輸</p>
          <nav className="mt-3 flex flex-wrap gap-4 md:mt-0 md:justify-end">
            <Link href="/company" className="transition hover:text-white">
              事業内容
            </Link>
            <Link href="/service" className="transition hover:text-white">
              車両紹介
            </Link>
            <Link href="/news" className="transition hover:text-white">
              お知らせ
            </Link>
            <Link href="/recruit" className="transition hover:text-white">
              採用情報
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
