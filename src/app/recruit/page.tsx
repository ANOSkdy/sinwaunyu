import Link from "next/link";
import { getActiveRecruitPositions } from "@/lib/airtable";

export default async function RecruitPage() {
  const positions = await getActiveRecruitPositions(50);

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-10 space-y-10">
        {/* ページタイトル */}
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Recruit
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            採用情報
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 md:text-base">
            安全運転とチームワークを大切にしながら、地域の物流を支えていく
            ドライバー・スタッフを募集しています。現在募集中の職種は以下のとおりです。
          </p>
        </header>

        {/* 採用ポジション一覧 */}
        <section className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
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

              const Wrapper: React.FC<{ children: React.ReactNode }> = ({
                children,
              }) =>
                url ? (
                  <Link href={url} className="block h-full">
                    {children}
                  </Link>
                ) : (
                  <>{children}</>
                );

              return (
                <Wrapper key={p.id}>
                  <article className="flex h-full flex-col justify-between rounded-xl border border-[#9ebf9e] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#006400]">
                        <span className="inline-flex rounded-full bg-[#006400] px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
                          {employmentType}
                        </span>
                        <span className="text-xs text-slate-600">
                          {location}
                        </span>
                      </div>
                      <h2 className="text-base font-semibold text-[#006400]">
                        {f.title}
                      </h2>
                      {f.description && (
                        <p className="text-xs leading-relaxed text-slate-700 line-clamp-3">
                          {f.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 text-[11px] text-slate-600">
                      <div className="space-y-1">
                        {salaryText && (
                          <div>
                            <span className="font-semibold text-[#006400]">
                              給与
                            </span>
                            <span className="ml-1">{salaryText}</span>
                          </div>
                        )}
                        {workTime && (
                          <div>
                            <span className="font-semibold text-[#006400]">
                              勤務時間
                            </span>
                            <span className="ml-1">{workTime}</span>
                          </div>
                        )}
                        {holiday && (
                          <div>
                            <span className="font-semibold text-[#006400]">
                              休日
                            </span>
                            <span className="ml-1">{holiday}</span>
                          </div>
                        )}
                      </div>
                      {url && (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#006400] text-sm font-semibold text-white">
                          →
                        </span>
                      )}
                    </div>
                  </article>
                </Wrapper>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
