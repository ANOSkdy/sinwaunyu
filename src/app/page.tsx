import Link from "next/link";
import { getLatestNews, getVehicles, getAttachmentUrl } from "@/lib/airtable";

const serviceCards = [
  {
    label: "SERVICE 01",
    title: "一般貨物自動車運送事業",
    description: "定期・スポット便など、お客様のニーズに合わせた柔軟な輸送サービスを提供します。",
  },
  {
    label: "SERVICE 02",
    title: "産業廃棄物収集運搬業",
    description: "許可に基づき、法令を遵守した適正な産業廃棄物の収集運搬を行います。",
  },
  {
    label: "SERVICE 03",
    title: "物流ソリューション",
    description: "重機輸送や特殊車両による輸送など、個別のご要望にも対応いたします。",
  },
];

export default async function HomePage() {
  const [news, vehicles] = await Promise.all([
    getLatestNews(5),
    getVehicles(2),
  ]);

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <section className="relative h-[72vh] min-h-[440px] w-full overflow-hidden bg-slate-900 md:h-[86vh] md:min-h-[560px]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/tatsuwa-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2619]/85 via-black/35 to-black/20" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-4 text-white md:px-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-white/60">
              Hokkaido Eniwa Logistics
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              安心・安全・信頼で、北海道の現場を支える。
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
              株式会社辰和運輸は、一般貨物輸送・重機輸送・産業廃棄物収集運搬を通じて、地域の物流と現場を支えます。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/company"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100"
              >
                事業内容を見る
              </Link>
              <Link
                href="/service"
                className="rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                車両紹介を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-16 max-w-6xl space-y-20 px-4 md:px-6">
        <section className="space-y-8">
          <header className="space-y-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
              News
            </p>
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-2xl font-bold tracking-wide">
              お知らせ
            </h2>
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

          <Link
            href="/news"
            className="inline-flex rounded-full bg-[#1e3d2c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2a5240]"
          >
            お知らせ一覧を見る
          </Link>
        </section>

        <section id="services" className="space-y-8">
          <header className="space-y-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
              Services
            </p>
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-2xl font-bold tracking-wide">
              事業内容
            </h2>
            <p className="max-w-3xl pl-5 text-sm leading-7 text-slate-600">
              一般貨物輸送と産業廃棄物収集運搬を中心に、道内の多様な物流ニーズにお応えします。
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            {serviceCards.map((service) => (
              <article
                key={service.label}
                className="group rounded-md bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="rounded-sm bg-[#1e3d2c] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                  {service.label}
                </span>
                <h3 className="mt-5 text-lg font-bold leading-relaxed text-[#1e3d2c]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
                <Link
                  href="/company"
                  className="mt-5 inline-flex text-sm font-bold text-[#1e3d2c] hover:underline"
                >
                  詳しく見る
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <header className="space-y-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
              Fleet
            </p>
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-2xl font-bold tracking-wide">
              車両紹介
            </h2>
            <p className="max-w-3xl pl-5 text-sm leading-7 text-slate-600">
              ニーズに応じた多様な車両を保有し、日々の輸送業務を支えています。
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            {vehicles.map((v) => {
              const imageSrc = getAttachmentUrl(v.fields.image_url);

              return (
                <article
                  key={v.id}
                  className="group overflow-hidden rounded-md bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#1e3d2c]">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={v.fields.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#173323] to-[#2a6044] text-5xl">
                        🚚
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2619]/70 via-transparent to-transparent" />
                    {v.fields.vehicle_type && (
                      <span className="absolute bottom-4 left-4 rounded-sm bg-white/90 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-[#1e3d2c]">
                        {v.fields.vehicle_type}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-[#1e3d2c]">{v.fields.name}</h3>
                    {v.fields.description && (
                      <p className="mt-3 line-clamp-3 text-xs leading-6 text-slate-600">
                        {v.fields.description}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <Link
            href="/service"
            className="inline-flex rounded-full bg-[#1e3d2c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2a5240]"
          >
            車両一覧を見る
          </Link>
        </section>

        <section className="overflow-hidden rounded-md bg-[#1e3d2c] px-6 py-10 text-white shadow-sm md:px-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/60">
                Recruit
              </p>
              <h2 className="mt-4 text-2xl font-bold leading-relaxed md:text-3xl">
                一緒に走る仲間を募集しています。
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-white/75">
                安全運転とチームワークを大切にしながら、地域の物流を支えていくドライバーやスタッフを募集しています。
              </p>
              <Link
                href="/recruit"
                className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100"
              >
                採用情報を見る
              </Link>
            </div>
            <div className="hidden justify-end md:flex">
              <span className="pointer-events-none select-none text-5xl font-bold tracking-[0.25em] text-white/15 md:text-7xl">
                WORK
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
