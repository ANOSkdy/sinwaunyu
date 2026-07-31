import Link from "next/link";
import type { Metadata } from "next";
import { getRentalForklifts } from "@/lib/content";
import type { RentalForkliftFields } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "フォークリフトレンタル | 株式会社辰和運輸",
  description:
    "札幌市・千歳市・恵庭市など道央圏の現場に対応する、1.5t〜6tフォークリフトレンタルサービスです。ロングサヤ無料標準装備、短期・スポット利用もご相談ください。",
};

type RentalForklift = Required<
  Pick<
    RentalForkliftFields,
    "maker" | "capacity" | "power" | "fork_length" | "usage"
  >
>;

const rentalReasons = [
  {
    title: "【200cm・170cm】ロングサヤ（長爪）がいつでも「無料」標準装備！",
    body: "長爪用サヤは本体レンタル料金に含まれています。2パレット同時荷役や長尺資材の移動など、通常爪では届きにくい現場作業を追加費用なしで支えます。",
  },
  {
    title: "屋外・重量物に強い「ディーゼル・大型6t車」を即納可能！",
    body: "2.5t〜6tのディーゼル車を中心に、希少な6t大型ディーゼルリフトもご相談可能。石材・木材・産業廃棄物・解体現場など、荒れた屋外環境や重量物作業に対応します。",
  },
  {
    title: "コスト削減をお約束！「他社お見積もり」対抗いたします",
    body: "他社のお見積もり・請求書をお見せください。1ヶ月未満の短期利用やスポット増車も歓迎し、現場条件に合わせた無駄のない手配をご提案します。",
  },
];

const usageExamples = [
  {
    title: "繁忙期・スポットの増車に",
    body: "収穫期、新倉庫立ち上げ、突発的な大型貨物の入庫時など、1ヶ月単位から柔軟にお貸しします。",
  },
  {
    title: "自社リフトの車検・修理中の「代車」に",
    body: "特定自主検査（特自検）や故障での修理期間中、業務を止めないための代替機としてご活用ください。",
  },
];

function normalizeFieldName(fieldName: string) {
  return fieldName
    .normalize("NFKC")
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase();
}

function stringifyFieldValue(value: unknown): string | undefined {
  if (typeof value === "string") {
    return value.trim() || undefined;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return (
      value
        .map((item) => stringifyFieldValue(item))
        .filter((item): item is string => Boolean(item))
        .join("、") || undefined
    );
  }

  return undefined;
}

function getRentalField(
  fields: RentalForkliftFields,
  fieldName: keyof RentalForkliftFields,
) {
  const directValue = stringifyFieldValue(fields[fieldName]);

  if (directValue) {
    return directValue;
  }

  const normalizedFieldName = normalizeFieldName(fieldName);
  const entry = Object.entries(fields).find(
    ([key]) => normalizeFieldName(key) === normalizedFieldName,
  );

  return stringifyFieldValue(entry?.[1]);
}

function normalizeForklift(fields: RentalForkliftFields): RentalForklift {
  return {
    maker:
      getRentalField(fields, "maker") ?? "メーカー確認中",
    capacity:
      getRentalField(fields, "capacity") ?? "容量確認中",
    power: getRentalField(fields, "power") ?? "動力確認中",
    fork_length:
      getRentalField(fields, "fork_length") ??
      "爪・サヤ仕様確認中",
    usage:
      getRentalField(fields, "usage") ??
      "用途はお問い合わせください",
  };
}

async function getDisplayForklifts(): Promise<RentalForklift[]> {
  const records = await getRentalForklifts(20);
  return records.map((record) => normalizeForklift(record.fields));
}

export default async function RentalPage() {
  const forklifts = await getDisplayForklifts();

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <section className="overflow-hidden rounded-md bg-[#173323] shadow-sm">
          <div className="relative px-6 py-10 text-white md:px-10 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.18),_transparent_34%),linear-gradient(135deg,_#173323_0%,_#244b33_55%,_#0f2619_100%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/65">
                  Forklift Rental
                </p>
                <h1 className="mt-4 max-w-4xl text-3xl font-bold leading-tight tracking-tight md:text-[44px] lg:text-5xl">
                  <span className="block">道央圏の現場に即対応！</span>
                  <span className="block">【1.5t〜6t】フォークリフト・</span>
                  <span className="block">レンタルサービス</span>
                </h1>
                <p className="mt-6 max-w-3xl text-sm leading-8 text-white/80 md:text-base">
                  「大手に在庫がない」「長爪が使いたい」「屋外用の強いディーゼル車が欲しい」そんなお悩み、辰和運輸がすべて解決します！
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

        <section className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">
            Reasons
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            辰和運輸のレンタルが選ばれる3つの理由
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {rentalReasons.map((reason, index) => (
              <article
                key={reason.title}
                className="rounded-md border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-bold text-[#1e3d2c]">
                  理由 {index + 1}
                </p>
                <h3 className="mt-3 text-lg font-bold leading-8 text-slate-950">
                  {reason.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-600">
                  {reason.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Lineup
            </p>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
              保有車両・スペック一覧表
            </h2>
          </div>

          <div className="mt-6 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[0.8fr_0.7fr_1fr_1.3fr_1.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 text-xs font-bold tracking-[0.12em] text-slate-500 md:grid">
              <span>メーカー</span>
              <span>トン数</span>
              <span>動力</span>
              <span>爪の長さ</span>
              <span>最適な用途・現場</span>
            </div>
            <div className="divide-y divide-slate-100">
              {forklifts.map((forklift, index) => (
                <article
                  key={`${forklift.maker}-${forklift.capacity}-${forklift.power}-${index}`}
                  className="grid gap-4 px-5 py-5 md:grid-cols-[0.8fr_0.7fr_1fr_1.3fr_1.8fr] md:items-center"
                >
                  <div>
                    <p className="text-xs font-bold tracking-[0.12em] text-slate-400 md:hidden">
                      メーカー
                    </p>
                    <p className="mt-1 font-bold text-slate-950 md:mt-0">
                      {forklift.maker}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.12em] text-slate-400 md:hidden">
                      トン数
                    </p>
                    <p className="mt-1 text-lg font-bold text-[#1e3d2c] md:mt-0">
                      {forklift.capacity}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.12em] text-slate-400 md:hidden">
                      動力
                    </p>
                    <p className="mt-1 text-sm text-slate-700 md:mt-0">
                      {forklift.power}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.12em] text-slate-400 md:hidden">
                      爪の長さ
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800 md:mt-0">
                      {forklift.fork_length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-[0.12em] text-slate-400 md:hidden">
                      最適な用途・現場
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

        <section className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">
            Use Cases
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            このようなシーンでご活用ください
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {usageExamples.map((example) => (
              <article
                key={example.title}
                className="rounded-md border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-[#1e3d2c]">
                  {example.title}
                </h3>
                <p className="mt-4 text-sm leading-8 text-slate-600">
                  {example.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-md bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-400">
            Area
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">対応エリア</h2>
          <p className="mt-4 text-sm leading-8 text-slate-600 md:text-base">
            道央圏全域（札幌市・千歳市・恵庭市・北広島市・苫小牧市・石狩市・江別市・小樽市・岩見沢市
            など）
          </p>
          <p className="mt-4 text-sm leading-8 text-slate-600">
            辰和運輸の自社輸送の強みを活かし、搬入・引取の段取りも現場条件に合わせて柔軟にご相談いただけます。
          </p>
        </section>

        <section className="mt-14 rounded-md bg-[#1e3d2c] p-6 text-white shadow-sm md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
            Contact
          </p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">
            お見積もり・お問い合わせ
          </h2>
          <p className="mt-4 text-sm leading-8 text-white/75 md:text-base">
            「今すぐ借りたい」「料金を知りたい」「現場に合うリフトを教えてほしい」など、担当の石塚までお気軽にお問い合わせください。
          </p>
          <div className="mt-6 grid gap-3 text-sm font-bold text-white/90 md:grid-cols-3">
            <div className="rounded-md border border-white/15 bg-white/10 px-4 py-3">
              今すぐ借りたい
            </div>
            <div className="rounded-md border border-white/15 bg-white/10 px-4 py-3">
              料金を知りたい
            </div>
            <div className="rounded-md border border-white/15 bg-white/10 px-4 py-3">
              現場に合うリフトを教えてほしい
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="tel:0123335273"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100"
            >
              0123-33-5273（担当：石塚）
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              お問い合わせフォーム
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
