import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecruitBySlug } from "@/lib/airtable";

type RecruitDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecruitDetailPage({
  params,
}: RecruitDetailPageProps) {
  const { slug } = await params;

  const record = await getRecruitBySlug(slug);

  if (!record) {
    notFound();
  }

  const f = record.fields;

  const employmentType = f.employment_type ?? "正社員";
  const location = f.location ?? "北海道恵庭市";
  const workTime = f.work_time ?? "";
  const holiday = f.holiday ?? "";
  const salaryMin = f.salary_min;
  const salaryMax = f.salary_max;
  const salaryUnit =
    f.salary_unit === "hourly"
      ? "円／時"
      : f.salary_unit === "monthly"
      ? "円／月"
      : "";
  const salaryText =
    salaryMin != null && salaryMax != null
      ? `${salaryMin.toLocaleString()}〜${salaryMax.toLocaleString()}${salaryUnit}`
      : salaryMin != null
      ? `${salaryMin.toLocaleString()}${salaryUnit}〜`
      : "";

  const description = f.description ?? "";
  const requirements = f.requirements ?? "";

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-3xl px-4 pt-10 space-y-8">
        {/* パンくず */}
        <nav className="text-xs text-slate-500">
          <Link href="/recruit" className="hover:underline">
            採用情報一覧
          </Link>
          <span className="mx-1">/</span>
          <span className="text-slate-700 line-clamp-1 align-middle">
            {f.title}
          </span>
        </nav>

        {/* ヘッダー */}
        <header className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center rounded-full bg-[#006400] px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
              {employmentType}
            </span>
            <span className="text-xs text-slate-700">{location}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {f.title}
          </h1>
        </header>

        {/* 概要カード */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <dl className="space-y-3 text-sm text-slate-800">
            {salaryText && (
              <div className="flex flex-col gap-1 md:flex-row md:gap-4">
                <dt className="w-24 shrink-0 font-semibold text-[#006400]">
                  給与
                </dt>
                <dd>{salaryText}</dd>
              </div>
            )}
            {workTime && (
              <div className="flex flex-col gap-1 md:flex-row md:gap-4">
                <dt className="w-24 shrink-0 font-semibold text-[#006400]">
                  勤務時間
                </dt>
                <dd>{workTime}</dd>
              </div>
            )}
            {holiday && (
              <div className="flex flex-col gap-1 md:flex-row md:gap-4">
                <dt className="w-24 shrink-0 font-semibold text-[#006400]">
                  休日
                </dt>
                <dd>{holiday}</dd>
              </div>
            )}
            {f.contact_email && (
              <div className="flex flex-col gap-1 md:flex-row md:gap-4">
                <dt className="w-24 shrink-0 font-semibold text-[#006400]">
                  連絡先
                </dt>
                <dd>
                  <span className="text-slate-800">{f.contact_email}</span>
                </dd>
              </div>
            )}
          </dl>
        </section>

        {/* 仕事内容・応募条件 */}
        <section className="space-y-6">
          <article className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="border-l-4 border-primary pl-3 text-sm font-semibold text-slate-900">
              仕事内容
            </h2>
            <div className="mt-3 text-sm leading-relaxed text-slate-800">
              {description ? (
                <p className="whitespace-pre-line">{description}</p>
              ) : (
                <p>仕事内容の詳細は面接時にご説明いたします。</p>
              )}
            </div>
          </article>

          <article className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="border-l-4 border-primary pl-3 text-sm font-semibold text-slate-900">
              応募条件・歓迎スキル
            </h2>
            <div className="mt-3 text-sm leading-relaxed text-slate-800">
              {requirements ? (
                <p className="whitespace-pre-line">{requirements}</p>
              ) : (
                <p>
                  応募条件の詳細はお問い合わせ時または面接時にご案内いたします。
                </p>
              )}
            </div>
          </article>
        </section>

        {/* 応募の流れ／お問い合わせ */}
        <section className="rounded-xl border border-primary bg-primary-light/40 p-6 text-xs text-slate-800">
          <h2 className="text-sm font-semibold text-primary">
            応募・お問い合わせ
          </h2>
          <p className="mt-2">
            本求人へのご応募、または詳細についてのご質問は、お問い合わせフォームよりご連絡ください。
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm hover:bg-primary-light"
            >
              <span>お問い合わせページへ</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
