import type { Metadata } from "next";
import { getRentalForklifts } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "フォークリフトレンタル | 株式会社辰和運輸",
  description:
    "道央圏の現場に即対応。1.5t〜6tフォークリフトレンタル、ロングサヤ標準装備、屋外・重量物対応のディーゼル車もご相談ください。",
};

const strengths = [
  {
    title: "ロングサヤ無料標準装備",
    lead: "200cm・170cmの長爪を本体料金のみでセット",
    body: "パレットの2枚抜きや、長尺の建材・木材・鋼材の荷下ろしにすぐ使えます。大手レンタル会社で別料金や在庫切れになりがちなアタッチメントも、現場に合わせてご相談ください。",
  },
  {
    title: "屋外・重量物に強い車両",
    lead: "2.5t〜6tのディーゼル車を中心に対応",
    body: "悪路や重負荷の現場で力を発揮するディーゼル車を保有。道央圏で希少な6t大型ディーゼルリフトも、石材・木材・産廃・解体現場などで活用できます。",
  },
  {
    title: "他社見積もり対抗",
    lead: "短期・スポット利用も歓迎",
    body: "現在ご利用中、または検討中の他社お見積書や請求書があればご提示ください。稼働状況に応じ、安心価格でご提案します。",
  },
];

const defaultForklifts = [
  {
    id: "fallback-komatsu-6t-diesel",
    maker: "コマツ",
    capacity: "6.0t",
    power: "ディーゼル",
    forkLength: "標準爪 ＋ サヤ200cm",
    usage: "鋼材・木材（原木）・コンクリート・重量物",
  },
  {
    id: "fallback-komatsu-25t-diesel",
    maker: "コマツ",
    capacity: "2.5t",
    power: "ディーゼル（4台）",
    forkLength: "標準爪 ＋ サヤ170cm",
    usage: "資材置場・産廃・解体・屋外のあらゆる現場",
  },
  {
    id: "fallback-mitsubishi-25t-diesel",
    maker: "三菱",
    capacity: "2.5t",
    power: "ディーゼル（1台）",
    forkLength: "標準爪 ＋ サヤ170cm",
    usage: "建材・地場産業・屋外作業",
  },
  {
    id: "fallback-unicarriers-25t-diesel",
    maker: "ユニキャリア",
    capacity: "2.5t",
    power: "ディーゼル（1台）",
    forkLength: "標準爪 ＋ サヤ170cm",
    usage: "鉄工所・仮設資材・引越し現場",
  },
  {
    id: "fallback-komatsu-25t-gasoline",
    maker: "コマツ",
    capacity: "2.5t",
    power: "ガソリン（1台）",
    forkLength: "標準爪 ＋ サヤ170cm",
    usage: "倉庫内・排気を抑えたい半屋外",
  },
  {
    id: "fallback-mitsubishi-15t-diesel",
    maker: "三菱",
    capacity: "1.5t",
    power: "ディーゼル（1台）",
    forkLength: "標準爪 ＋ サヤ170cm",
    usage: "狭い現場・小回りの必要な資材移動",
  },
  {
    id: "fallback-komatsu-25t-battery",
    maker: "コマツ",
    capacity: "2.5t",
    power: "バッテリー（1台）",
    forkLength: "標準爪 ＋ サヤ170cm",
    usage: "食品工場・水産加工・農産物倉庫（屋内専用）",
  },
];

const useCases = [
  {
    title: "繁忙期・スポットの増車に",
    body: "収穫期、新倉庫立ち上げ、突発的な大型貨物の入庫など、1ヶ月単位から柔軟にご相談いただけます。",
  },
  {
    title: "自社リフトの車検・修理中の代車に",
    body: "特定自主検査や故障修理の期間中も、現場の業務を止めないための代替機として活用できます。",
  },
];

const serviceAreas = [
  "札幌市",
  "千歳市",
  "恵庭市",
  "北広島市",
  "苫小牧市",
  "石狩市",
  "江別市",
  "小樽市",
  "岩見沢市",
];

export default async function RentalPage() {
  const rentalRecords = await getRentalForklifts(20);
  const forklifts = rentalRecords.length
    ? rentalRecords.map((record) => ({
        id: record.id,
        maker: record.fields.maker ?? "-",
        capacity: record.fields.capacity ?? "-",
        power: record.fields.power ?? "-",
        forkLength: record.fields.fork_length ?? "-",
        usage: record.fields.usage ?? "-",
      }))
    : defaultForklifts;

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <header className="grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-end">
          <div className="max-w-3xl space-y-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
              Forklift Rental
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              道央圏の現場に即対応するフォークリフト・レンタル
            </h1>
            <p className="max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
              大手に在庫がない、長爪を使いたい、屋外用の強いディーゼル車が欲しい。
              辰和運輸が、1.5t〜6tのフォークリフトで現場の荷役を支えます。
            </p>
          </div>

          <div className="rounded-md bg-[#1e3d2c] p-6 text-white shadow-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
              Contact
            </p>
            <p className="mt-3 text-2xl font-bold">0123-33-5273</p>
            <p className="mt-2 text-sm leading-7 text-white/75">
              担当：石塚／料金・在庫・現場に合うリフトをお気軽にご相談ください。
            </p>
            <a
              href="/contact"
              className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100"
            >
              WEBから問い合わせる
            </a>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-md bg-[#173323] shadow-sm">
          <div className="relative min-h-[360px] px-6 py-12 text-white md:px-10 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.16),_transparent_34%),linear-gradient(135deg,_#0f2619,_#1e3d2c_58%,_#2a6044)]" />
            <div className="relative max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/65">
                1.5t - 6t / Long Fork / Diesel
              </p>
              <h2 className="mt-6 text-3xl font-bold leading-tight md:text-5xl">
                ロングサヤ標準装備。屋外・重量物の現場にも即戦力を。
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
                パレット2枚抜き、長尺資材、石材、木材、産廃、解体現場まで。
                自社運送の強みを活かし、回送手配も柔軟に対応します。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {strengths.map((strength, index) => (
            <article key={strength.title} className="rounded-md bg-white p-6 shadow-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1e3d2c] font-mono text-xs font-bold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-5 text-lg font-bold text-[#1e3d2c]">
                {strength.title}
              </h2>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {strength.lead}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {strength.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-16 space-y-8">
          <header className="space-y-3">
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold tracking-wide">
              保有車両・スペック一覧
            </h2>
            <p className="max-w-3xl pl-5 text-sm leading-7 text-slate-600">
              現場に合わせて選びやすいよう、メーカー・トン数・動力・爪の長さ・用途を掲載しています。
              在庫状況や料金はお問い合わせください。
            </p>
          </header>

          <div className="overflow-hidden rounded-md bg-white shadow-sm">
            <div className="hidden grid-cols-[1fr_0.8fr_1.1fr_1.5fr_2fr] gap-0 bg-[#1e3d2c] text-xs font-bold tracking-[0.16em] text-white md:grid">
              <div className="px-4 py-4">メーカー</div>
              <div className="px-4 py-4">トン数</div>
              <div className="px-4 py-4">動力</div>
              <div className="px-4 py-4">爪の長さ</div>
              <div className="px-4 py-4">最適な用途・現場</div>
            </div>
            <div className="divide-y divide-slate-100">
              {forklifts.map((forklift) => (
                <article
                  key={forklift.id}
                  className="grid gap-3 px-5 py-5 text-sm md:grid-cols-[1fr_0.8fr_1.1fr_1.5fr_2fr] md:gap-0 md:px-0 md:py-0"
                >
                  <div className="font-bold text-[#1e3d2c] md:px-4 md:py-4">
                    <span className="mr-2 text-[10px] font-semibold text-slate-400 md:hidden">
                      メーカー
                    </span>
                    {forklift.maker}
                  </div>
                  <div className="text-slate-700 md:px-4 md:py-4">
                    <span className="mr-2 text-[10px] font-semibold text-slate-400 md:hidden">
                      トン数
                    </span>
                    {forklift.capacity}
                  </div>
                  <div className="text-slate-700 md:px-4 md:py-4">
                    <span className="mr-2 text-[10px] font-semibold text-slate-400 md:hidden">
                      動力
                    </span>
                    {forklift.power}
                  </div>
                  <div className="text-slate-700 md:px-4 md:py-4">
                    <span className="mr-2 text-[10px] font-semibold text-slate-400 md:hidden">
                      爪の長さ
                    </span>
                    {forklift.forkLength}
                  </div>
                  <div className="leading-7 text-slate-600 md:px-4 md:py-4">
                    <span className="mr-2 text-[10px] font-semibold text-slate-400 md:hidden">
                      用途
                    </span>
                    {forklift.usage}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-md bg-white p-6 shadow-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Use Case
            </p>
            <h2 className="mt-3 text-xl font-bold text-[#1e3d2c]">
              このようなシーンでご活用ください
            </h2>
            <div className="mt-6 space-y-5">
              {useCases.map((item) => (
                <div key={item.title} className="border-l-4 border-[#1e3d2c] pl-4">
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md bg-[#173323] p-6 text-white shadow-sm">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
              Area
            </p>
            <h2 className="mt-3 text-xl font-bold">対応エリア</h2>
            <p className="mt-3 text-sm leading-7 text-white/75">
              道央圏全域に対応。運搬・回送の手配についても、自社運送のアドバンテージを活かして柔軟に対応します。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-md bg-[#1e3d2c] px-6 py-8 text-white md:flex md:items-center md:justify-between md:px-8">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
              Estimate
            </p>
            <h2 className="text-2xl font-bold">
              今すぐ借りたい・料金を知りたい方へ
            </h2>
            <p className="text-sm leading-7 text-white/75">
              現場に合うリフトの選定、短期利用、他社お見積もり対抗もご相談ください。
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0">
            <a
              href="tel:0123335273"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100"
            >
              電話する
            </a>
            <a
              href="/contact"
              className="inline-flex rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              お問い合わせフォーム
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
