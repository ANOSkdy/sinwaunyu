import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getNewsBySlug } from "@/lib/airtable";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

type HeroAttachment = {
  url: string;
  type?: string;
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
  const heroArray = Array.isArray(f.hero_image_url)
    ? (f.hero_image_url as HeroAttachment[])
    : undefined;
  const videoHero = heroArray?.find((att) => att.type?.startsWith("video/"));
  const imageHero = heroArray?.find((att) => att.type?.startsWith("image/"));
  const hero = videoHero ?? imageHero;
  const heroUrl = hero?.url;
  const heroIsVideo = hero?.type?.startsWith("video/");

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

        {/* アイキャッチ画像／動画（Airtable hero_image_url の先頭1件） */}
        {heroUrl && (
          <div className="overflow-hidden rounded-xl bg-slate-100">
            {heroIsVideo ? (
              <video
                src={heroUrl}
                className="h-60 w-full object-cover md:h-72"
                autoPlay
                loop
                muted
                playsInline
                controls
              />
            ) : (
              <img src={heroUrl} alt={title} className="h-60 w-full object-cover md:h-72" />
            )}
          </div>
        )}

        {/* 本文 */}
        <article className="rounded-xl bg-white p-6 shadow-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose prose-sm max-w-none text-slate-800 prose-p:mb-3 prose-strong:text-[#006400] prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:my-1"
          >
            {body}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
