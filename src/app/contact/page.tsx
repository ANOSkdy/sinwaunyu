"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const contactTopics = [
  "輸送・車両手配のご相談",
  "産業廃棄物収集運搬",
  "お見積り依頼",
  "採用に関するお問い合わせ",
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name")?.toString().trim() ?? "",
      companyName: formData.get("companyName")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      tel: formData.get("tel")?.toString().trim() ?? "",
      category: formData.get("category")?.toString().trim() ?? "other",
      subject: formData.get("subject")?.toString().trim() ?? "",
      message: formData.get("message")?.toString().trim() ?? "",
    };

    if (!payload.name || !payload.email || !payload.message) {
      setErrorMessage("お名前・メールアドレス・お問い合わせ内容は必須です。");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        setErrorMessage(
          data?.error ?? "お問い合わせの送信に失敗しました。時間をおいて再度お試しください。"
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setErrorMessage("ネットワークエラーが発生しました。時間をおいて再度お試しください。");
      setStatus("error");
    }
  }

  return (
    <div className="bg-[#f5f5f3] pb-20 text-slate-950">
      <div className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <header className="max-w-3xl space-y-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.45em] text-slate-400">
            Contact
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            お問い合わせ
          </h1>
          <p className="max-w-2xl text-sm leading-8 text-slate-600 md:text-base">
            輸送・収集運搬・採用に関するご相談はこちらからご連絡ください。内容を確認のうえ、担当者よりご連絡いたします。
          </p>
        </header>

        <section className="mt-12 overflow-hidden rounded-md bg-[#173323] shadow-sm">
          <div className="relative min-h-64 px-6 py-10 text-white md:px-10 md:py-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_34%),linear-gradient(135deg,#173323_0%,#2a6044_100%)]" />
            <div className="relative max-w-5xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.38em] text-white/65">
                Transport Consultation
              </p>
              <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-snug [text-wrap:balance] md:text-4xl">
                運ぶもの、現場条件、スケジュールから最適な対応を検討します。
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/75">
                建設資材、重機、産業廃棄物など、まずは運搬内容と希望時期をお知らせください。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-3 md:grid-cols-4">
          {contactTopics.map((topic) => (
            <div key={topic} className="border-l-4 border-[#1e3d2c] bg-white px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold tracking-[0.12em] text-[#1e3d2c]">
                {topic}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-16 grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-start">
          <section className="rounded-md bg-white p-6 shadow-sm md:p-8">
            <header className="mb-6 space-y-2">
              <h2 className="border-l-4 border-[#1e3d2c] pl-4 text-xl font-bold tracking-wide">
                フォームでのお問い合わせ
              </h2>
              <p className="pl-5 text-sm leading-7 text-slate-600">
                必須項目をご入力のうえ、送信してください。
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-slate-800">
                    お名前 <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#1e3d2c] focus:outline-none focus:ring-1 focus:ring-[#1e3d2c]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm font-bold text-slate-800">
                    会社名・部署名
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#1e3d2c] focus:outline-none focus:ring-1 focus:ring-[#1e3d2c]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-slate-800">
                    メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#1e3d2c] focus:outline-none focus:ring-1 focus:ring-[#1e3d2c]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tel" className="text-sm font-bold text-slate-800">
                    電話番号
                  </label>
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#1e3d2c] focus:outline-none focus:ring-1 focus:ring-[#1e3d2c]"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-bold text-slate-800">
                    お問い合わせ種別
                  </label>
                  <select
                    id="category"
                    name="category"
                    defaultValue="estimate"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#1e3d2c] focus:outline-none focus:ring-1 focus:ring-[#1e3d2c]"
                  >
                    <option value="estimate">お見積り・ご相談</option>
                    <option value="waste">産業廃棄物収集運搬について</option>
                    <option value="recruit">採用に関するお問い合わせ</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-bold text-slate-800">
                    件名
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#1e3d2c] focus:outline-none focus:ring-1 focus:ring-[#1e3d2c]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-800">
                  お問い合わせ内容 <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-[#1e3d2c] focus:outline-none focus:ring-1 focus:ring-[#1e3d2c]"
                  required
                />
              </div>

              {status === "success" && (
                <p className="rounded-md bg-[#eef7ee] px-4 py-3 text-xs font-bold text-[#1e3d2c]">
                  お問い合わせありがとうございました。内容を確認のうえ、担当者よりご連絡いたします。
                </p>
              )}
              {status === "error" && errorMessage && (
                <p className="rounded-md bg-red-50 px-4 py-3 text-xs font-bold text-red-700">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center rounded-full bg-[#1e3d2c] px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#2a5240] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3d2c] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? "送信中..." : "送信する"}
              </button>
            </form>
          </section>

          <aside className="space-y-4">
            <section className="rounded-md bg-[#1e3d2c] p-6 text-white shadow-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
                Phone
              </p>
              <h2 className="mt-3 text-lg font-bold">お電話でのお問い合わせ</h2>
              <p className="mt-3 text-sm leading-7 text-white/75">
                お急ぎのご用件につきましては、お電話でも承っております。
              </p>
              <p className="mt-4 text-2xl font-bold">0123-33-5273</p>
              <p className="mt-2 text-xs leading-6 text-white/65">
                受付時間：平日 9:00〜17:00（土日・祝日・年末年始を除く）
              </p>
            </section>

            <section className="rounded-md bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#1e3d2c]">
                よくあるお問い合わせ例
              </h3>
              <ul className="mt-4 space-y-3 text-xs leading-6 text-slate-700">
                <li>建設資材の現場搬入に関するご相談</li>
                <li>産業廃棄物収集運搬の対応エリア・費用について</li>
                <li>輸送スケジュールや車両手配に関するご相談</li>
                <li>ドライバー採用に関するご質問</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
