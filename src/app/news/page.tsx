import Link from "next/link";
import { getAllNews } from "@/lib/airtable";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
            News
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            お知らせ
          </h1>
          <p className="max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
            設備導入、採用情報、事業に関する取り組みなど、辰和運輸からのお知らせを掲載しています。
          </p>
        </header>

        <section className="mt-12 overflow-hidden rounded-md bg-[#173323] shadow-sm">
          <div className="relative min-h-64 px-6 py-10 text-white md:px-10 md:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%),linear-gradient(135deg,#173323_0%,#2a6044_100%)]" />
            <div className="relative max-w-5xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/65">
                Company Updates
              </p>
              <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-snug [text-wrap:balance] md:text-4xl">
                辰和運輸の今を、確かな情報としてお届けします。
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/75">
                会社の取り組み、採用、設備、地域物流に関する更新情報をまとめています。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-8">
          <header className="space-y-3">
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold tracking-wide">
              最新情報
            </h2>
            <p className="max-w-3xl pl-5 text-sm leading-7 text-slate-600">
              公開中のお知らせを新しい順に掲載しています。
            </p>
          </header>

          <div className="overflow-hidden rounded-md bg-white shadow-sm">
            <div className="divide-y divide-slate-100">
              {news.map((n) => {
                const category = n.fields.category || "お知らせ";
                const date = n.fields.published_at;
                const title = n.fields.title;
                const slug = n.fields.slug;

                return (
                  <article key={n.id} className="group transition hover:bg-[#f7faf7]">
                    <div className="grid gap-3 px-5 py-5 md:grid-cols-[14rem,1fr,2rem] md:items-center md:px-7">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        {date && <span className="font-semibold">{date}</span>}
                        <span className="inline-flex rounded-sm bg-[#1e3d2c] px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-white">
                          {category}
                        </span>
                      </div>
                      <div>
                        {slug ? (
                          <Link
                            href={`/news/${slug}`}
                            className="text-sm font-bold leading-7 text-slate-900 transition group-hover:text-[#1e3d2c] md:text-base"
                          >
                            {title}
                          </Link>
                        ) : (
                          <p className="text-sm font-bold leading-7 text-slate-900 md:text-base">
                            {title}
                          </p>
                        )}
                      </div>
                      <div className="hidden text-right text-[#1e3d2c] transition group-hover:translate-x-1 md:block">
                        →
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
