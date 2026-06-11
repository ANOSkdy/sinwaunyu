import Link from "next/link";
import type { Metadata } from "next";
import { getRentalForklifts } from "@/lib/airtable";
import type { RentalForkliftFields } from "@/lib/airtable";

export const metadata: Metadata = {
  title: "フォークリフトレンタル | 株式会社辰和運輸",
  description:
    "札幌市・千歳市・恵庭市など道央圏の現場に対応する、1.5t〜6tフォークリフトレンタルサービスです。ロングサヤ無料標準装備、短期・スポット利用もご相談ください。",
};

type RentalForklift = Required<
  Pick<RentalForkliftFields, "maker" | "capacity" | "power" | "fork_length" | "usage">
>;

const fallbackForklifts: RentalForklift[] = [
  {
    maker: "コマツ",
    capacity: "6.0t",
    power: "ディーゼル",
    fork_length: "標準爪 ＋ サヤ200cm",
    usage: "鋼材・木材（原木）・コンクリート・重量物",
  },
  {
    maker: "コマツ",
    capacity: "2.5t",
    power: "ディーゼル（4台）",
    fork_length: "標準爪 ＋ サヤ170cm",
    usage: "資材置場・産廃・解体・屋外のあらゆる現場",
  },
  {
    maker: "三菱",
    capacity: "2.5t",
    power: "ディーゼル（1台）",
    fork_length: "標準爪 ＋ サヤ170cm",
    usage: "建材・地場産業・屋外作業",
  },
  {
    maker: "ユニキャリア",
    capacity: "2.5t",
    power: "ディーゼル（1台）",
    fork_length: "標準爪 ＋ サヤ170cm",
    usage: "鉄工所・仮設資材・引越し現場",
  },
  {
    maker: "コマツ",
    capacity: "2.5t",
    power: "ガソリン（1台）",
    fork_length: "標準爪 ＋ サヤ170cm",
    usage: "倉庫内・排気を抑えたい半屋外",
  },
  {
    maker: "三菱",
    capacity: "1.5t",
    power: "ディーゼル（1台）",
    fork_length: "標準爪 ＋ サヤ170cm",
    usage: "狭い現場・小回りの必要な資材移動",
  },
  {
    maker: "コマツ",
    capacity: "2.5t",
    power: "バッテリー（1台）",
    fork_length: "標準爪 ＋ サヤ170cm",
    usage: "食品工場・水産加工・農産物倉庫（屋内専用）",
  },
];

const strengths = [
  "道央圏の現場に即対応",
  "1.5t〜6t フォークリフトレンタル",
  "200cm・170cm ロングサヤ無料標準装備",
  "屋外・重量物に強いディーゼル車",
  "6t大型ディーゼルリフト対応",
  "他社見積もり対抗",
  "短期・スポット利用歓迎",
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

function normalizeFieldName(fieldName: string) {
  return fieldName.normalize("NFKC").replace(/^\uFEFF/, "").trim().toLowerCase();
}

function stringifyFieldValue(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value.trim() || undefined;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => stringifyFieldValue(item))
      .filter((item): item is string => Boolean(item))
      .join("、") || undefined;
  }

  return undefined;
}

function getRentalField(
  fields: RentalForkliftFields,
  fieldName: keyof RentalForkliftFields
) {
  const directValue = stringifyFieldValue(fields[fieldName]);

  if (directValue) {
    return directValue;
  }

  const normalizedFieldName = normalizeFieldName(fieldName);
  const entry = Object.entries(fields).find(
    ([key]) => normalizeFieldName(key) === normalizedFieldName
  );

  return stringifyFieldValue(entry?.[1]);
}

function normalizeForklift(
  fields: RentalForkliftFields,
  fallback?: RentalForklift
): RentalForklift {
  return {
    maker: getRentalField(fields, "maker") ?? fallback?.maker ?? "メーカー確認中",
    capacity: getRentalField(fields, "capacity") ?? fallback?.capacity ?? "容量確認中",
    power: getRentalField(fields, "power") ?? fallback?.power ?? "動力確認中",
    fork_length:
      getRentalField(fields, "fork_length") ??
      fallback?.fork_length ??
      "爪・サヤ仕様確認中",
    usage: getRentalField(fields, "usage") ?? fallback?.usage ?? "用途はお問い合わせください",
  };
}

async function getDisplayForklifts(): Promise<{
  forklifts: RentalForklift[];
  isFallback: boolean;
}> {
  try {
    const records = await getRentalForklifts(20);

    if (records.length === 0) {
      return { forklifts: fallbackForklifts, isFallback: true };
    }

    return {
      forklifts: records.map((record, index) =>
        normalizeForklift(record.fields, fallbackForklifts[index])
      ),
      isFallback: false,
    };
  } catch {
    return { forklifts: fallbackForklifts, isFallback: true };
  }
}

export default async function RentalPage() {
  const { forklifts, isFallback } = await getDisplayForklifts();

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
            Forklift Rental
          </p>
          <div className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              フォークリフトレンタル
            </h1>
            <p className="max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
              道央圏の現場に、1.5t〜6tのフォークリフトをすばやく手配。
              ロングサヤを無料標準装備し、重量物・屋外作業・短期スポット利用まで柔軟に対応します。
            </p>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-md bg-[#173323] shadow-sm">
          <div className="relative min-h-[360px] px-6 py-10 text-white md:px-10 md:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_34%),linear-gradient(135deg,_#173323_0%,_#244b33_55%,_#0f2619_100%)]" />
            <div className="relative grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/65">
                  Hokkaido Forklift Support
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight [text-wrap:balance] md:text-5xl">
                  必要な時に、現場で使えるリフトを。
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-8 text-white/75 md:text-base">
                  屋外作業に強いディーゼル車を中心に、6t大型リフトから屋内向けバッテリー車までご相談可能です。
                  他社見積もり対抗、短期・スポット利用も歓迎します。
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="tel:0123335273"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100"
                  >
                    電話で相談する 0123-33-5273
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    フォームで問い合わせる
                  </Link>
                </div>
              </div>
              <div className="rounded-md border border-white/15 bg-white/10 p-6 backdrop-blur">
                <p className="text-sm font-bold text-white/80">担当</p>
                <p className="mt-2 text-3xl font-bold">石塚</p>
                <p className="mt-4 text-sm leading-7 text-white/75">
                  現場住所・使用期間・荷物重量・屋内外の条件をお知らせください。最適な車両をご提案します。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-4">
          {strengths.map((strength) => (
            <div
              key={strength}
              className="rounded-md border border-slate-200 bg-white px-4 py-4 text-sm font-bold text-slate-800 shadow-sm"
            >
              {strength}
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">
                Lineup
              </p>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                レンタル対応フォークリフト
              </h2>
            </div>
            {isFallback && (
              <p className="max-w-xl rounded-md bg-amber-50 px-4 py-3 text-xs leading-6 text-amber-900 ring-1 ring-amber-200">
                最新の在庫情報を確認中のため、標準ラインナップを表示しています。詳しい空き状況はお問い合わせください。
              </p>
            )}
          </div>

          <div className="mt-6 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[0.8fr_0.7fr_1fr_1.3fr_1.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500 md:grid">
              <span>Maker</span>
              <span>Capacity</span>
              <span>Power</span>
              <span>Fork</span>
              <span>Usage</span>
            </div>
            <div className="divide-y divide-slate-100">
              {forklifts.map((forklift, index) => (
                <article
                  key={`${forklift.maker}-${forklift.capacity}-${forklift.power}-${index}`}
                  className="grid gap-4 px-5 py-5 md:grid-cols-[0.8fr_0.7fr_1fr_1.3fr_1.8fr] md:items-center"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 md:hidden">
                      Maker
                    </p>
                    <p className="mt-1 font-bold text-slate-950 md:mt-0">
                      {forklift.maker}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 md:hidden">
                      Capacity
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#1e3d2c] md:mt-0">
                      {forklift.capacity}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 md:hidden">
                      Power
                    </p>
                    <p className="mt-1 text-sm text-slate-700 md:mt-0">
                      {forklift.power}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 md:hidden">
                      Fork
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800 md:mt-0">
                      {forklift.fork_length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 md:hidden">
                      Usage
                    </p>
                    <p className="mt-1 text-sm leading-7 text-slate-600 md:mt-0">
                      {forklift.usage}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-md bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Area
            </p>
            <h2 className="mt-3 text-2xl font-bold">対応エリア</h2>
            <p className="mt-4 text-sm leading-8 text-slate-600">
              恵庭市を拠点に、札幌近郊から道央圏の現場へ対応します。記載外のエリアもまずはご相談ください。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-[#edf3ee] px-4 py-2 text-sm font-bold text-[#1e3d2c]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-md bg-[#1e3d2c] p-6 text-white shadow-sm md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
              Contact
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
              空き状況・見積もりのご相談
            </h2>
            <p className="mt-4 text-sm leading-8 text-white/75 md:text-base">
              ご利用日、搬入先、作業内容、必要トン数が未定でも大丈夫です。担当の石塚までお気軽にお問い合わせください。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:0123335273"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100"
              >
                0123-33-5273
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                お問い合わせフォーム
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
