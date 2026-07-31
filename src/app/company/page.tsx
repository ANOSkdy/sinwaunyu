import Link from "next/link";
import { getCompanyProfile } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const serviceCards = [
  {
    label: "SERVICE 01",
    title: "一般貨物自動車運送事業",
    description:
      "定期便・スポット便など、お客さまの運行計画に合わせて柔軟な輸送体制を構築します。建設資材や機械、一般貨物など幅広い貨物に対応しています。",
    items: ["定期輸送・スポット輸送", "工事現場や倉庫間での資材搬送", "道内各地への長距離輸送"],
  },
  {
    label: "SERVICE 02",
    title: "産業廃棄物収集運搬業",
    description:
      "各種法令や安全基準を遵守しながら、建設現場や工場から排出される産業廃棄物の収集運搬を行います。",
    items: ["許可にもとづく収集運搬", "現場ルールに合わせた積み込み", "処分場までの安全輸送"],
  },
  {
    label: "SERVICE 03",
    title: "物流ソリューション",
    description:
      "舵切り台車やユニック車などの車両特性を生かし、狭小現場や長尺物輸送など難易度の高いご要望にも対応します。",
    items: ["狭小現場での輸送", "積み下ろし作業を含む輸送", "案件ごとのルート設計"],
  },
];

export default async function CompanyPage() {
  const record = await getCompanyProfile();
  const fields = record?.fields ?? {};

  const name = fields.name ?? "株式会社辰和運輸";
  const postal = fields.postal_code ?? "〒061-1433";
  const addressPref = fields.address_pref ?? "北海道";
  const addressCity = fields.address_city ?? "恵庭市";
  const addressLine = fields.address_line ?? "北柏木町5丁目2-1";
  const tel = fields.tel ?? "0123-33-5273";
  const fax = fields.fax ?? "0123-33-5287";
  const licenseInfo =
    fields.license_info ??
    "一般貨物自動車運送事業　北自貨　第802号\n産業廃棄物収集運搬業　許可番号　第188712号";
  const businessContent =
    fields.business_content ??
    "一般貨物自動車運送事業　北自貨　第802号\n産業廃棄物収集運搬業　許可番号　第188712号";
  const establishedOn = fields.established_on ?? "1989年5月";
  const representative = fields.representative ?? "代表取締役　大森 昭彦";
  const capital = fields.capital ?? "3,000万円";
  const employees = fields.employees ?? "47人";
  const qualification = fields.qualification ?? "Gマーク取得済み";

  const fullAddress = `${addressPref}${addressCity}${addressLine}`;
  const companyRows = [
    ["会社名", name],
    ["所在地", `${postal}\n${fullAddress}`],
    ["役員", representative],
    ["設立", establishedOn],
    ["資本金", capital],
    ["事業内容", businessContent],
    ["従業員", employees],
    ["連絡先", `TEL ${tel}\nFAX ${fax}`],
    ["資格", qualification],
    ["許可", licenseInfo],
  ];

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
            Service
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            事業内容
          </h1>
          <p className="max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
            一般貨物輸送と産業廃棄物収集運搬を中心に、北海道恵庭市を拠点として道内一円の物流を支えています。
          </p>
        </header>

        <section className="mt-12 overflow-hidden rounded-md bg-[#173323] shadow-sm">
          <div className="relative h-64 md:h-[360px]">
            <img
              src="/images/company-bg.jpg"
              alt="株式会社辰和運輸の車両が並ぶ様子"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2619]/85 via-[#0f2619]/35 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-8 md:left-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/65">
                Transport & Waste Collection
              </p>
              <p className="mt-3 max-w-4xl text-2xl font-bold leading-snug [text-wrap:balance] md:text-4xl">
                車両・人員・許可を備え、北海道の現場を確実に支えます。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-8">
          <header className="space-y-3">
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold tracking-wide">
              主な事業領域
            </h2>
            <p className="max-w-3xl pl-5 text-sm leading-7 text-slate-600">
              現場や荷主さまのニーズに応じて、柔軟に組み合わせ可能な輸送サービスを提供しています。
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            {serviceCards.map((service) => (
              <article
                key={service.label}
                className="group flex min-h-full flex-col rounded-md bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <span className="w-fit rounded-sm bg-[#1e3d2c] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white">
                  {service.label}
                </span>
                <h3 className="mt-5 text-lg font-bold leading-relaxed text-[#1e3d2c]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2 text-xs leading-6 text-slate-700">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1e3d2c]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 space-y-8">
          <header className="space-y-3">
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold tracking-wide">
              会社情報
            </h2>
            <p className="max-w-3xl pl-5 text-sm leading-7 text-slate-600">
              北海道恵庭市を拠点に、地域に根ざした物流パートナーとして安心と信頼の輸送サービスを提供しています。
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-start">
            <div className="rounded-md bg-white p-6 shadow-sm md:p-8">
              <dl className="divide-y divide-slate-100 text-sm text-slate-800">
                {companyRows.map(([label, value]) => (
                  <div key={label} className="grid gap-2 py-4 md:grid-cols-[8rem,1fr]">
                    <dt className="font-bold text-[#1e3d2c]">{label}</dt>
                    <dd className="whitespace-pre-line leading-7">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-4">
              <div className="rounded-md bg-white p-4 shadow-sm">
                <div className="mb-3 font-bold text-[#1e3d2c]">
                  アクセス
                </div>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-md border border-slate-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23378.429123997634!2d141.51390907431633!3d42.90863680000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f74d7f062fbb3cf%3A0x518dac881162ce79!2z44ix6L6w5ZKM6YGL6Ly4IOacrOekvg!5e0!3m2!1sja!2sjp!4v1731120939970!5m2!1sja!2sjp"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-3 text-xs leading-6 text-slate-600">
                  恵庭市内各方面からアクセスしやすい立地にあり、道内主要エリアへのスムーズな配送に適した拠点です。
                </p>
              </div>

              <div className="rounded-md bg-[#1e3d2c] p-5 text-white shadow-sm">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
                  Contact
                </p>
                <h3 className="mt-3 text-lg font-bold">輸送のご相談はこちら</h3>
                <p className="mt-2 text-xs leading-6 text-white/75">
                  お見積り、産業廃棄物収集運搬、車両手配に関するご相談を承ります。
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex rounded-full bg-white px-5 py-2 text-xs font-bold text-[#1e3d2c] transition hover:bg-slate-100"
                >
                  お問い合わせページへ
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
