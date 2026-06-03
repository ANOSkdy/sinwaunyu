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
  const summaryRows = [
    salaryText ? ["給与", salaryText] : null,
    workTime ? ["勤務時間", workTime] : null,
    holiday ? ["休日", holiday] : null,
    f.contact_email ? ["連絡先", f.contact_email] : null,
  ].filter(Boolean) as string[][];

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-4xl px-4 pt-10 md:px-6 md:pt-14">
        <nav className="text-xs text-slate-500">
          <Link href="/recruit" className="font-semibold hover:underline">
            採用情報一覧
          </Link>
          <span className="mx-2">/</span>
          <span className="align-middle text-slate-700 line-clamp-1">
            {f.title}
          </span>
        </nav>

        <header className="mt-8 rounded-md bg-[#1e3d2c] px-6 py-8 text-white shadow-sm md:px-8 md:py-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/60">
            Recruit Detail
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-sm bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1e3d2c]">
              {employmentType}
            </span>
            <span className="text-xs font-semibold text-white/75">{location}</span>
          </div>
          <h1 className="mt-5 text-3xl font-bold leading-relaxed tracking-tight md:text-4xl">
            {f.title}
          </h1>
        </header>

        <section className="mt-8 rounded-md bg-white p-6 shadow-sm md:p-8">
          <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold tracking-wide">
            募集概要
          </h2>
          {summaryRows.length ? (
            <dl className="mt-6 divide-y divide-slate-100 text-sm text-slate-800">
              {summaryRows.map(([label, value]) => (
                <div key={label} className="grid gap-2 py-4 md:grid-cols-[8rem,1fr]">
                  <dt className="font-bold text-[#1e3d2c]">{label}</dt>
                  <dd className="leading-7">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-5 text-sm leading-7 text-slate-600">
              詳細条件はお問い合わせ時または面接時にご案内いたします。
            </p>
          )}
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-md bg-white p-6 shadow-sm md:p-8">
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-lg font-bold tracking-wide">
              仕事内容
            </h2>
            <div className="mt-5 text-sm leading-8 text-slate-700">
              {description ? (
                <p className="whitespace-pre-line">{description}</p>
              ) : (
                <p>仕事内容の詳細は面接時にご説明いたします。</p>
              )}
            </div>
          </article>

          <article className="rounded-md bg-white p-6 shadow-sm md:p-8">
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-lg font-bold tracking-wide">
              応募条件・歓迎スキル
            </h2>
            <div className="mt-5 text-sm leading-8 text-slate-700">
              {requirements ? (
                <p className="whitespace-pre-line">{requirements}</p>
              ) : (
                <p>応募条件の詳細はお問い合わせ時または面接時にご案内いたします。</p>
              )}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-md bg-[#1e3d2c] p-6 text-white shadow-sm md:flex md:items-center md:justify-between md:p-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
              Apply
            </p>
            <h2 className="mt-3 text-xl font-bold">応募・お問い合わせ</h2>
            <p className="mt-2 text-sm leading-7 text-white/75">
              本求人へのご応募、または詳細についてのご質問は、お問い合わせフォームよりご連絡ください。
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100 md:mt-0"
          >
            お問い合わせページへ
          </Link>
        </section>
      </div>
    </div>
  );
}
