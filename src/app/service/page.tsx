import { getVehicles, getAttachmentUrl } from "@/lib/airtable";

export default async function ServicePage() {
  const vehicles = await getVehicles(60);

  return (
    <div className="pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-10 space-y-12">
        {/* ページタイトル */}
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Fleet
          </p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            車両紹介
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 md:text-base">
            道内各地の輸送を支える多様な車両ラインナップをご紹介します。
            一般貨物輸送から産業廃棄物収集運搬まで、用途に合わせた最適な車両で対応します。
          </p>
        </header>

        {/* 上部ヒーロー画像カード */}
        <section className="rounded-[32px] border border-[#d5e3ff] bg-white shadow-sm">
          <div className="relative h-64 overflow-hidden rounded-[28px] md:h-80">
            <img
              src="/images/fleet-hero.jpg"
              alt="辰和運輸の車両が並ぶ様子"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        {/* 車両一覧 */}
        <section className="space-y-6">
          <header className="space-y-2">
            <h2 className="border-l-4 border-primary pl-3 text-xl font-bold">
              保有車両一覧
            </h2>
            <p className="text-sm text-slate-600">
              車両タイプや積載量に応じて、建設資材・機械・産業廃棄物などさまざまな貨物の輸送に対応しています。
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {vehicles.map((v) => {
              const f = v.fields;
              const imageSrc = getAttachmentUrl(f.image_url);
              const fallbackSrc = "/images/tractor.png";
              const finalSrc = imageSrc || fallbackSrc;
              const type = f.vehicle_type ?? "車両";
              const capacity =
                f.capacity_ton != null ? `${f.capacity_ton}tクラス` : "";
              const description = f.description;

              return (
                <article
                  key={v.id}
                  className="flex flex-col overflow-hidden rounded-xl border border-[#9ebf9e] bg-white shadow-sm"
                >
                  <div className="relative h-40 bg-slate-200">
                    <img
                      src={finalSrc}
                      alt={f.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex w-fit rounded-full bg-[#006400] px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
                        {type}
                      </span>
                      {capacity && (
                        <span className="text-[11px] font-semibold text-[#006400]">
                          {capacity}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-[#006400]">
                      {f.name}
                    </h3>
                    {description && (
                      <p className="mt-1 text-xs leading-relaxed text-slate-700">
                        {description}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
