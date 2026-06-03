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
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-4xl px-4 pt-10 md:px-6 md:pt-14">
        <nav className="text-xs text-slate-500">
          <Link href="/news" className="font-semibold hover:underline">
            お知らせ一覧
          </Link>
          <span className="mx-2">/</span>
          <span className="align-middle text-slate-700 line-clamp-1">
            {title}
          </span>
        </nav>

        <header className="mt-8 rounded-md bg-[#1e3d2c] px-6 py-8 text-white shadow-sm md:px-8 md:py-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/60">
            News Detail
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {date && <span className="text-xs font-semibold text-white/75">{date}</span>}
            <span className="rounded-sm bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1e3d2c]">
              {category}
            </span>
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-relaxed tracking-tight md:text-4xl">
            {title}
          </h1>
        </header>

        {heroMedia?.length ? (
          <section className="mt-8 space-y-4">
            {heroMedia.map((media, index) => {
              const heroUrl = media.url;
              const heroIsVideo = media.type?.startsWith("video/");

              return (
                <div key={`${heroUrl}-${index}`} className="overflow-hidden rounded-md bg-white shadow-sm">
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
          </section>
        ) : null}

        <article className="mt-8 rounded-md bg-white p-6 shadow-sm md:p-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="mb-4 mt-8 text-2xl font-bold text-slate-900 md:text-3xl"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="mb-4 mt-8 border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold text-slate-900 md:text-2xl"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="mb-3 mt-6 text-base font-bold text-[#1e3d2c] md:text-lg"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="mb-4 text-sm leading-8 text-slate-800 md:text-[0.95rem]"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="mb-4 list-disc pl-5 text-sm leading-8 text-slate-800"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => <li className="my-1" {...props} />,
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-[#1e3d2c]" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="font-bold text-[#1e3d2c] underline-offset-2 hover:underline"
                  {...props}
                />
              ),
            }}
          >
            {body}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
