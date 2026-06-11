import Link from "next/link";
import { getRentalForklifts, type RentalForkliftFields } from "@/lib/airtable";

export const metadata = {
  title: "フォークリフトレンタル | 株式会社辰和運輸",
  description:
    "道央圏の現場に即対応する1.5t〜6tフォークリフトレンタル。ロングサヤ無料標準装備、短期・スポット利用も歓迎します。",
};

type RentalForklift = {
  id: string;
  fields: RentalForkliftFields;
};

const fallbackRentalForklifts: RentalForklift[] = [
  {
    id: "fallback-komatsu-6t-diesel",
    fields: {
      maker: "コマツ",
      capacity: "6.0t",
      power: "ディーゼル",
      fork_length: "標準爪 ＋ サヤ200cm",
      usage: "鋼材・木材（原木）・コンクリート・重量物",
    },
  },
  {
    id: "fallback-komatsu-25t-diesel",
    fields: {
      maker: "コマツ",
      capacity: "2.5t",
      power: "ディーゼル（4台）",
      fork_length: "標準爪 ＋ サヤ170cm",
      usage: "資材置場・産廃・解体・屋外のあらゆる現場",
    },
  },
  {
    id: "fallback-mitsubishi-25t-diesel",
    fields: {
      maker: "三菱",
      capacity: "2.5t",
      power: "ディーゼル（1台）",
      fork_length: "標準爪 ＋ サヤ170cm",
      usage: "建材・地場産業・屋外作業",
    },
  },
  {
    id: "fallback-unicarriers-25t-diesel",
    fields: {
      maker: "ユニキャリア",
      capacity: "2.5t",
      power: "ディーゼル（1台）",
      fork_length: "標準爪 ＋ サヤ170cm",
      usage: "鉄工所・仮設資材・引越し現場",
    },
  },
  {
    id: "fallback-komatsu-25t-gasoline",
    fields: {
      maker: "コマツ",
      capacity: "2.5t",
      power: "ガソリン（1台）",
      fork_length: "標準爪 ＋ サヤ170cm",
      usage: "倉庫内・排気を抑えたい半屋外",
    },
  },
  {
    id: "fallback-mitsubishi-15t-diesel",
    fields: {
      maker: "三菱",
      capacity: "1.5t",
      power: "ディーゼル（1台）",
      fork_length: "標準爪 ＋ サヤ170cm",
      usage: "狭い現場・小回りの必要な資材移動",
    },
  },
  {
    id: "fallback-komatsu-25t-battery",
    fields: {
      maker: "コマツ",
      capacity: "2.5t",
      power: "バッテリー（1台）",
      fork_length: "標準爪 ＋ サヤ170cm",
      usage: "食品工場・水産加工・農産物倉庫（屋内専用）",
    },
  },
];

const rentalHighlights = [
  "道央圏の現場に即対応",
  "1.5t〜6t フォークリフトレンタル",
  "ロングサヤ無料標準装備",
  "短期・スポット利用歓迎",
];

const strengths = [
  {
    title: "200cm・170cm ロングサヤ無料標準装備",
    text: "標準爪に加えて長尺物に対応しやすいサヤを装備。鋼材・木材・建材など幅広い荷姿に対応します。",
  },
  {
    title: "屋外・重量物に強いディーゼル車",
    text: "資材置場、解体、産廃、仮設資材など、屋外現場で求められる力強い荷役を支えます。",
  },
  {
    title: "6t大型ディーゼルリフト対応",
    text: "重量物や大型資材の移動が必要な現場にも、6.0tクラスのリフトでご相談いただけます。",
  },
  {
    title: "他社見積もり対抗",
    text: "短期・スポット利用も歓迎。条件や現場内容を伺い、実務に合ったご提案を行います。",
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

async function getSafeRentalForklifts() {
  try {
    const forklifts = await getRentalForklifts(20);
    return forklifts.length > 0 ? forklifts : fallbackRentalForklifts;
  } catch {
    return fallbackRentalForklifts;
  }
}

export default async function RentalPage() {
  const forklifts = await getSafeRentalForklifts();

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
            Rental
          </p>
          <div className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              フォークリフトレンタル
            </h1>
            <p className="max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
              道央圏の現場に即対応。1.5t〜6tのフォークリフトを、短期・スポット利用からご相談いただけます。
              屋外・重量物に強いディーゼル車を中心に、ロングサヤも無料標準装備です。
            </p>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-md bg-[#173323] shadow-sm">
          <div className="relative min-h-72 px-6 py-10 text-white md:px-10 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_32%),linear-gradient(135deg,_#0f2619,_#1e3d2c_58%,_#2a6044)]" />
            <div className="relative max-w-3xl space-y-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/65">
                Forklift Rental
              </p>
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                いま必要なリフトを、現場に合わせてすばやく手配。
              </h2>
              <p className="max-w-2xl text-sm leading-8 text-white/78 md:text-base">
                鋼材・木材・建材・産廃・倉庫内作業まで、用途と現場環境に合わせてご提案します。
                まずは担当 石塚までお気軽にお問い合わせください。
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:0123335273"
                  className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100"
                >
                  0123-33-5273 に電話
                </a>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full border border-white/45 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  フォームで相談
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-4">
          {rentalHighlights.map((highlight) => (
            <div
              key={highlight}
              className="border-l-4 border-[#1e3d2c] bg-white px-5 py-4 shadow-sm"
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[#1e3d2c]">
                {highlight}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item) => (
            <article key={item.title} className="rounded-md bg-white p-5 shadow-sm">
              <h2 className="text-base font-bold leading-7 text-[#1e3d2c]">
                {item.title}
              </h2>
              <p className="mt-3 text-xs leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-16 space-y-8">
          <header className="space-y-3">
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold tracking-wide">
              レンタル車両スペック
            </h2>
            <p className="max-w-3xl pl-5 text-sm leading-7 text-slate-600">
              Airtableの rental_forklifts に登録された車両を表示します。未登録時も標準ラインアップを表示し、ページが破綻しないようにしています。
            </p>
          </header>

          <div className="overflow-hidden rounded-md bg-white shadow-sm">
            <div className="hidden grid-cols-[1fr_0.8fr_1fr_1.25fr_2fr] bg-[#1e3d2c] px-5 py-3 text-xs font-bold tracking-[0.16em] text-white md:grid">
              <span>メーカー</span>
              <span>能力</span>
              <span>動力</span>
              <span>爪・サヤ</span>
              <span>主な用途</span>
            </div>
            <div className="divide-y divide-slate-100">
              {forklifts.map((forklift) => {
                const f = forklift.fields;
                return (
                  <article
                    key={forklift.id}
                    className="grid gap-3 px-5 py-5 text-sm md:grid-cols-[1fr_0.8fr_1fr_1.25fr_2fr] md:items-center"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:hidden">
                        メーカー
                      </span>
                      <p className="font-bold text-[#1e3d2c]">{f.maker ?? "—"}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:hidden">
                        能力
                      </span>
                      <p className="font-semibold">{f.capacity ?? "—"}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:hidden">
                        動力
                      </span>
                      <p>{f.power ?? "—"}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:hidden">
                        爪・サヤ
                      </span>
                      <p>{f.fork_length ?? "—"}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 md:hidden">
                        主な用途
                      </span>
                      <p className="leading-7 text-slate-600">{f.usage ?? "—"}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-16 rounded-md bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">
                Service Area
              </p>
              <h2 className="text-2xl font-bold text-[#1e3d2c]">対応エリア</h2>
              <p className="text-sm leading-8 text-slate-600">
                恵庭市を拠点に、札幌近郊から道央圏の現場までご相談ください。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-[#f5f5f3] px-4 py-2 text-sm font-semibold text-[#1e3d2c]"
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
              Contact
            </p>
            <h2 className="text-2xl font-bold">短期・スポット利用も歓迎します</h2>
            <p className="text-sm leading-7 text-white/75">
              お電話は 0123-33-5273、担当 石塚まで。フォームからのご相談も受け付けています。
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100 md:mt-0"
          >
            お問い合わせはこちら
          </Link>
        </section>
      </div>
    </div>
  );
}
