import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug, getAttachmentUrl } from "@/lib/airtable";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;

  const record = await getNewsBySlug(slug);

  if (!record) {
    notFound();
  }

  const f = record.fields;
  const category = f.category || "お知らせ";
  const date = f.published_at;
  const title = f.title;
  const body = f.body ?? "";
  const heroSrc = getAttachmentUrl(f.hero_image_url);

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-3xl px-4 pt-10 space-y-8">
        {/* パンくず的なリンク */}
        <nav className="text-xs text-slate-500">
          <Link href="/news" className="hover:underline">
            お知らせ一覧
          </Link>
          <span className="mx-1">/</span>
          <span className="text-slate-700 line-clamp-1 align-middle">
            {title}
          </span>
        </nav>

        {/* ヘッダー */}
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            {date && <span className="font-semibold">{date}</span>}
            <span className="inline-flex items-center rounded-full bg-[#006400] px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
              {category}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {title}
          </h1>
        </header>

        {/* アイキャッチ画像（Airtable hero_image_url の先頭1枚） */}
        {heroSrc && (
          <div className="overflow-hidden rounded-xl bg-slate-100">
            <img
              src={heroSrc}
              alt={title}
              className="h-60 w-full object-cover md:h-72"
            />
          </div>
        )}

        {/* 本文 */}
        <article className="rounded-xl bg-white p-6 shadow-sm">
          <div className="prose max-w-none text-sm leading-relaxed text-slate-800 prose-p:mb-3 prose-ul:my-3 prose-li:my-1 prose-li:marker:text-slate-400">
            {/* Airtable の長文テキストを改行維持で表示 */}
            <p className="whitespace-pre-line">{body}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
