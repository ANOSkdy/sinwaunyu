"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

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
    <div className="pb-16 bg-[#f5faf5]">
      <div className="mx-auto max-w-6xl px-4 pt-10 space-y-10">
        {/* ページタイトル */}
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#006400]">
            Contact
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            お問い合わせ
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 md:text-base">
            サービスに関するご質問やお見積りのご依頼、採用に関するお問い合わせなど、
            こちらのフォームからお気軽にご連絡ください。
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-[3fr,2fr] md:items-start">
          {/* フォーム */}
          <section className="rounded-2xl border border-[#9ebf9e] bg-white/95 p-6 shadow-md shadow-[#0064001a]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-slate-800"
                >
                  お名前 <span className="text-red-600">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#006400] focus:outline-none focus:ring-1 focus:ring-[#006400]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="companyName"
                  className="text-sm font-semibold text-slate-800"
                >
                  会社名・部署名
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#006400] focus:outline-none focus:ring-1 focus:ring-[#006400]"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-800"
                >
                  メールアドレス <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#006400] focus:outline-none focus:ring-1 focus:ring-[#006400]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="tel"
                  className="text-sm font-semibold text-slate-800"
                >
                  電話番号
                </label>
                <input
                  id="tel"
                  name="tel"
                  type="tel"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#006400] focus:outline-none focus:ring-1 focus:ring-[#006400]"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="category"
                  className="text-sm font-semibold text-slate-800"
                >
                  お問い合わせ種別
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue="estimate"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#006400] focus:outline-none focus:ring-1 focus:ring-[#006400]"
                >
                  <option value="estimate">お見積り・ご相談</option>
                  <option value="waste">産業廃棄物収集運搬について</option>
                  <option value="recruit">採用に関するお問い合わせ</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="subject"
                  className="text-sm font-semibold text-slate-800"
                >
                  件名
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#006400] focus:outline-none focus:ring-1 focus:ring-[#006400]"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-slate-800"
                >
                  お問い合わせ内容 <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-[#006400] focus:outline-none focus:ring-1 focus:ring-[#006400]"
                  required
                />
              </div>

              {/* ステータスメッセージ */}
              {status === "success" && (
                <p className="text-xs font-semibold text-[#006400]">
                  お問い合わせありがとうございました。内容を確認のうえ、担当者よりご連絡いたします。
                </p>
              )}
              {status === "error" && errorMessage && (
                <p className="text-xs font-semibold text-red-600">
                  {errorMessage}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center rounded-full bg-[#006400] px-8 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#00640066] transition hover:bg-[#004f00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006400] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "loading" ? "送信中..." : "送信する"}
                </button>
              </div>
            </form>
          </section>

          {/* 右カラム：連絡先・受付時間 */}
          <section className="space-y-4 rounded-2xl bg-white/95 p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-[#006400]">
              お電話でのお問い合わせ
            </h2>
            <p className="text-sm text-slate-700">
              お急ぎのご用件につきましては、お電話でも承っております。
            </p>
            <p className="text-lg font-bold text-[#006400]">
              0123-33-5273
            </p>
            <p className="text-xs text-slate-600">
              受付時間：平日 9:00〜17:00（土日・祝日・年末年始を除く）
            </p>

            <div className="mt-4 h-px w-full bg-slate-200" />

            <h3 className="text-sm font-semibold text-[#006400]">
              よくあるお問い合わせ例
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-700">
              <li>建設資材の現場搬入に関するご相談</li>
              <li>産業廃棄物収集運搬の対応エリア・費用について</li>
              <li>輸送スケジュールや車両手配に関するご相談</li>
              <li>ドライバー採用に関するご質問</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
