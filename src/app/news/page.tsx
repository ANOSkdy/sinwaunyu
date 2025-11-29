import Link from "next/link";
import { getAllNews } from "@/lib/airtable";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-10 space-y-10">
        {/* ページタイトル */}
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            News
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            お知らせ
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 md:text-base">
            設備導入や採用情報など、辰和運輸からのお知らせを掲載しています。
          </p>
        </header>

        {/* 一覧 */}
        <section className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-[#d5e3d5] bg-[#f5faf5] shadow-sm">
            <div className="divide-y divide-slate-200">
              {news.map((n) => {
                const category = n.fields.category || "お知らせ";
                const date = n.fields.published_at;
                const title = n.fields.title;
                const slug = n.fields.slug;

                return (
                  <article
                    key={n.id}
                    className="px-4 py-4 transition-colors hover:bg-white/80 md:px-6 md:py-5"
                  >
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
                      {/* 日付 + タグ */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 md:w-64">
                        {date && (
                          <span className="font-semibold">{date}</span>
                        )}
                        <span className="inline-flex items-center rounded-full bg-[#006400] px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
                          {category}
                        </span>
                      </div>
                      {/* タイトル */}
                      <div className="md:flex-1">
                        {slug ? (
                          <Link
                            href={`/news/${slug}`}
                            className="text-sm font-semibold text-slate-900 hover:underline"
                          >
                            {title}
                          </Link>
                        ) : (
                          <p className="text-sm font-semibold text-slate-900">
                            {title}
                          </p>
                        )}
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
