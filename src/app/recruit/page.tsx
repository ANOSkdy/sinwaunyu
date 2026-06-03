import Link from "next/link";
import { getActiveRecruitPositions } from "@/lib/airtable";

const recruitHighlights = ["安全第一", "地域密着", "資格を活かせる", "チームで支える運行"];

export default async function RecruitPage() {
  const positions = await getActiveRecruitPositions(50);

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
            Recruit
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            採用情報
          </h1>
          <p className="max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
            安全運転とチームワークを大切にしながら、北海道の物流を現場から支える仲間を募集しています。
          </p>
        </header>

        <section className="mt-12 overflow-hidden rounded-md bg-[#173323] shadow-sm">
          <div className="relative min-h-72 px-6 py-10 text-white md:px-10 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%),linear-gradient(135deg,#173323_0%,#2a6044_100%)]" />
            <div className="relative max-w-5xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/65">
                Join Our Team
              </p>
              <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-snug [text-wrap:balance] md:text-4xl">
                現場を止めない物流を、誠実な運行で支える仕事です。
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/75">
                車両・資格・経験を活かし、地域の建設現場や企業活動を支える運送会社として、安定した運行体制づくりに取り組んでいます。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-4">
          {recruitHighlights.map((highlight) => (
            <div key={highlight} className="border-l-4 border-[#1e3d2c] bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.18em] text-[#1e3d2c]">
                {highlight}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-16 space-y-8">
          <header className="space-y-3">
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold tracking-wide">
              募集中の職種
            </h2>
            <p className="max-w-3xl pl-5 text-sm leading-7 text-slate-600">
              現在募集中の職種です。詳細条件をご確認のうえ、お問い合わせフォームよりご連絡ください。
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            {positions.map((p) => {
              const f = p.fields;
              const slug = f.slug;
              const url = slug ? `/recruit/${slug}` : undefined;
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
              const CardBody = (
                <article className="group flex h-full flex-col justify-between rounded-md bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex rounded-sm bg-[#1e3d2c] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                        {employmentType}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{location}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-relaxed text-[#1e3d2c]">
                      {f.title}
                    </h3>
                    {f.description && (
                      <p className="line-clamp-3 text-sm leading-7 text-slate-600">
                        {f.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 grid gap-2 text-xs leading-6 text-slate-600">
                    {salaryText && (
                      <p><span className="font-bold text-[#1e3d2c]">給与</span> {salaryText}</p>
                    )}
                    {workTime && (
                      <p><span className="font-bold text-[#1e3d2c]">勤務時間</span> {workTime}</p>
                    )}
                    {holiday && (
                      <p><span className="font-bold text-[#1e3d2c]">休日</span> {holiday}</p>
                    )}
                  </div>

                  {url && (
                    <div className="mt-6 flex justify-end">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3d2c] text-sm font-bold text-white transition group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  )}
                </article>
              );

              return url ? (
                <Link key={p.id} href={url} className="block h-full">
                  {CardBody}
                </Link>
              ) : (
                <div key={p.id} className="h-full">
                  {CardBody}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
