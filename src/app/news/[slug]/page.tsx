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
  const heroMedia = heroArray
    ?.filter((att) => att.url)
    ?.sort((a, b) => {
      const aIsVideo = a.type?.startsWith("video/") ?? false;
      const bIsVideo = b.type?.startsWith("video/") ?? false;
      if (aIsVideo === bIsVideo) return 0;
      return aIsVideo ? -1 : 1;
    });

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

        {/* アイキャッチ画像／動画（Airtable hero_image_url 全件、動画優先で表示） */}
        {heroMedia?.length ? (
          <div className="space-y-4">
            {heroMedia.map((media, index) => {
              const heroUrl = media.url;
              const heroIsVideo = media.type?.startsWith("video/");

              return (
                <div key={`${heroUrl}-${index}`} className="overflow-hidden rounded-xl bg-slate-100">
                  {heroIsVideo ? (
                    <video
                      src={heroUrl}
                      className="h-auto w-full"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    />
                  ) : (
                    <img src={heroUrl} alt={title} className="h-auto w-full" />
                  )}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* 本文 */}
        <article className="rounded-xl bg-white p-6 shadow-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="
              prose prose-sm md:prose-base max-w-none
              text-slate-800
              prose-headings:text-slate-900
              prose-h2:text-lg md:prose-h2:text-xl prose-h2:font-semibold
              prose-strong:text-[#006400]
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-ul:list-disc prose-ul:pl-5
            "
          >
            {body}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
