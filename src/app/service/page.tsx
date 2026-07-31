import { getVehicles, getAttachmentUrl } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fleetHighlights = [
  "一般貨物輸送",
  "重機・建設資材輸送",
  "産業廃棄物収集運搬",
  "北海道内一円対応",
];

function getFleetLabel(name: string, vehicleType?: string) {
  const source = `${vehicleType ?? ""} ${name}`.toLowerCase();

  if (source.includes("トラクタ") || source.includes("tractor")) {
    return "TRACTOR HEAD";
  }
  if (source.includes("ウイング") || source.includes("wing")) {
    return "WING TRAILER";
  }
  if (source.includes("ユニック") || source.includes("unic")) {
    return "SELF UNIC";
  }
  if (source.includes("ダンプ") || source.includes("dump")) {
    return "DUMP TRUCK";
  }
  if (source.includes("重機") || source.includes("セルフ")) {
    return "HEAVY TRANSPORT";
  }
  if (source.includes("平") || source.includes("flat")) {
    return "FLAT BODY";
  }

  return "FLEET";
}

function getFallbackIcon(label: string) {
  if (label.includes("UNIC")) return "🏗️";
  if (label.includes("DUMP")) return "🚛";
  if (label.includes("HEAVY")) return "⚙️";
  if (label.includes("FLAT")) return "🚜";
  return "🚚";
}

export default async function ServicePage() {
  const vehicles = await getVehicles(60);

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
            Fleet
          </p>
          <div className="space-y-5">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              車両紹介
            </h1>
            <p className="max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
              道内輸送を支える辰和運輸の保有車両。一般貨物、重機輸送、
              産業廃棄物収集運搬まで、用途に応じた車両体制で現場を支えます。
            </p>
          </div>
        </header>

        <section className="mt-12 overflow-hidden rounded-md bg-[#173323] shadow-sm">
          <div className="relative h-64 md:h-[360px]">
            <img
              src="/images/fleet-hero.jpg"
              alt="辰和運輸の保有車両"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2619]/80 via-[#0f2619]/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white md:bottom-8 md:left-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/65">
                Hokkaido Logistics Fleet
              </p>
              <p className="mt-3 max-w-3xl text-xl font-bold leading-snug [text-wrap:balance] md:text-3xl">
                現場に合わせて動ける車両体制が、辰和運輸の対応力です。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-4">
          {fleetHighlights.map((highlight) => (
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

        <section className="mt-16 space-y-8">
          <header className="space-y-3">
            <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold tracking-wide">
              保有車両一覧
            </h2>
            <p className="max-w-3xl pl-5 text-sm leading-7 text-slate-600">
              車両タイプや積載量に応じて、建設資材・機械・産業廃棄物など
              さまざまな貨物の輸送に対応しています。
            </p>
          </header>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => {
              const f = v.fields;
              const imageSrc = getAttachmentUrl(f.image_url);
              const type = f.vehicle_type ?? "Vehicle";
              const capacity =
                f.capacity_ton != null ? `${f.capacity_ton}tクラス` : "";
              const description = f.description;
              const label = getFleetLabel(f.name, f.vehicle_type);
              const fallbackIcon = getFallbackIcon(label);

              return (
                <article
                  key={v.id}
                  className="group flex min-h-full flex-col overflow-hidden rounded-md bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="relative aspect-[3/2] overflow-hidden bg-[#1e3d2c]">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={f.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#173323] to-[#2a6044] text-5xl opacity-90">
                        <span aria-hidden="true">{fallbackIcon}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2619]/70 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/75">
                        {label}
                      </span>
                      {capacity && (
                        <span className="shrink-0 rounded-sm bg-white/90 px-2 py-1 text-[10px] font-bold tracking-wider text-[#1e3d2c]">
                          {capacity}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex w-fit rounded-sm bg-[#1e3d2c] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                        {type}
                      </span>
                    </div>
                    <h3 className="text-base font-bold leading-relaxed text-[#1e3d2c] transition group-hover:text-[#2a5240]">
                      {f.name}
                    </h3>
                    {description && (
                      <p className="text-xs leading-7 text-slate-600">
                        {description}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-md bg-[#1e3d2c] px-6 py-8 text-white md:flex md:items-center md:justify-between md:px-8">
          <div className="space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
              Contact
            </p>
            <h2 className="max-w-2xl text-2xl font-bold leading-snug [text-wrap:balance]">輸送内容に応じた車両をご提案します</h2>
            <p className="text-sm leading-7 text-white/75">
              建設資材、重機、産業廃棄物など、まずは運搬内容をご相談ください。
            </p>
          </div>
          <a
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#1e3d2c] transition hover:bg-slate-100 md:mt-0"
          >
            お問い合わせはこちら
          </a>
        </section>
      </div>
    </div>
  );
}
